/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  ArrowUpDown,
  Circle,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
//import { db } from "@/pages/api/firebaseAdmin"; // Import the firebaseAdmin
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import findAllOrders from "@/pages/api/orders/findAllOrders";

const OrderStatus = ({ status, className = "" }) => {
  const statusConfig = {
    pending: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50" },
    processing: { icon: Circle, color: "text-blue-500", bg: "bg-blue-50" },
    completed: {
      icon: CheckCircle2,
      color: "text-green-500",
      bg: "bg-green-50",
    },
    cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
    failed: { icon: AlertCircle, color: "text-gray-500", bg: "bg-gray-50" },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.pending;
  const StatusIcon = config.icon;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full ${config.bg} ${className}`}
    >
      <StatusIcon className={`w-4 h-4 ${config.color}`} />
      <span className={`text-sm font-medium capitalize ${config.color}`}>
        {status}
      </span>
    </div>
  );
};
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

const OrderList = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders || []);
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(
      orders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Filter and sort orders
  useEffect(() => {
    let result = [...orders];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.shipping?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.razorpayOrderId
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          order.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (order) => order.status.toLowerCase() === statusFilter
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aVal = a[sortConfig.key];
      let bVal = b[sortConfig.key];

      if (sortConfig.key === "amount") {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      }

      if (sortConfig.key === "createdAt") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredOrders(result);
  }, [orders, searchTerm, statusFilter, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="mt-2 text-gray-600">
            Track and manage all customer orders
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by customer name, email or order ID..."
                className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <select
                className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders Table - Fixed Structure */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr
                    key={order.razorpayOrderId}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.razorpayOrderId}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.receiptId}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatDate(order.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {order.shipping?.fullName}
                      </div>
                      <div className="text-sm text-gray-500">{order.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(order.amount) * 100}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <OrderStatus status={order.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No orders found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Order Details Dialog */}
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const orders = await findAllOrders();
    return {
      props: {
        orders: orders.map((order) => ({
          ...order,
          createdAt: order.createdAt || new Date().toISOString(),
          shipping: order.shipping || {},
          items: order.items || [],
        })),
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        orders: [],
        error: {
          message: error.message,
        },
      },
    };
  }
}

export default OrderList;
