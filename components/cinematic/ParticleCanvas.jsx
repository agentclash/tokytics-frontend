"use client";
import { useEffect, useRef } from "react";

export function ParticleCanvas({ dark }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const scrollY = useRef(0);
  const mouse = useRef({ x: -1000, y: -1000 });
  const dims = useRef({ w: 800, h: 600 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      dims.current = { w: window.innerWidth, h: window.innerHeight };
      canvas.width = dims.current.w;
      canvas.height = dims.current.h;
    };
    resize();

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 25 : 45;
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * dims.current.w,
      y: Math.random() * dims.current.h * 4,
      r: 0.5 + Math.random() * 1.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.1,
      opacity: 0.08 + Math.random() * 0.12,
      phase: Math.random() * Math.PI * 2,
    }));

    const onScroll = () => { scrollY.current = window.scrollY; };
    const onMouse = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const sy = scrollY.current;
      const t = Date.now() * 0.001;
      const { w, h } = dims.current;

      particles.current.forEach(p => {
        const screenY = ((p.y - sy * (0.3 + p.r * 0.1)) % (h * 1.5)) + h * 0.25;
        if (screenY < -20 || screenY > h + 20) return;

        const px = p.x + Math.sin(t * 0.3 + p.phase) * 8 + p.vx * t * 10;
        const screenX = ((px % w) + w) % w;

        const dx = screenX - mouse.current.x;
        const dy = screenY - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const repel = dist < 120 ? (1 - dist / 120) * 20 : 0;
        const rx = dist > 0 ? (dx / dist) * repel : 0;
        const ry = dist > 0 ? (dy / dist) * repel : 0;

        const finalX = screenX + rx;
        const finalY = screenY + ry;

        ctx.beginPath();
        ctx.arc(finalX, finalY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dark
          ? `rgba(255,255,255,${p.opacity * (1 + Math.sin(t + p.phase) * 0.3)})`
          : `rgba(0,0,0,${p.opacity * 0.7 * (1 + Math.sin(t + p.phase) * 0.3)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse, { passive: true });
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", resize);
    };
  }, [dark]);

  return (
    <canvas ref={canvasRef} style={{
      position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
    }} />
  );
}
