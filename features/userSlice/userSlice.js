import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { 
  setEmail, 
  setShippingAddress, 
  clearUser,
  selectEmail,
  selectShippingAddress 
} from './userSlice';

const User = ({ emailFromSession }) => {
    const dispatch = useDispatch();
    const email = useSelector(selectEmail);
    const shippingAddress = useSelector(selectShippingAddress);

    // Set initial email from session if provided
    React.useEffect(() => {
        if (emailFromSession) {
            dispatch(setEmail(emailFromSession));
        }
    }, [emailFromSession, dispatch]);

    // Update email
    const handleEmailChange = (e) => {
        dispatch(setEmail(e.target.value));
    };

    // Update shipping address
    const handleAddressChange = (e) => {
        dispatch(setShippingAddress({
            ...shippingAddress,
            street: e.target.value
        }));
    };

    // Clear user information
    const handleClearUser = () => {
        dispatch(clearUser());
    };

    return (
        <div>
            {/* Email Input */}
            <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter your email"
            />
            
            {/* Shipping Address Input */}
            <input
                type="text"
                value={shippingAddress.street || ''}
                onChange={handleAddressChange}
                placeholder="Enter your shipping address"
            />
            
            {/* Button to clear user information */}
            <button onClick={handleClearUser}>
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