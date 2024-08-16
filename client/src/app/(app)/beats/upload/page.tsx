// pages/UploadPage.tsx
import React from "react";
import UploadForm from "@/components/Forms/BeatUploadForm";

const UploadPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
      <UploadForm />
    </div>
  );
};

export default UploadPage;
