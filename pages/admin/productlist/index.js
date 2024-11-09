/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, LayoutGrid, List } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AddProduct from "./addproduct";
import EditProductForm from "./EditProductForm";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/getProducts");
      const data = await response.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await fetch(`/api/deleteProduct?id=${productId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(
          products.filter((product) => product.productId !== productId)
        );
      } else {
        console.error("Failed to delete product from Firestore");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleToggleAddProduct = () => {
    setShowAddProduct((prevState) => !prevState);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await fetch(
        `/api/products/${updatedProduct.productId}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );

      if (response.ok) {
        setProducts(
          products.map((product) =>
            product.productId === updatedProduct.productId
              ? updatedProduct
              : product
          )
        );
        setEditingProduct(null);
      } else {
        console.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <Card
          key={product.productId || index}
          className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="aspect-square relative overflow-hidden bg-gray-100">
            <img
              src={product.images[0]?.publicUrl || "default-image-url"}
              alt={product.productName}
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
            />
          </div>
          <CardContent className="p-4">
            <div className="space-y-3">
              <div className="space-y-1">
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
                  {product.productName}
                </h2>
                <p className="text-base font-medium text-gray-900">
                  Rs. {product.productPrice}
                </p>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                  {product.productType}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleEditProduct(product)}
                >
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDeleteProduct(product.productId)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>
          <Button onClick={handleToggleAddProduct}>
            <PlusCircle className="w-5 h-5 mr-2" />
            Add Product
          </Button>
        </div>

        {showAddProduct && <AddProduct onAddProduct={handleAddProduct} />}

        {editingProduct ? (
          <EditProductForm
            product={editingProduct}
            onSave={handleUpdateProduct}
            onCancel={() => setEditingProduct(null)}
          />
        ) : (
          <GridView />
        )}
      </div>
    </div>
  );
};

export default Index;
