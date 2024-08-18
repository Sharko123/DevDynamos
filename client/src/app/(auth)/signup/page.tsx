// pages/signup.tsx
"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import TextInput from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

const SignupPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password") as string;
    const cPass = formData.get("confirmpassword") as string;
    if (password != cPass) return setError("Password do not match");

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        router.push("/login");
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
        <h1 className="text-2xl font-bold text-white mb-6">Sign Up</h1>
        {error && <span className="text-lg text-red-500">{error}</span>}
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-300 mb-2">
              Email
            </label>
            <TextInput
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-300 mb-2">
              Username
            </label>
            <TextInput
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
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
              name="password"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2  text-gray-400"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="mb-6 relative">
            <label
              htmlFor="confirm-password"
              className="block text-gray-300 mb-2"
            >
              Confirm Password
            </label>
            <TextInput
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              placeholder="Confirm your password"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md"
              name="confirmpassword"
              disabled={loading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2  text-gray-400"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <Button type="submit" className="w-full" loading={loading}>
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
