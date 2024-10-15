import React, { useEffect, useState } from "react"; 
import { CartProvider, useCart } from "react-use-cart"; 
import NavBar from "../NavBar"; 
import { Link, useLocation } from "react-router-dom"; 
import { Col, Container, Row } from "react-bootstrap"; 
import ScrollToTop from "react-scroll-to-top"; 
import Footer from "../Footer"; 
import emailjs from "emailjs-com";  // استيراد emailjs 
 
function Cart() { 
  const { cartTotal, emptyCart, isEmpty, totalUniqueItems, items, updateItemQuantity, removeItem } = useCart(); 
  const [customerName, setCustomerName] = useState("Customer Name"); 
  const [customerEmail, setCustomerEmail] = useState(""); 
  const [customerPhone, setCustomerPhone] = useState(""); 
 
  useEffect(() => { 
    const loggedInUser = JSON.parse(localStorage.getItem('user')); 
    if (loggedInUser && loggedInUser.username && loggedInUser.email && loggedInUser.phone) { 
      setCustomerName(loggedInUser.username); 
      setCustomerEmail(loggedInUser.email); 
      setCustomerPhone(loggedInUser.phone); 
    } 
  }, []); 
 
  // Function to handle checkout and sending via emailJS and API 
  const handleCheckout = () => { 
    const productsList = items.map(item => ({ 
      id: item.id, 
      name: item.name, 
      quantity: item.quantity, 
      price: item.price 
    })); 
 
    const totalAmount = cartTotal; 
 
    // Sending email using emailjs 
    emailjs.send("service_e0ryp9x", "template_8c5kqxb", { 
      to_name: customerName, 
      email: customerEmail, 
      phone: customerPhone, 
      total: totalAmount, 
      products: JSON.stringify(productsList) 
    }, "NWqtgS5tbGnYg1nVQ") 
    .then((response) => { 
      console.log("Email sent successfully:", response.status, response.text); 
      alert('Order confirmation email has been sent!'); 
    }) 
    .catch((error) => { 
      console.error('Email sending error:', error); 
      alert('Failed to send email. Please try again.'); 
    }); 
 
    // Sending order data to the API 
    const orderData = { 
      customer: { 
        name: customerName, 
        email: customerEmail, 
        phone: customerPhone 
      }, 
      products: productsList, 
      total: totalAmount 
    }; 
 
    fetch('http://localhost:3004/data', { 
      method: 'POST', 
      headers: { 
        'Content-Type': 'application/json', 
      }, 
      body: JSON.stringify(orderData), 
    }) 
      .then(response => response.json()) 
      .then(data => { 
        console.log('Order placed successfully:', data); 
        alert('Checkout completed successfully! Thank you for shopping with us.'); 
        emptyCart(); // Empty the cart after successful checkout 
      }) 
      .catch(error => { 
        console.error('Error:', error); 
        alert('Failed to complete the process, please try again.'); 
      }); 
  }; 
 
  if (isEmpty) return ( 
    <Container> 
      <Row> 
        <Col> 
          <div className="empty-cart"> 
            <h2 className="text-danger mb-5 wow fadeInUp">Glow secret</h2> 
            <h3 className="my-3 wow fadeInUp">Your cart is empty</h3> 
            <p>You have no items in your basket. To buy one or more items, click "Add To Cart" under the item.</p> 
            <Link to='/'><button className="btn btn-outline-danger text-danger fw-bold btn-lg mt-3 wow fadeInUp">back to home</button></Link> 
          </div> 
        </Col> 
      </Row> 
    </Container> 
  ); 
 
  return ( 
    <Container className="cart"> 
      <Row> 
        <Col md='8 wow fadeInUp'> 
          <h4>Cart shopping <span className="text-danger">({totalUniqueItems})</span></h4> 
          {items.map((item) => ( 
            <Col md='12 p-4 mb-2 bg-white' key={item.id} className="cart-left"> 
              <div className="d-flex justify-content-between align-items-center box"> 
                <div> 
                  <img src={item.image} alt="" /> 
                  <p className="text-dark mt-2">{item.name}</p> 
                  <p className="text-dark">{item.price} $</p> 
                </div> 
                <div> 
                  <button
                  className="btn btn-info fw-bold" 
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)} 
                  > 
                    <i className="fas fa-minus fa-xl"></i> 
                  </button> 
                  <span className="mx-3 text-danger fw-bold">{item.quantity}</span> 
                  <button className="btn btn-info fw-bold" 
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)} 
                  > 
                    <i className="fas fa-plus fa-xl"></i> 
                  </button> 
                </div> 
              </div> 
              <button className="btn btn-danger remove" onClick={() => removeItem(item.id)}>remove item</button> 
            </Col> 
          ))} 
        </Col> 
 
        <Col md='4 bg-white text-dark p-3 cart-right wow fadeInUp'> 
          <h6>CART SUMMARY</h6> 
          <hr className="text-muted" /> 
          <div className="d-flex justify-content-between"> 
            <h6>Subtotal</h6> 
            <h6 style={{ color: "#af1919" }} >Total Price ( {cartTotal} $)</h6> 
          </div> 
          <hr className="text-muted" /> 
          <button className="btn btn-danger d-block w-100" onClick={handleCheckout}> 
            CHECKOUT ( {cartTotal} $) 
          </button> 
          <button onClick={() => emptyCart()} className="btn btn-info d-block w-100 mt-3">delete all products</button> 
        </Col> 
      </Row> 
    </Container> 
  ); 
} 
 
function CartPage() { 
  const { pathname } = useLocation(); 
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [pathname]); 
 
  return ( 
    <CartProvider> 
      <NavBar /> 
      <div className="pt-5"></div> 
      <div className="pt-4"></div> 
      <Cart /> 
      <Footer /> 
      <ScrollToTop 
        smooth 
        component={ 
          <img 
            src="/images/logo.jpg" 
            alt="Logo" 
            style={{ width: "100%", height: "100%" }} 
          /> 
        } 
        style={{ backgroundColor: "#fff", width: "60px", height: "60px" }} 
        className="animateanimated animateflash animateinfinite infinite animateslower" 
      /> 
    </CartProvider> 
  ); 
} 
 
export default CartPage;