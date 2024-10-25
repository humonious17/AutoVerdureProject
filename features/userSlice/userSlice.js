import React, { useState } from "react";

const User = () => {
    const [email, setEmail] = useState(''); // State for user's email
    const [shippingAddress, setShippingAddress] = useState({}); // State for user's shipping address

    // Handler to clear user information
    const clearUser = () => {
        setEmail(''); // Reset email to empty string
        setShippingAddress({}); // Reset shipping address to empty object
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
            
            {/* Shipping Address Input (example) */}
            <input
                type="text"
                value={shippingAddress.street || ''} // Example for street address
                onChange={(e) => setShippingAddress({ ...shippingAddress, street: e.target.value })} // Update street on change
                placeholder="Enter your shipping address"
            />
            
            {/* Button to clear user information */}
            <button onClick={clearUser}>
                Clear User Info
            </button>
            
            {/* Displaying user information for reference */}
            <div>
                <h3>User Information:</h3>
                <p>Email: {email}</p>
                <p>Shipping Address: {JSON.stringify(shippingAddress)}</p>
            </div>
        </div>
    );
};

export default User;
