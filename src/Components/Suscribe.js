import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap'
import { Input } from 'reactstrap'

const Suscribe = () => {
    return (
        <div>
            <Container className='bg-light my-5 p-5 text-dark suscribe'>
                <Row>
                    <Col md='6 wow fadeInUp'>
                        <h2>Subscribe Our Newsletter</h2>
                    </Col>

                    <Col md='6 wow fadeInUp'>
                        <Form className='d-flex'>
                            <Input className='px-4 py-4' type='text' placeholder='your email address' />
                            <button className='btn btn-danger' type='submit'>Subscribe</button>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Suscribe