import AdminSideBar from "../components/AdminSideBar";
import { CartState } from "../components/Context";
import { FaBars } from "react-icons/fa6";

const AdminPanel = () => {
  const { renderSection, isSidebarOpen, setIsSidebarOpen, isMobile } =
    CartState();

  return (
    <div className=" gap-3  flex h-screen overflow-hidden">
      {/* side bar */}
      <AdminSideBar />

      <div className="flex-1 flex flex-col">
        <nav className="p-4 bg-gray-700 text-white md:hidden">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={20} />
          </button>
        </nav>
        <main
          className={`${isSidebarOpen ? "md:ml-64" : "md:ml-16"} 
          
          ${isMobile ? "w-full p-2" : ""}
          shadow-sm overflow-hidden overflow-y-auto transition-all duration-300 `}
          style={{}}>
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
