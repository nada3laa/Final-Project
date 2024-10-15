import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header = ({products}) => {
    return (
        <div>
            <div className='pt-5'></div>
            <div className='pt-5'></div>
            <Container className='header'>
                <Row>
                    <Col md='6' className='box wow fadeInUp'data-wow-delay=".2s">
                        <p className='text-danger'>Accentuate your inner glow</p>
                        <h2 className='text-dark'>Unlock the Secret to<br/> <span className='text-danger'>Glowing</span> Skin</h2>
                        <p className='py-3 text-dark'>Revitalize Your Skin, Revive Your Confidence</p>
                       <Link to={`/products/all`} key={products}><button className='btn btn-danger fw-bold btn-lg'>shop now</button></Link> 
                    </Col>

                    <Col md='6 wow fadeInUp'data-wow-delay=".4s">
                        <img className='img-fluid' src='image/header.jpg' alt='' />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header