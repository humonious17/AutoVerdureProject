import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { Search, MoreVertical, X } from "lucide-react";

// Order Details Component
const OrderDetails = ({ order, onClose, onUpdateStatus }) => {
  const [status, setStatus] = useState(order.orderStatus);

  const handleStatusChange = async (newStatus) => {
    await onUpdateStatus(order.orderId, newStatus);
    setStatus(newStatus);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Order Status</h3>
          <div className="mt-2 flex items-center space-x-4">
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Badge className={getStatusColor(status)}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Customer Details</h3>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {order.shipping.fullName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span> {order.shipping.phone}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <div className="space-y-2">
            <p>{order.shipping.address1}</p>
            {order.shipping.address2 && <p>{order.shipping.address2}</p>}
            <p>
              {order.shipping.city}, {order.shipping.state}{" "}
              {order.shipping.postalCode}
            </p>
            <p>{order.shipping.country}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{product.productName}</p>
                      {product.variant && (
                        <p className="text-sm text-gray-500">
                          {product.variant}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{product.productQty}</TableCell>
                  <TableCell>Rs. {product.price}</TableCell>
                  <TableCell>
                    Rs. {product.price * product.productQty}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Subtotal: Rs. {0}</p>
            <p className="text-sm text-gray-500">Shipping: Rs. {0}</p>
            {order.discount > 0 && (
              <p className="text-sm text-gray-500">
                Discount: -Rs. {order.discount / 100}
              </p>
            )}
          </div>
          <div className="text-xl font-bold">
            Total: Rs. {order.totalAmount / 100}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main OrderList Component
const OrderList = ({ initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { toast } = useToast();

  // Filter and search logic
  useEffect(() => {
    let result = orders;

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter((order) => order.orderStatus === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.shipping.fullName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(result);
  }, [statusFilter, searchTerm, orders]);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const handleRowClick = (order, e) => {
    // Prevent opening modal when clicking on the actions button
    if (e.target.closest(".actions-button")) return;
    setSelectedOrder(order);
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch("/api/orders/updateOrderStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId
            ? { ...order, orderStatus: newStatus }
            : order
        )
      );

      toast({
        title: "Status updated",
        description: `Order ${orderId} status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-2xl font-bold">Order Management</CardTitle>
          <div className="flex space-x-2">
            <div className="flex w-72 items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Products</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow
                    key={order.orderId}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={(e) => handleRowClick(order, e)}
                  >
                    <TableCell className="font-medium">
                      {order.orderId}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.shipping.fullName}</p>
                        <p className="text-sm text-gray-500">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.products.length} items</TableCell>
                    <TableCell>Rs. {order.totalAmount / 100}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(order.orderStatus)}>
                        {order.orderStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(
                        order.createdAt?.seconds * 1000
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            className="h-8 w-8 p-0 actions-button"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order.orderId, "processing")
                            }
                          >
                            Mark as Processing
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order.orderId, "completed")
                            }
                          >
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              handleUpdateStatus(order.orderId, "cancelled")
                            }
                          >
                            Cancel Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredOrders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={!!selectedOrder}
        onOpenChange={() => setSelectedOrder(null)}
      >
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details - #{selectedOrder?.orderId}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <OrderDetails
              order={selectedOrder}
              onClose={() => setSelectedOrder(null)}
              onUpdateStatus={handleUpdateStatus}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const { db } = await import("@/pages/api/firebaseAdmin");

    const ordersRef = db.collection("orders");
    const snapshot = await ordersRef.get();

    const orders = [];
    snapshot.forEach((doc) => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    return {
      props: {
        initialOrders: JSON.parse(JSON.stringify(orders)),
      },
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return {
      props: {
        initialOrders: [],
      },
    };
  }
}

export default OrderList;
