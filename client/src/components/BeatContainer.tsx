"use client";
import BeatPlayer from "@/components/BeatPlayer";
import Image from "next/image";
import { useEffect, useRef } from "react";
export default function BeatContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const elements = container.querySelectorAll(".scroll-item");
      const scrollTop = container.scrollTop;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          el.classList.add("snap-active");
        } else {
          el.classList.remove("snap-active");
        }
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div className="scroll-container">
      {Array.from([1, 2, 3, 4, 5]).map((e) => (
        <BeatPlayer key={e} />
      ))}
    </div>
  );
}
