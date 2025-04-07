import { FaShoppingCart } from "react-icons/fa";
import { CartState } from "./Context";
import { toast } from "react-toastify";

const Button = ({ label, product }) => {
  const {
    /*  state: { cart }, */
    dispatch,
  } = CartState();

  const handleAddToCart = () => {
    if (product.sizes && !product.selectedSize) {
      return toast.error("Please select a size first!");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: product,
    });
    toast.success(`${product.name} added to cart successfully 👌`);
  };
  return (
    <button
      onClick={handleAddToCart}
      className={` bg-red-500  flex justify-center items-center gap-2 px-4 py-2 md:px-7 md:py-4 border leading-none rounded-full text-white border-red-600 group break-words hover:bg-red-600 transition`}>
      {label}
      <FaShoppingCart className="hidden md:blocktransform transition-transform group-hover:scale-150" />
    </button>
  );
};

export default Button;
