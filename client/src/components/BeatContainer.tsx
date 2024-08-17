"use client";
import BeatPlayer from "@/components/BeatPlayer";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function BeatContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);

  useEffect(() => {
    // Update the address bar with the beat id
    window.history.replaceState({}, "", `/beat/${currentBeat}`);
  }, [currentBeat]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const elements = container.querySelectorAll(".scroll-item");
      const scrollTop = container.scrollTop;

      // Get the current beat index of the beat and set it active
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        // Compare the height of the window to get the index
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          if (currentBeat !== index) {
            setCurrentBeat(index);
          }
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call to set the first visible beat
    return () => container.removeEventListener("scroll", handleScroll);
  }, [currentBeat]);

  return (
    <div
      ref={containerRef}
      className="scroll-container overflow-y-auto snap-y snap-mandatory"
      style={{ height: "100vh" }}
    >
      {Array.from([1, 2, 3, 4, 5, 6, 7]).map((e) => (
        <BeatPlayer
          key={e}
          beatId={e.toString()}
          src={"/" + e.toString() + ".mp3"}
          isActive={currentBeat === e - 1}
        />
      ))}
    </div>
  );
}
