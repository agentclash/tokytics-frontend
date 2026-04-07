"use client";
import { useState, useEffect, useRef } from "react";

export function useCounter(target, dur = 1200, delay = 600) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const s = performance.now();
      const step = (now) => {
        const p = Math.min((now - s) / dur, 1);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [target, dur, delay]);
  return val;
}

export function useCounterVis(target, dur = 1200, delay = 600, visible = true) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      const s = performance.now();
      const step = (now) => {
        const p = Math.min((now - s) / dur, 1);
        setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, delay);
    return () => clearTimeout(t);
  }, [visible, target, dur, delay]);
  return val;
}

export function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

export function useTypingReveal(lineCount, visible, baseDelay = 0.5, perLine = 0.14) {
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    if (!visible) { setRevealed(0); return; }
    const timers = [];
    for (let i = 0; i <= lineCount; i++) {
      timers.push(setTimeout(() => setRevealed(i + 1), (baseDelay + i * perLine) * 1000));
    }
    return () => timers.forEach(clearTimeout);
  }, [visible, lineCount]);
  return revealed;
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}
