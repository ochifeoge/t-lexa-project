import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer } from "./Reducers";
import { useQuery } from "@tanstack/react-query";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase";
import ManageProducts from "../ADMIN/ManageProducts";
import ManageUsers from "../ADMIN/ManageUsers";
import AddProducts from "../ADMIN/AddProducts";
import ViewProducts from "../ADMIN/ViewProducts";
import AdminHero from "../ADMIN/AdminHero";

const CartContext = createContext();

const Context = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: JSON.parse(localStorage.getItem("T-lexa's-shop-cart")) || [],
    user: null,
  });

  useEffect(() => {
    localStorage.setItem("T-lexa's-shop-cart", JSON.stringify(state.cart));
  }, [state.cart]);

  /////////FETCH PRODUCT AND PASS IT TO THE LOCAL STATE ///////////////////

  const fetchProducts = async () => {
    const productCollectionRef = collection(db, "products");
    const productSnapshot = await getDocs(productCollectionRef);
    return productSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery(["products"], fetchProducts);

  /*   if (products && state.products.length === 0) {
    dispatch({ type: "SET_PRODUCTS", payload: products });
  } */

  ////////////////////////////// PASS THE AUTH USER TO STATE///////////////////

  useEffect(() => {
    const unSuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          payload: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          payload: null,
        });
        /*   console.log("no user signed in"); */
      }
    });

    return () => unSuscribe();
  }, []);

  // for viewing products in admin panel

  const [viewProduct, setViewProduct] = useState({});

  // changing admin screen
  const [activeSection, setActiveSection] = useState("dashboard");

  function renderSection() {
    if (activeSection === "products") {
      // passing the setactive section as props so i can use it in manage product
      return <ManageProducts />;
    } else if (activeSection === "users") {
      return <ManageUsers />;
    } else if (activeSection === "addproducts") {
      return <AddProducts />;
    } else if (activeSection === "viewproduct") {
      return <ViewProducts />;
    } else return <AdminHero />;
  }

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 750) {
        setIsMobile(true);
        setIsSidebarOpen(false);
      } else {
        setIsMobile(false);
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isAdmin, setIsAdmin] = useState(null);

  /* setting users details */
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    const getuserdata = async () => {
      const userDocRef = doc(db, "users", state?.user.uid);

      const docSnap = await getDoc(userDocRef);

      setUserDetails({ id: state?.user.uid, ...docSnap.data() });
    };
    getuserdata();
  }, [state.user]);

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        products,
        refetch,
        isLoading,
        isError,
        viewProduct,
        setViewProduct,
        renderSection,
        setActiveSection,
        isSidebarOpen,
        setIsSidebarOpen,
        isMobile,
        isAdmin,
        setIsAdmin,
        userDetails,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default Context;

//custom hook i guess
export const CartState = () => {
  return useContext(CartContext);
};
