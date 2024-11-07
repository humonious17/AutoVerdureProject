import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import findCartProducts from "@/lib/server/findCartProducts";
import { parse } from "cookie";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";

const Cart = ({ products = [] }) => {
  const cartRef = useRef(null);
  const router = useRouter();
  const [cartItems, setCartItems] = useState(products);
  const [subtotal, setSubtotal] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    // Update cart items when products prop changes
    setCartItems(products);
  }, [products]);

  useEffect(() => {
    // Calculate subtotal whenever cartItems change
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
      // Assuming you have an API endpoint to remove cart items
      await fetch(`/api/removeCartItem`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartObjId }),
      });

      // Remove item from cartItems state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.cartObjId !== cartObjId)
      );
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  // Function to format price with commas for thousands
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Card className="mt-[70px] sm:mt-[155px] xl:mt-[105px] mb-[131px] sm:mb-[106px] xl:mb-[188px] w-full">
      {/* Title */}
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h1 className="text-[40px] sm:text-[70px] leading-[48px] sm:leading-[80px] -tracking-[1px] sm:-tracking-[1.75px] font-normal text-primaryGrayscale">
              Cart
            </h1>
            <div className="text-base font-medium text-secondaryGrayscale">
              <Link href="/">
                <span className="text-primaryMain hover:underline">Home</span>
              </Link>{" "}
              / Cart
            </div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {cartItems.length === 0 ? (
          <div className="mt-[58px] text-center">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div className="max-h-[400px] overflow-y-auto">
            <ul>
              {cartItems.map((item) => (
                <li key={item.cartObjId} className="mb-6 flex items-start">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    height={105}
                    width={105}
                    className="rounded-md"
                  />
                  <div className="ml-8 flex-1">
                    <p className="text-[16px] font-[550] text-[#000]">
                      {item.productName}
                    </p>
                    <p className="text-[16px] font-[400] text-[#000]">
                      {item.productQty} x{" "}
                      <span className="text-[12px] font-[600] text-[#A458FE]">
                        Rs. {formatPrice(item.price)}
                      </span>
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCartItem(item.cartObjId)}
                      disabled={isRemoving}
                      className="mt-2 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                      Remove
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between mt-6">
          <p className="text-[16px] font-[400] text-[#000]">Subtotal</p>
          <p className="text-[16px] font-[600] text-[#A458FE]">
            Rs. {formatPrice(subtotal)}
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <Button onClick={handleCartGuestCheckout} className="mr-4">
            Guest Checkout
          </Button>
          <Button onClick={handleCartMemberCheckout}>Member Checkout</Button>
        </div>
      </CardContent>
    </Card>
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
