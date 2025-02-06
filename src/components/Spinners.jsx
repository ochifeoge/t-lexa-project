import React from "react";
import RingLoader from "react-spinners/RingLoader";

const Spinners = ({ loading }) => {
  const override = {
    display: "block",
    margin: "100px auto",
  };
  return (
    <RingLoader
      cssOverride={override}
      color="skyblue"
      loading={loading}
      size={150}
    />
  );
};

export default Spinners;
