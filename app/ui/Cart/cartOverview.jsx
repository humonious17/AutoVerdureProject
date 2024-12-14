import React, { useEffect, useRef, useState } from "react";
import "./cartOverviewStyles.css";
import Image from "next/image";
import { useRouter } from "next/router";

const CartOverview = ({ items, onClose }) => {
  const cartRef = useRef(null);
  const router = useRouter();
  const [cartItems, setCartItems] = useState(items);
  const [total, setTotal] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    // Update cart items when items prop changes
    setCartItems(items);
  }, [items]);

  useEffect(() => {
    // Calculate total whenever cartItems change
    const newTotal = cartItems.reduce((acc, item) => {
      const itemPrice = item.price || 0;
      const quantity = parseInt(item.productQty) || 1;
      return acc + itemPrice * quantity;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleCartGuestCheckout = () => {
    if (!cartItems.length) {
      return false;
    }
    router.push("/checkout/guest");
  };

  const handleCartMemberCheckout = () => {
    if (!cartItems.length) {
      return false;
    }
    router.push("/checkout/member");
  };

  const removeCartItem = async (cartObjId) => {
    if (!cartObjId || isRemoving) {
      console.log("Invalid cartObjId or removal in progress:", cartObjId);
      return;
    }

    setIsRemoving(true);
    console.log("Attempting to remove item with cartObjId:", cartObjId);

    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartObjId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove item");
      }

      // Only update UI after successful removal from database
      const newCartItems = cartItems.filter(
        (item) => item.cartObjId !== cartObjId
      );
      setCartItems(newCartItems);
      console.log("Successfully removed item from cart");
    } catch (error) {
      console.error("Failed to remove item:", error);
      alert("Failed to remove item from cart. Please try again.");
    } finally {
      setIsRemoving(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Function to format price with commas for thousands
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Minimize and restore functions
  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  // Minimized cart bubble styles
  const minimizedCartStyle = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#A458FE",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    cursor: "pointer",
    zIndex: 1000,
  };

  // If minimized, render the small cart bubble
  if (isMinimized) {
    return (
      <div style={minimizedCartStyle} onClick={handleRestore}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="10" cy="20.5" r="1" />
          <circle cx="18" cy="20.5" r="1" />
          <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
        </svg>
        {cartItems.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "-5px",
              right: "-5px",
              backgroundColor: "black",
              color: "white",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "12px",
            }}
          >
            {cartItems.length}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="cart-style" ref={cartRef}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
          marginRight: "15px",
          backgroundColor: "#fffbf7",
        }}
      >
        <button
          onClick={handleMinimize}
          className="text-xl"
          style={{
            backgroundColor: "#9F9F9F",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "15px",
          }}
        >
          -
        </button>
        <button
          onClick={onClose}
          className="text-xl"
          style={{
            color: "black",
            border: "none",
            background: "none",
          }}
        >
          ×
        </button>
      </div>
      <h2 className="cart-heading">Shopping Cart</h2>
      <div
        style={{
          height: "1px",
          margin: "26px 30px 0 30px",
          backgroundColor: "#fffbf7",
        }}
      ></div>
      <div style={{ height: "41.73px" }}></div>
      <ul style={{ height: "400px", overflowY: "auto" }}>
        {cartItems.map((item) => (
          <li
            key={item.cartObjId}
            className="mb-2"
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "20.27px",
            }}
          >
            <Image
              src={item.productImage}
              alt={item.productName}
              height={105}
              width={105}
              objectFit="cover"
              style={{
                borderRadius: "7.404px",
                marginLeft: "26.5px",
                aspectRatio: "1/1",
              }}
            />
            <div
              style={{ marginLeft: "35.5px", marginTop: "24.27px", flex: 1 }}
            >
              <p style={{ color: "#000", fontWeight: "550", fontSize: "16px" }}>
                {item.productName}
              </p>
              <p>
                <span
                  style={{ color: "#000", fontWeight: "400", fontSize: "16px" }}
                >
                  {item.productQty} x{" "}
                </span>
                <span
                  style={{
                    color: "#A458FE",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Rs. {formatPrice(item.price)}
                </span>
              </p>
            </div>
            <button
              className="text-xl"
              style={{
                marginTop: "33.85px",
                marginRight: "10px",
                backgroundColor: "#9F9F9F",
                border: "none",
                cursor: isRemoving ? "not-allowed" : "pointer",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: isRemoving ? 0.5 : 1,
              }}
              onClick={() => removeCartItem(item.cartObjId)}
              disabled={isRemoving}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center px-[51px] mt-[5px]">
        <p className="font-poppins text-base font-normal text-black">Total</p>
        <p className="font-poppins text-base font-semibold text-[#A458FE]">
          Rs. {formatPrice(total)}
        </p>
      </div>
      <div
        style={{ height: "1px", marginTop: "15px", backgroundColor: "#D9D9D9" }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
          gap: "20px",
          width: "100%"
        }}
      >
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "150px",
            minWidth: "150px",
            whiteSpace: "nowrap",
            borderRadius: "50px",
            backgroundColor: "#000",
            color: "#FFF",
            cursor: "pointer",
            fontSize: "15px",
            height: "40px",
          }}
          onClick={handleCartGuestCheckout}
        >
          Guest Checkout
        </button>
        <button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "150px",
            minWidth: "150px",
            whiteSpace: "nowrap",
            borderRadius: "50px",
            backgroundColor: "#000",
            color: "#FFF",
            cursor: "pointer",
            fontSize: "15px",
            height: "40px",
          }}
          onClick={handleCartMemberCheckout}
        >
          Member Checkout
        </button>
      </div>
    </div>
  );
};

export default CartOverview;
