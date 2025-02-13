import { Input } from "@material-tailwind/react";
import { CartState } from "./Context";
import { Link } from "react-router-dom";
import { useState } from "react";

function PhoneInput() {
  const { userDetails } = CartState();
  console.log(userDetails.phoneNumber);
  const [editPhoneError, setEditPhoneError] = useState(false);

  const handleBlur = (e) => {
    if (!e.relatedTarget || !e.relatedTarget.closest("a")) {
      setEditPhoneError(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-96">
      <Input
        maxLength={16}
        value={userDetails.phoneNumber}
        onChange={() => setEditPhoneError(true)}
        onBlur={handleBlur}
        label="Call Number"
        placeholder="e.g., +234 903 2233 223 "
        pattern="^\+234\s\d{3}\s\d{3}\s\d{4}$"
        className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-4 w-4 text-blue-gray-600">
            <path
              fillRule="evenodd"
              d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
              clipRule="evenodd"
            />
          </svg>
        }
      />
      {editPhoneError && (
        <div>
          <p className="text-red-300 mt-1 mb-2">
            You can only change this number from you profile
          </p>
          <Link
            className="bg-green-500 text-white mx-auto py-2 px-4 rounded "
            to="/edit-profile">
            Click to change
          </Link>
        </div>
      )}
    </div>
  );
}

export default PhoneInput;
