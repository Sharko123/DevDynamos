import React from "react";
import Image from "next/image";
import { Download, ThumbsDown, ThumbsUp } from "lucide-react";
import dynamic from "next/dynamic";

// Import it as an dynamic component because we don't need server side rendering
const AudioVisualizer = dynamic(
  () => import("@/components/Audio/AudioVisualizer"),
  { ssr: false }
);

interface BeatPlayerProps {
  beatId: string;
  isActive: boolean;
  src: string;
}
console.log("ER:LKJA:LFKJ:DKLGHSL:ADKJF")
// This file performs 3 functions liking/disliking, downloading, and playing the actual beat
const BeatPlayer: React.FC<BeatPlayerProps> = ({ beatId, isActive, src }) => {
  return (
    <div className="flex justify-center items-center h-screen scroll-item">
      <div className="relative w-full max-w-sm h-full mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <AudioVisualizer src={src} playing={isActive} />
        <div className="absolute right-4 top-[50%] flex flex-col items-center space-y-6">
          <button className="  text-blue rounded-full">
            <ThumbsUp size={32} />
          </button>
          <button className="  text-white rounded-full">
            <ThumbsDown size={32} />
          </button>
          <button className="  text-white rounded-full">
            <Download size={32} />
          </button>
        </div>
        <div className="bg-gray-800 p-4 text-white absolute bottom-0 w-full">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Image
                src="https://randomuser.me/api/portraits/lego/4.jpg" // Replace with actual avatar path
                alt="Avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="text-lg font-semibold">Name</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeatPlayer;
