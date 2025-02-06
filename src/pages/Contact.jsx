import React from "react";
import { contactUs } from "../components/details";
import ServiceCard from "../components/ServiceCard";
import { FaPhone, FaWhatsapp } from "react-icons/fa6";

const whatsapp = <FaWhatsapp />;
const phone = <FaPhone />;
const contactItems = [
  {
    icon: whatsapp,
    label: "Text us via whatsapp",
    subText: "+234 773837 883737",
  },
  {
    icon: phone,
    label: "Give us a phone call",
    subText: "+234 773837 883737",
  },
];

const Contact = () => {
  return (
    <>
      <section className="max-h-[70dvh] flex flex-col lg:flex-row gap-10 items-center max-container bg-slate-400">
        <div>
          <h1 className="text-8xl font-bold">Get In Touch</h1>
          <p className="text-3xl font-semibold">
            Want to get in touch? We'd love to hear from you. Here's how you can
            reach us.
          </p>
        </div>
        <div className=" hidden lg:block max-w-[35%] rounded-xl overflow-hidden">
          <img
            src={contactUs}
            alt="contact us pic"
            className="object-contain w-1/2"
          />
        </div>
      </section>
      <div className="container flex flex-wrap justify-center gap-9 items-center z-10 -mt-24">
        {contactItems.map((item, i) => (
          <a href="" className="hover:shadow-2xl ">
            <ServiceCard
              key={i}
              label={item.label}
              subText={item.subText}
              icon={item.icon}
            />
          </a>
        ))}
      </div>
    </>
  );
};

export default Contact;
