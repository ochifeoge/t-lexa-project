import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { storage, db } from "../components/Firebase";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productCatagory, setProductCatagory] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productImg, setProductImg] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const imgTypes = ["image/png", "image/jpeg"];

  const ProductImgHandler = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile && imgTypes.includes(selectedFile.type)) {
      setProductImg(selectedFile);
      setError("");
    } else {
      setProductImg(null);
      setError("Please select a valid image type (png or jpeg)");
    }
  };
  const UploadProduct = async (e) => {
    e.preventDefault();

    const imgRef = ref(storage, `product-images/${productImg.name + v4()}`);

    try {
      // Upload the image
      await uploadBytes(imgRef, productImg);

      //get the download url of the image

      const imageurl = await getDownloadURL(imgRef);

      //Push the products to firebase database

      const productCollectionRef = collection(db, "products");

      const newProduct = {
        name: productName,
        image: imageurl,
        price: productPrice,
        catagories: productCatagory,
        quantity: productQuantity,
        description: productDescription,
        inStock: true,
      };
      await addDoc(productCollectionRef, newProduct);
      toast.success("Product added to database successfully!👌");

      setProductName("");
      setProductPrice("");
      setProductCatagory("");
      setProductQuantity("");
      setProductDescription("");
      setProductImg(undefined);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  return (
    <section>
      <div className="text-center">AddProducts</div>

      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
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
                value={productName}
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
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
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
                onChange={(e) => setProductCatagory(e.target.value)}
                value={productCatagory}
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
                onChange={(e) => setProductQuantity(e.target.value)}
                value={productQuantity}
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
                onChange={(e) => setProductDescription(e.target.value)}
                required
                value={productDescription}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product description"></textarea>
            </div>

            {/*====================== Upload image ======================*/}
            <div>
              <label
                htmlFor="selectImg"
                className="block text-sm font-medium text-gray-700">
                Choose an Image
              </label>
              <input
                type="file"
                onChange={ProductImgHandler}
                required
                value={productImg}
                id="selectImg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={UploadProduct}
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Submit
            </button>
          </form>
          {error && <span className="text-red-500 text-lg">{error}</span>}
        </div>
      )}
    </section>
  );
};

export default AddProducts;
