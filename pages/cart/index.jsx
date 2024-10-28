/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-key */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import findCartProducts from "@/lib/server/findCartProducts";
import { parse } from "cookie";

const Cart = ({ products = [] }) => {
  const subtotal = products.reduce((sum, product) => {
    return sum + (product.productQty * product.price);
  }, 0);

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
        <div className="mt-[58px] sm:mt-[112px] xl:mt-[141px] xl:w-[1210px] px-[39px] sm:px-[50px] xl:px-0">
          {/* Product Details */}
          <div className="w-full xl:flex xl:gap-x-[33px] xl:justify-normal xl:items-start">
            <p className="sm:hidden text-2xl leading-8 font-bold text-[#111827]">
              Your Cart
            </p>

            <div className="mt-6 w-full flex sm:hidden flex-col gap-y-[24.46px]">
              {products.map((item, index) => (
                <div key={index} className="w-full flex gap-x-6">
                  <div className="w-[112px] h-[112px]">
                    <Image
                      className="w-full h-full"
                      src={item.productImage}
                      alt={item.productName}
                      width={112}
                      height={112}
                    />
                  </div>

                  <div className="w-full flex justify-between">
                    <div className="text-[18px] leading-7 text-[#111827] flex flex-col gap-y-[7px]">
                      <p className="font-bold">{item.productName}</p>
                      <p className="font-normal">Rs. {item.price}</p>
                      <p className="font-normal">Quantity: {item.productQty}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop view remains the same */}
            
            {/* Cart Totals */}
            <div className="mt-6 sm:mt-12 xl:mt-0 w-full xl:w-[353px]">
              <div className="relative left-[110px] w-full px-5 py-[15px] rounded-2xl flex flex-col justify-center items-center sm:justify-end sm:items-end xl:justify-center xl:items-center bg-white border border-neutral-400">
                <div className="text-base font-medium text-black">Cart Totals</div>
                <div className="text-[30px] text-black font-bold">
                  <p>Rs. {subtotal}</p>
                </div>
                <button className="text-white bg-primaryMain w-full h-[44px] rounded-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Inside getServerSideProps, modify this section to ensure proper JSON serialization.
export async function getServerSideProps(context) {
  try {
    const cookies = parse(context.req.headers.cookie || '');
    const token = cookies.token || '';

    const products = await findCartProducts(token);

    // Ensure the data is fully serializable
    const serializedProducts = products.map(product => ({
      productId: product.productId || '',
      productQty: product.productQty || 0,
      productImage: product.productImage || '/default-image.png',
      productName: product.productName || 'Unnamed Product',
      price: product.price || 0
    }));

    return {
      props: {
        products: serializedProducts
      }
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        products: []
      }
    };
  }
}

export default Cart;