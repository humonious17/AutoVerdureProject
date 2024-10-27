"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import Select from "react-select";
import Image from "next/image";

const ProductListPage = ({ products: initialProducts }) => {
  const [isClient, setIsClient] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState(initialProducts);
  const [productName, setProductName] = useState("");
  const [productSubTitle, setProductSubTitle] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [priceXS, setPriceXS] = useState("");
  const [priceS, setPriceS] = useState("");
  const [priceM, setPriceM] = useState("");
  const [priceL, setPriceL] = useState("");
  const [priceXL, setPriceXL] = useState("");
  const [dimensionsXS, setDimensionsXS] = useState("");
  const [dimensionsS, setDimensionsS] = useState("");
  const [dimensionsM, setDimensionsM] = useState("");
  const [dimensionsL, setDimensionsL] = useState("");
  const [dimensionsXL, setDimensionsXL] = useState("");
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
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState([]);
  const [finish, setFinish] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Client-side rendering check
  useEffect(() => {
    setIsClient(true);
  }, []);

  const colorOptions = [
    { value: "white", label: "White" },
    { value: "cream", label: "Cream" },
    { value: "darkGrey", label: "Dark Grey" },
    { value: "lightGrey", label: "Light Grey" },
    { value: "black", label: "Black" },
  ];

  const sizeOptions = [
    { value: "XS", label: "XS" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
  ];

  const finishOptions = [
    { value: "matt", label: "Matt" },
    { value: "gloss", label: "Gloss" },
    { value: "Art", label: "Art" },
  ];

  const handleAddProductClick = () => {
    setShowForm(true);
    setEditIndex(null);
    clearForm();
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
      if (name === "productSubTitle") setProductSubTitle(value);
      if (name === "productDetails") setProductDetails(value);
      if (name === "productPrice") setProductPrice(value);
      if (name === "priceXS") setPriceXS(value);
      if (name === "priceS") setPriceS(value);
      if (name === "priceM") setPriceM(value);
      if (name === "priceL") setPriceL(value);
      if (name === "priceXL") setPriceXL(value);
      if (name === "dimensionsXS") setDimensionsXS(value);
      if (name === "dimensionsS") setDimensionsS(value);
      if (name === "dimensionsM") setDimensionsM(value);
      if (name === "dimensionsL") setDimensionsL(value);
      if (name === "dimensionsXL") setDimensionsXL(value);
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
      formData.append("productName", product.name || "");
      formData.append("productSubTitle", product.subTitle || "");
      formData.append("productDetails", product.description || "");
      formData.append("priceXS", product.priceXS || "");
      formData.append("priceS", product.priceS || "");
      formData.append("priceM", product.priceM || "");
      formData.append("priceL", product.priceL || "");
      formData.append("priceXL", product.priceXL || "");
      formData.append("dimensionsXS", product.dimensionsXS || "");
      formData.append("dimensionsS", product.dimensionsS || "");
      formData.append("dimensionsM", product.dimensionsM || "");
      formData.append("dimensionsL", product.dimensionsL || "");
      formData.append("dimensionsXL", product.dimensionsXL || "");
      formData.append("type", product.type || "");
      formData.append("stockQuantity", product.stockQuantity || "");
      formData.append("innerLength", product.innerLength || "");
      formData.append("innerHeight", product.innerHeight || "");
      formData.append("dimensions", product.dimensions || "");

      const images = product.images || [];
      images?.forEach((img, index) => {
        if (img) formData.append(`image${index + 1}`, img);
      });

      Object.keys(checkboxes).forEach((key) => {
        formData.append(key, `${checkboxes[key]}`);
      });

      colors.forEach((color) => {
        formData.append(color.value, "true");
      });

      (product.size || []).forEach((size) => {
        formData.append(size, "true");
      });

      (product.finish || []).forEach((finish) => {
        formData.append(finish, "true");
      });

      return formData;
    };

    // const logFormData = (formData) => {
    //   for (const [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    //   }
    // };

    const submitFormData = async (formData, url) => {
      const response = await fetch(url, { method: "POST", body: formData });
      if (!response.ok) throw new Error("Form submission failed");
      const result = await response.json();
      console.log("Submission Result:", result);
      return result;
    };

    let updatedProducts = [...products];

    const newProduct = {
      id: editIndex !== null ? products[editIndex].id : products.length + 1,
      name: productName,
      subTitle: productSubTitle,
      description: productDetails,
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
      colors: colors.map((color) => color.value),
      size: size.map((size) => size.value),
      finish: finish.map((finish) => finish.value),

      priceXS: priceXS,
      priceS: priceS,
      priceM: priceM,
      priceL: priceL,
      priceXL: priceXL,

      dimensionsXS: dimensionsXS,
      dimensionsS: dimensionsS,
      dimensionsM: dimensionsM,
      dimensionsL: dimensionsL,
      dimensionsXL: dimensionsXL,
    };

    try {
      const formData = createFormData(newProduct);
      // logFormData(formData);

      if (editIndex !== null) {
        updatedProducts[editIndex] = newProduct;
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        await submitFormData(formData, `/api/products/update/${newProduct.id}`);
      } else {
        updatedProducts = [...products, newProduct];
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        const result = await submitFormData(formData, "/api/products/add");

        if (result && result.id) {
          window.location.href = `store/${productName}/${result.id}`;
        }
      }
    } catch (error) {
      console.error("There was a problem with your fetch operation:", error);
    } finally {
      setLoading(false);
      setShowForm(false);
      clearForm();
    }
  };

  // On component mount, retrieve products from localStorage
  useEffect(() => {
    const savedProducts = JSON.parse(localStorage.getItem("products"));
    if (savedProducts) {
      setProducts(savedProducts);
    }
  }, []);

  const handleEdit = (index) => {
    const editedProduct = products[index];

    setProductName(editedProduct.name || "");
    setProductSubTitle(editedProduct.subTitle || "");
    setProductDetails(editedProduct.description || "");
    // setProductPrice(editedProduct.price || "");
    setType(editedProduct.type || "");
    setStockQuantity(editedProduct.stockQuantity || "");
    setInnerHeight(editedProduct.innerHeight || "");
    setInnerLength(editedProduct.innerLength || "");
    setDimensions(editedProduct.dimensions || "");

    // Add size-specific prices
    setPriceXS(editedProduct.priceXS || "");
    setPriceS(editedProduct.priceS || "");
    setPriceM(editedProduct.priceM || "");
    setPriceL(editedProduct.priceL || "");
    setPriceXL(editedProduct.priceXL || "");

    // Add size-specific dimensions
    setDimensionsXS(editedProduct.dimensionsXS || "");
    setDimensionsS(editedProduct.dimensionsS || "");
    setDimensionsM(editedProduct.dimensionsM || "");
    setDimensionsL(editedProduct.dimensionsL || "");
    setDimensionsXL(editedProduct.dimensionsXL || "");

    setProductImages({
      first: editedProduct.images?.[0] || null,
      second: editedProduct.images?.[1] || null,
      third: editedProduct.images?.[2] || null,
      fourth: editedProduct.images?.[3] || null,
      fifth: editedProduct.images?.[4] || null,
    });

    setCheckboxes({
      petFriendly: editedProduct.attributes?.petFriendly || false,
      notPetFriendly: editedProduct.attributes?.notPetFriendly || false,
      moreSunlight: editedProduct.attributes?.moreLight || false,
      lessSunlight: editedProduct.attributes?.lessLight || false,
    });

    setColors(
      colorOptions.filter((option) =>
        editedProduct.colors?.includes(option.value)
      )
    );

    setSize(
      sizeOptions.filter((option) => editedProduct.size?.includes(option.value))
    );

    setFinish(
      finishOptions.filter((option) =>
        editedProduct.finish?.includes(option.value)
      )
    );

    setShowForm(true);
    setEditIndex(index);
  };

  const clearForm = () => {
    setProductName("");
    setProductSubTitle("");
    setProductDetails("");
    // setProductPrice("");
    setType("");
    setStockQuantity("");
    setInnerHeight("");
    setInnerLength("");
    setDimensions("");

    // Clear size-specific prices
    setPriceXS("");
    setPriceS("");
    setPriceM("");
    setPriceL("");
    setPriceXL("");

    // Clear size-specific dimensions
    setDimensionsXS("");
    setDimensionsS("");
    setDimensionsM("");
    setDimensionsL("");
    setDimensionsXL("");

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

    setColors([]);
    setSize([]);
    setFinish([]);
  };

  const handleCheckboxChange = (index) => {
    setSelectedProducts((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleDeleteChecked = async () => {
    const idsToDelete = products
      .filter((_, i) => selectedProducts.includes(i))
      .map((product) => product.id);

    // Make an API call to delete the selected products
    try {
      await Promise.all(
        idsToDelete.map((id) =>
          fetch(`/api/products/delete/${id}`, {
            method: "DELETE",
          })
        )
      );

      // Update the products state and local storage
      const updatedProducts = products.filter(
        (_, i) => !selectedProducts.includes(i)
      );
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts)); // Update local storage
      setSelectedProducts([]);
    } catch (error) {
      console.error("Error deleting products:", error);
    }
  };

  if (!isClient) return null;

  return (
    <div className="container">
      {!showForm ? (
        <div>
          <div className="header">
            <h1>All Products</h1>
            <button
              className="add-product-button"
              onClick={handleAddProductClick}
            >
              Add Product
            </button>
            <button
              onClick={handleDeleteChecked}
              className="delete-checked-button"
            >
              Delete
            </button>
          </div>

          <table rules="all">
            <thead className="w-[1160px]  mt-[30px] hidden md:flex flex-col gap-5">
              <tr className="inline-flex justify-between items-center pl-[190px]">
                <td className="w-[50px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">
                  Product
                </td>
                {/* <td className="w-[80px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">
                  Dimensions
                </td> */}
                <td className="w-[50px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">
                  Stock Quantity
                </td>
                <td className="w-[50px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">
                  Type
                </td>
                <td className="w-[100px] text-gray-900 text-xs font-normal font-['Poppins'] tracking-tight">
                  Actions
                </td>
              </tr>
            </thead>

            <tbody className="mt-[30px] hidden md:flex flex-col gap-5">
              {products.map((product, index) => (
                <tr
                  key={product.id}
                  className="px-[35px] py-[38px] text-xs w-full border-[1px] border-black rounded-2xl bg-white flex justify-between items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(index)}
                    className="product-checkbox"
                    onChange={(e) => handleCheckboxChange(index)}
                  />
                  <td className="w-[110px]">{product.name}</td>
                  {/* <td className="w-[120px]">{product.dimensions}</td> */}
                  <td className="w-[70px]">{product.stockQuantity}</td>
                  <td className="w-[90px]">{product.type}</td>
                  <td className="w-[70px] flex justify-around items-center">
                    <button
                      onClick={() => handleEdit(index)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <br />
        </div>
      ) : (
        <div>
          {loading ? (
            <div className="loading-container">
              <l-newtons-cradle
                size="78"
                speed="1.4"
                color="black"
              ></l-newtons-cradle>
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
                  <label>Sub-Title</label>
                  <input
                    type="text"
                    name="productSubTitle"
                    value={productSubTitle}
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "48%" }}>
                      <label>Stock Quantity</label>
                      <input
                        type="number"
                        name="stockQuantity"
                        value={stockQuantity}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* New Price Fields for Different Sizes */}
                <div className="form-group">
                  <label>Price for Each Size</label>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "18%" }}>
                      <label>XS</label>
                      <input
                        type="number"
                        name="priceXS"
                        value={priceXS}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ width: "18%" }}>
                      <label>S</label>
                      <input
                        type="number"
                        name="priceS"
                        value={priceS}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ width: "18%" }}>
                      <label>M</label>
                      <input
                        type="number"
                        name="priceM"
                        value={priceM}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ width: "18%" }}>
                      <label>L</label>
                      <input
                        type="number"
                        name="priceL"
                        value={priceL}
                        onChange={handleChange}
                      />
                    </div>
                    <div style={{ width: "18%" }}>
                      <label>XL</label>
                      <input
                        type="number"
                        name="priceXL"
                        value={priceXL}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                {/* New Dimension Fields for Different Sizes */}
                <div className="form-group">
                  <label>Dimensions for Each Size</label>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div style={{ width: "18%" }}>
                      <label>XS</label>
                      <input
                        type="text"
                        name="dimensionsXS"
                        value={dimensionsXS}
                        onChange={handleChange}
                        placeholder="LxWxH"
                      />
                    </div>
                    <div style={{ width: "18%" }}>
                      <label>S</label>
                      <input
                        type="text"
                        name="dimensionsS"
                        value={dimensionsS}
                        onChange={handleChange}
                        placeholder="LxWxH"
                      />
                    </div>
                    <div style={{ width: "18%" }}>
                      <label>M</label>
                      <input
                        type="text"
                        name="dimensionsM"
                        value={dimensionsM}
                        onChange={handleChange}
                        placeholder="LxWxH"
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ width: "18%" }}>
                      <label>L</label>
                      <input
                        type="text"
                        name="dimensionsL"
                        value={dimensionsL}
                        onChange={handleChange}
                        placeholder="LxWxH"
                      />
                    </div>
                    <div style={{ width: "18%" }}>
                      <label>XL</label>
                      <input
                        type="text"
                        name="dimensionsXL"
                        value={dimensionsXL}
                        onChange={handleChange}
                        placeholder="LxWxH"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Select Type</label>
                  <select name="type" value={type} onChange={handleChange}>
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
              <div className="right-column" style={{ marginLeft: "100px" }}>
                <div className="display-column">
                  <h3>
                    <span class="bolded">Product Gallery</span>
                  </h3>
                  <div className="gallery-thumbnails">
                    {Object.keys(productImages).map((key, index) => (
                      <div key={index} className="thumbnail">
                        {productImages[key] instanceof File ? (
                          <img
                            src={URL.createObjectURL(productImages[key])}
                            alt={`Thumbnail ${index + 1}`}
                          />
                        ) : (
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

              <div
                className="form-group"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label>Inner Length</label>
                  <input
                    type="number"
                    name="innerLength"
                    value={innerLength}
                    onChange={handleChange}
                  />
                </div>
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label>Inner Height</label>
                  <input
                    type="number"
                    name="innerHeight"
                    value={innerHeight}
                    onChange={handleChange}
                  />
                </div>
                {/* <div style={{ flex: 1 }}>
                  <label>Dimensions</label>
                  <input
                    type="text"
                    name="dimensions"
                    value={dimensions}
                    onChange={handleChange}
                  />
                </div> */}
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
  // Dynamically import the findAllProducts function
  const findAllProducts = (await import("@/pages/api/products/findAllProducts"))
    .default;

  // Fetch products of various types
  const productTypes = ["zenpot", "grobox", "plants", "accessory"];
  const products = await Promise.all(
    productTypes.map((type) => findAllProducts(type))
  );

  // Flatten the array and remove any undefined values
  const allProducts = products.flat().filter(Boolean);

  return {
    props: {
      products: allProducts,
    },
  };
}

export default ProductListPage;
