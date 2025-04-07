import Button from "../components/Button";
import { useState } from "react";

import { useLoaderData } from "react-router-dom";

const SingleProductPage = () => {
  const product = useLoaderData();
  console.log(product);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const [mainImage, setMainImage] = useState(product.images[0]);

  const handleImageClick = (index) => {
    setMainImage(product.images[index]);
  };

  return (
    <section className="max-container flex flex-col md:flex-row items-center justify-center">
      <div className="flex flex-col items-center gap-5 lg:w-1/2">
        <div className="w-[300px]">
          <img
            className="object-cover mx-auto"
            src={mainImage}
            alt={product.name}
          />
        </div>
        {product.images.length > 1 && (
          <div className="w-[300px] flex items-center gap-1">
            {product.images.map((src, index) => (
              <div className="w-[300px]" key={index}>
                <img
                  className={`${
                    src === mainImage ? "border-blue-500" : ""
                  }  border-2 object-cover cursor-pointer`}
                  src={src}
                  alt={product.name + { index }}
                  width={95}
                  height={95}
                  onClick={() => handleImageClick(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="lg:w-[45%]">
        <div className="flex flex-col items-center lg:items-start gap-4 my-5">
          <h3 className="text-lg">{product.categories}</h3>
          <h1 className="font-bold text-4xl">
            <span>&#8358;</span>
            {new Intl.NumberFormat().format(product.price)}
          </h1>
        </div>

        {product.sizes && (
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <h4 className="font-semibold text-gray-700">Available Sizes:</h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(product.sizes)
                .filter(([size, qty]) => qty > 0)
                .map(([size, qty]) => (
                  <span
                    key={size}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white shadow-sm">
                    {size.toUpperCase()} — {parseInt(qty, 10)}
                  </span>
                ))}
            </div>
          </div>
        )}

        <div className="mb-5">
          <h4 className="font-semibold text-gray-700">Total Quantity:</h4>
          <p>
            {product.quantity} of this product available in stock. <br />
          </p>
        </div>

        {product.sizes && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Select Size (for products like electronics please size for items):
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border rounded p-2 w-full">
              <option value="">Choose a size</option>
              {Object.keys(product.sizes).map((size) => (
                <option key={size} value={size}>
                  {size} ({product.sizes[size]} in stock)
                </option>
              ))}
            </select>
          </div>
        )}

        {/* available colors */}
        {product.colors?.length > 0 && (
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Select Color</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border rounded p-2 w-full">
              <option value="">Choose a color</option>
              {product.colors.map((color, i) => (
                <option key={i} value={color}>
                  {color}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* key words */}

        {/* {product.keywords && product.keywords.length > 0 && (
          <div className="mb-5">
            <h4 className="font-semibold text-gray-700">Tags:</h4>
            <div className="flex flex-wrap gap-2 mt-1">
              {product.keywords.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )} */}

        <div className="flex flex-col md:flex-row items-center">
          <Button
            label="Add to cart"
            product={{
              ...product,
              selectedSize,
              selectedColor,
            }}
          />
        </div>
        <div className="my-5">
          <h3 className="text-xl">Product Detals</h3>

          <p className="">{product.description}</p>
        </div>
      </div>
    </section>
  );
};

export default SingleProductPage;
