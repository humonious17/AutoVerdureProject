import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const EditProductForm = ({ product, onSave, onCancel }) => {
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
    indoorPlants: product.indoorPlants || "false",
    outdoorPlants: product.outdoorPlants || "false",
    seasonalPlants: product.seasonalPlants || "false",
    hydroponics: product.hydroponics || "false",
    traditional: product.traditional || "false",
    frp: product.frp || "false",
    ceramic: product.ceramic || "false",
    sizes: product.sizes || {
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

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name in formData.sizes) {
      setFormData((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: {
            ...prev.sizes[name],
            selected: checked,
          },
        },
      }));
    } else if (name in formData.colors) {
      setFormData((prev) => ({
        ...prev,
        colors: {
          ...prev.colors,
          [name]: {
            ...prev.colors[name],
            selected: checked,
          },
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
    setFormData((prev) => ({
      ...prev,
      sizes: {
        ...prev.sizes,
        [size]: {
          ...prev.sizes[size],
          price: Number(value),
        },
      },
    }));
  };

  const handleColorPriceChange = (color, value) => {
    setFormData((prev) => ({
      ...prev,
      colors: {
        ...prev.colors,
        [color]: {
          ...prev.colors[color],
          price: Number(value),
        },
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Type
              </label>
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="plants">Plants</option>
                <option value="planters">Planters</option>
                <option value="flowers">Flowers</option>
                <option value="accessory">Accessory</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="productPrice"
                value={formData.productPrice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="productDescription"
              value={formData.productDescription}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="petFriendly"
                checked={formData.petFriendly === "true"}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Pet Friendly</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="indoorPlants"
                checked={formData.indoorPlants === "true"}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Indoor Plants</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="outdoorPlants"
                checked={formData.outdoorPlants === "true"}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Outdoor Plants</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="seasonalPlants"
                checked={formData.seasonalPlants === "true"}
                onChange={handleChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Seasonal Plants</span>
            </label>
          </div>

          <div className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductForm;
