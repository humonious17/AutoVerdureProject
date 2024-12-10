import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const EditProductForm = ({ product, onSave, onCancel }) => {
  // Same initialFormData as in the original component
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
  const [activeTab, setActiveTab] = useState("basic");

  // All previous handleChange, handleSizeDimensionChange, handleSizePriceChange, handleColorPriceChange methods remain the same

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

  const renderTooltip = (description) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Info className="h-4 w-4 text-gray-500 ml-2" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold">Edit Product Details</h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 m-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="variants">Sizes & Colors</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <TabsContent value="basic">
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option value="plants">Plants</option>
                    <option value="planters">Planters</option>
                    <option value="flowers">Flowers</option>
                    <option value="accessory">Accessory</option>
                  </select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="productDescription"
                    value={formData.productDescription}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        name="productPrice"
                        value={formData.productPrice}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
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
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="variants">
              {/* Sizes Section */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Sizes</h3>
                {Object.entries(formData.sizes).map(([size, sizeData]) => (
                  <div key={size} className="mb-4 p-4 border rounded-lg">
                    <div className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        name={size}
                        checked={sizeData.selected}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <span className="font-medium">{size} Size</span>
                    </div>
                    {sizeData.selected && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <input
                          type="number"
                          placeholder="Width"
                          value={sizeData.width}
                          onChange={(e) =>
                            handleSizeDimensionChange(
                              size,
                              "width",
                              e.target.value
                            )
                          }
                          className="rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                          type="number"
                          placeholder="Height"
                          value={sizeData.height}
                          onChange={(e) =>
                            handleSizeDimensionChange(
                              size,
                              "height",
                              e.target.value
                            )
                          }
                          className="rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                          type="number"
                          placeholder="Depth"
                          value={sizeData.depth}
                          onChange={(e) =>
                            handleSizeDimensionChange(
                              size,
                              "depth",
                              e.target.value
                            )
                          }
                          className="rounded-md border-gray-300 shadow-sm"
                        />
                        <input
                          type="number"
                          placeholder="Price Adjustment"
                          value={sizeData.price}
                          onChange={(e) =>
                            handleSizePriceChange(size, e.target.value)
                          }
                          className="rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Colors Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Colors</h3>
                {Object.entries(formData.colors).map(([color, colorData]) => (
                  <div
                    key={color}
                    className="mb-4 p-4 border rounded-lg flex items-center"
                  >
                    <input
                      type="checkbox"
                      name={color}
                      checked={colorData.selected}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <span className="font-medium capitalize mr-4">{color}</span>
                    {colorData.selected && (
                      <input
                        type="number"
                        placeholder="Price Adjustment"
                        value={colorData.price}
                        onChange={(e) =>
                          handleColorPriceChange(color, e.target.value)
                        }
                        className="rounded-md border-gray-300 shadow-sm"
                      />
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "petFriendly", label: "Pet Friendly" },
                  { name: "indoorPlants", label: "Indoor Plants" },
                  { name: "outdoorPlants", label: "Outdoor Plants" },
                  { name: "seasonalPlants", label: "Seasonal Plants" },
                  { name: "hydroponics", label: "Hydroponics" },
                  { name: "traditional", label: "Traditional" },
                  { name: "frp", label: "FRP" },
                  { name: "ceramic", label: "Ceramic" },
                ].map(({ name, label }) => (
                  <div key={name} className="flex items-center">
                    <input
                      type="checkbox"
                      name={name}
                      checked={formData[name] === "true"}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">{label}</label>
                  </div>
                ))}
              </div>
            </TabsContent>

            <div className="sticky bottom-0 bg-white p-4 border-t flex justify-end space-x-4">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Tabs>
      </div>
    </div>
  );
};

export default EditProductForm;
