import React from 'react';
import { Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';

function Page({ products }) {
    const { addItem } = useCart();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user')); // Get user from local storage

    const selectedProducts = products.filter((_, index) => index % 6 === 0);

    const handleAddToCart = (item) => {
        if (user) {
            addItem(item);
        } else {
            // Redirect to login page if user is not logged in
            navigate('/login');
        }
    };

    return (
        <div>
            <Container className='pt-5 all-products'>
                <Row>
                    <Col md='12 mb-4'>
                        <h2 className='text-dark'><span className='text-danger'>Popular</span> Products</h2>
                    </Col>
                    {selectedProducts && selectedProducts.map((item) => (
                        <Col md='6' lg='3' className='text-center' key={item.id}>
                            <Card className='box wow fadeInUp' data-wow-delay=".2s">
                                <div className='wow fadeInUp' data-wow-delay=".4s">
                                    <img className='img-fluid' alt="Sample" src={item.image} />
                                </div>
                                <hr style={{height:"3px"}} className='m-0 text-info'/>
                                <CardBody className='bg-white'>
                                    <CardTitle className='text-danger bg-white fw-bold popular-name' tag="h5">
                                        {item.name}
                                    </CardTitle>
                                    <CardSubtitle className="my-2 text-muted" tag="h6">
                                        {item.price} $
                                    </CardSubtitle>
                                    <CardSubtitle className="my-2 text-warning" tag="h4">
                                        <h3>&#9733; &#9733; &#9733;</h3>
                                    </CardSubtitle>
                                    <button onClick={() => handleAddToCart(item)} className='btn btn-danger px-5 mt-2 fw-bold popular-btn'>Add to Cart</button>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

function Popular({ products }) {
    return (
        <div>
            <Page products={products} />
        </div>
    );
}

export default Popular;
