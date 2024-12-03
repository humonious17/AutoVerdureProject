import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { Trash2, AlertCircle, ArrowLeft } from "lucide-react";
import { parse } from "cookie";
import findCartProducts from "@/lib/server/findCartProducts";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Cart = ({ products = [] }) => {
  const cartRef = useRef(null);
  const router = useRouter();
  const [cartItems, setCartItems] = useState(products);
  const [subtotal, setSubtotal] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Existing useEffect and handler functions remain the same
  useEffect(() => {
    setCartItems(products);
  }, [products]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, product) => {
      return sum + product.productQty * product.price;
    }, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      setAlertMessage(
        "Your cart is empty. Add some items before checking out."
      );
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
    router.push("/checkout/guest");
  };

  const removeCartItem = async (cartObjId) => {
    setIsRemoving(true);
    try {
      await fetch(`/api/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartObjId }),
      });
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cartObjId !== cartObjId)
      );
      setAlertMessage("Item removed from cart");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      console.error("Error removing cart item:", error);
      setAlertMessage("Failed to remove item from cart");
      setShowAlert(true);
    } finally {
      setIsRemoving(false);
    }
  };

  const updateQuantity = async (cartObjId, newQty) => {
    if (newQty < 0) return;
    try {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.cartObjId === cartObjId ? { ...item, productQty: newQty } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      setAlertMessage("Failed to update quantity");
      setShowAlert(true);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    })
      .format(price)
      .replace("₹", "Rs.");
  };

  return (
    <div className="min-h-screen bg-[#FFFBF7] pt-6 md:pt-20 pb-20">
      <AnimatePresence>
        {showAlert && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <Alert
              variant={
                alertMessage.includes("Failed") ? "destructive" : "default"
              }
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{alertMessage}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 py-4 md:py-8 mt-[55px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0"
        >
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#FFFBF7] rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-4 md:p-6">
                <div className="grid grid-cols-12 gap-4 pb-4 md:pb-6 border-b">
                  <div className="col-span-12 md:col-span-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                      Products
                    </h2>
                  </div>
                  <div className="hidden md:block md:col-span-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-sm font-medium text-gray-500 text-right">
                        Price
                      </div>
                      <div className="text-sm font-medium text-gray-500 text-center">
                        Quantity
                      </div>
                      <div className="text-sm font-medium text-gray-500 text-right">
                        Subtotal
                      </div>
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {cartItems.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="py-16 md:py-32 text-center"
                    >
                      <p className="text-gray-500 text-lg">
                        Your cart is empty
                      </p>
                      <Link
                        href="/"
                        className="text-primaryMain hover:purple-300 font-medium mt-2 inline-block"
                      >
                        Start shopping
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="divide-y">
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.cartObjId}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          className="py-4 md:py-6"
                        >
                          <div className="flex flex-col md:grid md:grid-cols-12 gap-4">
                            {/* Mobile: Product Image and Name */}
                            <div className="flex items-start space-x-4 md:col-span-6">
                              <div className="relative h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                                <Image
                                  src={item.productImage}
                                  alt={item.productName}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-medium text-gray-900 truncate">
                                  {item.productName}
                                </h3>
                                {/* Mobile: Price */}
                                <p className="mt-1 text-sm font-medium text-gray-500 md:hidden">
                                  {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>

                            {/* Mobile: Quantity and Actions */}
                            <div className="flex items-center justify-between mt-4 md:mt-0 md:col-span-6">
                              <div className="flex items-center space-x-4 md:grid md:grid-cols-3 md:gap-4 md:items-center w-full">
                                {/* Desktop: Price */}
                                <div className="hidden md:block text-gray-900 font-medium text-right">
                                  {formatPrice(item.price)}
                                </div>

                                {/* Quantity Controls */}
                                <div className="flex items-center">
                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      updateQuantity(
                                        item.cartObjId,
                                        item.productQty - 1
                                      )
                                    }
                                    className="w-8 h-8 flex items-center justify-center border rounded-l-md hover:bg-gray-50 transition-colors"
                                  >
                                    -
                                  </motion.button>
                                  <span className="w-12 h-8 flex items-center justify-center border-t border-b bg-white">
                                    {item.productQty}
                                  </span>
                                  <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() =>
                                      updateQuantity(
                                        item.cartObjId,
                                        item.productQty + 1
                                      )
                                    }
                                    className="w-8 h-8 flex items-center justify-center border rounded-r-md hover:bg-gray-50 transition-colors"
                                  >
                                    +
                                  </motion.button>
                                </div>

                                {/* Subtotal and Remove */}
                                <div className="flex items-center justify-between md:justify-end space-x-4">
                                  <span className="text-gray-900 font-medium whitespace-nowrap">
                                    {formatPrice(item.price * item.productQty)}
                                  </span>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() =>
                                      removeCartItem(item.cartObjId)
                                    }
                                    disabled={isRemoving}
                                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                  >
                                    <Trash2 className="h-5 w-5" />
                                  </motion.button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Cart Summary - Fixed at bottom for mobile */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#FFFBF7] rounded-xl shadow-lg p-6 lg:sticky lg:top-8 fixed bottom-0 left-0 right-0 lg:relative"
            >
              <div className="max-w-7xl mx-auto">
                <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-6">
                  Cart Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between pb-4 border-b">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900 font-medium">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between pb-4">
                    <span className="text-gray-900 font-semibold">Total</span>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      className="text-purple-600 font-semibold text-xl"
                    >
                      {formatPrice(subtotal)}
                    </motion.span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-4 rounded-full hover:bg-gray-800 transition-colors relative overflow-hidden group"
                  >
                    <span className="relative z-10">Proceed to Checkout</span>
                    <div className="absolute inset-0 h-full w-full bg-gray-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = parse(context.req.headers.cookie || "");
    const cartId = cookies.cartId || null;
    const products = await findCartProducts(cartId);

    const serializedProducts = products.map((product) => ({
      cartObjId: product.cartObjId,
      productId: product.productId,
      productQty: product.productQty,
      productImage: product.productImage || "/default-image.png",
      productName: product.productName || "Unnamed Product",
      price: product.price || 0,
    }));

    return {
      props: {
        products: serializedProducts,
      },
    };
  } catch (error) {
    console.error("Error in getServerSideProps:", error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default Cart;
