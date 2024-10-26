/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import findCartProducts from "@/lib/server/findCartProducts";
import { parse } from "cookie";

const Cart = ({ products = [], error = null }) => {
  const subtotal = products.reduce((sum, product) => {
    return sum + (product.productQty * product.price);
  }, 0);

  if (error) {
    return (
      <div className="mt-[70px] text-center">
        <p>Error loading cart: {error}</p>
        <Link href="/" className="text-primaryMain">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-[70px] sm:mt-[155px] xl:mt-[105px] mb-[131px] sm:mb-[106px] xl:mb-[188px] w-full bg-[#FFFCF8] xl:flex xl:flex-col xl:justify-center xl:items-center">
      {/* Title */}
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-[40px] sm:text-[70px] leading-[48px] sm:leading-[80px] -tracking-[1px] sm:-tracking-[1.75px] font-normal text-primaryGrayscale">
          <p>Cart</p>
        </div>
        <div className="mt-3 sm:mt-6 text-base font-medium">
          <p className="text-secondaryGrayscale">
            <Link href="/">
              <span className="text-primaryMain">Home</span>
            </Link>{" "}
            / Cart
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mt-[58px] text-center">
          <p>Your cart is empty</p>
          <Link href="/" className="text-primaryMain">
            Continue Shopping
          </Link>
        </div>
      ) : (
        /* Rest of your existing cart UI code... */
        <div className="mt-[58px] sm:mt-[112px] xl:mt-[141px] xl:w-[1210px] px-[39px] sm:px-[50px] xl:px-0">
          {/* Your existing product display code remains the same */}
          {/* Cart Totals section remains the same */}
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  try {
    const cookies = parse(context.req.headers.cookie || '');
    const token = cookies.token || '';

    const { data: products, error } = await findCartProducts(token);

    if (error) {
      return {
        props: {
          products: [],
          error: error
        }
      };
    }

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)), // Ensure serializable data
        error: null
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        products: [],
        error: 'Failed to load cart data'
      }
    };
  }
}

export default Cart;