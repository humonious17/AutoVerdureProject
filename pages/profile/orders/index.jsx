import React, { useState } from "react";
import { Search, SortAsc, SortDesc, Filter, X } from "lucide-react";
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

const ProfileOrders = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "orderTime",
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
        order.orderedProducts.some((product) =>
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
        const aName = a.orderedProducts[0].productName;
        const bName = b.orderedProducts[0].productName;
        return direction === "asc"
          ? aName.localeCompare(bName)
          : bName.localeCompare(aName);
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
        (order) => order.orderStatus === status
      );
      setOrders(filtered);
    }
  };

  // Order detail dialog
  const openOrderDetail = (order) => {
    setSelectedOrder(order);
    setIsDetailOpen(true);
  };

  const OrderDetailDialog = ({ order, open, onClose }) => {
    if (!order) return null;

    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Order ID</h3>
                <p className="text-sm text-gray-600">{order.orderId}</p>
              </div>
              <div>
                <h3 className="font-semibold">Order Time</h3>
                <p className="text-sm text-gray-600">{order.orderTime}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Products</h3>
              <div className="space-y-2">
                {order.orderedProducts.map((product, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium">{product.productName}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm">{order.shippingAddress.city}</p>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Status</h3>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <div>
                <h3 className="font-semibold">Payment</h3>
                <span className="text-sm text-gray-600">Paid</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
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
              <SelectItem value="Delivered">Delivered</SelectItem>
              <SelectItem value="In Transit">In Transit</SelectItem>
              <SelectItem value="Processing">Processing</SelectItem>
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
                  onClick={() => handleSort("orderTime")}
                >
                  Time
                  {sortConfig.key === "orderTime" &&
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
                    {order.orderedProducts[0].productName +
                      (order.orderedProducts.length === 1
                        ? ""
                        : ` + ${order.orderedProducts.length - 1} more`)}
                  </TableCell>
                  <TableCell>{order.shippingAddress.city}</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-sm ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </TableCell>
                  <TableCell>{order.orderTime}</TableCell>
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
                    {order.orderedProducts[0].productName +
                      (order.orderedProducts.length === 1
                        ? ""
                        : ` + ${order.orderedProducts.length - 1} more`)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.shippingAddress.city}
                  </p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-sm ${
                    order.orderStatus === "Delivered"
                      ? "bg-green-100 text-green-800"
                      : "bg-orange-100 text-orange-800"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>
              <div className="text-sm text-gray-500">{order.orderTime}</div>
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
