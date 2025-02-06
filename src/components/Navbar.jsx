import React from "react";
import { navlinks } from "./details";
import { FaBars, FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className=" max-container flex items-center justify-between  gap-14 capitalize bg-slate-700 text-gray-400  py-7">
      <h3>T-lexa's World</h3>
      <nav className="container hidden md:flex flex-1  items-center justify-between">
        <ul className=" flex gap-8 text-xl ">
          {navlinks.map((navlink) => (
            <li key={navlink.label} className="hover:text-gray-100">
              <Link to={navlink.href}>{navlink.label}</Link>
            </li>
          ))}
          <li className="text-red-500">
            <Link to="/registration">Sign In </Link>
          </li>
          <Link to="/cart">Oge</Link>
        </ul>

        <div className="flex gap-1">
          <a href="/sdd">ofw</a>
          <Link to="/cart">
            <FaCartShopping className="text-3xl" />
          </Link>
          {/* <FaCircleUser className="text-3xl" /> */}
        </div>
      </nav>

      <div className="">
        <FaBars className="text-3xl" />
      </div>
    </header>
  );
};

export default Navbar;
