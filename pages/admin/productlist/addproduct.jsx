import { useState } from "react";

const ProductForm = () => {
  const initialFormData = {
    productId: "",
    productName: "",
    productType: "plants",
    productDescription: "",
    productPrice: 0,
    innerHeight: 0,
    innerLength: 0,
    dimensions: "",
    petFriendly: false,
    lessLight: false,
    moreLight: false,
    sizes: {
      XS: { selected: false, price: 0 },
      S: { selected: false, price: 0 },
      M: { selected: false, price: 0 },
      L: { selected: false, price: 0 },
      XL: { selected: false, price: 0 },
    },
    colors: {
      white: false,
      cream: false,
      lightGrey: false,
      darkGrey: false,
      black: false,
    },
    images: [],
    stockQuantity: 0, // New field for stock quantity
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.sizes) {
      setFormData((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: { selected: checked, price: prev.sizes[name].price },
        },
      }));
    } else if (name in formData.colors) {
      setFormData((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [name]: checked, // Update color selection
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSizePriceChange = (size, value) => {
    setFormData((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: { ...prev.sizes[size], price: Number(value) },
      },
    }));
  };

  const handleImageChange = async (index, e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No files selected.");
      return;
    }

    const file = e.target.files[0];
    if (file) {
      await uploadToCloudinary(file, index);
    }
  };

  const uploadToCloudinary = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (response.ok) {
      setFormData((prev) => {
        const images = [...prev.images];
        images[index] = {
          publicUrl: data.secure_url,
          thumbnailUrl: data.eager && data.eager.length > 0 ? data.eager[0].secure_url : data.secure_url,
          alt: "",
        };
        return { ...prev, images };
      });
    } else {
      console.error("Upload failed:", data);
      alert("Image upload failed. Please check console for details.");
    }
  };

  const addImageField = () => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { publicUrl: "", thumbnailUrl: "", alt: "" }],
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
      setFormData(initialFormData);
    } else {
      alert("Failed to add product.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.formContainer}>
      <h2 style={styles.header}>Add Product</h2>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Product ID</label>
        <input type="text" name="productId" value={formData.productId} onChange={handleChange} required style={styles.input} />
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Product Name</label>
        <input type="text" name="productName" value={formData.productName} onChange={handleChange} required style={styles.input} />
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Product Type</label>
        <select name="productType" value={formData.productType} onChange={handleChange} style={styles.select}>
          <option value="plants">Plants</option>
          <option value="zenpot">Zenpot</option>
          <option value="grobox">Grobox</option>
          <option value="accessory">Accessory</option>
        </select>
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Product Description</label>
        <textarea name="productDescription" value={formData.productDescription} onChange={handleChange} style={styles.textarea} />
      </div>

      <div style={styles.row}>
        <div style={styles.fieldContainer}>
          <label style={styles.label}>Product Price</label>
          <input type="number" name="productPrice" value={formData.productPrice} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.fieldContainer}>
          <label style={styles.label}>Stock Quantity</label>
          <input type="number" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.fieldContainer}>
          <label style={styles.label}>Inner Height (cm)</label>
          <input type="number" name="innerHeight" value={formData.innerHeight} onChange={handleChange} style={styles.smallInput} />
        </div>

        <div style={styles.fieldContainer}>
          <label style={styles.label}>Inner Length (cm)</label>
          <input type="number" name="innerLength" value={formData.innerLength} onChange={handleChange} style={styles.smallInput} />
        </div>
      </div>

      <div style={styles.fieldContainer}>
        <label style={styles.label}>Dimensions (e.g., 15cm x 10cm x 20cm)</label>
        <input type="text" name="dimensions" value={formData.dimensions} onChange={handleChange} style={styles.input} />
      </div>

      <h3 style={styles.subHeader}>Lighting Conditions</h3>
      <div style={styles.checkboxGroup}>
        <label style={styles.label}>
          <input type="checkbox" name="petFriendly" checked={formData.petFriendly} onChange={handleChange} />
          Pet Friendly
        </label>
      </div>
      <div style={styles.checkboxGroup}>
        <label style={styles.label}>
          <input type="checkbox" name="lessLight" checked={formData.lessLight} onChange={handleChange} />
          Less Light
        </label>
      </div>
      <div style={styles.checkboxGroup}>
        <label style={styles.label}>
          <input type="checkbox" name="moreLight" checked={formData.moreLight} onChange={handleChange} />
          More Light
        </label>
      </div>

      <h3 style={styles.subHeader}>Sizes</h3>
      <div style={styles.sizesContainer}>
        {Object.keys(formData.sizes).map((size) => (
          <div key={size} style={styles.checkboxGroup}>
            <label style={styles.label}>
              <input
                type="checkbox"
                name={size}
                checked={formData.sizes[size].selected}
                onChange={handleChange}
              />
              {size}
            </label>
            {formData.sizes[size].selected && (
              <input
                type="number"
                value={formData.sizes[size].price}
                onChange={(e) => handleSizePriceChange(size, e.target.value)}
                placeholder={`Price for ${size}`}
                style={styles.priceInput}
              />
            )}
          </div>
        ))}
      </div>

      <h3 style={styles.subHeader}>Colors</h3>
      <div style={styles.colorsContainer}>
        {Object.keys(formData.colors).map((color) => (
          <div key={color} style={styles.checkboxGroup}>
            <label style={styles.label}>
              <input
                type="checkbox"
                name={color}
                checked={formData.colors[color]}
                onChange={handleChange}
              />
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </label>
          </div>
        ))}
      </div>

      <h3 style={styles.subHeader}>Images</h3>
      {formData.images.map((image, index) => (
        <div key={index} style={styles.imageContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(index, e)}
            style={styles.fileInput}
          />
          {image.thumbnailUrl && <img src={image.thumbnailUrl} alt="" style={styles.imagePreview} />}
        </div>
      ))}
      <button type="button" onClick={addImageField} style={styles.button}>
        Add Image
      </button>

      <button type="submit" style={styles.submitButton}>
        Submit
      </button>
    </form>
  );
};

const styles = {
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
  },
  header: {
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  smallInput: {
    width: '48%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginRight: '4%',
  },
  textarea: {
    width: '100%',
    height: '100px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  select: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  checkboxGroup: {
    marginBottom: '10px',
  },
  subHeader: {
    marginTop: '20px',
    marginBottom: '10px',
  },
  sizesContainer: {
    marginBottom: '20px',
  },
  colorsContainer: {
    marginBottom: '20px',
  },
  imageContainer: {
    marginBottom: '10px',
  },
  fileInput: {
    marginBottom: '5px',
  },
  imagePreview: {
    maxWidth: '100px',
    marginTop: '5px',
  },
  priceInput: {
    width: '80px',
    marginLeft: '10px',
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  button: {
    marginTop: '10px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
  },
  submitButton: {
    marginTop: '20px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#28A745',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default ProductForm;
