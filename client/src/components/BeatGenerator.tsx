"use client";
import React, { useState } from "react";
import CustomAudioPlayer from "./Audio/AudioPlayer";
import Button from "./ui/Button";
import { generateNewBeat } from "@/lib/actions";
import CustomFileUpload from "./ui/Fileupload";

const BeatGenerator: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [error, setError] = useState<string>("");
  const [drums, setDrums] = useState<boolean>(false);
  const [bass, setBass] = useState<boolean>(true);
  const [beatFile, setBeatFile] = useState<File | null>(null);

  /// Send request to the server and wait while the server generates the output for the beat
  const handleGenerateBeat = async () => {
    if (!beatFile) {
      console.log("HI")
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append('file', beatFile);
    formData.append('drums', drums.toString());
    formData.append('bass', bass.toString()); 
    console.log('Selected file:', beatFile); 
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    try {
      const response = await fetch("http://localhost:5000/generate-audio", {
        method: "POST",
        body: formData,
        mode: 'cors',
      });

      if (response.ok) { 
        console.log("HIHIISHHIII")
        const blob = await response.blob();
        console.log("HIHIISHHIII")
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
  console.log(beatFile)
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md ">
      <h1 className="text-3xl font-bold text-white mb-6">Generate a Beat</h1>

      <div className="flex flex-col items-center gap-5">
        {!audioUrl && (
          <>
            {!beatFile ? (
              <CustomFileUpload
                onFileChange={setBeatFile}
                fileTypes="audio/wav"
              />
            ) : (
              <CustomAudioPlayer src={URL.createObjectURL(beatFile)} />
            )}
            <div className="w-full flex gap-3">
              <input
                type="checkbox"
                checked={drums}
                onChange={(e) => setDrums(e.target.checked)}
              />
              <label htmlFor="drums">Drums</label>
            </div>
            <div className="w-full flex gap-3">
              <input
                type="checkbox"
                checked={bass}
                onChange={(e) => setBass(e.target.checked)}
              />
              <label htmlFor="drums">Bass</label>
            </div>
            <Button
              onClick={handleGenerateBeat}
              disabled={loading}
              className="w-full"
            >
              Generate Beat
            </Button>
          </>
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
