/* eslint-disable react/jsx-no-undef */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc, Filter } from "lucide-react";
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
import Image from "next/image";
import { useToast } from "@/components/hooks/use-toast";

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

  // Default to pending status if status is undefined or not in config
  const normalizedStatus = status?.toLowerCase() || "pending";
  const config = statusConfig[normalizedStatus] || statusConfig.pending;
  const StatusIcon = config.icon || Clock; // Fallback to Clock icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm ${config.color} ${config.bg} ${className}`}
    >
      <StatusIcon className="h-4 w-4" />
      {normalizedStatus || "Pending"}
    </span>
  );
};
const ProductImage = ({ src, alt, className = "" }) => {
  return (
    <div
      className={`relative rounded-lg overflow-hidden bg-gray-100 ${className}`}
    >
      <img
        src={
          src || "https://headwayls.com/wp-content/uploads/2023/01/no-image.jpg"
        }
        alt={alt}
        className="object-cover w-full h-full"
        onError={(e) => {
          e.target.src =
            "https://headwayls.com/wp-content/uploads/2023/01/no-image.jpg";
        }}
      />
    </div>
  );
};

const OrderDetailDialog = ({ order, open, onClose }) => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!order) return;

      setIsLoading(true);
      try {
        const productIds = order.products?.map((p) => p.productId) || [];
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
      setRating(0);
      setComment("");
      setUploadedImage(null);
    }
  }, [open, order]);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleRating = (index) => {
    setRating(rating === index + 1 ? 0 : index + 1);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      let cloudinaryUrl = null;
      if (imageFile) {
        cloudinaryUrl = await uploadToCloudinary(imageFile);
      }

      const response = await fetch("/api/reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: order?.orderId,
          rating,
          comment,
          imageUrl: cloudinaryUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      toast({
        title: "Success",
        description: "Your review has been submitted successfully",
      });

      onClose();
      setRating(0);
      setComment("");
      setUploadedImage(null);
      setImageFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // If no order or dialog is closed, return null
  if (!order || !open) return null;

  const firstProduct = order.products?.[0] || {};
  const shippingCity = order.shipping?.city || "N/A";

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[100vh] overflow-y-auto p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 bg-[#fffbf7] mt-[40px] mb-[40px]">
          {/* Left side - Product Image and Details */}
          <div className="space-y-4 md:space-y-6">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src={
                  firstProduct.productImage &&
                  firstProduct.productImage !== "null"
                    ? firstProduct.productImage
                    : "/api/placeholder/400/400"
                }
                alt={firstProduct.productName || "Product Image"}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">
                {firstProduct.productName || "Product Name Not Available"}
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Location: {shippingCity}
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Pot Size: {firstProduct.size || "12 x 16 inch"}
              </p>
              <p className="text-sm md:text-base text-gray-600">
                Order ID: #{order.orderId || "N/A"}
              </p>
              <div className="bg-orange-50 text-orange-700 px-3 py-1 md:px-4 md:py-2 rounded-full inline-block text-xs md:text-base">
                Arriving in 2 days
              </div>
              <button className="text-purple-600 flex items-center gap-2 mt-2 md:mt-4 text-sm md:text-base">
                View guides related to your product →
              </button>
            </div>
          </div>

          {/* Right side - Review Form */}
          <form
            onSubmit={handleSubmitReview}
            className="space-y-4 md:space-y-6"
          >
            <h2 className="text-xl md:text-2xl font-bold">Add a review</h2>

            {/* Rating */}
            <div className="space-y-2">
              <label className="block text-sm md:text-base text-gray-700 font-semibold">
                Select Rating
              </label>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => handleRating(i)}
                    className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-colors duration-300 ${
                      rating > i
                        ? "bg-primaryMain text-white"
                        : "bg-gray-200 text-gray-400"
                    } hover:scale-110`}
                    disabled={isSubmitting}
                  >
                    <span className="text-base md:text-xl">★</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <label className="block text-sm md:text-base text-gray-700 font-semibold">
                Add Comments
              </label>
              <textarea
                className="w-full p-2 md:p-3 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows="4"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="block text-sm md:text-base text-gray-700 font-semibold">
                Add Photos
              </label>
              <div className="relative w-full h-32 md:h-44 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                {uploadedImage ? (
                  <Image
                    src={uploadedImage}
                    alt="Review"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }
                      className="absolute flex items-center justify-center w-8 h-8 md:w-10 md:h-10 border-2 border-purple-500 text-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition-colors duration-300"
                      disabled={isSubmitting}
                    >
                      +
                    </button>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      accept="image/*"
                      disabled={isSubmitting}
                    />
                  </>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 md:py-3 bg-purple-600 text-white text-sm md:text-base font-bold rounded-full hover:bg-purple-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit review"}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ProfileOrders = ({ orders: initialOrders }) => {
  // Filter out orders without paymentStatus before setting initial state
  const validOrders = initialOrders.filter((order) => order.paymentStatus);
  const [orders, setOrders] = useState(validOrders);
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
    const filtered = validOrders.filter(
      (order) =>
        order.products.some((product) =>
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
        const aName = a.products[0].productName;
        const bName = b.products[0].productName;
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
      setOrders(validOrders);
    } else {
      const filtered = validOrders.filter(
        (order) => order.orderStatus.toLowerCase() === status.toLowerCase()
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
    <Card className="max-w-7xl mx-auto my-8 bg-[#fffbf7]">
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
            <SelectTrigger className="w-[180px] bg-[#fffbf7] border-primaryMain">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="bg-[#fffbf7]">
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
                <TableHead>Image</TableHead>
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
                    {order.products && order.products.length > 0
                      ? order.products[0].productName +
                        (order.products.length === 1
                          ? ""
                          : ` + ${order.products.length - 1} more`)
                      : "No products"}
                  </TableCell>
                  <TableCell>
                    <div className="w-[50px] h-[50px] relative">
                      {order.products && order.products.length > 0 ? (
                        <Image
                          src={
                            order.products[0].productImage &&
                            order.products[0].productImage !== "null"
                              ? order.products[0].productImage
                              : ""
                          }
                          alt={order.products[0].productName || "Product Image"}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                          onError={(e) => {
                            e.target.src = "";
                          }}
                        />
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell>{order.shipping.city}</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>
                    <OrderStatus status={order.orderStatus} />
                  </TableCell>
                  <TableCell>{formatTimestamp(order.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Cards */}
        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="bg-[#fffbf7] p-4 rounded-lg border cursor-pointer shadow-md shadow-black/10"
              onClick={() => openOrderDetail(order)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-medium">
                    {order.products && order.products.length > 0
                      ? order.products[0].productName +
                        (order.products.length === 1
                          ? ""
                          : ` + ${order.products.length - 1} more`)
                      : "No products"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {order.shipping?.city || "No location"}
                  </p>
                </div>
                <OrderStatus status={order.orderStatus} />
              </div>
              <div className="flex items-center space-x-4">
                {order.products && order.products.length > 0 && (
                  <Image
                    src={
                      order.products[0].productImage &&
                      order.products[0].productImage !== "null"
                        ? order.products[0].productImage
                        : ""
                    }
                    alt={order.products[0].productName || "Product Image"}
                    width={50}
                    height={50}
                    className="rounded-lg"
                    onError={(e) => {
                      e.target.src = "";
                    }}
                  />
                )}

                <div className="text-sm text-gray-500">
                  {formatTimestamp(order.createdAt) || "No date"}
                </div>
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

  try {
    const orders = await findAllProfileOrders(user.email);

    // Filter out orders without paymentStatus before serialization
    const ordersWithPayment = orders.filter((order) => order.paymentStatus);

    // Helper function to convert dates to ISO strings
    const serializeDate = (obj) => {
      if (obj === null || obj === undefined) return obj;

      if (obj instanceof Date) {
        return obj.toISOString();
      }

      if (Array.isArray(obj)) {
        return obj.map(serializeDate);
      }

      if (typeof obj === "object") {
        const newObj = {};
        for (const key in obj) {
          newObj[key] = serializeDate(obj[key]);
        }
        return newObj;
      }

      return obj;
    };

    // Serialize all dates in the filtered orders array
    const serializedOrders = serializeDate(ordersWithPayment);

    // Verify that all data is serializable
    JSON.stringify(serializedOrders);

    return {
      props: {
        orders: serializedOrders || [],
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        orders: [],
      },
    };
  }
}

export default ProfileOrders;
