import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Navbar from "../Components/Navbar";
import EachShop from "../Pages/Shops/EachShop";
import Cart from "../Pages/Cart";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="outlet-container">
        <Outlet />
      </div>
    </>
  );
};
const router = createBrowserRouter([
  {
    path: "/registration",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shops/:id",
        element: <EachShop />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
]);

export default function BaseRoutes() {
  return <RouterProvider router={router} />;
}
