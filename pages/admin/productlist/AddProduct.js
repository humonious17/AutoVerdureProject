import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

export const AddProduct = ({ onAddProduct, product, onSave }) => {
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
    indoorPlants: "false",
    outdoorPlants: "false",
    seasonalPlants: "false",
    hydroponics: "false",
    traditional: "false",
    frp: "false",
    ceramic: "false",
    sizes: {
      XS: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
      },
      S: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
      },
      M: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
      },
      L: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
      },
      XL: {
        selected: false,
        price: 0,
        width: 0,
        height: 0,
        depth: 0,
        ih: 0,
        il: 0,
      },
    },
    colors: {
      white: { selected: false, price: 0 },
      cream: { selected: false, price: 0 },
      lightGrey: { selected: false, price: 0 },
      darkGrey: { selected: false, price: 0 },
      black: { selected: false, price: 0 },
    },
    images: [],
    stockQuantity: 0,
    defaultSize: "",
    defaultColor: "",
  };

  const [formData, setFormData] = useState(product || initialFormData);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSizeDimensionChange = (size, field, value) => {
    setFormData({
      ...formData,
      sizes: {
        ...formData.sizes,
        [size]: {
          ...formData.sizes[size],
          [field]: value,
        },
      },
    });
  };

  const handleSizePriceChange = (size, value) => {
    setFormData({
      ...formData,
      sizes: {
        ...formData.sizes,
        [size]: {
          ...formData.sizes[size],
          price: value,
        },
      },
    });
  };

  const handleColorPriceChange = (color, value) => {
    setFormData({
      ...formData,
      colors: {
        ...formData.colors,
        [color]: {
          ...formData.colors[color],
          price: value,
        },
      },
    });
  };

  const handleImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const newImages = [...formData.images];
    newImages[index] = files[0];
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, null] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (product) {
      onSave(formData);
    } else {
      onAddProduct(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
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
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Type
        </label>
        <input
          type="text"
          name="productType"
          value={formData.productType}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Description
        </label>
        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Price
        </label>
        <input
          type="number"
          name="productPrice"
          value={formData.productPrice}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Stock Quantity
        </label>
        <input
          type="number"
          name="stockQuantity"
          value={formData.stockQuantity}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Images
        </label>
        {formData.images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="file"
              onChange={(e) => handleImageChange(index, e)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Product"
                className="w-16 h-16 object-cover"
              />
            )}
          </div>
        ))}
        <Button type="button" onClick={addImageField} className="mt-2">
          Add Image
        </Button>
      </div>
      <div className="flex gap-2">
        <Button type="submit" variant="primary" className="flex-1">
          {product ? "Save Changes" : "Add Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="flex-1"
          onClick={() => onSave(null)}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
