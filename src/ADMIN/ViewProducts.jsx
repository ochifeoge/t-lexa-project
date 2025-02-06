import React, { useState } from "react";
import { CartState } from "../components/Context";
import Spinners from "../components/Spinners";
import { db } from "../components/Firebase";
import { update } from "./firebaseDataProvider";
import { toast } from "react-toastify";

const ViewProducts = () => {
  const { viewProduct } = CartState();
  const [productName, setProductName] = useState(viewProduct.name);
  const [price, setPrice] = useState(viewProduct.price);
  const [Category, setCategory] = useState(viewProduct.categories);
  const [quantity, setQuantity] = useState(viewProduct.quantity);
  const [description, setDescription] = useState(viewProduct.description);

  const handleEditProduct = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: productName,
      price,
      categories: Category,
      quantity,
      description,
    };

    try {
      update(db, "products", viewProduct.id, updatedProduct);
      toast.success("product updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  if (!viewProduct) {
    return <Spinners />;
  }

  return (
    <section className="container ">
      <h2 className="text-center text-4xl">View Products</h2>
      <div className="w-full max-w-screen-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <form className="space-y-4" autoComplete="off">
          {/* ===================PRODUCT NAME============== */}

          <div>
            <label
              htmlFor="product-name"
              className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              id="product-name"
              onChange={(e) => setProductName(e.target.value)}
              value={productName || ""}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name"
            />
          </div>
          {/* ========================== PRICE================== */}
          <div>
            <label
              htmlFor="product-price"
              className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              id="product-price"
              min={100}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter price"
            />
          </div>
          {/* =======================CATERGORIES====================== */}
          <div>
            <label
              htmlFor="product-Catagory"
              className="block text-sm font-medium text-gray-700">
              Catagory
            </label>
            <input
              type="text"
              id="product-Catagory"
              onChange={(e) => setCategory(e.target.value)}
              value={Category}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Catagory"
            />
          </div>
          {/* ============================QUANTITY================================= */}
          <div>
            <label
              htmlFor="product-quantity"
              className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              id="product-quantity"
              min={1}
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter quantity"
            />
          </div>
          {/* =======================DESCRIPTION========================== */}
          <div>
            <label
              htmlFor="product-description"
              className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="product-description"
              onChange={(e) => setDescription(e.target.value)}
              required
              value={description}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product description"></textarea>
          </div>

          <button
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={(e) => handleEditProduct(e)}>
            Save Changes
          </button>
        </form>
        {/*   {error && <span className="text-red-500 text-lg">{error}</span>} */}
      </div>
    </section>
  );
};

export default ViewProducts;
