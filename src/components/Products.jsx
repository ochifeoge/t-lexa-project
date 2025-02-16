import React from "react";
import { EcommerceCard } from "./EcommerceCard";
import { CartState } from "./Context";
import Skelenton from "./Skelenton";
import { Button } from "@material-tailwind/react";

const Products = ({ label = "finest from our shop", isHome = false }) => {
  const { products, isLoading, isError, refetch } = CartState();

  const productsToDisplay = isHome ? products.slice(-4) : products;

  return (
    <div className="my-10">
      <div className="text-center text-slate-700 mb-5">
        <h2 className="text-2xl capitalize md:text-4xl">{label}</h2>
        <p className="md:text-xl">
          Be the first to explore our latest additions
        </p>
      </div>

      <div className=" px-4 w-full lg:w-11/12 mx-auto grid grid-cols-2 lg:grid-cols-4 items-end  gap-6">
        {isLoading ? (
          <div className="flex flex-col md:flex-row flex-wrap">
            <Skelenton />
            <Skelenton />
            <Skelenton />
            <Skelenton />
          </div>
        ) : (
          productsToDisplay?.map((product) => (
            <EcommerceCard key={product.id} product={product} />
          ))
        )}
        {isError ? (
          <div>
            <h2>an error occured</h2>
            <Button onClick={refetch}>refetch products</Button>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Products;
