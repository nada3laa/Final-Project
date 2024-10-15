// Gallery.js
import React, { useEffect, useState } from 'react';


const Gallery = () => {
  const [data, setData] = useState({ categories: [], products: [] });
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error); // Capture any errors
        setLoading(false); // Stop loading even if there's an error
      });
  }, []);

  if (loading) {
    return <div className="text-center py-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-5">Error loading data: {error.message}</div>;
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5">Glow Secret Products Gallery</h1>

      {/* Categories Section */}
      <h2 className="mb-4">Categories</h2>
      <div className="row">
        {data.categories && data.categories.length > 0 ? (
          data.categories.map((category) => (
            <div key={category.id} className="col-md-3 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={category.image}
                  className="card-img-top"
                  alt={category.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{category.name}</h5>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No categories available</div>
        )}
      </div>

      {/* Products Section */}
      <h2 className="mt-5 mb-4">Products</h2>
      <div className="row">
        {data.products && data.products.length > 0 ? (
          data.products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="text-muted">{product.brand}</p>
                  <p className="font-weight-bold">Price: ${product.price}</p>
                  <p className="card-text">{product.description}</p>
                  <button className="btn btn-primary mt-auto">Add to Cart</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">No products available</div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
