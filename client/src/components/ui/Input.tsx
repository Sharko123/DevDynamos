// components/TextInput.tsx
import React, { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder = "",
  disabled = false,
  className = "",
  ...props
}) => {
  return (
    <input
      {...props}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      onKeyDown={onKeyDown}
      className={`border border-gray-600 rounded-md w-full p-2 bg-gray-800 text-white ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    />
  );
};

export default TextInput;
