import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Header from "./Header";
import Popular from "./Popular";
import { CartProvider } from "react-use-cart";
import Carousel from "./Carousel";
import New from "./New";
import Sale from "./Sale";
import Testimonials from "./Testimonials";
import Suscribe from "./Suscribe";
import Footer from "./Footer";
import ScrollToTop from "react-scroll-to-top";
import { useLocation } from "react-router";

const HomePage = () => {
  const { pathname } = useLocation();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for logged-in status

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Check if user is logged in from local storage
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // Function to handle adding products to cart
  const handleAddToCart = (product) => {
    if (!isLoggedIn) {
      alert("You must be logged in to add products to the cart. Please log in or register.");
      return; // Prevent adding to cart if not logged in
    }

    // Add the product to the cart using react-use-cart's addItem function
    // Assuming you're using a context or prop to access addItem
    // addItem(product); // Uncomment this line and ensure `addItem` is available
  };

  return (
    <CartProvider>
      <NavBar />
      <Header />
      <Popular products={products} onAddToCart={handleAddToCart} /> {/* Pass handleAddToCart to Popular */}
      <Carousel />
      <New products={products} onAddToCart={handleAddToCart} /> {/* Pass handleAddToCart to New */}
      <Sale products={products} onAddToCart={handleAddToCart} /> {/* Pass handleAddToCart to Sale */}
      <Testimonials products={products} categories={categories} />
      <Suscribe />
      <Footer />
      <ScrollToTop
        smooth
        component={
          <img
            src="/image/logo.jpg"
            alt="Logo"
            style={{ width: "100%", height: "100%" }}
          />
        }
        style={{ backgroundColor: "#fff", width: "60px", height: "60px" }}
        className="animate__animated animate__flash animate__infinite infinite animate__slower"
      />
    </CartProvider>
  );
};

export default HomePage;
