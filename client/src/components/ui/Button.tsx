"use client";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  loading = false,
  children,
  className,
  ...props
}) => {
  const baseStyles =
    "px-6 py-3 rounded-md shadow-lg transition duration-300 focus:outline-none";
  const variantStyles = {
    primary:
      "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:bg-gradient-to-l",
    secondary: "bg-gray-800 text-white hover:bg-gray-700",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={loading}
      {...props}
    >
      {loading ? (
        <div className="w-6 h-6 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
