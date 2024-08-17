"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  src: string;
  playing: boolean;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ src, playing }) => {
  const [audio] = useState(new Audio(src));
  const [audioCtx, setAudioCtx] = useState(new AudioContext());
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [audioSource, setAudioSource] =
    useState<MediaElementAudioSourceNode | null>(null);
  // We need this to remove playing if we navigate to other page
  const pathname = usePathname();

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    // Set the context of the canvas so it can be used by the draw method
    setCtx(canvas.getContext("2d") as CanvasRenderingContext2D);
    // Set the canvas height and width according to the parent div
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }, []);

  useEffect(() => {
    if (!playing) {
      audio.pause();
      if (audioSource) {
        audioSource.disconnect();
        audioCtx.suspend();
      }
    } else {
      initalizeVisualizer();
      if (!audioCtx || !analyzer || !audioSource) initalizeVisualizer();
      if (audioCtx.state === "suspended") audioCtx.resume();
      audio.play();
      audio.loop = true;
      audioSource?.connect(analyzer as AnalyserNode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audio, audioCtx, audioSource, playing]);

  useEffect(() => {
    console.log(pathname);
    if (!pathname.includes("/beat/")) {
      audio.pause();
      if (audioSource) {
        audioSource.disconnect();
        audioCtx.suspend();
      }
    }
  }, [audio, audioCtx, audioSource, pathname]);

  const draw = (
    bufferLength: number,
    x: number,
    barWidth: number,
    barHeight: number,
    dataArray: Uint8Array
  ) => {
    if (!canvasRef.current) return;
    if (!ctx) return;

    for (let i = 0; i < bufferLength; i++) {
      // The data from the array
      barHeight = dataArray[i];
      ctx.save();
      ctx.translate(canvasRef.current.width / 2, canvasRef.current.height / 2);
      ctx.rotate(i * bufferLength * 4);
      // For blue and purple on the hsl color wheel
      ctx.fillStyle = `hsl(${210 + i * 2}, 100%, 50%)`;
      ctx.beginPath();
      // Draw the rectangles
      ctx.fillRect(0, 0, barWidth, barHeight);

      x += barWidth;
      ctx.restore();
    }
  };

  const initalizeVisualizer = () => {
    if (!canvasRef.current) return;
    audioCtx.resume();
    audio.play();
    if (audioSource) {
      audioSource.disconnect();
      return;
    }
    // Try to create he audio sournce and play the audio
    // and run the visualizations
    try {
      const aS = audioCtx.createMediaElementSource(audio);
      setAudioSource(aS);

      let analyzer = audioCtx.createAnalyser();
      setAnalyzer(analyzer);
      aS?.connect(analyzer);
      analyzer.connect(audioCtx.destination);
      analyzer.fftSize = 128;
      const bufferLength = analyzer.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      const canvasWidth = canvasRef.current.width;
      const canvasHeight = canvasRef.current.height;
      const barWidth = 15;
      let x = 0;
      // The main animate function which runs every draw call
      const animate = () => {
        if (!ctx) return;
        x = 0;
        // Clear the screen with the color so previous frame drawings are overwritten
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        // Get the data from the analyzer
        analyzer.getByteFrequencyData(dataArray);
        draw(bufferLength, x, barWidth, 0, dataArray);
        requestAnimationFrame(animate);
      };
      animate();
    } catch (e) {}
  };

  return <canvas className="w-full h-full" ref={canvasRef} />;
};
export default AudioVisualizer;
