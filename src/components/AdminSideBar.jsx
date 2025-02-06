import { FaBars } from "react-icons/fa6";
import { VscDashboard } from "react-icons/vsc";
import { GrUserSettings, GrProductHunt } from "react-icons/gr";
import { RxAvatar } from "react-icons/rx";
import { CartState } from "./Context";

const AdminSideBar = () => {
  const { setActiveSection, isSidebarOpen, setIsSidebarOpen } = CartState();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-gray-800 text-white flex flex-col p-2    transform ${
        isSidebarOpen
          ? "translate-x-0 w-64 "
          : "-translate-x-full items-center "
      } transition-transform duration-300 md:translate-x-0`}>
      <div className="flex items-center justify-between">
        {isSidebarOpen ? (
          <>
            <h3>T-lexa&apos;s world</h3>
            <FaBars
              size={20}
              className="hover:cursor-pointer"
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            />
          </>
        ) : (
          <FaBars
            size={25}
            className="hover:cursor-pointer"
            onClick={() => setIsSidebarOpen((prev) => !prev)}
          />
        )}
      </div>

      <ul className="flex flex-col gap-5 mt-16">
        <li
          className="text-xl flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-700"
          onClick={() => {
            setActiveSection("dashboard");
            setIsSidebarOpen(false);
          }}>
          <VscDashboard size={30} />
          {isSidebarOpen && (
            <button
              className={`${
                isSidebarOpen ? "opacity-1" : "opacity-0"
              } capitalize tracking-tight `}>
              dash board
            </button>
          )}
        </li>
        <li
          className="text-xl flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-700"
          onClick={() => {
            setActiveSection("products");
            setIsSidebarOpen(false);
          }}>
          <GrProductHunt size={30} />
          {isSidebarOpen && (
            <button className="capitalize tracking-tight ">
              Manage Products
            </button>
          )}
        </li>
        <li
          className="text-xl flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-700"
          onClick={() => {
            setActiveSection("users");
            setIsSidebarOpen(false);
          }}>
          <GrUserSettings size={30} />
          {isSidebarOpen && (
            <button className="capitalize tracking-tight ">Manage Users</button>
          )}
        </li>
      </ul>

      <div className="mt-auto">
        <RxAvatar
          size={isSidebarOpen ? 55 : 40}
          className="transition-all duration-300"
        />
      </div>
    </aside>
  );
};

export default AdminSideBar;
