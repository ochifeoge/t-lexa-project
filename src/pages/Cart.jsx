import React, { useState } from "react";
import { CartState } from "../components/Context";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import InputAmountButton from "../components/InputAmountButton";
import { toast } from "react-toastify";
import PhoneInput from "../components/PhoneInput";
import FlutterWavePayment from "../components/FlutterWavePayment";

const Cart = () => {
  const { state, dispatch } = CartState();

  const cart = state.cart;
  console.log(cart);

  const user = state.user;

  const [showNumber, setShowNumber] = useState(false);

  return (
    <section className="max-container mt-10 flex flex-col xl:flex-row md:items-center justify-between  gap-2">
      <div className="basis-3/4">
        <h2 className="text-2xl">Shopping Cart</h2>

        {cart.length ? (
          cart?.map((cartItem) => (
            <div
              className="flex gap-3 flex-col md:flex-row md:items-center my-5"
              key={cartItem.id}>
              <div className="w-28 ">
                <img
                  src={cartItem.images[0]}
                  alt={cartItem.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <div>
                <h3 className="text-xl">{cartItem.name}</h3>
                <span>
                  price: <span>&#8358;</span>{" "}
                  {new Intl.NumberFormat().format(
                    cartItem?.price * cartItem?.qty
                  )}
                </span>
                <span className="mx-3">size: {cartItem.selectedSize}</span>
                <span>color: {cartItem.selectedColor}</span>
                <div className="flex flex-col md:flex-row md:items-center">
                  <p>Quantity: {cartItem.qty}</p>
                  <InputAmountButton product={cartItem} />
                  <Button
                    color="red"
                    onClick={() => {
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: cartItem,
                      });
                      toast.success(`${cartItem.name}, removed successfuly`);
                    }}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl ">
            <p>
              There's nothing in the cart yet, please purchase goods from the
            </p>
            <Link to="/shop" className="text-red-300">
              shop
            </Link>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center">
        <h3 className="text-xl flex items-center gap-1">
          Subtotal ({cart.length}) :<span>&#8358;</span>
          {new Intl.NumberFormat().format(
            cart
              .reduce(
                (totalAmount, cartItem) =>
                  totalAmount + cartItem.price * cartItem.qty,
                0
              )
              .toFixed(2)
          )}
        </h3>
        {user ? (
          !showNumber && (
            <Button onClick={() => setShowNumber((prev) => !prev)}>
              Proceed To Checkout
            </Button>
          )
        ) : (
          <>
            <button className="cursor-not-allowed bg-gray-700 select-none rounded-lg py-3 px-6 text-center align-middle font-sans text-xs font-bold  text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Please Login / SignUp To Checkout
            </button>
          </>
        )}

        {showNumber && (
          <div className="mt-10 flex flex-col gap-5">
            <PhoneInput />
            <FlutterWavePayment />
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
