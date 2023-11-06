import { Navigate, createBrowserRouter } from "react-router-dom";
import Catalog from "../../features/catalog/CatalogPage";
import ProductDetails from "../../features/product/ProductDetails";
import AboutPage from "../../features/about/AboutPage";
import App from "../layout/App";
import ContactPage from "../../features/contact/ContactPage";
import TestPage from "../../features/component-test/TestPage";
import ServerError from "../../errors/ServerError";
import NotFound from "../../errors/NotFound";
import ShoppingCartPage from "../../features/shoppingCart/ShoppingCartPage";
import RegisterPage from "../../features/account/RegisterPage";
import LoginPage from "../../features/account/LoginPage";
import Auth from "../../features/auth/Auth";
import OrdersPage from "../../features/order/OrdersPage";
import CheckoutWrapper from "../../features/checkout/CheckoutWrapper";
import InventoryPage from "../../features/admin/InventoryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Auth />,
        children: [
          { path: "checkout", element: <CheckoutWrapper /> },
          { path: "orders", element: <OrdersPage /> },
          { path: "inventory", element: <InventoryPage /> },
      ]},
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "catalog", element: <Catalog /> },
      { path: "catalog/:id", element: <ProductDetails /> },
      { path: "shopping-cart", element: <ShoppingCartPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "error-test", element: <TestPage /> },
      { path: "server-error", element: <ServerError /> },
      { path: "not-found", element: <NotFound /> },
      { path: "*", element: <Navigate replace to="/not-found" /> },
    ],
  },
]);
