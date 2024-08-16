import React from "react";
import Image from "next/image";

export default function BeatPlayer() {
  return (
    <div className="flex justify-center items-center h-screen scroll-item">
      <div className="relative w-full max-w-sm h-full mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {
          <Image
            src="https://via.placeholder.com/1080x1920?text=Beat+Cover"
            alt="Beat Cover"
            className="w-full h-full object-cover"
            width={1080}
            height={1920}
          />
        }
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-4 text-center text-white">
            <audio
              id="beat-audio"
              src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
            />
          </div>
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-4">
          <button className="p-2 bg-gray-700 text-white rounded-full">
            👍
          </button>
          <button className="p-2 bg-gray-700 text-white rounded-full">
            👎
          </button>
        </div>
        <div className="absolute">
          <button></button>
        </div>
      </div>
    </div>
  );
}
