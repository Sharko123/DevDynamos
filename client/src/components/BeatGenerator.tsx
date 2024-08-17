"use client";
import React, { useState } from "react";
import CustomAudioPlayer from "./Audio/AudioPlayer";
import Button from "./ui/Button";

const BeatGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const handleGenerateBeat = () => {
    setLoading(true);
    // TODO: add api call
    setTimeout(() => {
      setAudioUrl("/beat.mp3");
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
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
