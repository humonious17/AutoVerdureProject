import React, { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc, Filter, X } from "lucide-react";
import {
  Clock,
  Circle,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Reviewfom from "@/pages/Reviewfom";

// Utility function to format the timestamp
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";

  try {
    // Parse the timestamp string
    const date = new Date(timestamp.replace("at", ""));

    // Format the date
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch (error) {
    console.error("Error formatting timestamp:", error);
    return timestamp; // Return original string if parsing fails
  }
};

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
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${config.color} ${config.bg} ${className}`}
    >
      <StatusIcon className="h-4 w-4" />
      {status}
    </span>
  );
};

const OrderDetailDialog = ({ order, open, onClose }) => {
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!order) return;

      setIsLoading(true);
      try {
        const productIds = order.items.map((p) => p.productId);
        const response = await fetch("/api/products/getProductDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productIds }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }

        const details = await response.json();
        setProductDetails(details);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (open && order) {
      fetchProductDetails();
    }
  }, [open, order]);

  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
            <div>
              <h3 className="font-semibold">Order ID</h3>
              <p className="text-sm text-gray-600">{order.orderId}</p>
            </div>
            <div>
              <h3 className="font-semibold">Order Time</h3>
              <p className="text-sm text-gray-600">
                {formatTimestamp(order.createdAt)}
              </p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-4">Products</h3>
            {isLoading ? (
              <div className="text-center py-4">Loading product details...</div>
            ) : (
              <div className="space-y-4">
                {order.items.map((items, idx) => {
                  const productDetail = productDetails.find(
                    (p) => p.id === items.productId
                  );
                  return (
                    <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                      <div className="space-y-2">
                        <p className="font-medium">{items.productName}</p>
                        {productDetail && (
                          <>
                            <p className="text-sm text-gray-600">
                              Type: {productDetail.productType}
                            </p>
                            <p className="text-sm text-gray-600">
                              Price: ${productDetail.productPrice}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
            <div>
              <h3 className="font-semibold">Status</h3>
              <OrderStatus status={order.status} />
            </div>
            <div>
              <h3 className="font-semibold">Payment</h3>
              <span className="text-sm text-gray-600">Paid</span>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <h3 className="font-semibold mb-2">Shipping Address</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">{order.shipping.city}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfileOrders = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "createdAt",
    direction: "desc",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Search functionality
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = initialOrders.filter(
      (order) =>
        order.items.some((product) =>
          product.productName.toLowerCase().includes(value.toLowerCase())
        ) ||
        order.shippingAddress.city.toLowerCase().includes(value.toLowerCase())
    );
    setOrders(filtered);
  };

  // Sorting functionality
  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sortedOrders = [...orders].sort((a, b) => {
      if (key === "productName") {
        const aName = a.items[0].productName;
        const bName = b.items[0].productName;
        return direction === "asc"
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
      }
      if (key === "createdAt") {
        const aDate = new Date(a.createdAt.replace("at", ""));
        const bDate = new Date(b.createdAt.replace("at", ""));
        return direction === "asc" ? aDate - bDate : bDate - aDate;
      }
      return direction === "asc"
        ? a[key] > b[key]
          ? 1
          : -1
        : a[key] < b[key]
        ? 1
        : -1;
    });
    setOrders(sortedOrders);
  };

  // Filtering functionality
  const handleFilter = (status) => {
    setFilterStatus(status);
    if (status === "all") {
      setOrders(initialOrders);
    } else {
      const filtered = initialOrders.filter(
        (order) => order.status.toLowerCase() === status.toLowerCase()
      );
      setOrders(filtered);
    }
  };

  // Order detail dialog
  const openOrderDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  return (
    <Card className="max-w-7xl mx-auto my-8">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search orders..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          {/* Filter */}
          <Select value={filterStatus} onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("productName")}
                >
                  Product
                  {sortConfig.key === "productName" &&
                    (sortConfig.direction === "asc" ? (
                      <SortAsc className="inline ml-2 h-4 w-4" />
                    ) : (
                      <SortDesc className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Order Type</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  className="cursor-pointer"
                  onClick={() => handleSort("createdAt")}
                >
                  Time
                  {sortConfig.key === "createdAt" &&
                    (sortConfig.direction === "asc" ? (
                      <SortAsc className="inline ml-2 h-4 w-4" />
                    ) : (
                      <SortDesc className="inline ml-2 h-4 w-4" />
                    ))}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.orderId}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => openOrderDetail(order)}
                >
                  <TableCell className="font-medium">
                    {order.items && order.items.length > 0
                      ? order.items[0].productName +
                        (order.items.length === 1
                          ? ""
                          : ` + ${order.items.length - 1} more`)
                      : "No products"}
                  </TableCell>
                  <TableCell>{order.shipping.city}</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>
                    <OrderStatus status={order.status} />
                  </TableCell>
                  <TableCell>{formatTimestamp(order.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-white p-4 rounded-lg border cursor-pointer"
              onClick={() => openOrderDetail(order)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium">
                    {order.items[0].productName +
                      (order.items.length === 1
                        ? ""
                        : ` + ${order.items.length - 1} more`)}
                  </p>
                  <p className="text-sm text-gray-500">{order.shipping.city}</p>
                </div>
                <OrderStatus status={order.status} />
              </div>
              <div className="text-sm text-gray-500">
                {formatTimestamp(order.createdAt)}
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">No orders found</div>
        )}

        <OrderDetailDialog
          order={selectedOrder}
          open={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
        />
      </CardContent>
      <Reviewfom/>
    </Card>
   
  );
};

export async function getServerSideProps({ req }) {
  const currentUser = (await import("@/lib/server/currentUser")).default;
  const findAllProfileOrders = (
    await import("@/pages/api/orders/findAllProfileOrders")
  ).default;

  const user = await currentUser(req);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const orders = await findAllProfileOrders(user.email);

  return {
    props: {
      orders: orders || [],
    },
  };
}

export default ProfileOrders;
