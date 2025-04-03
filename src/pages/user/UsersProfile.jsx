import { doc, updateDoc } from "firebase/firestore";
import { CartState } from "../../components/Context";
import { useState, useRef } from "react";
import { db } from "../../components/Firebase";
import { toast } from "react-toastify";
const UsersProfile = () => {
  const { userDetails } = CartState();
  const [name, setName] = useState(userDetails?.name);
  const [phoneNumber, setPhoneNumber] = useState(userDetails?.phoneNumber);
  const [error, setError] = useState(null);

  // states for editing

  const [edit, setEdit] = useState(false);

  const nameRef = useRef("");

  const updateName = async (e) => {
    e.preventDefault();
    nameRef.current.innerText = "changing...";
    try {
      const docRef = doc(db, "users", userDetails.id);
      await updateDoc(docRef, {
        name,
      });
      toast.success("Name updated successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Error updating Name");
    } finally {
      nameRef.current.innerText = "save";
    }
  };

  const phoneNumberRef = useRef("");
  const updatePhoneNumber = async (e) => {
    e.preventDefault();
    phoneNumberRef.current.innerText = "changing...";
    try {
      const docRef = doc(db, "users", userDetails.id);
      await updateDoc(docRef, {
        phoneNumber,
      });
      toast.success("phoneNumber updated successfully");
    } catch (error) {
      console.log(error.message);
      toast.error("Error updating phoneNumber");
    } finally {
      phoneNumberRef.current.innerText = "save";
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit((prev) => !prev);
  };
  return (
    <>
      <section>
        <div className="text-center">Profile Details</div>

        {!userDetails ? (
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
                <div className="relative">
                  <input
                    type="text"
                    id="profile-name"
                    onChange={edit ? (e) => setName(e.target.value) : undefined}
                    value={name}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter profile name"
                  />
                  {edit && (
                    <button
                      ref={nameRef}
                      onClick={(e) => updateName(e)}
                      className="absolute   right-0 bg-blue-500 text-white rounded-lg px-4 py-3">
                      Save
                    </button>
                  )}
                </div>
              </div>
              {/* ========================== PHONE Number================== */}
              <div>
                <label
                  htmlFor="profile-number"
                  className="block text-sm font-medium text-gray-700">
                  Call Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    id="profile-number"
                    onChange={
                      edit ? (e) => setPhoneNumber(e.target.value) : undefined
                    }
                    value={phoneNumber}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Call Number"
                  />
                  {edit && (
                    <button
                      onClick={(e) => updatePhoneNumber(e)}
                      className="absolute   right-0 bg-blue-500 text-white rounded-lg px-4 py-3"
                      ref={phoneNumberRef}>
                      save
                    </button>
                  )}
                </div>
              </div>
              {/* =======================CATERGORIES====================== */}

              <button
                onClick={(e) => {
                  handleEdit(e);
                }}
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                {edit ? "Switch to view mode" : "Switch to edit mode"}
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
