import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useRef, useEffect } from "react";
import { db, storage } from "../components/Firebase";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import Spinners from "../components/Spinners";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(100);
  const [productCatagory, setProductCatagory] = useState("");
  const [productQuantity, setProductQuantity] = useState();
  const [productDescription, setProductDescription] = useState("");
  const [productImg, setProductImg] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);

  const [showSizes, setShowSizes] = useState(false);
  const [sizes, setSizes] = useState({
    S: 0,
    M: 0,
    L: 0,
    XL: 0,
  });

  // preventing memories leak by revoking the object urls
  useEffect(() => {
    return () => {
      imagePreview.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreview]);

  //  reseting the img field in the viewport
  /* const fileImgRef = useRef(); */

  // handle the image upload
  const ProductImgHandler = (e) => {
    let selectedFiles = [...e.target.files];

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));

    setProductImg((prev) => [...prev, ...selectedFiles]);
    setImagePreview((prev) => [...prev, ...previewUrls]);
  };

  // handle sizes

  const handleSizeChange = (size, value) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: value,
    }));
  };

  // handle color selection and deletion
  const handleColorSelection = (e) => {
    const color = e.target.value;
    if (!selectedColors.includes(color)) {
      setSelectedColors((prev) => [...prev, color]);
    }
  };

  const handleRemoveColor = (color) => {
    const newColors = selectedColors.filter((c) => c !== color);
    setSelectedColors(newColors);
  };

  // ensure price is not <= 0;
  const handlePrice = (e) => {
    let setPrice = e.target.value;
    if (setPrice <= 0) {
      setProductPrice("");
      setError("price cannot be less than or equal to zero");
    } else {
      setProductPrice(setPrice);
      setError("");
    }
  };

  // function to push to image to storage

  const uploadToFirebaseStorage = async (file) => {
    const imgRef = ref(storage, `productImages/${file.name + v4()}`);

    await uploadBytes(imgRef, file);

    const fileUrl = await getDownloadURL(imgRef);

    return fileUrl;
  };

  // submitting the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // upload the image
      const uploadImgPromise = productImg.map((file) =>
        uploadToFirebaseStorage(file)
      );

      const uploadedImgUrls = await Promise.all(uploadImgPromise);

      // push to the database

      const productCollectionRef = collection(db, "products2");

      const newProduct = {
        name: productName,
        description: productDescription,
        categories: productCatagory,
        quantity: productQuantity,
        price: productPrice,
        images: uploadedImgUrls,
        colors: selectedColors,
        sizes: sizes,
        inStock: true,
      };

      await addDoc(productCollectionRef, newProduct);
      toast.success("Product added to database successfully!👌");

      setProductName("");
      setProductPrice("");
      setProductCatagory("");
      setProductQuantity("");
      setProductDescription("");
      setProductImg([]);
      setImagePreview([]);
      setSizes({
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
      });
      setSelectedColors([]); /* reset image on the viewport */
      /* fileImgRef.current.value = "";  */
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
          <form
            className="space-y-4"
            autoComplete="off"
            onSubmit={handleSubmit}>
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
            {/* select sizes */}
            <button
              onClick={(e) => {
                e.preventDefault();
                setShowSizes((prev) => !prev);
              }}>
              Add sizes
            </button>
            {showSizes && (
              <>
                <div>
                  <label>Small (S)</label>
                  <input
                    type="number"
                    placeholder="Enter size"
                    value={sizes.S}
                    onChange={(e) => handleSizeChange("S", e.target.value)}
                  />
                </div>
                <div>
                  <label>Medium (M)</label>
                  <input
                    type="number"
                    value={sizes.M}
                    onChange={(e) => handleSizeChange("M", e.target.value)}
                  />
                </div>
                <div>
                  <label>Large (L)</label>
                  <input
                    type="number"
                    value={sizes.L}
                    onChange={(e) => handleSizeChange("L", e.target.value)}
                  />
                </div>
                <div>
                  <label>Extra Large (XL)</label>
                  <input
                    type="number"
                    value={sizes.XL}
                    onChange={(e) => handleSizeChange("XL", e.target.value)}
                  />
                </div>
              </>
            )}

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
                placeholder={
                  "total quantity = " +
                  +(sizes.S + sizes.M + sizes.L + sizes.XL)
                }
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
                accept="image/*"
                multiple
                onChange={ProductImgHandler}
                required
                /*  ref={fileImgRef} */
                id="selectImg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              {imagePreview.length > 0 && (
                <>
                  <div className="flex gap-4 flex-wrap mt-4">
                    {imagePreview.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-24 h-24 object-cover rounded border"
                      />
                    ))}
                  </div>

                  <button
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => {
                      imagePreview.forEach((url) => URL.revokeObjectURL(url));
                      setProductImg([]);
                      setImagePreview([]);
                    }}>
                    Clear
                  </button>
                </>
              )}
            </div>

            {/* colors */}
            <div>
              <label
                htmlFor="product-colors"
                className="block text-sm font-medium text-gray-700">
                Available Colors
              </label>
              <select
                id="product-colors"
                value=""
                onChange={(e) => handleColorSelection(e)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="" disabled>
                  Select colors available
                </option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Green">Green</option>
                <option value="Black">Black</option>
                <option value="Brown">Brown</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Grey">Grey</option>
                <option value="White">White</option>
                <option value="Yellow">Yellow</option>
              </select>
              {/* Display selected colors */}
              {selectedColors.length > 0 && (
                <div className="mt-2">
                  <strong>Selected Colors:</strong>
                  <ul>
                    {selectedColors.map((color, index) => (
                      <>
                        <div className="flex items-center gap">
                          <li key={index}>{color}</li>
                          <span
                            style={{
                              backgroundColor: color,
                            }}
                            className="w-5 h-5 rounded-full"></span>

                          <button
                            type="button"
                            onClick={() => handleRemoveColor(color)}
                            className="ml-2 text-red-500 hover:text-red-700">
                            Remove
                          </button>
                        </div>
                      </>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
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
