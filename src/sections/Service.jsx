import React from "react";
import ServiceCard from "../components/ServiceCard";
import { FaTruckFast } from "react-icons/fa6";
import { FaShieldHalved } from "react-icons/fa6";
import { FaHandshake } from "react-icons/fa6";

const truk = <FaTruckFast />;
const shild = <FaShieldHalved />;
const hand = <FaHandshake />;
const serviceItems = [
  {
    icon: truk,
    label: "Free Shipping",
    subText:
      "lsjsld shkdlksd dshldslse ahelen ln slsnslj eisddnklnp sp eroi rrrn rrr",
  },
  {
    icon: shild,
    label: "secure payment",
    subText:
      "lsjsld shkdlksd dshldslse ahelen ln slsnslj eisddnklnp sp eroi rrrn rrr",
  },
  {
    icon: hand,
    label: "love to help you",
    subText:
      "lsjsld shkdlksd dshldslse ahelen ln slsnslj eisddnklnp sp eroi rrrn rrr",
  },
];
const Service = () => {
  return (
    <div className="container flex flex-wrap justify-center gap-9 items-center my-10">
      {serviceItems.map((item, i) => (
        <ServiceCard
          key={i}
          label={item.label}
          subText={item.subText}
          icon={item.icon}
        />
      ))}
    </div>
  );
};

export default Service;
