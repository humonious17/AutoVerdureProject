/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import ImageCropper from "./ImageCropper";
import { Volume, Weight } from "lucide-react";

const EditProductForm = ({ product, onSave, onCancel }) => {
  const fileInputRefs = {};
  const initialFormData = {
    productId: product.productId || "",
    productName: product.productName || "",
    productSubtitle: product.productSubtitle || "",
    productType: product.productType || "plants",
    productDescription: product.productDescription || "",
    productPrice: product.productPrice || 0,
    innerHeight: product.innerHeight || 0,
    innerLength: product.innerLength || 0,
    dimensions: product.dimensions || "",
    petFriendly: product.petFriendly || "false",
    lessLight: product.lessLight || "false",
    moreLight: product.moreLight || "false",
    indoorPlants: product.indoorPlants || "false",
    outdoorPlants: product.outdoorPlants || "false",
    seasonalPlants: product.seasonalPlants || "false",
    hydroponics: product.hydroponics || "false",
    traditional: product.traditional || "false",
    frp: product.frp || "false",
    ceramic: product.ceramic || "false",
    matt: product.matt || "false",
    gloss: product.gloss || "false",
    art: product.art || "false",
    sizes: product.sizes || {
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
    colors: product.colors || {
      white: { selected: false, price: 0 },
      cream: { selected: false, price: 0 },
      lightGrey: { selected: false, price: 0 },
      darkGrey: { selected: false, price: 0 },
      black: { selected: false, price: 0 },
    },
    images: product.images || [],
    stockQuantity: product.stockQuantity || 0,
    defaultSize: product.defaultSize || "",
    defaultColor: product.defaultColor || "",
  };

  const [storedValues, setStoredValues] = useState(null);

  const [cropperData, setCropperData] = useState({
    isOpen: false,
    file: null,
    imageIndex: null,
  });

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    (() => {
      const defaultSizePrice = formData.sizes[formData.defaultSize]?.price || 0;
      const defaultColorPrice =
        formData.colors[formData.defaultColor]?.price || 0;

      setFormData((prev) => ({
        ...prev,
        productPrice: defaultSizePrice + defaultColorPrice,
      }));
    })();
  }, [formData.defaultSize, formData.defaultColor]);

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

  const validateSelection = () => {
    const hasSize = Object.values(formData.sizes).some((size) => size.selected);
    const hasColor = Object.values(formData.colors).some((color) => color);

    if (!hasSize || !hasColor) {
      alert("Please select at least one size and one color.");
      return false;
    }
    return true;
  };

    const handleImageChange = (index, e) => {
      if (!e) {
        // Open file input when clicking edit button
        if (!fileInputRefs[index]) {
          fileInputRefs[index] = document.createElement('input');
          fileInputRefs[index].type = 'file';
          fileInputRefs[index].accept = 'image/*';
          fileInputRefs[index].onchange = (event) => handleImageChange(index, event);
        }
        fileInputRefs[index].click();
        return;
      }
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
    setFormData((prev) => ({
      ...prev,
      productPrice: defaultSizePrice + defaultColorPrice,
    }));
  };

  const validateForm = () => {
    const selectedSizes = Object.values(formData.sizes).some(
      (size) => size.selected
    );
    const selectedColors = Object.values(formData.colors).some(
      (color) => color.selected
    );
    return selectedSizes && selectedColors;
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

    onSave(formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-primaryMain to-purple-800">
            <h2 className="text-2xl font-bold text-white text-center">
              Edit Product
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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Dimensions (cm)
                </label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                />
              </div>
            </div>

            {/* Features Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Features
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="petFriendly"
                    name="petFriendly"
                    checked={formData.petFriendly === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="petFriendly"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Pet Friendly
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="lessLight"
                    name="lessLight"
                    checked={formData.lessLight === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="lessLight"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Less Light
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="moreLight"
                    name="moreLight"
                    checked={formData.moreLight === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="moreLight"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    More Light
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="indoorPlants"
                    name="indoorPlants"
                    checked={formData.indoorPlants === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="indoorPlants"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Indoor Plants
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="outdoorPlants"
                    name="outdoorPlants"
                    checked={formData.outdoorPlants === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="outdoorPlants"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Outdoor Plants
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="seasonalPlants"
                    name="seasonalPlants"
                    checked={formData.seasonalPlants === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="seasonalPlants"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Seasonal Plants
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="hydroponics"
                    name="hydroponics"
                    checked={formData.hydroponics === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="hydroponics"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Hydroponics
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="traditional"
                    name="traditional"
                    checked={formData.traditional === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="traditional"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Traditional
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="frp"
                    name="frp"
                    checked={formData.frp === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="frp"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    FRP
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="ceramic"
                    name="ceramic"
                    checked={formData.ceramic === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="ceramic"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Ceramic
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="matt"
                    name="matt"
                    checked={formData.matt === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="matt"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Matt
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="gloss"
                    name="gloss"
                    checked={formData.gloss === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="gloss"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Gloss
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="art"
                    name="art"
                    checked={formData.art === "true"}
                    onChange={handleChange}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="art"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Art
                  </label>
                </div>
              </div>
            </div>

            {/* Sizes and Colors Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Sizes and Colors
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sizes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sizes
                  </label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.keys(formData.sizes).map((size) => (
                      <div key={size} className="flex items-center">
                        <input
                          id={size}
                          type="checkbox"
                          name={size}
                          checked={formData.sizes[size].selected}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={size}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-4">
                    {Object.keys(formData.sizes).map((size) => (
                      <div key={size}>
                        {formData.sizes[size].selected && (
                          <Card>
                            <CardContent>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Price
                                  </label>
                                  <input
                                    type="number"
                                    value={formData.sizes[size].price}
                                    onChange={(e) =>
                                      handleSizePriceChange(
                                        size,
                                        e.target.value
                                      )
                                    }
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
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
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                                  />
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Colors
                  </label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.keys(formData.colors).map((color) => (
                      <div key={color} className="flex items-center">
                        <input
                          type="checkbox"
                          id={color}
                          name={color}
                          checked={formData.colors[color].selected}
                          onChange={handleChange}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={color}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-4">
                    {Object.keys(formData.colors).map((color) => (
                      <div key={color}>
                        {formData.colors[color].selected && (
                          <Card>
                            <CardContent>
                              <div>
                                <label className="block text-sm font-medium text-gray-700">
                                  Price
                                </label>
                                <input
                                  type="number"
                                  value={formData.colors[color].price}
                                  onChange={(e) =>
                                    handleColorPriceChange(
                                      color,
                                      e.target.value
                                    )
                                  }
                                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-200 text-black p-2"
                                />
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Default Size and Color Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Default Size and Color
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Default Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Default Size
                  </label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.keys(formData.sizes).map((size) => (
                      <div key={size} className="flex items-center">
                        <input
                          id={size}
                          type="radio"
                          name="defaultSize"
                          value={size}
                          checked={formData.defaultSize === size}
                          onChange={(e) => setDefaultSize(e.target.value)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={size}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Default Color */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Default Color
                  </label>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {Object.keys(formData.colors).map((color) => (
                      <div key={color} className="flex items-center">
                        <input
                          type="radio"
                          id={color}
                          name="defaultColor"
                          value={color}
                          checked={formData.defaultColor === color}
                          onChange={(e) => setDefaultColor(e.target.value)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={color}
                          className="ml-2 block text-sm text-gray-700"
                        >
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                Images
              </h3>

              <div>
                {formData.images.map((image, index) => (
                  <div key={index} className="mb-4">
                    {image.thumbnailUrl ? (
                      <div className="relative">
                        <img
                          src={image.thumbnailUrl}
                          alt={image.alt}
                          className="w-32 h-32 object-cover rounded-md"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageChange(index)}
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 text-gray-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center w-32 h-32 bg-gray-100 rounded-md">
                        <label
                          htmlFor={`imageInput-${index}`}
                          className="cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(index, e)}
                          className="hidden"
                          ref={(el) => fileInputRefs[index] = el}
                        />
                        <input
                          type="file"
                          id={`imageInput-${index}`}
                          accept="image/*"
                          onChange={(e) => handleImageChange(index, e)}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addImageField}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Image
              </button>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onCancel}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {cropperData.isOpen && (
        <ImageCropper
          file={cropperData.file}
          onCancel={handleCropCancel}
          onSave={handleCropSave}
        />
      )}
    </div>
  );
};

export default EditProductForm;
