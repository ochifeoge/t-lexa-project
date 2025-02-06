import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useRef } from "react";
import { db, storage } from "../components/Firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import Spinners from "../components/Spinners";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(100);
  const [productCatagory, setProductCatagory] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productImg, setProductImg] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  //  reseting the img field in the viewport
  const fileImgRef = useRef();

  // ensure file type is an image and also type is a png or jpg image fmt
  const imgTypes = ["image/png", "image/jpeg"];
  const ProductImgHandler = (e) => {
    let selectedFile = e.target.files[0];

    if (selectedFile && imgTypes.includes(selectedFile.type)) {
      setError("");
      setProductImg(selectedFile);
    } else {
      setProductImg(undefined);
      setError("please upload a valid image ending with '.png' or '.jpg'");
    }
  };

  // ensure price is not <= 0;
  const handlePrice = (e) => {
    let setPrice = e.target.value;
    if (setPrice <= 0) {
      setProductPrice(null);
      setError("price cannot be less than or equal to zero");
    } else {
      setProductPrice(setPrice);
      setError("");
    }
  };

  // submitting the form

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const imgRef = ref(storage, `product-images/${productImg.name + v4()}`);

    try {
      // upload the image
      await uploadBytes(imgRef, productImg);

      // get the download url

      const imageUrl = await getDownloadURL(imgRef);

      // push to the database

      const productCollectionRef = collection(db, "products");

      const newProduct = {
        name: productName,
        description: productDescription,
        categories: productCatagory,
        quantity: productQuantity,
        price: productPrice,
        image: imageUrl,
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
      fileImgRef.current.value = ""; /* reset image on the viewport */
      setProductCatagory("");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full overflow-y-scroll ">
      <h2 className="text-center text-4xl">
        {loading ? "Posting Products" : "Add Products"}
      </h2>

      {loading ? (
        <Spinners loading={loading} />
      ) : (
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
                onChange={(e) => handlePrice(e)}
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
                ref={fileImgRef}
                id="selectImg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={(e) => handleSubmit(e)}>
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
