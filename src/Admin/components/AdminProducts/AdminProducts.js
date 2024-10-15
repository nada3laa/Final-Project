import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Sidebar from '../Sidebar';
import { Container, Typography, Button, Box, Paper, Snackbar, Alert } from '@mui/material';


const PRODUCTS_API = "http://localhost:3000/products";
const CATEGORIES_API = "http://localhost:3000/categories";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', price: '', category: '', brand: '', description: '', image: [] });
    const [editProduct, setEditProduct] = useState(null);
    const [newCategory, setNewCategory] = useState({ name: '', image: '' });
    const [showProductForm, setShowProductForm] = useState(false);
    const [showCategoryForm, setShowCategoryForm] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(PRODUCTS_API).then(res => res.json()).then(data => setProducts(data));
        fetch(CATEGORIES_API).then(res => res.json()).then(data => setCategories(data));
    }, []);

    // إضافة منتج جديد
    const addProduct = (e) => {
        e.preventDefault();
        fetch(PRODUCTS_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        }).then(res => res.json()).then((createdProduct) => {
            setProducts([...products, createdProduct]);
            setNewProduct({ name: '', price: '', category: '', brand: '', description: '', image: [] });
            setShowProductForm(false);
            alert("Product added successfully!");
        });
    };

    // تعديل المنتج
    const updateProduct = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to update this product?")) {
            fetch(`${PRODUCTS_API}/${editProduct.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editProduct)
            }).then(res => res.json()).then((updatedProduct) => {
                setProducts(products.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
                setEditProduct(null);
                alert("Product updated successfully!");
            });
        }
    };

    // حذف المنتج
    const deleteProduct = (productId) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            fetch(`${PRODUCTS_API}/${productId}`, {
                method: 'DELETE',
            }).then(() => {
                setProducts(products.filter(p => p.id !== productId));
                alert("Product deleted successfully!");
            });
        }
    };

    // إضافة فئة جديدة
    const addCategory = (e) => {
        e.preventDefault();
        fetch(CATEGORIES_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCategory)
        }).then(res => res.json()).then(() => {
            setCategories([...categories, newCategory]);
            setNewCategory({ name: '', image: '' });
            setShowCategoryForm(false);
            alert("Category added successfully!");
        });
    };

    return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#f7f7f7' }}>
        <div style={{ width: '300px', height: '100vh', flexShrink: 0, backgroundColor: '#ffe0e0' }}>
            <Sidebar />
        </div>
        <Container sx={{ flexGrow: 1, padding: { xs: '10px', md: '20px' } }}>
            <h2 className="text-center mb-4">Product Management
            </h2>
          
            <button className="btn btn-primary mb-3" style={{ backgroundColor: '#DD356E' }} onClick={() => setShowProductForm(true)}>Add New Product</button>
            <button className="btn btn-primary mb-3 ms-3" style={{ backgroundColor: '#DD356E' }} onClick={() => setShowCategoryForm(true)}>Add New Category</button>

            <h4>Products</h4>
            <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Brand</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index} style={{ backgroundColor: index % 2 === 0 ? '#fff' : '#FFE8E8' }}>
                                <td>
                                    {Array.isArray(product.image) && product.image.length > 0 ? (
                                        <img src={product.image[0]} alt={product.name} style={{ width: '60px', height: 'auto' }} />
                                    ) : (
                                        <img src={product.image} alt={product.name} style={{ width: '60px', height: 'auto' }} />
                                    )}
                                </td>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>{product.price}</td>
                                <td>{product.brand}</td>
                                <td>{product.description}</td>
                                <td>
                                    <button className="btn btn-warning btn-sm me-2" style={{ color: 'white',marginBottom:'15px' ,backgroundColor: " #DD356E" }} onClick={() => setEditProduct(product)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button className="btn btn-danger btn-sm" style={{ color: 'white',backgroundColor: " #DD356E" }} onClick={() => deleteProduct(product.id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* تعديل المنتج */}
            {editProduct && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Edit Product</h5>
                                <button type="button" className="btn-close" onClick={() => setEditProduct(null)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={updateProduct}>
                                    <div className="form-group mb-2">
                                        <label>Product Name</label>
                                        <input type="text" className="form-control" value={editProduct.name} onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Price</label>
                                        <input type="number" className="form-control" value={editProduct.price} onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Brand</label>
                                        <input type="text" className="form-control" value={editProduct.brand} onChange={(e) => setEditProduct({ ...editProduct, brand: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Description</label>
                                        <textarea className="form-control" value={editProduct.description} onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Category</label>
                                        <select className="form-control" value={editProduct.category} onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })} required>
                                            <option value="">Select a category</option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category.name}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Images (Comma separated URLs)</label>
                                        <input type="text" className="form-control" value={editProduct.image.join(', ')} onChange={(e) => setEditProduct({ ...editProduct, image: e.target.value.split(', ') })} />
                                    </div>
                                    <button className="btn btn-success" type="submit">Update Product</button>
                                    <button className="btn btn-secondary ms-2" onClick={() => setEditProduct(null)}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* إضافة منتج جديد */}
            {showProductForm && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Product</h5>
                                <button type="button" className="btn-close" onClick={() => setShowProductForm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={addProduct}>
                                    <div className="form-group mb-2">
                                        <label>Product Name</label>
                                        <input type="text" className="form-control" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Price</label>
                                        <input type="number" className="form-control" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Brand</label>
                                        <input type="text" className="form-control" value={newProduct.brand} onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Description</label>
                                        <textarea className="form-control" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Category</label>
                                        <select className="form-control" value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} required>
                                            <option value="">Select a category</option>
                                            {categories.map((category, index) => (
                                                <option key={index} value={category.name}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Images (Comma separated URLs)</label>
                                        <input type="text" className="form-control" value={newProduct.image.join(', ')} onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value.split(', ') })} required />
                                    </div>
                                    <button className="btn btn-primary" type="submit">Add Product</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* إضافة فئة جديدة */}
            {showCategoryForm && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add New Category</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCategoryForm(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={addCategory}>
                                    <div className="form-group mb-2">
                                        <label>Category Name</label>
                                        <input type="text" className="form-control" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} required />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label>Category Image</label>
                                        <input type="text" className="form-control" value={newCategory.image} onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })} required />
                                    </div>
                                    <button className="btn btn-primary" type="submit">Add Category</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </Container>
        </Box>
    );
}

export default AdminProducts;