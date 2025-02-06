import React from "react";
import { FaTwitter } from "react-icons/fa6";
import { pay } from "./details";

const FooterNav = () => {
  return (
    <div className="container grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-center p-7 xl:p-14">
      <div className="flex-col gap-3 items-start">
        <h3 className="mb-3">logo</h3>

        <ul className="flex-col flex gap-2">
          <li>contact</li>
          <li>
            <strong>Location: </strong>12 slhdl s st
          </li>
          <li>
            <strong>Phone: </strong>
            <a href="tel:+233498y444">+233498y444</a>
          </li>
          <li>
            <strong>Hours: </strong>24/7
          </li>
        </ul>

        <h3 className="my-3">Follow Us</h3>
        <div className="flex items-center gap-2">
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="font-bold text-xl hover:text-red-500" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="font-bold text-xl hover:text-red-500" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="font-bold text-xl hover:text-red-500" />
          </a>
          <a href="http://" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="font-bold text-xl hover:text-red-500" />
          </a>
        </div>
      </div>

      <div className="flex-col gap-3 items-start">
        <h3 className="mb-3">About</h3>

        <ul className="flex-col flex gap-2">
          <li>
            <a href="" className="hover:text-red-500"></a>About us
          </li>
          <li>
            <a href=""></a>Delivery Infomation
          </li>
          <li>
            <a href=""></a>Privacy Policy
          </li>
          <li>
            <a href=""></a>Terms & Condition
          </li>
        </ul>
      </div>

      <div className="flex-col gap-3 items-start">
        <h3 className="mb-3">My Account</h3>

        <ul className="flex-col flex gap-2">
          <li>
            <a href="" className="hover:text-red-500">
              Sign in
            </a>
          </li>
          <li>
            <a href="" className="hover:text-red-500">
              Track My order
            </a>
          </li>
          <li>
            <a href="" className="hover:text-red-500">
              My wishList
            </a>
          </li>
        </ul>
      </div>

      <div className="flex-col gap-3 items-start">
        <h3 className="mb-10">Secured Payment Gateways</h3>

        <div className="flex w-full ">
          <img className="w-full" src={pay} alt="secure payment options" />
        </div>
      </div>
    </div>
  );
};

export default FooterNav;
