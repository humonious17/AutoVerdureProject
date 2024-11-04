/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Payment = (props) => {
  const orderId = props.orderId;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    streetName: '',
    houseNumber: '',
    city: '',
    phone: '',
    country: '',
    zipCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  let total = 0;
  const router = useRouter();

  // Update this with proper product data
  const selectedProducts = [
    { 
      productId: "prod1",
      productName: "Product 1",
      productPrice: "100", 
      productQty: 2 
    },
    { 
      productId: "prod2",
      productName: "Product 2",
      productPrice: "200", 
      productQty: 1 
    }
  ];

  selectedProducts.forEach((element) => {
    total += parseInt(element.productPrice) * parseInt(element.productQty);
  });

  useEffect(() => {
    // Get shipping details from URL or localStorage when component mounts
    const shippingDetails = router.query;
    if (shippingDetails) {
      setAddress({
        fullName: shippingDetails.fullName || '',
        streetName: shippingDetails.streetName || '',
        houseNumber: shippingDetails.houseNumber || '',
        city: shippingDetails.city || '',
        phone: shippingDetails.phone || '',
        country: shippingDetails.country || '',
        zipCode: shippingDetails.zipCode || '',
      });
      setEmail(shippingDetails.email || '');
    }
  }, [router.query]);

  const handleSubmit = () => {
    if (scriptLoaded) {
      // Your existing submit logic
    }
  };

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
              try {
                setIsSubmitting(true);
                
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
                    products: selectedProducts.map(product => ({
                      productId: product.productId,
                      productName: product.productName,
                      productPrice: product.productPrice,
                      productQty: product.productQty
                    })),
                    email: email,
                    shippingAddress: {
                      fullName: address.fullName,
                      streetName: address.streetName,
                      houseNumber: address.houseNumber,
                      city: address.city,
                      phone: address.phone,
                      country: address.country,
                      zipCode: address.zipCode
                    }
                  };
            
                  console.log('Sending order payload:', orderPayload);
            
                  const orderResponse = await fetch('/api/addOrder', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderPayload)
                  });
            
                  if (!orderResponse.ok) {
                    const errorData = await orderResponse.json();
                    throw new Error(`Failed to create order: ${errorData.message}`);
                  }
                  /*
                  // Send order confirmation email with complete shipping details
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
                      shippingDetails: address
                    })
                  });*/

                  setEmail('');
                  setAddress({
                    fullName: '',
                    streetName: '',
                    houseNumber: '',
                    city: '',
                    phone: '',
                    country: '',
                    zipCode: '',
                  });
                  setProducts([]);
                  router.push('/checkout/successful');
                } else {
                  throw new Error('Payment verification failed');
                }
              } catch (error) {
                console.error('Payment processing error:', error);
                router.push('/store');
              } finally {
                setIsSubmitting(false);
              }
            },
            prefill: {
              email: email,
              contact: address.phone,
              name: address.fullName
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
  }, [orderId, total, router, email, address]);

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
        <div className="mt-[86px] sm:mt-[69px] max-w-[1119px] w-full h-[703px] border-[1px] rounded-[25px] border-[#000000]">
          {/* Display shipping details summary */}
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Shipping Details</h3>
            <p>{address.fullName}</p>
            <p>{address.streetName} {address.houseNumber}</p>
            <p>{address.city}, {address.country} {address.zipCode}</p>
            <p>Phone: {address.phone}</p>
            <p>Email: {email}</p>
          </div>
        </div>
        <form action="https://www.example.com/payment/success/" method="POST">
          <div id="razorpay-button-container"></div>
          <input type="hidden" custom="Hidden Element" name="hidden"/>
        </form>
        {/* Button */}
        <button 
          className="mt-10 max-w-[440px] w-full px-6 py-[17px] rounded-[30px] bg-[#070707] text-[#FFFFFF] flex justify-center items-center" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Continue'}
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
      orderId: orderId || null
    },
  };
}