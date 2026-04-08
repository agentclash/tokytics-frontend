"use client";
import { useEffect, useRef } from "react";

export function FilmGrain({ dark }) {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = 128;
    canvas.height = 128;
    const imageData = ctx.createImageData(128, 128);
    const data = imageData.data;
    let animId;
    let last = 0;

    const draw = (now) => {
      animId = requestAnimationFrame(draw);
      if (now - last < 250) return; // ~4fps
      last = now;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = data[i + 1] = data[i + 2] = v;
        data[i + 3] = dark ? 6 : 4;
      }
      ctx.putImageData(imageData, 0, 0);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [dark]);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 9999, pointerEvents: "none",
      width: "100%", height: "100%",
      opacity: dark ? 0.18 : 0.1,
      mixBlendMode: "overlay",
    }} />
  );
}
