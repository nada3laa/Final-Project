import React, { useEffect, useState } from 'react'; 
import NavBar from '../NavBar'; 
import Footer from '../Footer'; 
import { Container, Row, Col, Button, Form } from 'react-bootstrap'; 
import { CartProvider } from 'react-use-cart'; 
import { useLocation } from 'react-router'; 
import { FaEnvelope, FaPhone, FaMapMarkedAlt } from 'react-icons/fa'; 
import emailjs from 'emailjs-com'; 
 
const Contact = () => { 
  const { pathname } = useLocation(); 
   
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    email: '', 
    subject: '', 
    message: '', 
  }); 
 
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [pathname]); 
 
  const sendEmail = (e) => { 
    e.preventDefault(); 
 
    emailjs 
      .sendForm( 
        'service_e0ryp9x', 
        'template_v2vhpx5', 
        e.target, 
        'NWqtgS5tbGnYg1nVQ' 
      ) 
      .then( 
        (result) => { 
          alert('Message sent successfully!'); 
        }, 
        (error) => { 
          alert('Failed to send message. Please try again.'); 
        } 
      ); 
 
    setFormData({ 
      name: '', 
      phone: '', 
      email: '', 
      subject: '', 
      message: '', 
    }); 
  }; 
 
  const handleChange = (e) => { 
    setFormData({ ...formData, [e.target.name]: e.target.value }); 
  }; 
 
  return ( 
    <CartProvider> 
      <NavBar /> 
      <div className="pt-5"></div> 
 
      {/* Header Area */} 
      <Container className="text-center py-5"> 
        <Row> 
          <Col> 
            <h2>Contact Us</h2> 
            <div className="header-divider mb-4"></div> 
          </Col> 
        </Row> 
      </Container> 
 
      {/* Map Section */} 
      <section className="map mb-5"> 
        <Container> 
          <Row> 
            <Col lg={12}> 
              <div className="map-container"> 
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.78997548554!2d144.9805125252687!3d-37.84132841005892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad6681f3e9cb7e1%3A0x9d52778f56cab5a8!2sFawkner%20Park!5e1!3m2!1sen!2sth!4v1648201596364!5m2!1sen!2sth" 
                  width="100%" 
                  height="450" 
                  frameBorder="0" 
                  style={{ border: 0, borderRadius: '5px' }} 
                  allowFullScreen 
                  title="Google Map" 
                ></iframe> 
              </div> 
            </Col> 
          </Row> 
          <Row className="text-center mt-5"> 
            <Col lg={4}> 
              <div className="info-item mb-4"> 
                <FaEnvelope size={36} color="#007bff" className="mb-2 icon-style" /> 
                <h5>Email Address</h5> 
                <p> 
                  <a href="mailto:info@company.com">info@company.com</a> 
                </p> 
              </div> 
            </Col> 
            <Col lg={4}> 
              <div className="info-item mb-4"> 
                <FaPhone size={36} color="#28a745" className="mb-2 icon-style" /> 
                <h5>Phone Number</h5> 
                <p> 
                  <a href="tel:010-020-0340">010-020-0340</a> 
                </p> 
              </div> 
            </Col> 
            <Col lg={4}> 
              <div className="info-item mb-4"> 
                <FaMapMarkedAlt size={36} color="#dc3545" className="mb-2 icon-style" /> 
                <h5>Address</h5> 
                <p>Victoria, Australia</p> 
              </div> 
            </Col> 
          </Row> 
        </Container> 
      </section> 
 
      {/* Contact Form Section */} 
      <section className="contact-form py-5"> 
        <Container> 
          <Row> 
            <Col lg={6} className="mx-auto text-center mb-4"> 
              <h6>Contact Us</h6> 
              <h4>Feel free to message us</h4> 
            </Col> 
          </Row> 
          <Row> 
            <Col lg={10} className="mx-auto"> 
              <Form id="contact" onSubmit={sendEmail} className="p-4 shadow rounded bg-light"> 
                <Row> 
                  <Col md={6}>
                  <Form.Group controlId="name" className="mb-3"> 
                      <Form.Label>Your Name</Form.Label> 
                      <Form.Control 
                        type="text" 
                        name="name" 
                        placeholder="Enter your name" 
                        required 
                        className="form-input" 
                        value={formData.name} 
                        onChange={handleChange} 
                      /> 
                    </Form.Group> 
                  </Col> 
                  <Col md={6}> 
                    <Form.Group controlId="phone" className="mb-3"> 
                      <Form.Label>Your Phone</Form.Label> 
                      <Form.Control 
                        type="text" 
                        name="phone" 
                        placeholder="Enter your phone" 
                        required 
                        className="form-input" 
                        value={formData.phone} 
                        onChange={handleChange} 
                      /> 
                    </Form.Group> 
                  </Col> 
                  <Col md={6}> 
                    <Form.Group controlId="email" className="mb-3"> 
                      <Form.Label>Your Email</Form.Label> 
                      <Form.Control 
                        type="email" 
                        name="email" 
                        placeholder="Enter your email" 
                        required 
                        className="form-input" 
                        value={formData.email} 
                        onChange={handleChange} 
                      /> 
                    </Form.Group> 
                  </Col> 
                  <Col md={6}> 
                    <Form.Group controlId="subject" className="mb-3"> 
                      <Form.Label>Subject</Form.Label> 
                      <Form.Control 
                        type="text" 
                        name="subject" 
                        placeholder="Enter subject" 
                        className="form-input" 
                        value={formData.subject} 
                        onChange={handleChange} 
                      /> 
                    </Form.Group> 
                  </Col> 
                  <Col md={12}> 
                    <Form.Group controlId="message" className="mb-4"> 
                      <Form.Label>Your Message</Form.Label> 
                      <Form.Control 
                        as="textarea" 
                        name="message" 
                        rows={5} 
                        placeholder="Write your message" 
                        className="form-input" 
                        value={formData.message} 
                        onChange={handleChange} 
                      /> 
                    </Form.Group> 
                  </Col> 
                  <Col md={12} className="text-center"> 
                    <Button type="submit" variant="secondary" size="lg"> 
                      Send Message 
                    </Button> 
                  </Col> 
                </Row> 
              </Form> 
            </Col> 
          </Row> 
        </Container> 
      </section> 
 
      <Footer /> 
    </CartProvider> 
  ); 
}; 
 
export default Contact;