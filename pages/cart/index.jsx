import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import findCartProducts from "@/lib/server/findCartProducts";
import { parse } from "cookie";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";

const Cart = ({ products = [] }) => {
  const cartRef = useRef(null);
  const router = useRouter();
  const [cartItems, setCartItems] = useState(products);
  const [subtotal, setSubtotal] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    setCartItems(products);
  }, [products]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce((sum, product) => {
      return sum + product.productQty * product.price;
    }, 0);
    setSubtotal(newSubtotal);
  }, [cartItems]);

  const handleCartGuestCheckout = () => {
    router.push("/checkout/guest");
  };

  const handleCartMemberCheckout = () => {
    router.push("/checkout/member");
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
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen my-20 bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-primaryMain" />
              <CardTitle className="text-3xl font-bold text-gray-900">
                Your Cart
              </CardTitle>
            </div>
            <div className="text-sm font-medium text-gray-500">
              <Link href="/">
                <span className="text-primaryMain hover:text-primaryMain/80 transition-colors">
                  Home
                </span>
              </Link>
              <span className="mx-2">/</span>
              <span>Cart</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">Your cart is empty</p>
              <Link href="/">
                <Button className="mt-6">
                  Continue Shopping
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-[480px] overflow-y-auto pr-2 space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.cartObjId}
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-6 flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.productName}
                      </h3>
                      <div className="mt-1 flex items-center gap-4">
                        <span className="text-sm text-gray-600">
                          Quantity: {item.productQty}
                        </span>
                        <span className="text-sm font-medium text-primaryMain">
                          Rs. {formatPrice(item.price)}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCartItem(item.cartObjId)}
                        disabled={isRemoving}
                        className="mt-2 text-red-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-bold text-primaryMain">
                        Rs. {formatPrice(item.price * item.productQty)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-gray-100 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-lg font-medium text-gray-900">Subtotal</p>
                  <p className="text-2xl font-bold text-primaryMain">
                    Rs. {formatPrice(subtotal)}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={handleCartGuestCheckout}
                    className="flex-1 py-6 text-lg bg-primaryMain hover:bg-primaryMain/90"
                  >
                    Guest Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    onClick={handleCartMemberCheckout}
                    variant="outline"
                    className="flex-1 py-6 text-lg border-primaryMain text-primaryMain hover:bg-primaryMain hover:text-white"
                  >
                    Member Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
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
