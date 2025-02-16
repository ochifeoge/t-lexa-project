import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/LoginPage.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Shop from "./pages/Shop.jsx";
import SingleProductPage from "./pages/SingleProductPage.jsx";
import Cart from "./pages/Cart.jsx";
import Context from "./components/Context.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AddProducts from "./pages/AddProducts.jsx";
import { productLoader } from "./components/productLoader.js";
import AdminPanel from "./ADMIN/AdminPanel.jsx";
import AdminRoute from "./ADMIN/AdminRoute.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import Orders from "./pages/user/Orders.jsx";
import UsersProfile from "./pages/user/UsersProfile.jsx";
import EditUserProfile from "./pages/user/EditUserProfile.jsx";
import ErrorPageAdmin from "./ADMIN/ErrorPageAdmin.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <HomePage />,
        },
        {
          path: "/registration",
          element: <Registration />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/products/:id",
          element: <SingleProductPage />,
          loader: productLoader,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/profile",
          element: <UsersProfile />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/edit-profile",
          element: <EditUserProfile />,
        },
        {
          path: "/addproducts",
          element: <AddProducts />,
        },
      ],
    },

    {
      element: <AdminLayout />,
      errorElement: <ErrorPageAdmin />,
      children: [
        {
          path: "/admin",
          element: (
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          ),
        },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Context>
        <RouterProvider router={router} />
        <ToastContainer />
      </Context>
    </QueryClientProvider>
  </StrictMode>
);
