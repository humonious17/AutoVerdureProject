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
    <div className="min-h-screen bg-gray-50 my-20">
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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <Link
            href="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="grid grid-cols-12 gap-4 pb-6 border-b">
                  <div className="col-span-6">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      Products
                    </h2>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-3 gap-8 md:gap-4">
                      <div className="text-sm font-medium text-gray-500 text-right hidden md:block ">
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
                      className="py-32 text-center"
                    >
                      <p className="text-gray-500 text-lg">
                        Your cart is empty
                      </p>
                      <Link
                        href="/"
                        className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
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
                          className="py-6"
                        >
                          <div className="grid grid-cols-12 gap-4 items-center">
                          <div className="col-span-6 flex flex-col md:flex-row items-center space-x-2">
  <div className="relative h-24 w-24 flex flex-shrink-0 group">
    <Image
      src={item.productImage}
      alt={item.productName}
      fill
      className="object-cover rounded-lg transition-transform group-hover:scale-105"
    />
  </div>
  <div className="min-w-0">
    <h3 className="text-lg font-medium text-gray-900 truncate">
      {item.productName}
    </h3>
  </div>
                            </div>

                            <div className="col-span-6">
  <div className="grid grid-cols-3 gap-4 items-center">
    {/* Hidden for mobile screens and shown on medium and larger screens */}
    <div className="text-gray-900 font-medium text-right hidden md:block">
      {formatPrice(item.price)}
    </div>

                                <div className="flex items-center justify-center">
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

                                <div className="flex items-center justify-between">
                                  <span className="text-gray-900 font-medium">
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

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm p-6 sticky top-8"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
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
