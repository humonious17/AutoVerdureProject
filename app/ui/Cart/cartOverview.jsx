import React, { useEffect, useRef, useState } from 'react';
import './cartOverviewStyles.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const CartOverview = ({ items, onClose }) => {
    const cartRef = useRef(null);
    const router = useRouter();
    const [cartItems, setCartItems] = useState(items);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        // Calculate total whenever cartItems change
        const newTotal = cartItems.reduce((acc, item) => acc + (parseInt(item.productQty) * parseInt(item.price)), 0);
        setTotal(newTotal);
    }, [cartItems]);

    const handleCartGuestCheckout = () => {
        if (!cartItems.length) {
            return false;
        }
        // Proceed with guest checkout
        router.push('/checkout/guest');
    };

    const handleCartMemberCheckout = () => {
        if (!cartItems.length) {
            return false;
        }
        // Proceed with member checkout
        router.push('/checkout/member');
    };

    const removeCartItem = async (cartObjId, index) => {
        const payload = { cartObjId: cartObjId };

        try {
            const newCartItems = cartItems.filter((_, i) => i !== index);
            setCartItems(newCartItems);
            const response = await fetch('/api/cart/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            // Handle response if needed
        } catch (error) {
            console.error(error);
            return true;
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cartRef.current && !cartRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="cart-style" ref={cartRef}>
            <button onClick={onClose} className="absolute top-2 right-2 text-xl" style={{ marginTop: "10px", marginRight: "15px" }}>×</button>
            <h2 className="cart-heading">Shopping Cart</h2>
            <div style={{ height: "1px", margin: "26px 30px 0 30px", backgroundColor: "#D9D9D9" }}></div>
            <div style={{ height: "41.73px" }}></div>
            <ul style={{ height: "400px", overflowY: "auto" }}>
                {cartItems.map((item, index) => (
                    <li key={index} className="mb-2" style={{ display: "flex", alignItems: "flex-start", marginBottom: "20.27px" }}>
                        <Image
                            src={item.productImage}
                            alt={item.productName}
                            height={105}
                            width={105}
                            style={{
                                borderRadius: "7.404px",
                                marginLeft: "26.5px"
                            }}
                        />
                        <div style={{ marginLeft: "35.5px", marginTop: "24.27px", flex: 1 }}>
                            <p style={{ color: "#000", fontWeight: "550", fontSize: "16px" }}>{item.productName}</p>
                            <p>
                                <span style={{ color: "#000", fontWeight: "400", fontSize: "16px" }}>{item.productQty} x </span>
                                <span style={{ color: "#A458FE", fontSize: "12px", fontWeight: "600" }}>Rs. {item.price}</span>
                            </p>
                        </div>
                        <button
                            className="text-xl"
                            style={{
                                marginTop: "33.85px",
                                marginRight: "40px",
                                backgroundColor: "#9F9F9F",
                                border: "none",
                                cursor: "pointer",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                color: "#FFF",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                            onClick={() => removeCartItem(item.cartObjId, index)}
                        >
                            ×
                        </button>
                    </li>
                ))}
            </ul>
            <div style={{ display: "flex", alignItems: "center", marginLeft: "31px", marginTop: "5px" }}>
                <p style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                    marginRight: "101px",
                    color: "#000"
                }}>
                    Subtotal
                </p>
                <p style={{
                    fontFamily: "Poppins",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    lineHeight: "normal",
                    color: "#A458FE"
                }}>
                    Rs. {total}
                </p>
            </div>
            <div style={{ height: "1px", marginTop: "15px", backgroundColor: "#D9D9D9" }}></div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", paddingLeft: "33px", paddingRight: "33px" }}>
                <button style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "150px",
                    borderRadius: "50px",
                    backgroundColor: "#000",
                    color: "#FFF",
                    cursor: "pointer",
                    fontSize: "15px",
                    height: "40px",
                }} onClick={handleCartGuestCheckout}>
                    Guest Checkout
                </button>
                <button style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "150px",
                    borderRadius: "50px",
                    backgroundColor: "#000",
                    color: "#FFF",
                    cursor: "pointer",
                    fontSize: "15px",
                    height: "40px",
                }} onClick={handleCartMemberCheckout}>
                    Member Checkout
                </button>
            </div>
        </div>
    );
};

export default CartOverview;
