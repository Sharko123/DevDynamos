"use client";
import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

interface CustomAudioPlayerProps {
  src: string;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    // Check if the reference is set
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // events
  const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const value = parseFloat(event.target.value);
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const updateProgress = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const setPause = () => {
    if (audioRef.current) {
      setIsPlaying(false);
    }
  };

  React.useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", updateProgress);
      // audio.addEventListener("ended", setPause);
      return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        // audio.removeEventListener("ended", setPause);
      };
    }
  }, []);

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <audio ref={audioRef} src={src}></audio>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={togglePlayPause}
          className="text-white text-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-full hover:bg-gradient-to-l transition duration-300"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <div className="flex-1 mx-4">
          <input
            type="range"
            min="0"
            max={audioRef.current?.duration || 100}
            value={progress}
            onChange={handleProgressChange}
            className="w-full appearance-none h-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg cursor-pointer"
          />
        </div>
        <span className="text-white">
          {audioRef.current
            ? `${Math.floor(progress / 60)}:${Math.floor(progress % 60)
                .toString()
                .padStart(2, "0")}`
            : "0:00"}
        </span>
      </div>
    </div>
  );
};

export default CustomAudioPlayer;
