"use client";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

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
      barHeight = dataArray[i] * 1.5;
      ctx.save();
      ctx.translate(canvasRef.current.width / 2, canvasRef.current.height / 2);
      ctx.rotate(i * bufferLength * 4);
      ctx.fillStyle = `hsl(${210 + i * 2}, 100%, 50%)`;
      ctx.beginPath();
      ctx.fillRect(0, 0, barWidth, barHeight);
      // ctx.arc(0, 0, barHeight, 0, Math.PI / 4);
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
      let barHeight;
      let x = 0;
      const animate = () => {
        if (!ctx) return;
        x = 0;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        analyzer.getByteFrequencyData(dataArray);
        draw(bufferLength, x, barWidth, 0, dataArray);
        requestAnimationFrame(animate);
      };
      animate();
    } catch (e) {}
  };

  return (
    <>
      <canvas
        // onClick={initalizeVisualizer}
        className="w-full h-full"
        ref={canvasRef}
      ></canvas>
    </>
  );
};
export default AudioVisualizer;
