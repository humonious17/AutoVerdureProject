import React, { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on initial load
    checkSession();
  }, []);

  const checkSession = () => {
    const token = localStorage.getItem("adminToken");
    const storedUser = localStorage.getItem("adminUser");

    if (token && storedUser) {
      try {
        // Optionally verify token validity here
        setUser(JSON.parse(storedUser));
      } catch (error) {
        logout();
      }
    }
    setLoading(false);
  };

  const login = async (token) => {
    // Decode token and extract user info
    const decoded = JSON.parse(atob(token.split(".")[1]));

    // Store token and user info
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUser", JSON.stringify({ email: decoded.email }));

    setUser({ email: decoded.email });
  };

  const logout = () => {
    // Remove token and user info
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setUser(null);
    router.push("/admin/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
