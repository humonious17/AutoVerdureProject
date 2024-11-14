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
    setRedeemMessage(`You can redeem Rs. ${redemptionValue} on your next order.`);
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
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <div style={{ ...styles.inputContainer, marginRight: "10px" }}>
            <label htmlFor="firstName" style={styles.label}>
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
              disabled={!editField.name}
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="lastName" style={styles.label}>
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
              disabled={!editField.name}
            />
          </div>
          <FiEdit style={styles.editIcon} onClick={() => handleEdit("name")} />
        </div>

        <div style={styles.row}>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              disabled={!editField.email}
            />
          </div>
          <FiEdit style={styles.editIcon} onClick={() => handleEdit("email")} />
        </div>

        <div style={styles.row}>
          <div style={styles.inputContainer}>
            <label htmlFor="phone" style={styles.label}>
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              disabled={!editField.phone}
            />
          </div>
          <FiEdit style={styles.editIcon} onClick={() => handleEdit("phone")} />
        </div>

        <div style={styles.row}>
          <div style={styles.inputContainer}>
            <label htmlFor="avPoints" style={styles.label}>
              AV Points
            </label>
            <input
              type="number"
              name="avPoints"
              value={formData.avPoints}
              readOnly
              style={styles.input}
              disabled
            />
          </div>
        </div>

        <button type="button" style={styles.redeemButton} onClick={redeemPoints}>
          Redeem Points
        </button>

        {redeemMessage && <div style={styles.redeemMessage}>{redeemMessage}</div>}
        
        {/* Update Profile Button */}
        <button type="submit" style={styles.button} onClick={handleEditProfile}>
          {buttonText}
        </button>

        {/* Logout Button */}
        <button
          type="button"
          style={styles.logoutButton}
          onClick={openLogoutModal}
        >
          Log Out
        </button>

        {/* Logout Modal */}
        {showLogoutModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg text-center">
              <p className="text-lg mb-4">Are you sure you want to log out?</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  Yes
                </button>
                <button
                  onClick={closeLogoutModal}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Logout Success Message */}
        {logoutMessage && (
          <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-3">
            {logoutMessage}
          </div>
        )}
      </form>
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
