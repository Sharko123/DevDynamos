// import AudioVisualizer from "@/components/Audio/AudioVisualizer";
import BeatContainer from "@/components/BeatContainer";
import BeatPlayer from "@/components/BeatPlayer";
import BeatGenerator from "@/components/BeatGenerator";
import Image from "next/image";

import dynamic from "next/dynamic";

export default function Home() {
  return (
    <>
      <BeatContainer />
      {/* <AudioVisualizer src={"/beat.mp3"} /> */}
    </>
  );
}
