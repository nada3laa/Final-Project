import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useCart } from 'react-use-cart';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Page = ({ products }) => {
    const { totalItems } = useCart();
    const [detail, setDetail] = useState(null);
    const [Close, setClose] = useState(false);
    const { addItem } = useCart();

    const selectedIndexes = [12, 21, 16, 20];
    const selectedProducts = selectedIndexes.map(index => products[index]).filter(Boolean);

    const detailPage = (product) => {
        setDetail(product); 
        setClose(true);
    }

    return (
        <div>
            {
                Close && detail ? (
                    <div className='detail-container'>
                        <div className='detail-content'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link className="nav-link position-relative" to="/cart">
                                    <i className="fas fa-cart-plus mx-2 fa-xl text-danger"></i>
                                    <span className='position-absolute text-info'>({totalItems})</span>
                                </Link>
                                <button className='close' onClick={() => setClose(false)}><i className='fas fa-xmark'></i></button>
                            </div>

                            <div className='p-3 d-flex detail-info'>
                                <div className="img-box">
                                    <img src={detail.image} alt="" />
                                </div>
                                <div className='ml-5'>
                                    <p className="text-danger m-0">{detail.name}</p>
                                    <p className="text-muted m-0 des">{detail.description}</p>
                                    <h3 className='text-warning'>
                                        &#9733; &#9733; &#9733;
                                    </h3>
                                    <p className="text-info fw-bold m-1">{detail.price} $</p>
                                    <button onClick={() => addItem(detail)} className='btn btn-danger fw-bold'>add to cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
            <Container className='new'>
                <h2 className='text-dark mb-5 fw-bold'><span className='text-danger'>new</span> arrival</h2>
                <Row>
                    {selectedProducts.map((item) => (
                        <Col md="6" lg='3' key={item.id}>
                            <Card className='new-card mb-3 wow fadeInUp'>
                                <Card.Img className='img-fluid m-auto pt-3' src={item.image} />
                                <Card.Body>
                                    <Card.Title className='name'>{item.name}</Card.Title>
                                    <div className='new-btn'>
                                        <Link onClick={() => detailPage(item)}><Button className='btn btn-danger more'>more details</Button></Link>
                                        <Link onClick={() => addItem(item)} >
                                            <i className='fas fa-cart-plus ml-3 text-danger fa-xl'></i>
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

function New({ products }) {
    return (
        <div>
            <Page products={products} />
        </div>
    );
};

export default New;
