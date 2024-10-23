import React, { useState } from 'react';

const AddProductForm = () => {
    const [productName, setProductName] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImages, setProductImages] = useState({ first: null, second: null, third: null });
    const [innerHeight, setInnerHeight] = useState('');
    const [innerLength, setInnerLength] = useState('');
    const [dimensions, setDimensions] = useState('');
    const [checkboxes, setCheckboxes] = useState({
        petFriendly: false,
        petUnfriendly: false,
        moreLight: false,
        lessLight: false,
    });

    const handleImageChange = (e, imageKey) => {
        const file = e.target.files[0];
        if (file) {
            setProductImages(prevImages => ({
                ...prevImages,
                [imageKey]: file,
            }));
        }
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckboxes(prevCheckboxes => ({
            ...prevCheckboxes,
            [name]: checked,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('productDetails', productDetails);
        formData.append('productPrice', productPrice);
        formData.append('firstImage', productImages.first);
        formData.append('secondImage', productImages.second);
        formData.append('thirdImage', productImages.third);
        formData.append('innerHeight', innerHeight);
        formData.append('innerLength', innerLength);
        formData.append('dimensions', dimensions);

        Object.keys(checkboxes).forEach(key => {
            formData.append(key, checkboxes[key]);
        });

        try {
            const response = await fetch('/api/products/add', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();

            if (response.status === 200) {
                window.location.href = `store/${productName}/${result.id}`;
            }
            console.log('Product added:', result);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginTop: '100px' }}>
            <div>
                <label>Product Name:</label>
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Product Details:</label>
                <textarea
                    value={productDetails}
                    onChange={(e) => setProductDetails(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Product Price:</label>
                <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Product Image 1:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'first')}
                    required
                />
            </div>
            <div>
                <label>Product Image 2:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'second')}
                    required
                />
            </div>
            <div>
                <label>Product Image 3:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'third')}
                    required
                />
            </div>
            <div>
                <label>Inner Height:</label>
                <input
                    type="text"
                    value={innerHeight}
                    onChange={(e) => setInnerHeight(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Inner Length/Diameter:</label>
                <input
                    type="text"
                    value={innerLength}
                    onChange={(e) => setInnerLength(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Dimensions:</label>
                <input
                    type="text"
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="petFriendly"
                        checked={checkboxes.petFriendly}
                        onChange={handleCheckboxChange}
                    />
                    Pet Friendly
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="petUnfriendly"
                        checked={checkboxes.petUnfriendly}
                        onChange={handleCheckboxChange}
                    />
                    Pet Unfriendly
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="moreLight"
                        checked={checkboxes.moreLight}
                        onChange={handleCheckboxChange}
                    />
                    More Light
                </label>
            </div>
            <div>
                <label>
                    <input
                        type="checkbox"
                        name="lessLight"
                        checked={checkboxes.lessLight}
                        onChange={handleCheckboxChange}
                    />
                    Less Light
                </label>
            </div>
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
