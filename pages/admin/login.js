import React, { useState } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/pages/admin/AuthContext";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLocked, setIsLocked] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        await login(data.token);
        router.push("/admin/productlist"); // Redirect to product list
      } else {
        // Login failed
        setError(data.message || "Login failed");
        setIsLocked(true);
        setIsLoading(false);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLocked(true);
      setIsLoading(false);
      console.error(err);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Unlock the lock when password is not empty
    setIsLocked(newPassword.length === 0);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fffbf7] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-opacity-50">
          <CardHeader>
            <CardTitle className="text-3xl text-center font-bold text-gray-800">
              Admin Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Message with Animation */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center space-x-2"
                  >
                    <AlertTriangle className="w-5 h-5" />
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-gray-700">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                  className="border-gray-300 focus:ring-2 focus:ring-primaryMain transition-all duration-300"
                />
              </div>

              {/* Password Input with Lock Animation */}
              <div>
                <label htmlFor="password" className="block mb-2 text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                    placeholder="Enter your password"
                    className="pr-12 border-gray-300 focus:ring-2 focus:ring-primaryMain transition-all duration-300"
                  />
                  <motion.div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 mb-2"
                    initial={{ scale: 1 }}
                    animate={{
                      scale: isLocked ? 1 : [1, 1.2, 1],
                      rotate: isLocked ? 0 : [0, -20, 20, 0],
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isLocked ? (
                      <Lock className="w-5 h-5 text-gray-400" />
                    ) : (
                      <Unlock className="w-5 h-5 text-green-500" />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Login Button with Loading State */}
              <Button
                type="submit"
                className="w-full bg-primaryMain hover:bg-purple-700 transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear",
                    }}
                  >
                    <Lock className="w-5 h-5 animate-pulse" />
                  </motion.div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
