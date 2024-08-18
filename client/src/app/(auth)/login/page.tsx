"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/Input";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    console.log(formData);

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        // Redirect using window.location to avoid router issues
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-6">Login</h1>
        {error && <span className="text-lg text-red-500">{error}</span>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <TextInput
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md"
              disabled={loading}
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-gray-300 mb-2">
              Password
            </label>
            <TextInput
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md"
              disabled={loading}
              name="password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform  text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors"
            loading={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
