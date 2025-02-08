import Navbar from "../sections/Navbar";
import Footer from "../sections/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
   return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
