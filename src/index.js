import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Contact from "./Components/Pages/Contact";
import About from "./Components/Pages/About";
import Products from "./Components/Pages/Products";
import CartPage from "./Components/Pages/CartPage";
import New from "./Components/New";
import SignSuccess from "./Components/Pages/SignSuccess";

import LoginRegister from "./Components/Pages/LoginRegister";
import HomePage from "./Components/HomePage"; // Ensure this path is correct
import Appp from "./Admin/Appp"; // Ensure this path is correct
import CustomerManagement from "./Admin/components/Customers/CustomerManagement";
import CustomerForm from "./Admin/components/Customers/CustomerForm";
import CustomerShow from "./Admin/components/Customers/CustomerShow";
import EditCustomerForm from "./Admin/components/Customers/EditCustomerForm";
import Analytics from "./Admin/components/Analytics/Analytics";
import OrdersManagement from "./Admin/components/Orders/OrdersManagement";

import OrdersShow from "./Admin/components/Orders/OrdersShow";
import AdminProducts from "./Admin/components/AdminProducts/AdminProducts";



// Create the router with defined routes
const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage /> // Ensure HomePage is properly exported
    },
    {
        path: "/contact",
        element: <Contact />
    },
    {
        path: "/about",
        element: <About />
    },
   
    {
        path: "/products/:categPro",
        element: <Products />
    },
  
    {
        path: "/cart",
        element: <CartPage />
    },
    {
        path: "/sign-success",
        element: <SignSuccess />
    },
    {
        path: "/login",
        element: <LoginRegister />
    },
    {
        path: '/New/:id',
        element: <New />
    },
    {
        path: '/admin',
        element: <Appp/> 
    },
    {
        path: '/CustomerManagement',
        element: <CustomerManagement/> 
    },
    {
        path: '/customer-form',
        element: <CustomerForm/> 
    },
    {
        path: '/customer-show/:id',
        element: <CustomerShow/> 
    },
    {
        path: '/CustomerEdit/:id',
        element: <EditCustomerForm/> 
    },


    {
        path: '/OrdersManagement',
        element: <OrdersManagement/> 
    },
   
    {
        path: '/Orders-show/:id',
        element: <OrdersShow/> 
    },
    
    {
        path: '/Analytics',
        element: <Analytics/> 
    },
    {
        path: '/AdminProducts',
        element: <AdminProducts/>
    }
]);

// Create the root and render the RouterProvider
const rootElement = document.getElementById("root");
if (rootElement) {
    createRoot(rootElement).render(
        <RouterProvider router={router} />
    );
} else {
    console.error("Root element not found. Ensure there's a <div id='root'></div> in your HTML.");
}
