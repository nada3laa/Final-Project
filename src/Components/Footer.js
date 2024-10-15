/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { FaFacebook, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub, FaHome, FaEnvelope, FaPhone, FaPrint } from 'react-icons/fa';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-light pt-4" style={{ backgroundColor: '#694E4E' }}>
      
      {/* Main Content Section */}
      <section className="py-4">
        <Container>
          <Row className="text-center text-md-start">
            {/* About Us Section */}
            <Col md={3} lg={4} xl={3} className="mb-4">
              <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#FD94B4' }}>Glow Secret</h6>
              <p style={{ color: '#d3d3d3' }}>
                Discover premium Glow Secret solutions designed to nourish, hydrate, and protect your skin. Our goal is to provide the best products for radiant and healthy skin.
              </p>
            </Col>

            {/* Products Section */}
            <Col md={2} lg={2} xl={2} className="mb-4">
              <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#FD94B4' }}>Products</h6>
              <p><a href="#!" className="text-light">Cleansers</a></p>
              <p><a href="#!" className="text-light">Moisturizers</a></p>
              <p><a href="#!" className="text-light">Serums</a></p>
              <p><a href="#!" className="text-light">Sunscreens</a></p>
            </Col>

            {/* Contact Information */}
            <Col md={4} lg={3} xl={3} className="mb-4">
              <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#FD94B4' }}>Contact</h6>
              <p><FaHome className="me-2 icon-style" /> Cairo, Egypt</p>
              <p><FaEnvelope className="me-2 icon-style" /> contact@skincare.com</p>
              <p><FaPhone className="me-2 icon-style" /> +20 123 456 789</p>
              <p><FaPrint className="me-2 icon-style" /> +20 987 654 321</p>
            </Col>

            {/* Team Section */}
            <Col md={4} lg={3} xl={3} className="mb-4">
              <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#FD94B4' }}>Our Team</h6>
              <p>Nada Alaa</p>
              <p>Matilda Ashraf</p>
              <p>Manar Ahmed</p>
            </Col>

        
          </Row>
        </Container>
      </section>

      {/* Copyright Section */}
      <div className="text-center py-3" style={{ backgroundColor: ' #332424', color: '#FD94B4' }}>
        <span>&copy; {new Date().getFullYear()} Glow Secret. All Rights Reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
