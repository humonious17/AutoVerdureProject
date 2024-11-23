"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { parse } from "cookie";
import { useRouter } from "next/router";

const Profile = (props) => {
  const [formData, setFormData] = useState(props.user);
  const [buttonText, setButtonText] = useState("Update Profile");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState("");
  const [redeemMessage, setRedeemMessage] = useState("");
  const [editField, setEditField] = useState({
    name: false,
    phone: false,
  });
  const router = useRouter();

  const redeemPoints = async () => {
    const redemptionValue = formData.avPoints * 10; // 1 point = 10rs
    setRedeemMessage(
      `You can redeem Rs. ${redemptionValue} on your next order.`
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (field) => {
    setEditField({
      ...editField,
      [field]: !editField[field],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleEditProfile = async () => {
    setButtonText("Updating Profile...");
    const result = await fetch("/api/editProfile", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    if (result.ok) {
      setButtonText("Updated Profile");
      window.location.href = "/profile";
    } else {
      setButtonText("Update Profile");
    }
  };

  const confirmLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies for session-based auth
      });

      if (!response.ok) throw new Error("Logout failed");

      // Clear tokens or user-related data
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("userSession");

      // Show success message
      setLogoutMessage("You have successfully logged out.");

      // Redirect to login after 2 seconds
      setTimeout(() => {
        setLogoutMessage(""); // Clear the message
        router.push("/signin");
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Something went wrong while logging out.");
    }
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const styles = {
    body: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%",
      alignItems: "center",
    },
    container: {
      flexDirection: "column",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    form: {
      padding: "20px",
      width: "560px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: "auto",
    },
    row: { display: "flex", alignItems: "center", marginBottom: "15px" },
    inputContainer: { flex: 1, position: "relative" },
    label: { fontWeight: "400", fontSize: "18px", marginBottom: "5px" },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "25px",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "10px 0",
      border: "none",
      borderRadius: "25px",
      backgroundColor: "#9A5CF5",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    logoutButton: {
      width: "100%",
      padding: "10px 0",
      border: "none",
      borderRadius: "25px",
      backgroundColor: "black",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    editIcon: {
      position: "relative",
      top: "50%",
      right: "10px",
      cursor: "pointer",
      left: "10%",
      width: "20px",
      height: "20px",
    },
    redeemButton: {
      width: "100%",
      padding: "10px 0",
      border: "none",
      borderRadius: "25px",
      backgroundColor: "#4CAF50",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    redeemMessage: {
      marginTop: "15px",
      fontSize: "14px",
      color: "#4CAF50",
      textAlign: "center",
    },
  };

  return (
    <div className="min-h-screen w-full px-4 py-6 md:py-8">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        {/* Name Fields */}
        <div className="space-y-4 md:space-y-0 md:flex md:gap-4">
          <div className="relative flex-1">
            <label className="block text-sm font-medium mb-1">First Name</label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-purple-500"
                disabled={!editField.name}
              />
              <button
                type="button"
                onClick={() => handleEdit("name")}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <FiEdit className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>
          <div className="relative flex-1">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-purple-500"
              disabled={!editField.name}
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Email</label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-purple-500"
              disabled={!editField.email}
            />
            <button
              type="button"
              onClick={() => handleEdit("email")}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <FiEdit className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Phone Field */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1">Phone</label>
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-full border focus:ring-2 focus:ring-purple-500"
              disabled={!editField.phone}
            />
            <button
              type="button"
              onClick={() => handleEdit("phone")}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <FiEdit className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Points Field */}
        <div>
          <label className="block text-sm font-medium mb-1">AV Points</label>
          <input
            type="number"
            name="avPoints"
            value={formData.avPoints}
            className="w-full px-4 py-2 rounded-full border bg-gray-50"
            disabled
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            type="button"
            onClick={redeemPoints}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
          >
            Redeem Points
          </button>

          {redeemMessage && (
            <p className="text-green-600 text-center text-sm">
              {redeemMessage}
            </p>
          )}

          <button
            type="submit"
            onClick={handleEditProfile}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
          >
            {buttonText}
          </button>

          <button
            type="button"
            onClick={openLogoutModal}
            className="w-full py-3 bg-black hover:bg-gray-800 text-white rounded-full transition-colors"
          >
            Log Out
          </button>
        </div>
      </form>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-full p-6 w-full max-w-sm">
            <p className="text-lg text-center mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmLogout}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
              >
                Yes
              </button>
              <button
                onClick={closeLogoutModal}
                className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 rounded-full"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Logout Message */}
      {logoutMessage && (
        <div className="fixed top-0 left-0 right-0 bg-green-500 text-white py-3 text-center animate-fade-in-down">
          {logoutMessage}
        </div>
      )}
    </div>
  );
};

export default Profile;

export async function getServerSideProps({ req, res }) {
  const { admin, db } = await import("/pages/api/firebaseAdmin");
  const cookies = req.headers.cookie;
  if (cookies) {
    const tokens = parse(req.headers.cookie);
    const sessionToken = tokens.sessionToken;

    if (sessionToken) {
      const usersRef = db.collection("users");
      const querySnapshot = await usersRef
        .where("sessionToken", "==", sessionToken)
        .get();

      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      const user = users[0];
      if (!user) {
        return {
          redirect: {
            destination: "/signin",
            permanent: false,
          },
        };
      }

      const parsedUser = {
        firstName: user.username.split(" ")[0],
        lastName: user.username.split(" ")[1],
        email: user.email,
        phone: user.phone || null,
        avPoints: user.avPoints || 0,
      };

      return {
        props: { user: parsedUser },
      };
    } else {
      return {
        redirect: {
          destination: "/signin",
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
}
