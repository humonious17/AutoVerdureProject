/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { PlusCircle, Pencil, Trash2, LayoutGrid, List } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AddProduct from './addproduct';

const Index = () => {
    const [products, setProducts] = useState([]);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [viewMode, setViewMode] = useState("grid");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/getProducts');
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

    const handleDeleteProduct = async (productId) => {
        try {
            const response = await fetch(`/api/deleteProduct?id=${productId}`, { method: 'DELETE' });
            if (response.ok) {
                setProducts(products.filter(product => product.productId !== productId));
            } else {
                console.error("Failed to delete product from Firestore");
            }
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const handleEditProduct = (product) => {
        console.log("Edit product:", product);
    };

    const handleToggleAddProduct = () => {
        setShowAddProduct(prevState => !prevState);
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
                            src={product.images[0]?.publicUrl || 'default-image-url'} 
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
                                    <Pencil className="h-3 w-3 mr-2" />
                                    Edit
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm"
                                    className="flex-1"
                                    onClick={() => handleDeleteProduct(product.productId)}
                                >
                                    <Trash2 className="h-3 w-3 mr-2" />
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
        <div className="space-y-3">
            {products.map((product, index) => (
                <Card 
                    key={product.productId || index}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                    <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                <img 
                                    src={product.images[0]?.publicUrl || 'default-image-url'} 
                                    alt={product.productName}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-900">
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
                                    onClick={() => handleEditProduct(product)}
                                >
                                    <Pencil className="h-3 w-3 mr-2" />
                                    Edit
                                </Button>
                                <Button 
                                    variant="destructive" 
                                    size="sm"
                                    onClick={() => handleDeleteProduct(product.productId)}
                                >
                                    <Trash2 className="h-3 w-3 mr-2" />
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
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Product List</h1>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <ToggleGroup 
                            type="single" 
                            value={viewMode} 
                            onValueChange={(value) => value && setViewMode(value)}
                            className="justify-start"
                        >
                            <ToggleGroupItem value="grid" aria-label="Grid view">
                                <LayoutGrid className="h-4 w-4" />
                            </ToggleGroupItem>
                            <ToggleGroupItem value="list" aria-label="List view">
                                <List className="h-4 w-4" />
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <Button
                            onClick={handleToggleAddProduct}
                            className="flex items-center gap-2"
                            variant={showAddProduct ? "secondary" : "default"}
                        >
                            <PlusCircle className="h-4 w-4" />
                            {showAddProduct ? 'Close Add Product' : 'Add New Product'}
                        </Button>
                    </div>
                </div>

                {showAddProduct && (
                    <Card className="mb-6 border border-gray-200">
                        <CardContent className="p-6">
                            <AddProduct onAddProduct={handleAddProduct} />
                        </CardContent>
                    </Card>
                )}

                {viewMode === "grid" ? <GridView /> : <ListView />}
            </div>
        </div>
    );
};

export default Index;