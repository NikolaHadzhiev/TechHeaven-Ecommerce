import { Navigate, createBrowserRouter } from "react-router-dom";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import AboutPage from "../../features/about/AboutPage";

import HomePage from "../../features/home/HomePage";
import App from "../layout/App";
import ContactPage from "../../features/contact/ContactPage";
import TestPage from "../../features/component-test/TestPage";
import ServerError from "../../errors/ServerError";
import NotFound from "../../errors/NotFound";
import ShoppingCartPage from "../../features/shoppingCart/ShoppingCartPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path: "", element: <HomePage />},
            {path: "catalog", element: <Catalog />},
            {path: "catalog/:id", element: <ProductDetails />},
            {path: "shopping-cart", element: <ShoppingCartPage />},
            {path: "about", element: <AboutPage />},
            {path: "contact", element: <ContactPage />},
            {path: "error-test", element: <TestPage />},
            {path: "server-error", element: <ServerError />},
            {path: 'not-found', element: <NotFound />},
            {path: "*", element: <Navigate replace to="/not-found" />}
        ]
    }
])