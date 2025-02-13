import React from "react";

const ServiceCard = ({ label, subText, icon }) => {
  return (
    <div className=" basis-full  sm:w-[300px] sm:min-w-[300px] md:flex-1 w-full shadow-lg rounded-[20px] px-10 py-16">
      <div className="w-11 h-11 flex justify-center items-center bg-red-500 rounded-full text-white text-lg">
        {icon}
      </div>
      <h3 className=" mt-5 text-3xl leading-normal font-bold">{label}</h3>
      <p className="mt-3 break-words text-lg leading-normal text-slate-500">
        {subText}
      </p>
    </div>
  );
};

export default ServiceCard;
