import Image from "next/image";
import Link from "next/link";
import React from "react";
import findCartProducts from "@/lib/server/findCartProducts";
import {parse} from "cookie";

const Cart = (props) => {
    const products = props.products;
    let subtotal = 0;

    for (let product of products) {
      subtotal += product.productQty * product.price;
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
  
        {/* Cart Items */}
        <div className="mt-[58px] sm:mt-[112px] xl:mt-[141px] xl:w-[1210px] px-[39px] sm:px-[50px] xl:px-0">
          {/* Product Details */}
          <div className="w-full xl:flex xl:gap-x-[33px] xl:justify-normal xl:items-start">
            <p className="sm:hidden text-2xl leading-8 font-bold text-[#111827]">
              Your Cart
            </p>
  
            <div className="mt-6 w-full flex sm:hidden flex-col gap-y-[24.46px]">
              <div className="w-full flex gap-x-6">
                <div className="w-[112px] h-[112px]">
                  <Image
                    className="w-full h-full"
                    src="/cartPlant.png"
                    alt="cartPlant"
                    width={112}
                    height={112}
                  />
                </div>
  
                <div className="w-full flex justify-between">
                  <div className="text-[18px] leading-7 text-[#111827] flex flex-col gap-y-[7px]">
                    <p className="font-bold">Grobox</p>
                    <p className="font-normal">Rs. 27337</p>
                    <p className="font-normal">Quantity</p>
                    <div className="h-[22.5px] px-[7.68px] py-4 rounded-[29.2px] border-[0.51px] border-[#9F9F9F] bg-[#FFFFFF] flex justify-center items-center">
                      - 1 +
                    </div>
                  </div>
  
                  <div className="w-[28px] h-[28px]">
                    <Image
                      className="w-full h-full object-contain"
                      src="/delete.svg"
                      alt="delete"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex gap-x-6">
                <div className="w-[112px] h-[112px]">
                  <Image
                    className="w-full h-full"
                    src="/cartPlant.png"
                    alt="cartPlant"
                    width={112}
                    height={112}
                  />
                </div>
  
                <div className="w-full flex justify-between">
                  <div className="text-[18px] leading-7 text-[#111827] flex flex-col gap-y-[7px]">
                    <p className="font-bold">Grobox</p>
                    <p className="font-normal">Rs. 27337</p>
                    <p className="font-normal">Quantity</p>
                    <div className="h-[22.5px] px-[7.68px] py-4 rounded-[29.2px] border-[0.51px] border-[#9F9F9F] bg-[#FFFFFF] flex justify-center items-center">
                      - 1 +
                    </div>
                  </div>
  
                  <div className="w-[28px] h-[28px]">
                    <Image
                      className="w-full h-full object-contain"
                      src="/delete.svg"
                      alt="delete"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex gap-x-6">
                <div className="w-[112px] h-[112px]">
                  <Image
                    className="w-full h-full"
                    src="/cartPlant.png"
                    alt="cartPlant"
                    width={112}
                    height={112}
                  />
                </div>
  
                <div className="w-full flex justify-between">
                  <div className="text-[18px] leading-7 text-[#111827] flex flex-col gap-y-[7px]">
                    <p className="font-bold">Grobox</p>
                    <p className="font-normal">Rs. 27337</p>
                    <p className="font-normal">Quantity</p>
                    <div className="h-[22.5px] px-[7.68px] py-4 rounded-[29.2px] border-[0.51px] border-[#9F9F9F] bg-[#FFFFFF] flex justify-center items-center">
                      - 1 +
                    </div>
                  </div>
  
                  <div className="w-[28px] h-[28px]">
                    <Image
                      className="w-full h-full object-contain"
                      src="/delete.svg"
                      alt="delete"
                      width={28}
                      height={28}
                    />
                  </div>
                </div>
              </div>
            </div>
  
            {/* Product Details */}
            <div className="w-full xl:w-[784px] hidden sm:flex flex-col justify-center items-center">
              {/* Product Table */}
              <div className="w-[784px] h-[475px] flex-col justify-start items-start gap-[37px] inline-flex">
                <div className="pl-[160px] pr-[142px] py-[15px] bg-white rounded-2xl border border-black justify-start items-start gap-24 inline-flex">
                  <div className="w-[110px] text-black text-base font-medium font-['Urbanist']">Product</div>
                  <div className="w-[70px] text-black text-base font-medium font-['Urbanist']">Price</div>
                  <div className="w-[50px] text-black text-base font-medium font-['Urbanist']">Quantity</div>
                  <div className="text-black text-base font-medium font-['Urbanist']">Subtotal</div>
                </div>
                {products.map((item, index) => (
                  <div className="justify-start items-center gap-12 inline-flex">
                  <div className="w-[108px] h-[105px] relative">
                    <img className="w-[105px] h-[105px] left-[3px] top-0 absolute rounded-lg" src={item.productImage} />
                    <div className="w-[105px] h-[105px] left-0 top-0 absolute rounded-[10px]" />
                  </div>
                  <div className="w-[150px] text-neutral-400 text-base font-normal font-['Urbanist']">{item.productName}</div>
                  <div className="w-[110px] text-neutral-400 text-base font-normal font-['Urbanist']">Rs. {item.price}</div>
                  <div className="w-[130px] h-11 relative">
                  <div className="w-[123px] h-11 left-0 top-0 absolute bg-white rounded-[57px] border border-neutral-400" />
                  <div className="left-[15px] top-[10px] absolute text-black text-base font-normal font-['Urbanist']">-</div>
                  <div className="left-[100px] top-[10px] absolute text-black text-base font-normal font-['Urbanist']">+</div>
                  <div className="left-[59px] top-[10px] absolute text-black text-base font-medium font-['Urbanist']">{item.productQty}</div>
                </div>
                <div className="text-black text-base font-normal font-['Urbanist']">{item.productQty * item.price}</div>
                  <button className="trash-can"> 
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="29" viewBox="0 0 28 29" fill="none">
                    <path d="M23.625 7.5H20.125V5.3125C20.125 4.34727 19.3402 3.5625 18.375 3.5625H9.625C8.65977 3.5625 7.875 4.34727 7.875 5.3125V7.5H4.375C3.89102 7.5 3.5 7.89102 3.5 8.375V9.25C3.5 9.37031 3.59844 9.46875 3.71875 9.46875H5.37031L6.0457 23.7695C6.08945 24.702 6.86055 25.4375 7.79297 25.4375H20.207C21.1422 25.4375 21.9105 24.7047 21.9543 23.7695L22.6297 9.46875H24.2812C24.4016 9.46875 24.5 9.37031 24.5 9.25V8.375C24.5 7.89102 24.109 7.5 23.625 7.5ZM18.1562 7.5H9.84375V5.53125H18.1562V7.5Z" fill="#888888" style={{fill:"#888888",fill:"color(display-p3 0.5333 0.5333 0.5333)",fillOpacity:"1"}}/>
                  </svg>
                  </button>
                
                <div className="w-7 h-7 relative" />
              </div>

                ))}
                
            </div>
                  
            </div>
  
            {/* Cart Totals */}
            <div className="mt-6 sm:mt-12 xl:mt-0 w-full xl:w-[353px]">
              <div className="relative left-[110px] w-full px-5 py-[15px] rounded-2xl flex flex-col justify-center items-center sm:justify-end sm:items-end xl:justify-center xl:items-center bg-[#FFFFFF]">
                <p className="text-[32px] font-bold">Cart Totals</p>
  
                <div className="my-[18px] xl:my-[71px] w-[243px] xl:w-full xl:px-[35px] flex gap-y-[31px] flex-col justify-center">
                  <div className="w-full flex justify-between">
                    <p className="text-base font-[600]">Subtotal</p>
                    <p className="text-base text-[#9F9F9F] font-normal">
                      Rs. {subtotal}
                    </p>
                  </div>
                  <div className="w-full flex justify-between items-center">
                    <p className="text-base font-[600]">Total</p>
                    <p className="text-xl text-primaryMain font-[600]">
                      Rs. {subtotal}
                    </p>
                  </div>
                </div>
  
                <Link
                  href="/cart/checkout/signup"
                  className="w-full sm:w-[353px] xl:w-full text-base leading-[20.8px] px-6 py-[17px] rounded-[30px] text-[#FFFFFF] font-normal bg-[#070707] flex justify-center items-center"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const cookies = parse(req.headers.cookie || "");
  const products = await findCartProducts(cookies.cartId);

  // Ensure that productImage is either null or defined
  const sanitizedProducts = products.map((product) => ({
    ...product,
    productImage: product.productImage || null, // Replace undefined with null
  }));

  return {
    props: {
      products: sanitizedProducts, // Return sanitized products
    },
  };

}

export default Cart;
