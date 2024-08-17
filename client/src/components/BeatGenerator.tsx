"use client";
import React, { useState } from "react";
import CustomAudioPlayer from "./Audio/AudioPlayer";
import Button from "./ui/Button";
import { generateNewBeat } from "@/lib/actions";

const BeatGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleGenerateBeat = async () => {
    
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
      } else {
        console.error("Failed to generate beat:", await response.json());
      }
    } catch (error) {
      console.error("Error generating beat:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-white mb-6">Generate a Beat</h1>

      <div className="flex flex-col items-center">
        {!audioUrl && (
          <Button onClick={handleGenerateBeat} disabled={loading}>
            Generate Beat
          </Button>
        )}
        {loading && (
          <div className="mt-6 flex items-center justify-center">
            <div className="w-16 h-16 border-t-4 border-blue-400 border-solid rounded-full animate-spin"></div>
          </div>
        )}
        {/* Beat has been generated we've the url for it so remove the button and add beat preview */}
        {audioUrl && !loading && (
          <>
            <div className="mt-6 w-full">
              <CustomAudioPlayer src={audioUrl} />
            </div>
            <div className="flex gap-2 mt-3 w-full">
              <Button>Upload</Button>
              <Button>Generate other</Button>
              <Button>Cancel</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BeatGenerator;
