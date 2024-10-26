import React, { useState } from "react";

const User = ({ emailFromSession }) => {
    const [email, setEmail] = useState(emailFromSession || ''); // Set email from session or empty
    const [shippingAddress, setShippingAddress] = useState({}); // Local state for address

    // Clear user information
    const clearUser = () => {
        setEmail(''); // Clear email
        setShippingAddress({}); // Clear address
    };

    return (
        <div>
            {/* Email Input */}
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email on change
                placeholder="Enter your email"
            />
            
            {/* Shipping Address Input */}
            <input
                type="text"
                value={shippingAddress.street || ''} // Display street
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} // Update street on change
                placeholder="Enter your shipping address"
            />
            
            {/* Button to clear user information */}
            <button onClick={clearUser}>
                Clear User Info
            </button>
            
            {/* Display user info */}
            <div>
                <h3>User Information:</h3>
                <p>Email: {email}</p>
                <p>Shipping Address: {JSON.stringify(shippingAddress)}</p>
            </div>
        </div>
    );
};

export default User;
