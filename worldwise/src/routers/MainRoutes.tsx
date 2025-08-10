import { Route, Routes } from "react-router-dom";
import { lazy } from "react";

// import Product from "../pages/Product";
import Pricing from "../pages/Pricing";
// import PageNotFound from "../pages/PageNotFound";
// import Homepage from "../pages/Homepage";
// import Login from "../pages/Login";

// lazy loading

const Homepage = lazy(() => import("../pages/Homepage"));
const Product = lazy(() => import("../pages/Product"));
const Login = lazy(() => import("../pages/Login"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

function MainRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
