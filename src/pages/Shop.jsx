import React, { useState } from "react";
import { productHero } from "../components/details";
import Products from "../components/Products";

const Shop = () => {
  /*   const [showFilters, setShowFilters] = useState(false);
   */
  return (
    /*  <section className="max-container pt-0">
      <div className="min-h-[45vh] overflow-hidden shophero  "></div>

      <Products />
    </section> */

    <section className="flex relative ">
      {/*  <div>
        filters
        <input
          type="checkbox"
          name=""
          onClick={() => setShowFilters((prev) => !prev)}
          id=""
        />
      </div> */}

      <Products />
    </section>
  );
};

export default Shop;
