import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  Pencil,
  Trash2,
  LayoutGrid,
  List,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AddProduct from "../addproduct";
import EditProductForm from "../EditProductForm";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterType, setFilterType] = useState("all");

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

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Filter and sort products
  const filteredAndSortedProducts = products
    .filter((product) => {
      const matchesSearch = product.productName
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesType =
        filterType === "all" || product.productType === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case "name":
          comparison = a.productName.localeCompare(b.productName);
          break;
        case "price":
          comparison = a.productPrice - b.productPrice;
          break;
        case "type":
          comparison = a.productType.localeCompare(b.productType);
          break;
      }
      return sortOrder === "asc" ? comparison : -comparison;
    });

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredAndSortedProducts.map((product, index) => (
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
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this product?"
                      )
                    ) {
                      handleDeleteProduct(product.productId);
                    }
                  }}
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

  const ListView = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <div className="grid grid-cols-6 gap-4 p-4 font-semibold text-gray-700 border-b">
          <div className="col-span-2">Product</div>
          <div>Type</div>
          <div>Price</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {filteredAndSortedProducts.map((product, index) => (
          <div
            key={product.productId || index}
            className="grid grid-cols-6 gap-4 p-4 items-center hover:bg-gray-50"
          >
            <div className="col-span-2 flex items-center space-x-3">
              <img
                src={product.images[0]?.publicUrl || "default-image-url"}
                alt={product.productName}
                className="w-12 h-12 object-cover rounded"
              />
              <span className="font-medium">{product.productName}</span>
            </div>
            <div>
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                {product.productType}
              </span>
            </div>
            <div>Rs. {product.productPrice}</div>
            <div>
              <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                In Stock
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditProduct(product)}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteProduct(product.productId)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFBF7] p-8">
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

        {!editingProduct && (
          <div className="mb-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="plants">Plants</SelectItem>
                    <SelectItem value="planters">Planters</SelectItem>
                    <SelectItem value="flowers">Flowers</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="type">Type</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleSortOrder}
                  className="w-10 h-10"
                >
                  {sortOrder === "asc" ? "↑" : "↓"}
                </Button>
                <ToggleGroup
                  type="single"
                  value={viewMode}
                  onValueChange={(value) => value && setViewMode(value)}
                >
                  <ToggleGroupItem value="grid">
                    <LayoutGrid className="w-4 h-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="list">
                    <List className="w-4 h-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>
          </div>
        )}

        {editingProduct ? (
          <EditProductForm
            product={editingProduct}
            onSave={handleUpdateProduct}
            onCancel={() => setEditingProduct(null)}
          />
        ) : viewMode === "grid" ? (
          <GridView />
        ) : (
          <ListView />
        )}
      </div>
    </div>
  );
};

export default Index;
