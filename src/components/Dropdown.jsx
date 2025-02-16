import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Typography,
} from "@material-tailwind/react";
import LogOut from "./LogOut";
import { CartState } from "./Context";
import { menuItems } from "./details";
import { Link } from "react-router-dom";

import { CiSettings } from "react-icons/ci";

function Dropdown() {
  const { userDetails } = CartState();
  return (
    <>
      <Menu>
        <MenuHandler>
          <Avatar
            variant="circular"
            alt="tania andrew"
            className="cursor-pointer w-10 h-10"
            src="https://tse3.mm.bing.net/th?id=OIP.Od4m4w455EEToOQDKESqvgHaFJ&pid=Api&P=0&h=220"
          />
        </MenuHandler>

        <MenuList>
          {menuItems.map((item) => (
            <MenuItem className="flex items-center gap-2" key={item.title}>
              <Link to={item.link} className="flex gap-2 items-center">
                <item.icon />
                <Typography variant="small" className="font-medium">
                  {item.title}
                </Typography>
              </Link>
            </MenuItem>
          ))}
          {userDetails?.role === "admin" && (
            <menuItems className="px-[10px] w-full pt-[9px] pb-2  rounded-md text-start leading-tight cursor-pointer select-none transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 focus:bg-blue-gray-50 focus:bg-opacity-80 active:bg-blue-gray-50 active:bg-opacity-80 hover:text-blue-gray-900 focus:text-blue-gray-900 active:text-blue-gray-900 outline-none  flex items-center gap-2">
              <CiSettings size={18} />
              <Link to="/admin">Admin Panel</Link>
            </menuItems>
          )}
          <hr className="my-2 border-blue-gray-100" />
          <MenuItem className="flex  items-center mt-5 gap-2 ">
            <svg
              width="16"
              height="14"
              viewBox="0 0 16 14"
              fill="red"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 0C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V13C0 13.2652 0.105357 13.5196 0.292893 13.7071C0.48043 13.8946 0.734784 14 1 14C1.26522 14 1.51957 13.8946 1.70711 13.7071C1.89464 13.5196 2 13.2652 2 13V1C2 0.734784 1.89464 0.48043 1.70711 0.292893C1.51957 0.105357 1.26522 0 1 0ZM11.293 9.293C11.1108 9.4816 11.01 9.7342 11.0123 9.9964C11.0146 10.2586 11.1198 10.5094 11.3052 10.6948C11.4906 10.8802 11.7414 10.9854 12.0036 10.9877C12.2658 10.99 12.5184 10.8892 12.707 10.707L15.707 7.707C15.8945 7.51947 15.9998 7.26516 15.9998 7C15.9998 6.73484 15.8945 6.48053 15.707 6.293L12.707 3.293C12.6148 3.19749 12.5044 3.12131 12.3824 3.0689C12.2604 3.01649 12.1292 2.9889 11.9964 2.98775C11.8636 2.9866 11.7319 3.0119 11.609 3.06218C11.4861 3.11246 11.3745 3.18671 11.2806 3.2806C11.1867 3.3745 11.1125 3.48615 11.0622 3.60905C11.0119 3.73194 10.9866 3.86362 10.9877 3.9964C10.9889 4.12918 11.0165 4.2604 11.0689 4.3824C11.1213 4.50441 11.1975 4.61475 11.293 4.707L12.586 6H5C4.73478 6 4.48043 6.10536 4.29289 6.29289C4.10536 6.48043 4 6.73478 4 7C4 7.26522 4.10536 7.51957 4.29289 7.70711C4.48043 7.89464 4.73478 8 5 8H12.586L11.293 9.293Z"
                fill="red"
              />
            </svg>
            <Typography variant="large" className="font-medium text-red-600">
              <LogOut />
            </Typography>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}

export default Dropdown;
