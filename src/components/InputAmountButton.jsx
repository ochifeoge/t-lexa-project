import React, { useState } from "react";
import { Input, IconButton, Typography } from "@material-tailwind/react";
import { CartState } from "./Context";

const InputAmountButton = ({ label, desc, product }) => {
  const { state, dispatch } = CartState();
  // const qty = state.cart
  console.log(product);

  /*  const [productInc, setProductInc] = useState({
    product,
    qty: 
  }) */
  const [value, setValue] = React.useState(1);
  /* (e) =>
    dispatch({
      type: "CHANGE_CART_QUANTITY",
      payload: {
        id: state.product.id,
        qty: Number(e.target.value),
      },
    }) */
  const handleChangeCartQty = () => {};

  return (
    <div className="w-80">
      <Typography
        variant="small"
        color="blue-gray"
        className="mb-1 font-medium">
        {label}
      </Typography>
      <div className="relative w-full">
        <Input
          type="number"
          color="blue"
          value={value}
          onChange={() => {
            handleChangeCartQty;
          }}
          className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100  focus:!border-t-blue-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-0",
          }}
        />
        <div className="absolute right-1 top-1 flex gap-0.5">
          <IconButton
            size="sm"
            className="rounded"
            onClick={() => setValue((cur) => (cur === 0 ? 0 : cur - 1))}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4">
              <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
            </svg>
          </IconButton>
          <IconButton
            size="sm"
            className="rounded"
            onClick={() => {
              setValue((cur) => cur + 1);
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4">
              <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
            </svg>
          </IconButton>
        </div>
      </div>
      <Typography variant="small" color="gray" className="mt-2 font-normal">
        {desc}
      </Typography>
    </div>
  );
};

export default InputAmountButton;
