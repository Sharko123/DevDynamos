"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the auth data
interface AuthContextType {
  userId: string | null;
  username: string | null;
  email: string | null;
  setAuthData: (userId: string, username: string, email: string) => void;
  clearAuthData: () => void;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  // Function to set the auth data (e.g., after a successful login)
  const setAuthData = (userId: string, username: string, email: string) => {
    setUserId(userId);
    setUsername(username);
    setEmail(email);
  };

  // Function to clear the auth data (e.g., on logout)
  const clearAuthData = () => {
    setUserId(null);
    setUsername(null);
    setEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ userId, username, email, setAuthData, clearAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
