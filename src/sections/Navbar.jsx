import { useEffect, useState } from "react";
import { navlinks } from "../components/details";
import { FaBars, FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "@material-tailwind/react";
import { CartState } from "../components/Context";
import Dropdown from "../components/Dropdown";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const { state, userDetails } = CartState();

  const cart = state.cart;
  const user = state.user;

  const [menu, setMenu] = useState(false);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const handleResize = () => {
    if (window.innerWidth <= 900) {
      setScreenSize(window.innerWidth);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      handleResize();
    });

    return () => {};
  }, [screenSize]);

  const activeLink = ({ isActive }) =>
    isActive ? "text-gray-100 text-xl  font-bold" : "";

  return (
    <header className="  bg-blue-gray-800 text-gray-200">
      <div className="max-container px-2rem flex items-center justify-between  gap-14 capitalize ">
        <h3>T-lexa's World</h3>

        {screenSize > 900 || window.innerWidth > 900 ? (
          <nav className="container hidden md:flex flex-1  items-center justify-between">
            <ul className=" flex gap-8 text-xl ">
              {navlinks.map((navlink) => (
                <li key={navlink.label}>
                  <NavLink
                    className={({ isActive }) =>
                      `${activeLink({
                        isActive,
                      })} hover:text-gray-100 transition-all duration-150`
                    }
                    to={navlink.href}>
                    {navlink.label}
                  </NavLink>
                </li>
              ))}
              {!user && (
                <li className="bg-red-500 py-1 px-3 rounded-full">
                  <Link to="/login">Sign In </Link>
                </li>
              )}
            </ul>

            <div className="flex gap-4 items-center">
              <Link to="/cart">
                <Badge content={cart.length}>
                  <FaCartShopping className="text-3xl" />
                </Badge>
              </Link>

              <Dropdown />
            </div>
          </nav>
        ) : (
          <div className="">
            <FaBars
              className="text-3xl z-50"
              style={{
                zIndex: "160",
              }}
              onClick={() => setMenu((prev) => !prev)}
            />
          </div>
        )}

        <div
          className={`fixed flex flex-col text-gray-300 px-7 py-10 gap-10 top-0  bg-blue-gray-500 drop-shadow-lg w-60 h-full transform z-20 ${
            menu ? "translate-x-0" : " translate-x-full"
          } transition-all duration-300`}
          style={{
            right: "0",
          }}
          onClick={() => setMenu(false)}>
          <div className="relative flex justify-end">
            <FaTimes
              className="text-3xl z-50"
              style={{
                zIndex: "160",
              }}
              onClick={() => setMenu(false)}
            />
          </div>
          <div className="px-3 ">
            <h2>hi👋, {userDetails?.name}</h2>
            <h2>{userDetails?.phoneNumber}</h2>
          </div>
          <hr className="mt-2 border-blue-gray-100" />
          <ul className=" flex flex-col  justify-center  gap-8 text-xl ">
            {navlinks.map((navlink) => (
              <li key={navlink.label}>
                <NavLink
                  className={({ isActive }) =>
                    `${activeLink({
                      isActive,
                    })} hover:text-gray-100 transition-all duration-150`
                  }
                  to={navlink.href}>
                  {navlink.label}
                </NavLink>
              </li>
            ))}

            <Link to="/cart">
              <Badge content={cart.length}>
                <FaCartShopping className="text-3xl" />
              </Badge>
            </Link>
            {!user ? (
              <li className="bg-red-500 py-1 px-3 rounded-full">
                <Link to="/login">Sign In </Link>
              </li>
            ) : (
              <Dropdown />
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
