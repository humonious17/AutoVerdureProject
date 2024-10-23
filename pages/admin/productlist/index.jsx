"use client";
import React, { useState } from "react";
import "./styles.css";
import Select from 'react-select';
import Image from "next/image";

const ProductListPage = ({ products: initialProducts }) => {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [type, setType] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [innerHeight, setInnerHeight] = useState("");
  const [innerLength, setInnerLength] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [productImages, setProductImages] = useState({
    first: null,
    second: null,
    third: null,
    fourth: null,
    fifth: null,
  });
  const [checkboxes, setCheckboxes] = useState({
    petFriendly: false,
    notPetFriendly: false,
    moreSunlight: false,
    lessSunlight: false,
  });
  const [colors, setColors]= useState([]);
  const [size, setSize]= useState([]);
  const [finish, setFinish] = useState([]);

  const colorOptions=[
    {value: 'white', label: 'White'},
    {value: 'cream', label: 'Cream'},
    {value: 'darkGrey', label: 'Dark Grey'},
    {value: 'lightGrey', label: 'Light Grey'},
    {value: 'black', label: 'Black'},
  ];
  
  const sizeOptions = [
    {value: 'XS',label: 'XS'},
    {value: 'S',label: 'S'},
    {value: 'M',label: 'M'},
    {value: 'L',label: 'L'},
    {value: 'XL',label: 'XL'},
  ];

  const finishOptions = [
    {value: 'matt', label: 'Matt'},
    {value: 'gloss', label: 'Gloss'},
    {value: 'Art', label: 'Art'},
  ];
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditindex] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([])

  const handleAddProductClick = () => {
    setShowForm(true);
    setEditindex(null);
    clearForm()
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setCheckboxes({
        ...checkboxes,
        [name]: checked,
      });
    } else {
      if (name === "productName") setProductName(value);
      if (name === "productDetails") setProductDetails(value);
      if (name === "productPrice") setProductPrice(value);
      if (name === "stockQuantity") setStockQuantity(value);
      if (name === "type") setType(value);
      if (name === "innerLength") setInnerLength(value);
      if (name === "innerHeight") setInnerHeight(value);
      if (name === "dimensions") setDimensions(value);
     }
  };

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    setProductImages({ ...productImages, [key]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const createFormData = (product) => {
      const formData = new FormData();
    formData.append("productName", product.name);
    formData.append("productDetails", product.description);
    formData.append("productPrice", product.price);
    formData.append("type", product.type);
    formData.append("stockQuantity", product.stockQuantity);

    const images = product.images;
    formData.append('firstImage', images[0]);
    formData.append('secondImage', images[1]);
    formData.append('thirdImage', images[2]);
    formData.append('fourthImage', images[3]);
    formData.append('fifthImage', images[4]);

    formData.append('innerLength', product.innerLength);
    formData.append('innerHeight', product.innerHeight);
    formData.append('dimensions', product.dimensions);

    Object.keys(checkboxes).forEach((key) => {
      formData.append(key,`${checkboxes[key]}`);
    })
    // Object.keys(product.attributes).forEach((key) => {
    //   formData.append(`attributes[${key}]`, product.attributes[key]);
    // });
    // console.log(colors)
    colors.forEach((color, index) => {
      console.log(color.value)
      formData.append(color.value,'true');
    });

    product.size.forEach((size, index) => {
      formData.append(size,'true');
    });

    product.finish.forEach((finish, index) => {
      formData.append(finish,'true');
    });

    return formData;
  };

  const logFormData = (formData) => {
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    };
  
    if (editIndex !== null) {
      const updatedProducts = [...products];
      const newProduct = {
        id: products[editIndex].id,
        name: productName,
        description: productDetails,
        price: productPrice,
        type: type,
        stockQuantity: stockQuantity,
        innerHeight: innerHeight,
        innerLength: innerLength,
        dimensions: dimensions,
        images: Object.values(productImages).filter((image) => image),
        attributes: {
          petFriendly: checkboxes.petFriendly,
          notPetFriendly: checkboxes.notPetFriendly,
          moreSunlight: checkboxes.moreSunlight,
          lessSunlight: checkboxes.lessSunlight,
        },
        colors: colors.map(color => color.value),
        size: size.map(size => size.value),
        finish: finish.map(finish => finish.value),
      };
  
      updatedProducts[editIndex] = newProduct;
      setProducts(updatedProducts);
  
      try {
        const formData = createFormData(newProduct);
        logFormData(formData);
        
        const response = await fetch(`/api/products/update/${newProduct.id}`, {
          method: 'PUT',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
        console.log('Product Updated', result);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    } else {
      const newProduct = {
        id: products.length + 1,
        name: productName,
        description: productDetails,
        price: productPrice,
        type: type,
        stockQuantity: stockQuantity,
        innerHeight: innerHeight,
        innerLength: innerLength,
        dimensions: dimensions,
        images: Object.values(productImages).filter((image) => image),
        attributes: {
          petFriendly: checkboxes.petFriendly,
          notPetFriendly: checkboxes.notPetFriendly,
          moreSunlight: checkboxes.moreSunlight,
          lessSunlight: checkboxes.lessSunlight,
        },
        colors: colors.map(color => color.value),
        size: size.map(size => size.value),
        finish: finish.map(finish => finish.value),
      };
  
      setProducts([...products, newProduct]);
  
      try {
        const formData = createFormData(newProduct);
        logFormData(formData)
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
    }
  
    setTimeout(() => {
      setLoading(false);
      setShowForm(false);
      clearForm();
    }, 2000);
  };
  

  const handleEdit = (index) => {
    const editedProduct = products[index];
    setProductName(editedProduct.name);
    setProductDetails(editedProduct.description);
    setProductPrice(editedProduct.price);
    setType(editedProduct.type);
    setStockQuantity(editedProduct.stockQuantity);
    setInnerHeight(editedProduct.innerHeight);
    setInnerLength(editedProduct.innerLength);
    setDimensions(editedProduct.dimensions);
    setProductImages({
      first: editedProduct.images[0] || null,
      second: editedProduct.images[1] || null,
      third: editedProduct.images[2] || null,
      fourth: editedProduct.images[3] || null,
      fifth: editedProduct.images[4] || null,
    });
    setCheckboxes({
      petFriendly: editedProduct.attributes.petFriendly,
      notPetFriendly: editedProduct.attributes.notPetFriendly,
      moreSunlight: editedProduct.attributes.moreLight,
      lessSunlight: editedProduct.attributes.lessLight,
    });
    setColors(colorOptions.filter(option => editedProduct.colors.includes(option.value)));
    setSize(sizeOptions.filter(option => editedProduct.size.includes(option.value)));
    setFinish(finishOptions.filter(option => editedProduct.finish.includes(option.value)));
    setShowForm(true);
    setEditindex(index);
  };
  const clearForm = () => {
    setProductName("");
    setProductDetails("");
    setProductPrice("");
    setType("");
    setStockQuantity("");
    setInnerHeight("");
    setInnerLength("");
    setDimensions("");
    setProductImages({
      first: null,
      second: null,
      third: null,
      fourth: null,
      fifth: null,
    });
    setCheckboxes({
      petFriendly: false,
      notPetFriendly: false,
      moreSunlight: false,
      lessSunlight: false,
    });
    setColors([])
    setSize([])
    setFinish([])
  };

  const handleCheckboxChange = (index) => {
    if (selectedProducts.includes(index)) {
      setSelectedProducts(selectedProducts.filter((i) => i !== index));
    } else {
      setSelectedProducts([...selectedProducts, index]);
    }
  };

  const handleDeleteChecked = async () => {
    const updatedProducts = products.filter((_,i) => !selectedProducts.includes(i));
    const idsToDelete = products
      .filter((_,i) => selectedProducts.includes(i))
      .map((product) => product.id)
    setProducts(updatedProducts);
    setSelectedProducts([])
  };
  return (
    <div className="container">
      {!showForm ? (
        <div >
          <div className="header">
            <h1>All Products</h1>
            <button
              className="add-product-button"
              onClick={handleAddProductClick}
            >
              Add Product
            </button>
            <button onClick={ handleDeleteChecked}
                className="delete-checked-button">
                Delete
            </button>
          </div>
          
          <table rules="all">
            <thead className="w-[1160px]  mt-[30px] hidden md:flex flex-col gap-5">
              <tr className="justify-start items-start inline-flex flex justify-between items-center pl-[190px]">
                <td className="w-[50px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Product</td>
                <td className="w-[80px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Dimensions</td>
                <td className="w-[50px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Stock Quantity</td>
                <td className="w-[50px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Type</td>
                <td className="w-[100px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">Actions</td>
              </tr>
            </thead>

            <tbody className="mt-[30px] hidden md:flex flex-col gap-5">
              {products.map((product, index) =>(
                <tr 
                key={product.id}
                className="px-[35px] py-[38px] text-xs w-full border-[1px] border-black rounded-2xl bg-white flex justify-between items-center"
                >
                <input type="checkbox" checked={selectedProducts.includes(index)} className="product-checkbox" onChange={(e) => handleCheckboxChange(index)}/>
                  <td className="w-[110px]">{product.productName}</td>
                  <td className="w-[120px]">{product.dimensions}</td>
                  <td className="w-[70px]">{product.stockQuantity}</td>
                  <td className="w-[90px]">{product.productType}</td>
                  <td className="w-[70px] flex justify-around items-center">
                    <button onClick={() => handleEdit(index)}
                      className="edit-button">
                        Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br/>
      </div>      
      ) : (
        <div >
        {loading ? (
          <div className="loading-container">
            <l-newtons-cradle 
            size='78'
            speed='1.4'
            color='black'>
            </l-newtons-cradle>
          </div>   
      ) : (
        <form onSubmit={handleSubmit} className="product-form">
          <div className="left-column">
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={productName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name="productDetails"
                value={productDetails}
                onChange={handleChange}
                ></textarea>
            </div>
            <div className="form-group">
              <label>Size</label>
              <div className="checkbox-group">
                <Select
                  isMulti
                  name="size"
                  options={sizeOptions}
                  className=""
                  classNamePrefix="select"
                  value={size}
                  onChange={setSize}
                />     
               </div>
            </div>
            <div className="form-group">
              <label>Colour</label>
              <div className="checkbox-group">
              <Select
                isMulti
                name="colors"
                options={colorOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={colors}
                onChange={setColors}
              />
              </div>
            </div>
            <div className="form-group">
              <label>Styles</label>
              <div className="checkbox-group">
              <Select
                isMulti
                name="finish"
                options={finishOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={finish}
                onChange={setFinish}
              />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                  <label>Stock Quantity</label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={stockQuantity}
                    onChange={handleChange}
                    />
                </div>
                <div style={{ width: "48%" }}>
                  <label>Product Price</label>
                  <input
                    type="number"
                    name="productPrice"
                    value={productPrice}
                    onChange={handleChange}
                    />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Select Type</label>
              <select name="type" value={type} onChange={handleChange} >
                <option value="" disabled>
                  Select Type
                </option>
                <option value="GroBox">GroBox</option>
                <option value="ZenPot">ZenPot</option>
                <option value="Plant">Plant</option>
                <option value="accessory">Accessory</option>
              </select>
            </div>
            <div className="form-group">
              <label>Attributes</label>
              <div className="checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="petFriendly"
                    checked={checkboxes.petFriendly}
                    onChange={handleChange}
                    />
                  Pet Friendly
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="notPetFriendly"
                    checked={checkboxes.notPetFriendly}
                    onChange={handleChange}
                    />
                  Not Pet Friendly
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="moreSunlight"
                    checked={checkboxes.moreSunlight}
                    onChange={handleChange}
                    />
                  Requires More Sunlight
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="lessSunlight"
                    checked={checkboxes.lessSunlight}
                    onChange={handleChange}
                    />
                  Requires Less Sunlight
                </label>
              </div>
            </div>
          </div>
          <div className="right-column">
            <div className="display-column">
              <h3><span class="bolded">Product Gallery</span></h3>
              <div className="gallery-thumbnails">
                {Object.keys(productImages).map((key, index) => (
                  <div key={index} className="thumbnail">
                    {productImages[key] && (
                      <img
                        src={URL.createObjectURL(productImages[key])}
                        alt={`Thumbnail ${index + 1}`}
                        />
                    )}
                    {!productImages[key] && (
                      <div className="placeholder">Image {index + 1}</div>
                    )}
                    {/* <input type='file' name={`image${index + 1}`} onChange={(e) => handleImageChange(e, index)} /> */}
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Upload Images</label>
              <input
                type="file"
                name="first"
                onChange={(e) => handleImageChange(e, "first")}
                />
              <input
                type="file"
                name="second"
                onChange={(e) => handleImageChange(e, "second")}
                />
              <input
                type="file"
                name="third"
                onChange={(e) => handleImageChange(e, "third")}
                />
              <input
                type="file"
                name="fourth"
                onChange={(e) => handleImageChange(e, "fourth")}
                />
              <input
                type="file"
                name="fifth"
                onChange={(e) => handleImageChange(e, "fifth")}
                />
            </div>
          </div>
          <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ width: "48%" }}>
                  <label>Inner Length</label>
                  <input
                    type="number"
                    name="innerLength"
                    value={innerLength}
                    onChange={handleChange}
                    />
                </div>
                <div style={{ width: "48%" }}>
                  <label>inner Height</label>
                  <input
                    type="number"
                    name="innerHeight"
                    value={innerHeight}
                    onChange={handleChange}
                    />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label>Dimensions</label>
              <input
                type="text"
                name="dimensions"
                value={dimensions}
                onChange={handleChange}
                />
            </div>
                  
            <div className="submit-button-container">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>    
        </form>
      )}
    </div>
    )}
  </div>
  );
};

export async function getServerSideProps() {
  const findAllProducts = (await import("@/pages/api/products/findAllProducts")).default;

  const zenpot = await findAllProducts('zenpot');
  const grobox = await findAllProducts('grobox');
  const plant = await findAllProducts('plants');
  const accessory = await findAllProducts('accessory');

  const products = [...(zenpot ? zenpot : []), ...(grobox ? grobox : []), ...(plant ? plant : []), ...(accessory ? accessory : [])];

  return {
    
    props: {
      products: products
    }
  }
}

export default ProductListPage;
