import React from "react";
import { auth } from "./Firebase";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";

const LogOut = () => {
  const logOut = async () => {
    try {
      const confirm = window.confirm("You are About to LogOut!!!");
      if (!confirm) {
        return;
      } else {
        await signOut(auth);
        toast.success("Logged out successfuly");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return <button onClick={logOut}>Sign out</button>;
};

export default LogOut;
