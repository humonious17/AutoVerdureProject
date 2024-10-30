// components/ProductForm.js
import { useState } from "react";

const ProductForm = () => {
  const initialFormData = {
    productId: "",
    productName: "",
    productType: "",
    productDescription: "",
    productPrice: 0,
    innerHeight: 0,
    innerLength: 0,
    dimensions: "",
    petFriendly: "false",
    lessLight: "false",
    moreLight: "false",
    XS: "false",
    S: "false",
    M: "false",
    L: "false",
    XL: "false",
    white: "false",
    cream: "false",
    lightGrey: "false",
    darkGrey: "false",
    black: "false",
    images: [{ imageId: "", publicUrl: "", thumbnailUrl: "", order: 1, alt: "" }],
  };
  
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked.toString() }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const images = [...prev.images];
      images[index][name] = value;
      return { ...prev, images };
    });
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { imageId: "", publicUrl: "", thumbnailUrl: "", order: prev.images.length + 1, alt: "" }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      alert("Product added successfully!");
      setFormData(initialFormData); // Reset form data
    } else {
      alert("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2 style={styles.header}>Add Product</h2>

      <input type="text" name="productId" placeholder="Product ID" value={formData.productId} onChange={handleChange} required style={styles.input} />
      <input type="text" name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required style={styles.input} />
      <input type="text" name="productType" placeholder="Product Type" value={formData.productType} onChange={handleChange} style={styles.input} />
      <textarea name="productDescription" placeholder="Product Description" value={formData.productDescription} onChange={handleChange} style={styles.textarea} />
      <input type="number" name="productPrice" placeholder="Product Price" value={formData.productPrice} onChange={handleChange} style={styles.input} />

      <div style={styles.priceContainer}>
        <input type="number" name="innerHeight" placeholder="Inner Height" value={formData.innerHeight} onChange={handleChange} style={styles.smallInput} />
        <input type="number" name="innerLength" placeholder="Inner Length" value={formData.innerLength} onChange={handleChange} style={styles.smallInput} />
      </div>
      <input type="text" name="dimensions" placeholder="Dimensions (e.g., 15cm x 10cm x 20cm)" value={formData.dimensions} onChange={handleChange} style={styles.input} />

      <div style={styles.checkboxGroup}>
        <label style={styles.label}>Pet Friendly: <input type="checkbox" name="petFriendly" checked={formData.petFriendly === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>Less Light: <input type="checkbox" name="lessLight" checked={formData.lessLight === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>More Light: <input type="checkbox" name="moreLight" checked={formData.moreLight === "true"} onChange={handleChange} /></label>
      </div>

      <div style={styles.checkboxGroup}>
        <label style={styles.label}>XS: <input type="checkbox" name="XS" checked={formData.XS === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>S: <input type="checkbox" name="S" checked={formData.S === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>M: <input type="checkbox" name="M" checked={formData.M === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>L: <input type="checkbox" name="L" checked={formData.L === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>XL: <input type="checkbox" name="XL" checked={formData.XL === "true"} onChange={handleChange} /></label>
      </div>

      <div style={styles.checkboxGroup}>
        <label style={styles.label}>White: <input type="checkbox" name="white" checked={formData.white === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>Cream: <input type="checkbox" name="cream" checked={formData.cream === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>Light Grey: <input type="checkbox" name="lightGrey" checked={formData.lightGrey === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>Dark Grey: <input type="checkbox" name="darkGrey" checked={formData.darkGrey === "true"} onChange={handleChange} /></label>
        <label style={styles.label}>Black: <input type="checkbox" name="black" checked={formData.black === "true"} onChange={handleChange} /></label>
      </div>

      <h3 style={styles.header}>Product Images</h3>
      {formData.images.map((image, index) => (
        <div key={index} style={styles.imageContainer}>
          <input type="text" name="imageId" placeholder="Image ID" value={image.imageId} onChange={(e) => handleImageChange(index, e)} style={styles.input} />
          <input type="url" name="publicUrl" placeholder="Public URL" value={image.publicUrl} onChange={(e) => handleImageChange(index, e)} style={styles.input} />
          <input type="url" name="thumbnailUrl" placeholder="Thumbnail URL" value={image.thumbnailUrl} onChange={(e) => handleImageChange(index, e)} style={styles.input} />
          <input type="text" name="alt" placeholder="Alt Text" value={image.alt} onChange={(e) => handleImageChange(index, e)} style={styles.input} />
          <input type="number" name="order" placeholder="Order" value={image.order} onChange={(e) => handleImageChange(index, e)} style={styles.input} />
        </div>
      ))}
      <button type="button" onClick={addImageField} style={styles.addButton}>Add Another Image</button>

      <button type="submit" style={styles.submitButton}>Add Product</button>
    </form>
  );
};

const styles = {
  formContainer: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    backgroundColor: "#f8f9fa",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    textAlign: "center",
    color: "#333333",
    marginBottom: "20px",
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
  },
  smallInput: {
    width: "48%",
    padding: "10px",
    margin: "1% 1% 10px 0",
    borderRadius: "4px",
    border: "1px solid #ced4da",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ced4da",
    resize: "vertical",
  },
  checkboxGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "10px",
  },
  label: {
    margin: "5px 0",
    fontWeight: "500",
  },
  priceContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  addButton: {
    padding: "10px",
    backgroundColor: "#6c757d",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    width: "100%",
  },
  submitButton: {
    padding: "12px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "15px",
    width: "100%",
    fontSize: "1.1em",
    fontWeight: "bold",
  },
  imageContainer: {
    marginBottom: "10px",
    padding: "10px",
    border: "1px solid #e0e0e0",
    borderRadius: "5px",
    backgroundColor: "#f1f1f1",
  },
};

export default ProductForm;
