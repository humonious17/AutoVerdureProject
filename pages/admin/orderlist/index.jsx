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
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  MoreVertical,
  X,
  Download,
  Printer,
  CreditCard,
  Calendar,
  Filter,
  RefreshCcw,
} from "lucide-react";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "../AuthContext";

// Previous helper functions remain the same
const normalizeOrderItems = (order) => {
  const items = order.products || order.items || [];
  return items.map((item) => ({
    productName: item.productName || item.name,
    productQty: item.productQty || item.quantity || 1,
    price: item.price || item.itemTotal || 0,
    variant: item.productColor
      ? `${item.productColor} - ${item.productSize}`
      : "",
  }));
};

const normalizeAddress = (shipping) => {
  if (!shipping) return {};
  return {
    fullName: shipping.fullName || "",
    address1: shipping.address1 || shipping.houseNumber || "",
    address2: shipping.address2 || shipping.streetName || "",
    city: shipping.city || "",
    state: shipping.state || "",
    postalCode: shipping.postalCode || shipping.zipCode || "",
    country: shipping.country || "",
    phone: shipping.phone || "",
  };
};

const normalizeAmount = (order) => {
  const amount = order.totalAmount || order.amount || 0;
  return amount > 1000 ? amount / 100 : amount;
};

// New helper function for date formatting
const formatDate = (date) => {
  if (!date) return "N/A";

  // Handle Firestore Timestamp
  if (date.seconds) {
    return new Date(date.seconds * 1000).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Handle regular date string
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Enhanced OrderDetails Component
const OrderDetails = ({ order, onClose, onUpdateStatus, onUpdateNotes }) => {
  const [status, setStatus] = useState(order.orderStatus || order.status);
  const [notes, setNotes] = useState(order.notes || "");
  const [paymentStatus, setPaymentStatus] = useState(
    order.paymentStatus || "pending"
  );
  const normalizedItems = normalizeOrderItems(order);
  const normalizedShipping = normalizeAddress(order.shipping);
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = async (newStatus) => {
    await onUpdateStatus(order.orderId, newStatus);
    setStatus(newStatus);
  };

  const handleNotesChange = async () => {
    await onUpdateNotes(order.orderId, notes);
    setIsEditing(false);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      created: "bg-purple-100 text-purple-800",
      paid: "bg-green-100 text-green-800",
      unpaid: "bg-red-100 text-red-800",
      refunded: "bg-gray-100 text-gray-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const calculateSubtotal = () => {
    return normalizedItems.reduce(
      (sum, item) => sum + item.price * item.productQty,
      0
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">Order Status</h3>
            <div className="mt-2 flex items-center space-x-4">
              <Select value={status} onValueChange={handleStatusChange}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Created</SelectItem>
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

          <div>
            <h3 className="text-lg font-semibold">Payment Status</h3>
            <div className="mt-2 flex items-center space-x-4">
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Badge className={getStatusColor(paymentStatus)}>
                {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
              </Badge>
            </div>
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
              {normalizedShipping.fullName}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {normalizedShipping.phone}
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
          <div className="space-y-2">
            {normalizedShipping.address1 && (
              <p>{normalizedShipping.address1}</p>
            )}
            {normalizedShipping.address2 && (
              <p>{normalizedShipping.address2}</p>
            )}
            <p>
              {normalizedShipping.city}
              {normalizedShipping.state && `, ${normalizedShipping.state}`}{" "}
              {normalizedShipping.postalCode}
            </p>
            <p>{normalizedShipping.country}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Order Notes</h3>
        <div className="space-y-2">
          {isEditing ? (
            <>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[100px]"
                placeholder="Add notes about this order..."
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNotesChange}>Save Notes</Button>
              </div>
            </>
          ) : (
            <div
              className="min-h-[100px] p-3 border rounded-md cursor-pointer hover:bg-gray-50"
              onClick={() => setIsEditing(true)}
            >
              {notes || "Click to add notes..."}
            </div>
          )}
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
              {normalizedItems.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      {item.variant && (
                        <p className="text-sm text-gray-500">{item.variant}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{item.productQty}</TableCell>
                  <TableCell>Rs. {item.price}</TableCell>
                  <TableCell>Rs. {item.price * item.productQty}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">
              Subtotal: Rs. {calculateSubtotal()}
            </p>
            <p className="text-sm text-gray-500">Shipping: Rs. {0}</p>
            {order.discount > 0 && (
              <p className="text-sm text-gray-500">
                Discount: -Rs. {order.discount / 100}
              </p>
            )}
          </div>
          <div className="text-xl font-bold">
            Total: Rs. {normalizeAmount(order)}
          </div>
        </div>
      </div>

      <DialogFooter>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="w-4 h-4 mr-2" />
            Print Order
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
        </div>
      </DialogFooter>
    </div>
  );
};

// Enhanced OrderList Component
const OrderList = ({ initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const { toast } = useToast();

  // Enhanced filter and search logic
  useEffect(() => {
    let result = orders;

    // Status filter
    if (statusFilter !== "all") {
      result = result.filter(
        (order) => (order.orderStatus || order.status) === statusFilter
      );
    }

    // Date range filter
    if (dateRange.start && dateRange.end) {
      const start = new Date(dateRange.start).getTime();
      const end = new Date(dateRange.end).getTime();
      result = result.filter((order) => {
        const orderDate = order.createdAt?.seconds
          ? order.createdAt.seconds * 1000
          : new Date(order.createdAt).getTime();
        return orderDate >= start && orderDate <= end;
      });
    }

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchLower) ||
          order.email.toLowerCase().includes(searchLower) ||
          (order.shipping?.fullName || "").toLowerCase().includes(searchLower)
      );
    }

    setFilteredOrders(result);
  }, [statusFilter, searchTerm, dateRange, orders]);

  const getStatusColor = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      processing: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
      created: "bg-purple-100 text-purple-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  const handleRowClick = (order, e) => {
    if (
      e.target.closest(".actions-button") ||
      e.target.closest("input[type='checkbox']")
    )
      return;
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
            ? { ...order, orderStatus: newStatus, status: newStatus }
            : order
        )
      );

      toast({
        title: "Status updated",
        description: "Order status has been updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error updating status",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleUpdateNotes = async (orderId, notes) => {
    try {
      const response = await fetch("/api/orders/updateOrderNotes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, notes }),
      });

      if (!response.ok) throw new Error("Failed to update notes");

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, notes } : order
        )
      );

      toast({
        title: "Notes updated",
        description: "Order notes have been saved successfully",
      });
    } catch (error) {
      toast({
        title: "Error updating notes",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedOrders.length === 0) {
      toast({
        title: "No orders selected",
        description: "Please select at least one order to perform this action",
        variant: "destructive",
      });
      return;
    }

    try {
      const updates = selectedOrders.map((orderId) =>
        handleUpdateStatus(orderId, action)
      );
      await Promise.all(updates);

      toast({
        title: "Bulk action completed",
        description: `Updated ${selectedOrders.length} orders to ${action}`,
      });
      setSelectedOrders([]);
    } catch (error) {
      toast({
        title: "Error performing bulk action",
        description: "Some orders may not have been updated",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();
      setOrders(data);
      toast({
        title: "Orders refreshed",
        description: "Order list has been updated with latest data",
      });
    } catch (error) {
      toast({
        title: "Error refreshing orders",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Order Management
              </CardTitle>
              <Button variant="outline" onClick={handleRefresh}>
                <RefreshCcw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-72"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Orders</SelectItem>
                  <SelectItem value="created">Created</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, start: e.target.value }))
                  }
                  className="w-40"
                />
                <span>to</span>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange((prev) => ({ ...prev, end: e.target.value }))
                  }
                  className="w-40"
                />
              </div>
            </div>

            {selectedOrders.length > 0 && (
              <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                <span className="text-sm text-gray-600">
                  {selectedOrders.length} orders selected
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("processing")}
                >
                  Mark as Processing
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("completed")}
                >
                  Mark as Completed
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction("cancelled")}
                >
                  Cancel Orders
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedOrders([])}
                >
                  Clear Selection
                </Button>
              </div>
            )}
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={
                          selectedOrders.length === filteredOrders.length &&
                          filteredOrders.length > 0
                        }
                        onCheckedChange={(checked) => {
                          setSelectedOrders(
                            checked
                              ? filteredOrders.map((order) => order.orderId)
                              : []
                          );
                        }}
                      />
                    </TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Total Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
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
                      <TableCell>
                        <Checkbox
                          checked={selectedOrders.includes(order.orderId)}
                          onCheckedChange={(checked) => {
                            setSelectedOrders((prev) =>
                              checked
                                ? [...prev, order.orderId]
                                : prev.filter((id) => id !== order.orderId)
                            );
                          }}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {order.orderId}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">
                            {order.shipping?.fullName}
                          </p>
                          <p className="text-sm text-gray-500">{order.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.products?.length || order.items?.length || 0}{" "}
                        items
                      </TableCell>
                      <TableCell>Rs. {normalizeAmount(order)}</TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(
                            order.orderStatus || order.status
                          )}
                        >
                          {order.orderStatus || order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(
                            order.paymentStatus || "pending"
                          )}
                        >
                          <CreditCard className="w-3 h-3 mr-1 inline" />
                          {order.paymentStatus || "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(order.createdAt)}</TableCell>
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => window.print()}>
                              Print Order
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Download Invoice
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredOrders.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center py-8">
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
              <DialogTitle>
                Order Details - #{selectedOrder?.orderId}
              </DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <OrderDetails
                order={selectedOrder}
                onClose={() => setSelectedOrder(null)}
                onUpdateStatus={handleUpdateStatus}
                onUpdateNotes={handleUpdateNotes}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
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
