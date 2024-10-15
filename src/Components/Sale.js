import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Sale = ({products}) => {
    return (
        <div>
            <Container className='my-5 sale'>
                <h2 className='text-dark fw-bold mt-5'><span className='text-danger'>big </span>Sale</h2>
                <Row>
                    <div className='sale-box d-flex justify-content-center align-items-center mt-5 wow fadeInUp'>
                        <div className='d-flex justify-content-center align-items-center mr-5 p-5 box-left'>
                            <img src='image/sale1.jpg' alt='' />
                            <div className='ml-5'>
                                <p className='text-dark'>Super Sale</p>
                                <h2 className='text-dark fw-bold'>New Collection</h2>
                                <Link to={`/products/all`} key={products} className='sale-link'>Shop Now</Link>
                            </div>

                        </div>
                        <div className='d-flex justify-content-center align-items-center p-5 box-right wow fadeInUp'>
                            <img src='image/sale2.jpg' alt='' />
                            <div className='ml-5'>
                                <p className='text-dark'>Super Sale</p>
                                <h2 className='text-dark fw-bold'>New Collection</h2>
                                <Link to={`/products/all`} key={products} className='sale-link'>Shop Now</Link>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Sale