/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
// components/OrderDetailDialog.jsx
import React from "react";
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

const OrderStatus = ({ status, className = "" }) => {
  const statusConfig = {
    pending: { color: "text-yellow-500", bg: "bg-yellow-50" },
    processing: { color: "text-blue-500", bg: "bg-blue-50" },
    completed: { color: "text-green-500", bg: "bg-green-50" },
    cancelled: { color: "text-red-500", bg: "bg-red-50" },
    failed: { color: "text-gray-500", bg: "bg-gray-50" },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${className}`}
    >
      <span className={`text-sm font-medium capitalize ${config.color}`}>
        {status}
      </span>
    </div>
  );
};

const OrderDetailDialog = ({ order, isOpen, onClose, onStatusChange }) => {
  if (!order) return null;

  const handleStatusChange = async (newStatus) => {
    if (onStatusChange) {
      onStatusChange(order.id, newStatus);
    }

    try {
      const response = await fetch("/api/orders/updateOrderStatus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId: order.id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

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
                  {order.items.map((item, index) => (
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
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
