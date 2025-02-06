import React from "react";
import { EcommerceCard } from "./EcommerceCard";
import { CartState } from "./Context";
import Skelenton from "./Skelenton";

const Products = ({ label = "finest from our shop", isHome = false }) => {
  const { products, isLoading } = CartState();

  const productsToDisplay = isHome ? products.slice(-4) : products;

  return (
    <div className="my-10">
      <div className="text-center text-slate-700">
        <h2 className="text-3xl capitalize md:text-4xl">{label}</h2>
        <p className="text-xl">Be the first to explore our latest additions</p>
      </div>

      <div className="w-11/12 mx-auto grid grid-cols-2 lg:grid-cols-4 items-end  gap-6">
        {isLoading ? (
          <Skelenton />
        ) : (
          productsToDisplay.map((product) => (
            <EcommerceCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
