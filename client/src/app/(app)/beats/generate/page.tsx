import React from "react";
import BeatGenerator from "@/components/BeatGenerator";

const GeneratePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center">
      <BeatGenerator />
    </div>
  );
};

export default GeneratePage;
