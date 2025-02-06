import { useEffect, useState } from "react";
import { db } from "../components/Firebase";
import { doc, getDoc } from "firebase/firestore";
import Spinners from "../components/Spinners";
import { useNavigate } from "react-router-dom";
import { CartState } from "../components/Context";

const AdminRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const { state, isAdmin, setIsAdmin } = CartState();
  const user = state.user;

  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        /*   console.log(user);
         */
        if (user) {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists() && userDoc.data().role === "admin") {
            /*    console.log(userDoc); */
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    verifyAdmin();
  });

  if (loading) {
    return <Spinners />;
  } else if (isAdmin) {
    return children;
  } else {
    return navigate("/");
  }
};

export default AdminRoute;
