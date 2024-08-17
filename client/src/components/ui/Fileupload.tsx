"use client";
import { FileUp } from "lucide-react";
import React, { useState, DragEvent, ChangeEvent, useRef } from "react";

interface CustomFileUploadProps {
  onFileChange: (file: File | null) => void;
  fileTypes?: string;
}

// This component handles the file input which can be used anywhere on the app
// It can take drag and drop files or you can click to add the file
// Either way the file is selected by the input and then the fileChange event is fired
// Which you have to impliment in the parent component

const CustomFileUpload: React.FC<CustomFileUploadProps> = ({
  onFileChange,
  fileTypes,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0] || null;
    onFileChange(file);
  };

  const handleClick = () => {
    if (!inputRef.current) return;
    inputRef.current.click();
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer ${
        dragging ? "border-blue-500 bg-blue-100" : "border-gray-600 bg-gray-800"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileSelect}
        accept={fileTypes}
        ref={inputRef}
      />
      <div className="flex flex-col items-center gap-4">
        <FileUp size={50} />
        <label
          htmlFor="file-upload"
          className="cursor-pointer block text-white font-semibold"
        >
          Drag & Drop a file here or click to select
        </label>
      </div>
    </div>
  );
};

export default CustomFileUpload;
