import React, { useEffect } from 'react'
import NavBar from '../NavBar'
import Footer from '../Footer'

import { Link, useLocation } from 'react-router-dom'
import { CartProvider } from 'react-use-cart'

const About = () => {
  const { pathname } = useLocation();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <CartProvider>
      <NavBar />
      <div className='pt-5'></div>
      <div>
      <div className="text-secondary p-2 ">
        
          <div className="titleabout fw-bold text-center">
            <h2>
              About <b>Our store</b>
            </h2>
          </div>
          </div>
            <div className="about mx-auto">
              <div className="about-item">
                <h4 className="mx-3">Glow Secret APP</h4>
                <p className="mx-auto pt-5">Glow Secret app   Discover premium Glow Secret solutions designed to nourish, hydrate, and protect your skin. Our goal is to provide the best products for radiant and healthy skin. </p>
              </div>
              <div className="about-item">
                <h4 className="mx-3">Technologies used</h4>
                <ul className="mx-4">
                  <li>React JS,ReactDOM,React Router</li>
                  <li>Framer Motion Library</li>
                  <li>apexcharts</li>
                  <li>Bootstrap 5,MUI</li>
                  <li>Axios,EmailJS,React Spinners</li>
                </ul>
              </div>
              <div className="about-item">
                <h4 className="mx-3">Follow me on</h4>
                <section className="mx-auto" >
                  <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#" role="button" data-mdb-ripple-color="dark"><i className="fab fa-linkedin" /></a>
                  <a className="btn btn-link btn-floating btn-lg text-dark m-1" href="#" role="button" data-mdb-ripple-color="dark"><i className="fab fa-github" /></a>
                </section>
              </div>

              <div className="about-item">
                <h4 className="mx-3">My portfolio</h4>
              </div>
            </div>
        </div>
      <Footer />
    </CartProvider>
  )
}

export default About