import React, { useState } from "react";

const UsersProfile = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("ochife");
  const [callNumber, setCallNumber] = useState("0909662652");
  const [email, setEmail] = useState("ochife@oge.com");
  const [error, setError] = useState(null);
  return (
    <>
      <section>
        <div className="text-center">Profile Details</div>

        {loading ? (
          <h1>loading...</h1>
        ) : (
          <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <form className="space-y-4" autoComplete="off">
              {/* ===================NAME============== */}
              <div>
                <label
                  htmlFor="product-name"
                  className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="profile-name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter profile name"
                />
              </div>
              {/* ========================== PHONE Number================== */}
              <div>
                <label
                  htmlFor="profile-number"
                  className="block text-sm font-medium text-gray-700">
                  Call Number
                </label>
                <input
                  type="tel"
                  id="profile-number"
                  onChange={(e) => setCallNumber(e.target.value)}
                  value={callNumber}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter price"
                />
              </div>
              {/* =======================CATERGORIES====================== */}
              <div>
                <label
                  htmlFor="profile-email"
                  className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="profile-email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter mail"
                />
              </div>
              {/* ============================QUANTITY================================= */}

              {/*====================== Upload image ======================*/}
              {/*  <div>
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
            </div> */}

              <button
                onClick={() => {}}
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Edit profile
              </button>
            </form>
            {error && <span className="text-red-500 text-lg">{error}</span>}
          </div>
        )}
      </section>
    </>
  );
};

export default UsersProfile;
