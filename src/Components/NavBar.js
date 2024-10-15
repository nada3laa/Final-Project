import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const NavBar = () => {
  const { totalItems, emptyCart } = useCart(); // Get the total items in the cart and the emptyCart function
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    emptyCart(); // Clear the cart on logout
    setUser(null);
    navigate('/login');
  };

  return (
    <Navbar bg="light" expand="lg" className="py-3">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img src="image/logo.jpg" alt="Logo" loading="lazy" className="me-2" style={{ width: '40px', height: '40px' }} />
          <span className="h4 mb-0">Glow Secret</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center flex-grow-1">
            <Nav.Link as={Link} to="/" className="fw-bold text-dark">Home</Nav.Link>
            <Nav.Link as={Link} to="/about" className="fw-bold text-dark">About</Nav.Link>
            <Nav.Link as={Link} to="/products/all" className="fw-bold text-dark">Products</Nav.Link>
     
            <Nav.Link as={Link} to="/gallery" className="fw-bold text-dark">Gallery</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="fw-bold text-dark">Contact Us</Nav.Link>
          </Nav>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="me-3 text-dark fw-bold">Hi, {user.username}</span>
                <Button variant="outline-danger" onClick={handleLogout} className="me-2">Logout</Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/login" className="text-dark fw-bold">Login</Nav.Link>
            )}

            {/* Cart icon with item count */}
            <Nav.Link as={Link} to="/cart" className="position-relative">
              <i className="fas fa-cart-plus fa-lg"></i>
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Nav.Link>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
