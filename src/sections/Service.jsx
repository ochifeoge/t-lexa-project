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
      "Enjoy free nationwide delivery on all orders — no minimum spend required.",
  },
  {
    icon: shild,
    label: "secure payment",
    subText:
      "Your transactions are protected with end-to-end encryption and trusted gateways.",
  },
  {
    icon: hand,
    label: "love to help you",
    subText:
      "Our support team is always available to assist you with any questions or concerns.",
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
