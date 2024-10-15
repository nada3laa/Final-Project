import React, { useEffect, useState } from 'react'; 
import NavBar from '../NavBar'; 
import Footer from '../Footer'; 
import { Button, Card, CardBody, CardSubtitle, CardTitle, Col, Container, Row } from 'react-bootstrap'; 
import { CartProvider, useCart } from 'react-use-cart'; 
import ScrollToTop from 'react-scroll-to-top'; 
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom'; 
 
const Page = () => { 
  const { pathname } = useLocation(); 
  const { categPro } = useParams() || { categPro: 'all' }; 
  const { totalItems, addItem } = useCart(); 
  const [detail, setDetail] = useState([]); 
  const [Close, setClose] = useState(false); 
  const [products, setProducts] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // الحالة للتحكم في الصور 
  const productsPerPage = 4; 
  const navigate = useNavigate(); 
 
  // Fetching user from localStorage 
  const user = JSON.parse(localStorage.getItem('user')); 
 
  useEffect(() => { 
    const categoryParam = categPro === 'all' ? '' : `?category=${categPro}`;

    fetch(`http://localhost:3000/products${categoryParam}`) 
      .then((response) => response.json()) 
      .then((data) => { 
        setProducts(data); 
      }) 
      .catch((error) => console.error('Error fetching products:', error)); 
  }, [categPro]); 
 
  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [pathname]); 
 
  const handleAddToCart = (item) => { 
    if (!user) { 
      navigate('/login'); 
    } else { 
      addItem(item); 
    } 
  }; 
 
  const detailPage = (product) => { 
    setDetail([{ ...product }]); 
    setClose(true); 
  }; 
 
  const indexOfLastProduct = currentPage * productsPerPage; 
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage; 
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct); 
  const totalPages = Math.ceil(products.length / productsPerPage); 
 
  const handlePrevPage = () => { 
    if (currentPage > 1) setCurrentPage(currentPage - 1); 
  }; 
 
  const handleNextPage = () => { 
    if (currentPage < totalPages) setCurrentPage(currentPage + 1); 
  }; 
 
  // Handle auto-sliding images 
  useEffect(() => { 
    if (detail.length > 0 && Array.isArray(detail[0]?.image)) { 
      const interval = setInterval(() => { 
        setCurrentImageIndex((prevIndex) =>  
          (prevIndex + 1) % detail[0]?.image.length || 0 
        ); 
      }, 1500); // تغيير الصور كل 3 ثوانٍ 
      return () => clearInterval(interval); 
    } 
  }, [detail]); 
 
  return ( 
    <div> 
      {Close && ( 
        <div className="detail-container"> 
          <div className="detail-contant"> 
            <div className="d-flex justify-content-between align-items-center"> 
              <Link className="nav-link position-relative" to="/cart"> 
                <i className="fas fa-cart-plus mx-2 fa-xl text-danger"></i> 
                <span className="position-absolute text-info">({totalItems})</span> 
              </Link> 
              <button className="close" onClick={() => setClose(false)}> 
                <i className="fas fa-xmark"></i> 
              </button> 
            </div> 
            {detail.map((item) => ( 
              <div className="p-3 d-flex detail-info" key={item.id}> 
                <div className="img-box"> 
                  {/* عرض الصورة أو الشرائح */} 
                  <img  
                    src={Array.isArray(item.image) ? item.image[currentImageIndex] : item.image}  
                    alt={item.name}  
                    className="img-fluid"  
                  /> 
                </div> 
                <div className="ml-5"> 
                  <p className="text-danger m-0">{item.name}</p> 
                  <p className="text-muted m-0 des">{item.description}</p> 
                  <h3 className="text-warning">&#9733; &#9733; &#9733;</h3> 
                  <p className="text-info fw-bold m-1">{item.price} $</p> 
                  <button onClick={() => handleAddToCart(item)} className="btn btn-danger fw-bold">Add to Cart</button> 
                </div> 
              </div> 
            ))} 
          </div> 
        </div> 
      )} 
 
      <Container className="all-products products"> 
        <h2 className="text-danger text-center my-5 wow fadeInUp" data-wow-delay=".2s"> 
        {categPro === 'all' ? 'All Products' : `${categPro} Products`} 
        </h2> 
        <Row> 
          {currentProducts.length > 0 ? ( 
            currentProducts.map((item) => ( 
              <Col md="6" lg="3" className="text-center" key={item.id}> 
                <Card className="box wow fadeInUp" data-wow-delay=".2s"> 
                  <div className="wow fadeInUp" data-wow-delay=".4s"> 
                    {/* التحقق من وجود مصفوفة الصور أو الخاصية القديمة لعرض الصورة */} 
                    <img  
                      className="img-fluid"  
                      alt={item.name}  
                      src={Array.isArray(item.image) && item.image.length > 0 ? item.image[0] : item.image}  
                    /> 
                  </div> 
                  <hr style={{ height: "3px" }} className="m-0 text-info" /> 
                  <CardBody className="bg-white"> 
                    <CardTitle className="text-danger bg-white fw-bold" tag="h5"> 
                      {item.name} 
                    </CardTitle> 
                    <CardSubtitle className="my-2 text-info fw-bold" tag="h6"> 
                      {item.price} $ 
                    </CardSubtitle> 
                    <CardSubtitle className="my-2 text-muted discount" tag="h6"> 
                      20% discount for VF Cash. Use code VFWF20 
                    </CardSubtitle> 
                    <CardSubtitle className="my-2 text-warning" tag="h4"> 
                      <h3>&#9733; &#9733; &#9733;</h3> 
                    </CardSubtitle> 
                    <Link className="link" onClick={() => detailPage(item)}> 
                      <Button className="btn btn-danger d-block m-auto more">More Details</Button> 
                    </Link> 
                    <button onClick={() => handleAddToCart(item)} className="btn btn-danger px-5 mt-2 fw-bold"> 
                      Add to Cart 
                    </button> 
                  </CardBody> 
                </Card> 
              </Col> 
            )) 
          ) : ( 
            <p>No products available</p> 
          )} 
        </Row> 
 
        <div className="pagination-controls d-flex justify-content-center mt-4"> 
          <Button variant="info" disabled={currentPage === 1} onClick={handlePrevPage}> 
            Previous 
          </Button> 
          <span className="mx-3 text-danger">Page {currentPage} of {totalPages}</span> 
          <Button variant="info" disabled={currentPage === totalPages} onClick={handleNextPage}> 
            Next 
          </Button> 
        </div> 
      </Container> 
    </div> 
  ); 
}; 
 
const Products = () => { 
  return ( 
    <CartProvider> 
      <NavBar /> 
      <div className="pt-5"></div> 
      <Page /> 
      <Footer /> 
      <ScrollToTop 
        smooth 
        component={<img src="/image/logo.jpg" alt="Logo" style={{ width: "100%", height: "100%" }} />} 
        style={{ backgroundColor: "#fff", width: "60px", height: "60px" }} 
        className="animateanimated animateflash animateinfinite infinite animateslower" 
      /> 
    </CartProvider> 
  ); 
}; 
 
export default Products;