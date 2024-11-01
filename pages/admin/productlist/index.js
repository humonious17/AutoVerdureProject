import React, { useState } from 'react';
import AddProduct from './addproduct';
import './styles.css'; // Import CSS file for styling

const Index = () => {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);

    const handleAddProduct = (newProduct) => {
        setProducts([...products, newProduct]);
        setShowAddProduct(false); // Close the add product form after adding
    };

    const handleToggleAddProduct = () => {
        setShowAddProduct(prevState => !prevState); // Toggle the dropdown
    };

    return (
        <div className="container">
            <h1 className="header">Product List</h1>
            <button className="add-product-button" onClick={handleToggleAddProduct}>
                {showAddProduct ? 'Close Add Product' : 'Add New Product'}
            </button>

            {showAddProduct && (
                <div className="add-product-dropdown">
                    <AddProduct onAddProduct={handleAddProduct} />
                </div>
            )}

            <ul className="product-list">
                {products.map((product, index) => (
                    <li key={index} className="product-item">
                        <span className="product-name">{product.name}</span> - 
                        <span className="product-price">${product.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Index;
