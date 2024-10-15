import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Testimonials = ({ categories }) => {
  return (
    <div>
      <Container className="testimonials text-center">
        <div className="text-center my-5">
          <h2 className="text-dark">
            Our <span className="text-danger">Collections</span>
          </h2>
        </div>
        <Row>
          {categories.map((item) => (
            <Col md="3" className="wow fadeInUp" data-wow-delay=".6s" key={item.id}>
              <Link to={`/products/${item.name}`}>
                <img src={item.image} alt={item.name} className="img-fluid" />
                <h3 className="text-danger">{item.name}</h3>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Testimonials;
