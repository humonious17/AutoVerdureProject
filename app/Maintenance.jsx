import React from "react";

const Maintenance = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#fffbf7",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#333", marginBottom: "20px" }}>
        Page Under Maintenance
      </h1>
      <p style={{ fontSize: "1.2rem", color: "#666", margin: "10px 0" }}>
        We&apos;re currently working on improving our website. Please check back
        later.
      </p>
      <p style={{ fontSize: "1.2rem", color: "#666", margin: "10px 0" }}>
        Thank you for your patience!
      </p>
    </div>
  );
};

export default Maintenance;
