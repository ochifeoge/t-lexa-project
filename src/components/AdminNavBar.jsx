import { FaBars } from "react-icons/fa6";

const AdminNavBar = () => {
  return (
    <nav className="flex justify-between fixed w-full items-center p-3 ">
      <FaBars size={20} onClick={() => {}} className="text-red-400 z-10" />
      <FaBars size={20} />
      <FaBars size={20} />
    </nav>
  );
};

export default AdminNavBar;
