import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Payment = (props) => {
  const { orderId } = props;
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentInitiated, setPaymentInitiated] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { shippingDetails, amount, email } = router.query;

  const handlePaymentSuccess = async (response) => {
    try {
      const payload = {
        orderId: orderId,
        signature: response.razorpay_signature,
        paymentId: response.razorpay_payment_id,
      };

      const result = await fetch("/api/verifyPayment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!result.ok) {
        setError("Payment verification failed");
        router.push("/checkout/failed");
        return;
      }

      // Only proceed with order creation if payment verification was successful
      const parsedShippingDetails = JSON.parse(
        decodeURIComponent(shippingDetails)
      );
      const parsedProducts = JSON.parse(
        decodeURIComponent(router.query.products)
      );

      const orderPayload = {
        orderId: orderId,
        products: parsedProducts,
        shipping: {
          fullName: parsedShippingDetails.fullName,
          address1: `${parsedShippingDetails.houseNumber} ${parsedShippingDetails.streetName}`,
          address2: `${parsedShippingDetails.city}, ${parsedShippingDetails.country}`,
          city: parsedShippingDetails.city,
          state: "",
          postalCode: parsedShippingDetails.zipCode,
          country: parsedShippingDetails.country,
          phone: parsedShippingDetails.phone,
        },
        email: email,
        totalAmount: amount / 100,
        paymentStatus: "completed",
        isBuyNow: router.query.buyNow === "true",
      };

      const orderResult = await fetch("/api/addOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      if (orderResult.ok) {
        const orderSummary = {
          orderId: orderId,
          email: email,
          totalAmount: amount,
          shipping: orderPayload.shipping,
          products: parsedProducts,
        };

        router.push({
          pathname: "/checkout/successful",
          query: {
            orderSummary: encodeURIComponent(JSON.stringify(orderSummary)),
          },
        });
      } else {
        setError("Failed to create order. Please contact support.");
        router.push("/checkout/failed");
      }
    } catch (error) {
      console.error("Payment processing error:", error);
      setError("Payment processing failed");
      router.push("/checkout/failed");
    }
  };

  const handlePaymentFailure = (response) => {
    console.error("Payment failed:", response.error);
    setError("Payment failed: " + response.error.description);
    router.push("/checkout/failed");
  };

  useEffect(() => {
    if (orderId && !scriptLoaded && !paymentInitiated) {
      const loadRazorpayScript = async () => {
        try {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;

          script.onload = () => {
            setScriptLoaded(true);
            const options = {
              key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
              amount: amount,
              currency: "INR",
              name: "Auto Verdure",
              description: "Payment for your order",
              image: "/logo.png",
              order_id: orderId,
              handler: handlePaymentSuccess,
              modal: {
                ondismiss: function () {
                  router.push("/checkout/failed");
                },
              },
              prefill: {
                email: email,
              },
              theme: {
                color: "#9A5CF5",
              },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", handlePaymentFailure);
            setPaymentInitiated(true);
            rzp.open();
          };

          document.body.appendChild(script);
        } catch (error) {
          console.error("Error loading Razorpay:", error);
          setError("Failed to load payment interface");
          router.push("/checkout/failed");
        }
      };

      loadRazorpayScript();
    }
  }, [orderId, scriptLoaded, paymentInitiated]);

  return (
    <div className="mb-[177px] sm:mb-[303px] w-full px-11 sm:px-0 flex flex-col justify-center items-center">
      <div className="mb-[42px] sm:mb-[52px] max-w-[560px] w-full flex flex-col gap-y-3 sm:justify-center sm:items-center">
        <p className="text-[32px] leading-8 font-normal capitalize text-[#070707]">
          Payment Processing
        </p>
        <p className="w-[266px] sm:w-full text-sm leading-[22.4px] font-medium text-[#8E8F94] sm:text-center">
          Please do not close this window while your payment is being processed.
        </p>
      </div>

      {error && (
        <div className="text-red-600 text-center mt-4 mb-4">{error}</div>
      )}

      <div className="w-full sm:px-[51px] xl:px-[12px] flex flex-col justify-center items-center">
        <div className="mt-[86px] sm:mt-[69px] max-w-[1119px] w-full p-6 border-[1px] rounded-[25px] border-[#000000]">
          {shippingDetails && (
            <div className="shipping-summary">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              {JSON.parse(decodeURIComponent(shippingDetails)).fullName && (
                <div className="shipping-details">
                  <p className="font-medium">Shipping to:</p>
                  <p>
                    {JSON.parse(decodeURIComponent(shippingDetails)).fullName}
                  </p>
                  <p>
                    {JSON.parse(decodeURIComponent(shippingDetails)).streetName}{" "}
                    {
                      JSON.parse(decodeURIComponent(shippingDetails))
                        .houseNumber
                    }
                  </p>
                  <p>
                    {JSON.parse(decodeURIComponent(shippingDetails)).city},{" "}
                    {JSON.parse(decodeURIComponent(shippingDetails)).country}
                  </p>
                  <p>
                    {JSON.parse(decodeURIComponent(shippingDetails)).zipCode}
                  </p>
                  <p>
                    Phone:{" "}
                    {JSON.parse(decodeURIComponent(shippingDetails)).phone}
                  </p>
                </div>
              )}
              <div className="mt-4">
                <p className="font-medium">
                  Amount: ₹{(parseInt(amount) / 100).toFixed(2)}
                </p>
                <p>Email: {email}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;

export async function getServerSideProps(context) {
  const { orderId } = context.query;

  if (!orderId) {
    return {
      redirect: {
        destination: "/checkout/shipping",
        permanent: false,
      },
    };
  }

  return {
    props: {
      orderId,
    },
  };
}
