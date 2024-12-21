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
    setCartItems(items);
  }, [items]);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, item) => {
      const itemPrice = item.price || 0;
      const quantity = parseInt(item.productQty) || 1;
      return acc + itemPrice * quantity;
    }, 0);
    setTotal(newTotal);
  }, [cartItems]);

  const handleCartGuestCheckout = () => {
    if (!cartItems.length) return false;
    router.push("/checkout/guest");
  };

  const handleCartMemberCheckout = () => {
    if (!cartItems.length) return false;
    router.push("/checkout/member");
  };

  const removeCartItem = async (cartObjId) => {
    if (!cartObjId || isRemoving) {
      console.log("Invalid cartObjId or removal in progress:", cartObjId);
      return;
    }

    setIsRemoving(true);
    try {
      const response = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartObjId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to remove item");
      }

      const newCartItems = cartItems.filter(
        (item) => item.cartObjId !== cartObjId
      );
      setCartItems(newCartItems);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMinimize = () => setIsMinimized(true);
  const handleRestore = () => setIsMinimized(false);

  if (isMinimized) {
    return (
      <div className="minimized-cart" onClick={handleRestore}>
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
          <div className="cart-badge">{cartItems.length}</div>
        )}
      </div>
    );
  }

  return (
    <div className="cart-style" ref={cartRef}>
      <div className="cart-header">
        <button onClick={handleMinimize} className="minimize-button">
          -
        </button>
        <button onClick={onClose} className="close-button">
          ×
        </button>
      </div>

      <h2 className="cart-heading">Shopping Cart</h2>
      <div className="cart-divider"></div>

      <div className="cart-items-container">
        {cartItems.map((item) => (
          <li key={item.cartObjId} className="cart-item">
            <div className="cart-item-image">
              <div className="image-wrapper">
                <Image
                  src={item.productImage}
                  alt={item.productName}
                  width={105}
                  height={105}
                  layout="responsive"
                  objectFit="cover"
                  quality={100}
                  priority={true}
                />
              </div>
            </div>
            <div className="cart-item-details">
              <p className="item-name">{item.productName}</p>
              <p className="item-price">
                <span className="quantity">{item.productQty} x </span>
                <span className="price">Rs. {formatPrice(item.price)}</span>
              </p>
            </div>
            <button
              className="remove-button"
              onClick={() => removeCartItem(item.cartObjId)}
              disabled={isRemoving}
            >
              ×
            </button>
          </li>
        ))}
      </div>

      <div className="cart-footer">
        <div className="total-section">
          <p>Total</p>
          <p className="total-amount">Rs. {formatPrice(total)}</p>
        </div>
        <div className="cart-divider"></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            gap: "20px",
            width: "100%",
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
    </div>
  );
};

export default CartOverview;
