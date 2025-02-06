import React from "react";
import FooterNav from "./footerNav";
const Footer = () => {
  return (
    <footer className="flex flex-col items-center py-2 justify-center">
      <FooterNav />
      <p>(©) all right reserved 2024</p>
    </footer>
  );
};

export default Footer;
