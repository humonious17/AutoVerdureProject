/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ImageCropper from "./ImageCropper";
import { Volume, Weight } from "lucide-react";

const ProductForm = () => {
  const initialFormData = {
    productId: "",
    productName: "",
    productSubtitle: "",
    productType: "plants",
    productDescription: "",
    productPrice: 0,
    innerHeight: 0,
    innerLength: 0,
    dimensions: "",
    petFriendly: "false",
    lessLight: "false",
    moreLight: "false",
    indoorPlants: "false",
    outdoorPlants: "false",
    seasonalPlants: "false",
    hydroponics: "false",
    traditional: "false",
    frp: "false",
    ceramic: "false",
    matt: "false",
    gloss: "false",
    art: "false",
    finish: {
      matt: { selected: false, price: 0 },
      gloss: { selected: false, price: 0 },
      art: { selected: false, price: 0 },
    },
    defaultFinish: "",
    sizes: {
      XS: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
        outerHeight: 0,
        outerDiameter: 0,
        weight: 0,
        volume: 0,
      },
      S: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
        outerHeight: 0,
        outerDiameter: 0,
        weight: 0,
        volume: 0,
      },
      M: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
        outerHeight: 0,
        outerDiameter: 0,
        weight: 0,
        volume: 0,
      },
      L: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
        outerHeight: 0,
        outerDiameter: 0,
        weight: 0,
        volume: 0,
      },
      XL: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
        outerHeight: 0,
        outerDiameter: 0,
        weight: 0,
        volume: 0,
      },
    },
    colors: {
      white: { selected: false, price: 0 },
      cream: { selected: false, price: 0 },
      lightGrey: { selected: false, price: 0 },
      darkGrey: { selected: false, price: 0 },
      black: { selected: false, price: 0 },
    },
    finish: {
      matt: { selected: false, price: 0 },
      gloss: { selected: false, price: 0 },
      art: { selected: false, price: 0 },
    },
    images: [],
    stockQuantity: 0,
    defaultSize: "",
    defaultColor: "",
  };

  const [storedValues, setStoredValues] = useState(null);

  const [cropperData, setCropperData] = useState({
    isOpen: false,
    file: null,
    imageIndex: null,
  });

  const [formData, setFormData] = useState(initialFormData);
  useEffect(() => {
    const defaultSizePrice = formData.sizes[formData.defaultSize]?.price || 0;
    const defaultColorPrice =
      formData.colors[formData.defaultColor]?.price || 0;
    const defaultFinishPrice =
      formData.finish[formData.defaultFinish]?.price || 0;

    setFormData((prev) => ({
      ...prev,
      productPrice: defaultSizePrice + defaultColorPrice + defaultFinishPrice,
    }));
  }, [formData.defaultSize, formData.defaultColor, formData.defaultFinish]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.sizes) {
      setFormData((prev) => ({
        ...prev,
        [name]: checked.toString(),
        sizes: {
          ...prev.sizes,
          [name]: {
            selected: checked,
            price: prev.sizes[name].price,
            width: prev.sizes[name].width,
            height: prev.sizes[name].height,
            depth: prev.sizes[name].depth,
          },
        },
      }));
    } else if (name in formData.colors) {
      setFormData((prev) => ({
        ...prev,
        [name]: checked.toString(),
        colors: {
          ...prev.colors,
          [name]: { selected: checked, price: prev.colors[name].price },
        },
      }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked.toString() }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSizeDimensionChange = (size, field, value) => {
    setFormData((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: {
          ...prev.sizes[size],
          [field]: Number(value),
        },
      },
    }));
  };

  const handleSizePriceChange = (size, value) => {
    setFormData((prev) => {
      const updatedSizes = {
        ...prev.sizes,
        [size]: { ...prev.sizes[size], price: Number(value) },
      };

      const selectedSizes = Object.entries(updatedSizes)
        .filter(([_, details]) => details.selected)
        .map(([_, details]) => details.price);

      const smallestPrice = Math.min(...selectedSizes);

      return {
        ...prev,
        sizes: updatedSizes,
        productPrice:
          selectedSizes.length > 0 ? smallestPrice : prev.productPrice,
      };
    });
  };

  const handleColorPriceChange = (color, value) => {
    setFormData((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [color]: { ...prev.colors[color], price: Number(value) },
      },
    }));
  };

  const handleFinishPriceChange = (finish, value) => {
    setFormData((prev) => ({
      ...prev,
      finish: {
        ...prev.finish,
        [finish]: { ...prev.finish[finish], price: Number(value) },
      },
    }));
  };

  const setDefaultFinish = (finish) => {
    setFormData((prev) => ({
      ...prev,
      defaultFinish: finish,
    }));
    calculateProductPrice();
  };

  const validateSelection = () => {
    const hasSize = Object.values(formData.sizes).some((size) => size.selected);
    const hasColor = Object.values(formData.colors).some((color) => color);

    if (!hasSize || !hasColor) {
      alert("Please select at least one size and one color.");
      return false;
    }
    return true;
  };

  const handleImageChange = async (index, e) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("No files selected.");
      return;
    }

    const file = e.target.files[0];
    if (file) {
      setCropperData({
        isOpen: true,
        file: file,
        imageIndex: index,
      });
    }
  };

  const handleCropCancel = () => {
    setCropperData({
      isOpen: false,
      file: null,
      imageIndex: null,
    });
  };

  const handleCropSave = async (croppedFile) => {
    setCropperData({
      isOpen: false,
      file: null,
      imageIndex: null,
    });
    await uploadToCloudinary(croppedFile, cropperData.imageIndex);
  };

  const uploadToCloudinary = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();

    if (response.ok) {
      setFormData((prev) => {
        const images = [...prev.images];
        images[index] = {
          publicUrl: data.secure_url,
          thumbnailUrl:
            data.eager && data.eager.length > 0
              ? data.eager[0].secure_url
              : data.secure_url,
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

  const setDefaultSize = (size) => {
    setFormData((prev) => ({
      ...prev,
      defaultSize: size,
    }));
    // Directly calculate price after setting default size
    calculateProductPrice();
  };

  const setDefaultColor = (color) => {
    setFormData((prev) => ({
      ...prev,
      defaultColor: color,
    }));
    // Directly calculate price after setting default color
    calculateProductPrice();
  };

  const calculateProductPrice = () => {
    const defaultSizePrice = formData.sizes[formData.defaultSize]?.price || 0;
    const defaultColorPrice =
      formData.colors[formData.defaultColor]?.price || 0;
    const defaultFinishPrice =
      formData.finish[formData.defaultFinish]?.price || 0;

    setFormData((prev) => ({
      ...prev,
      productPrice: defaultSizePrice + defaultColorPrice + defaultFinishPrice,
    }));
  };

  const validateForm = () => {
    const selectedSizes = Object.values(formData.sizes).some(
      (size) => size.selected
    );
    const selectedColors = Object.values(formData.colors).some(
      (color) => color.selected
    );
    const selectedFinishes = Object.values(formData.finish).some(
      (finish) => finish.selected
    );
    return selectedSizes && selectedColors && selectedFinishes;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStoredValues({ ...formData });

    if (!validateForm()) {
      alert("Please select at least one size and one color.");
      return;
    }

    (() => {
      const defaultSizePrice = formData.sizes[formData.defaultSize]?.price || 0;
      const defaultColorPrice =
        formData.colors[formData.defaultColor]?.price || 0;

      setFormData((prev) => ({
        ...prev,
        productPrice: defaultSizePrice + defaultColorPrice,
      }));
    })();

    // Ensure `productId` is either provided by the user or auto-generated
    const productId = formData.productId || db.collection("products").doc().id;

    const response = await fetch("/api/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productData: formData,
        productId,
      }),
    });

    if (response.ok) {
      alert("Product added successfully!");
      setFormData(initialFormData);
    } else {
      alert("Failed to add product.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-primaryMain to-purple-800">
            <h2 className="text-2xl font-bold text-white text-center">
              Add Product
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product ID
                  </label>
                  <input
                    type="text"
                    name="productId"
                    value={formData.productId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Type
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                >
                  <option value="plants">Plants</option>
                  <option value="planters">Planters</option>
                  <option value="flowers">Flowers</option>
                  <option value="accessory">Accessory</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Subtitle
                </label>
                <input
                  type="text"
                  name="productSubtitle"
                  value={formData.productSubtitle}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2 whitespace-pre-wrap"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Product Description
                </label>
                <textarea
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2 whitespace-pre-wrap"
                />
              </div>
            </div>

            {/* Specifications Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Specifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Inner Height (cm)
                  </label>
                  <input
                    type="number"
                    name="innerHeight"
                    value={formData.innerHeight}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Inner Length (cm)
                  </label>
                  <input
                    type="number"
                    name="innerLength"
                    value={formData.innerLength}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                  />
                </div>
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Features
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="petFriendly"
                    checked={formData.petFriendly === "true"}
                    onChange={handleChange}
                    className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                  />
                  <span className="text-sm text-gray-700">Pet Friendly</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="lessLight"
                    checked={formData.lessLight === "true"}
                    onChange={handleChange}
                    className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                  />
                  <span className="text-sm text-gray-700">Less Light</span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    name="moreLight"
                    checked={formData.moreLight === "true"}
                    onChange={handleChange}
                    className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                  />
                  <span className="text-sm text-gray-700">More Light</span>
                </label>
              </div>
            </div>

            {/* New fields */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Additional Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="indoorPlants"
                      checked={formData.indoorPlants === "true"}
                      onChange={handleChange}
                      className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                    />
                    <span className="text-sm text-gray-700">Indoor Plants</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="outdoorPlants"
                      checked={formData.outdoorPlants === "true"}
                      onChange={handleChange}
                      className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                    />
                    <span className="text-sm text-gray-700">
                      Outdoor Plants
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="seasonalPlants"
                      checked={formData.seasonalPlants === "true"}
                      onChange={handleChange}
                      className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                    />
                    <span className="text-sm text-gray-700">
                      Seasonal Plants
                    </span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="hydroponics"
                      checked={formData.hydroponics === "true"}
                      onChange={handleChange}
                      className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                    />
                    <span className="text-sm text-gray-700">Hydroponics</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="traditional"
                      checked={formData.traditional === "true"}
                      onChange={handleChange}
                      className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                    />
                    <span className="text-sm text-gray-700">Traditional</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="frp"
                      checked={formData.frp === "true"}
                      onChange={handleChange}
                      className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                    />
                    <span className="text-sm text-gray-700">FRP</span>
                  </label>
                </div>

                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      name="ceramic"
                      checked={formData.ceramic === "true"}
                      onChange={handleChange}
                      className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                    />
                    <span className="text-sm text-gray-700">Ceramic</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Product Finish Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Product Finish (Price)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(formData.finish).map((finish) => (
                  <div key={finish} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name={finish}
                          checked={formData.finish[finish].selected}
                          onChange={(e) => {
                            const { checked } = e.target;
                            setFormData((prev) => ({
                              ...prev,
                              finish: {
                                ...prev.finish,
                                [finish]: {
                                  ...prev.finish[finish],
                                  selected: checked,
                                },
                              },
                            }));
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                        />
                        <span className="font-medium text-gray-700">
                          {finish.charAt(0).toUpperCase() + finish.slice(1)}
                        </span>
                      </label>
                    </div>

                    {formData.finish[finish].selected && (
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={formData.finish[finish].price}
                          onChange={(e) =>
                            handleFinishPriceChange(finish, e.target.value)
                          }
                          placeholder={`Price for ${finish}`}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="defaultFinish"
                            checked={formData.defaultFinish === finish}
                            onChange={() => setDefaultFinish(finish)}
                            className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-200 text-black p-2"
                          />
                          <span className="text-sm text-gray-600">
                            Set as Default
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes Section */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 border-b pb-3">
                Sizes & Dimensions
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {Object.keys(formData.sizes).map((size) => (
                  <Card key={size} className="overflow-hidden">
                    <CardContent className="p-4">
                      {/* Size Header with Checkbox */}
                      <div className="flex items-center justify-between mb-4">
                        <label className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            name={size}
                            checked={formData.sizes[size].selected}
                            onChange={handleChange}
                            className="rounded border-gray-300  focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                          />
                          <span className="font-semibold text-gray-900">
                            {size}
                          </span>
                        </label>
                      </div>

                      {formData.sizes[size].selected && (
                        <div className="space-y-4">
                          {/* Price Section */}
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Price
                            </label>
                            <input
                              type="number"
                              value={formData.sizes[size].price}
                              onChange={(e) =>
                                handleSizePriceChange(size, e.target.value)
                              }
                              placeholder="Enter price"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                            />
                          </div>

                          {/* Dimensions Grid */}
                          <div className="space-y-4">
                            <p className="text-sm font-medium text-gray-700">
                              Dimensions
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                              {/* Outer Dimensions */}
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Width (cm)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].width}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "width",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Height (cm)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].height}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "height",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Depth (cm)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].depth}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "depth",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                            </div>

                            {/* Inner Dimensions */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Inner Height (cm)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].ih}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "ih",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Inner Length (cm)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].il}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "il",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Outer Height (cm)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].outerHeight}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "outerHeight",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Outer Diameter (cm)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].outerDiameter}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "outerDiameter",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Weight (grams)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].weight}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "weight",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="block text-xs font-medium text-gray-500">
                                  Volume (L)
                                </label>
                                <input
                                  type="number"
                                  value={formData.sizes[size].volume}
                                  onChange={(e) =>
                                    handleSizeDimensionChange(
                                      size,
                                      "volume",
                                      e.target.value
                                    )
                                  }
                                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm bg-gray-200 text-black p-2"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Default Size Radio */}
                          <label className="flex items-center space-x-2 mt-4">
                            <input
                              type="radio"
                              name="defaultSize"
                              checked={formData.defaultSize === size}
                              onChange={() => setDefaultSize(size)}
                              className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-200 text-black p-2"
                            />
                            <span className="text-sm text-gray-600">
                              Set as Default Size
                            </span>
                          </label>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Colors Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Colors (Price)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.keys(formData.colors).map((color) => (
                  <div key={color} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name={color}
                          checked={formData.colors[color].selected}
                          onChange={handleChange}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4 bg-gray-200 text-black p-2"
                        />
                        <span className="font-medium text-gray-700">
                          {color.charAt(0).toUpperCase() + color.slice(1)}
                        </span>
                      </label>
                    </div>

                    {formData.colors[color].selected && (
                      <div className="space-y-2">
                        <input
                          type="number"
                          value={formData.colors[color].price}
                          onChange={(e) =>
                            handleColorPriceChange(color, e.target.value)
                          }
                          placeholder={`Price for ${color}`}
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                        />
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name="defaultColor"
                            checked={formData.defaultColor === color}
                            onChange={() => setDefaultColor(color)}
                            className="rounded-full border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-200 text-black p-2"
                          />
                          <span className="text-sm text-gray-600">
                            Set as Default
                          </span>
                        </label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Price Display */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-700">
                  Starting Product Price
                </span>
                <span className="text-2xl font-bold text-blue-600">
                  ₹ {formData.productPrice}
                </span>
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Images
              </h3>

              <div className="space-y-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    {image.thumbnailUrl && (
                      <img
                        src={image.thumbnailUrl}
                        alt=""
                        className="h-36 w-36 object-cover rounded-md"
                      />
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addImageField}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primaryMain bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Image
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primaryMain hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Product
              </button>
            </div>
          </form>
          {cropperData.isOpen && (
            <ImageCropper
              file={cropperData.file}
              onSave={handleCropSave}
              onCancel={handleCropCancel}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
