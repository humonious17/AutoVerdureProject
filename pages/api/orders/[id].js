/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { db } from "@/pages/api/firebaseAdmin";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  try {
    const productDoc = await db.collection("products").doc(id).get();

    if (!productDoc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const productData = productDoc.data();
    console.log("Fetched product data from Firestore:", productData); // Log the fetched product data
    return res.status(200).json(productData);
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

const OrderDetailsDialog = ({ order, isOpen, onClose, onStatusChange }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!order) return;

      setIsLoading(true);
      try {
        const productPromises = order.items.map(async (item) => {
          const response = await fetch(`/api/products/${item.productId}`);
          if (response.ok) {
            const productData = await response.json();
            return { ...item, ...productData };
          } else {
            return { ...item, productName: "Unknown Product" };
          }
        });

        const details = await Promise.all(productPromises);
        setProductDetails(details);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && order) {
      fetchProductDetails();
    }
  }, [isOpen, order]);

  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Order Summary Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Status</h3>
            <div className="flex items-center gap-4">
              <OrderStatus status={order.status} className="w-32" />
              <Select
                onValueChange={handleStatusChange}
                defaultValue={order.status.toLowerCase()}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Change status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customer Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Customer Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{order.shipping?.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{order.email}</p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Shipping Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{order.shipping?.address1}</p>
              {order.shipping?.address2 && <p>{order.shipping.address2}</p>}
              <p>
                {order.shipping?.city}, {order.shipping?.state}{" "}
                {order.shipping?.pinCode}
              </p>
              <p>{order.shipping?.country}</p>
              {order.shipping?.phone && <p>Phone: {order.shipping.phone}</p>}
            </div>
          </div>

          {/* Products */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Products</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      Product
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">
                      Quantity
                    </th>
                    <th className="px-4 py-2 text-right text-sm font-medium text-gray-500">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4">
                        Loading product details...
                      </td>
                    </tr>
                  ) : (
                    productDetails.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {item.image && (
                              <img
                                src={item.image}
                                alt={item.productName}
                                className="w-12 h-12 object-cover rounded"
                              />
                            )}
                            <div>
                              <p className="font-medium">{item.productName}</p>
                              {item.variant && (
                                <p className="text-sm text-gray-500">
                                  {item.variant}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">{item.quantity}</td>
                        <td className="px-4 py-3 text-right">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(item.price)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { OrderDetailsDialog };
