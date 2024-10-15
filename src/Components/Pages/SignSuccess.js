import React, { useEffect } from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'
import { Col, Container, Row } from "react-bootstrap";
import { CartProvider } from 'react-use-cart';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const SignSuccess = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return (
        <CartProvider>
            <NavBar />
            <div className='pt-5'></div>
            <Container fluid className='sign-success pt-4'>
                <Row>
                    <Col className='mt-5'>
                    <h2 className="text-danger text-center my-5 wow fadeInUp" data-wow-delay=".2s">nike shoes</h2>
                        <h3 className="text-white text-center wow fadeInUp" data-wow-delay=".4s">The registration process was completed successfully </h3>
                        <Link className='link' to='/'>
                            <button className="btn btn-danger text-danger fw-bold btn-lg mt-5 wow fadeInUp m-auto d-block" data-wow-delay=".6s">back to home</button></Link>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </CartProvider>
    )
}

export default SignSuccess