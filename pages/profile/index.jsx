"use client";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import { parse } from "cookie";

const Profile = (props) => {
  const [formData, setFormData] = useState(props.user);
  const [buttonText, setButtonText] = useState("Update Profile");

  const [editField, setEditField] = useState({
    name: false,
    // email:false,
    phone: false,
    // avPoints:false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleEdit = (field) => {
    console.log(editField);
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

  const styles = {
    body: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%",
      alignItems: "center",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignitems: "center",
      justifyContent: "center",
      height: "100vh",
      // backgroundColor:'#fdf7f1',
      fontFamily: "Arial, sans-serif",
    },
    form: {
      // backgroundColor:'#fff',
      borderRadius: "10px",
      // boxShadow:'0 2px 10px rgba(0, 0, 0, 0.1)',
      padding: "20px",
      width: "560px",
      height: "498px",
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "auto",
      margin: "auto",
    },
    label: {
      display: "urbanist",
      marginBottom: "8px",
      fontWeight: "400",
      fontSize: "24px",
      // lineheight '24px',
      // marginLeft:'10px',
    },
    labellast: {
      display: "urbanist",
      marginBottom: "8px",
      fontWeight: "400",
      fontSize: "24px",
      position: "relative",
      left: "25px",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ccc",
      borderRadius: "25px",
      boxSizing: "border-box",
      fontSize: "14px",
      marginRight: "10px",
    },
    inputHalf: {
      width: "100%",
      padding: "10px 10px 10px 10px",
      marginBottom: "15px 10px 15px 0px",
      border: "1px solid #ccc",
      borderRadius: "25px",
      // boxSizing: 'border-box',
      fontSize: "14px",
      borderSpacing: "10px",
      // marginRight: '10 px' // Added this line to increase the space between first name and last name
    },
    inputNumber: {
      // width:'calc(100% - 70px)',
      width: "100%",
      display: "inline-block",
    },
    row: {
      display: "flex",
      justifyContent: "space-between",
    },
    button: {
      width: "99%",
      padding: "10px 0",
      border: "none",
      borderRadius: "25px",
      backgroundColor: "#9A5CF5",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
    },
    inlineContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "column",
    },
    inlineText: {
      fontSize: "14px",
      color: "#666",
      marginTop: "5px",
    },
    nameHalf: {
      width: "50%",
      // marginLeft: '20px',
    },
    firstRowField: {
      width: "107%",
      display: "flex",
      alignItems: "center",
    },
    formField: {
      // width: '102%',
      // display:'flex',
    },
    editIcon: {
      // marginLeft: '10px',
      position: "relative",
      width: "40px",
      height: "40px",
      // flexShrink: '0',
      // paddingLeft:'0px',
      left: "10%",
      top: "15",
      // background: 'url(<path-to-image>) lightgray 50% / cover no-repeat',
    },
    editIcon2: {
      // marginLeft: '10px',
      position: "relative",
      width: "40px",
      height: "40px",
      // flexShrink: '0',
      // paddingLeft:'0px',
      left: "3%",
      // background: 'url(<path-to-image>) lightgray 50% / cover no-repeat',
    },
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.row}>
          <div style={styles.firstRowField}>
            <div style={styles.nameHalf}>
              <label htmlFor="firstName" style={styles.label}>
                First Name
              </label>
              <div style={{ display: "justify-content", width: "100%" }}>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.inputHalf}
                  disabled={!editField.name}
                />
              </div>
            </div>
            <div style={styles.nameHalf}>
              <label htmlFor="lastName" style={styles.labellast}>
                Last Name
              </label>
              <div
                style={{
                  display: "justify-content",
                  width: "100%",
                  marginLeft: "10%",
                }}
              >
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.inputHalf}
                  disabled={!editField.name}
                />
              </div>
            </div>
            <BiEdit
              style={styles.editIcon}
              onClick={() => handleEdit("name")}
              // width={"100px"}
            />
          </div>
        </div>
        <div style={styles.formField}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              // disabled={!editField.email}
            />
          </div>
        </div>
        <div style={styles.formField}>
          <label htmlFor="phone" style={styles.label}>
            Phone
          </label>
          <div style={{ display: "flex", width: "107%" }}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              disabled={!editField.phone}
            />
            <BiEdit
              style={styles.editIcon2}
              onClick={() => handleEdit("phone")}
            />
          </div>
        </div>
        <div style={styles.formField}>
          <label htmlFor="avPoints" style={styles.label}>
            AV Points
          </label>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* <div style={styles.inlineContainer}> */}
            <input
              type="number"
              name="avPoints"
              value={formData.avPoints}
              onChange={handleChange}
              style={{ ...styles.input, ...styles.inputNumber }}
              // disabled={!editField.avPoints}
            />
            {/* </div> */}
            <br />
          </div>
          <div>
            <span style={styles.inlineText}>100 AV Points = 1 Rupee</span>
          </div>
        </div>
        <button
          type="submit"
          style={styles.button}
          onClick={handleEditProfile}
          // onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOverCapture={(e) =>
            (e.target.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          {buttonText}
        </button>
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
        firstName: user.username?.split(" ")[0] || "",
        lastName: user.username?.split(" ")[1] || "",
        email: user.email || "",
        phone: user.phone || null, // Assign null if undefined
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
