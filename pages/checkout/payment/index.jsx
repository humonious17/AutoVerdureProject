/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Payment = (props) => {
  const orderId = props.orderId;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({});
  let total = 0;
  const router = useRouter();

  const selectedProducts = [
    { productPrice: "100", productQty: 2 },
    { productPrice: "200", productQty: 1 }
  ];

  selectedProducts.forEach((element) => {
    total += parseInt(element.productPrice) * parseInt(element.productQty);
  });

  const handleSubmit = () => {};

  useEffect(() => {
    if (orderId && !scriptLoaded) {
      const loadRazorpayScript = async () => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          setScriptLoaded(true);
          const options = {
            key: process.env.RAZORPAY_API_KEY_SECRET,
            amount: total * 100,
            currency: 'INR',
            name: 'Auto Verdure',
            description: 'Payment for your order',
            image: '/logo.png',
            order_id: orderId,
            handler: async function (response) {
              const payload = {
                orderId: orderId,
                signature: response.razorpay_signature,
                paymentId: response.razorpay_payment_id,
              };
              
              const result = await fetch('/api/verifyPayment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });

              if (result.ok) {
                const orderPayload = {
                  products: selectedProducts,
                  email: email,
                  shippingAddress: address,
                };

                setEmail('');
                setAddress({});
                setProducts([]);

                await fetch('/api/addOrder', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(orderPayload)
                });

                // Send order confirmation email
                await fetch('/api/sendEmail', {
                  method: 'POST',
                  headers: {  
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: email,
                    orderId: orderId,
                    products: selectedProducts,
                    totalAmount: total,
                  })
                });

                router.push('/checkout/successful');
              } else {
                router.push('/store');
              }
            },
            prefill: {
              email: email,
            },
            theme: {
              color: '#9A5CF5',
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      };

      loadRazorpayScript();
    }
  }, [orderId, total, router]);

  return (
    <div className="mb-[177px] sm:mb-[303px] w-full px-11 sm:px-0 flex flex-col justify-center items-center">
      {/* Title */}
      <div className="mb-[42px] sm:mb-[52px] max-w-[560px] w-full flex flex-col gap-y-3 sm:justify-center sm:items-center">
        <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
          Payment
        </p>
        <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94] sm:text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Content */}
      <div className="w-full sm:px-[51px] xl:px-[12px] flex flex-col justify-center items-center">
        <div className="mt-[86px] sm:mt-[69px] max-w-[1119px] w-full h-[703px] border-[1px] rounded-[25px] border-[#000000]"></div>
        <form action="https://www.example.com/payment/success/" method="POST">
          <div id="razorpay-button-container"></div>
          <input type="hidden" custom="Hidden Element" name="hidden"/>
        </form>
        {/* Button */}
        <button className="mt-10 max-w-[440px] w-full px-6 py-[17px] rounded-[30px] bg-[#070707] text-[#FFFFFF] flex justify-center items-center" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Payment;

export function getServerSideProps(context) {
  const { orderId } = context.query;

  return {
    props: {
      orderId: orderId
    },
  };
}
