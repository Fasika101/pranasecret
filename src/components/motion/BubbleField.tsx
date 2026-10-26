"use client";

import { useEffect, useRef } from "react";
import { products } from "@/lib/products";

interface Bubble {
  x: number;
  y: number;
  r: number;
  /** Rise speed in px/s. */
  vy: number;
  /** Horizontal wobble amplitude / frequency / phase. */
  amp: number;
  freq: number;
  phase: number;
  color: string;
  alpha: number;
  /** 0 → 1 life, used to fade in at the bottom and out near the top. */
  life: number;
}

const COLORS = [...products.map((p) => p.palette.accent), "#b48c55", "#ffffff"];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

const RGB = COLORS.map(hexToRgb);

/**
 * Ambient background: small bubbles drifting upward like mist from a spray.
 *
 * - One fixed canvas, drawn in a rAF loop; React never re-renders for it.
 * - Density scales with viewport area and is halved on coarse-pointer devices.
 * - Pauses when the tab is hidden; draws a single static frame under
 *   prefers-reduced-motion; DPR capped at 2 to bound fill cost.
 */
export function BubbleField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduceMql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let bubbles: Bubble[] = [];
    let raf = 0;
    let last = 0;
    let running = false;

    function targetCount() {
      const area = width * height;
      const base = Math.round(area / 14000);
      const n = Math.max(28, Math.min(110, base));
      return coarse ? Math.round(n * 0.5) : n;
    }

    function spawn(b: Bubble | null, initial: boolean): Bubble {
      const i = Math.floor(Math.random() * RGB.length);
      const [r, g, bl] = RGB[i];
      const radius = rand(0.55, 1.85);
      const out: Bubble = b ?? ({} as Bubble);
      // Fresh bubbles rise from the lower third, like mist leaving a spray.
      out.x = rand(width * 0.08, width * 0.92);
      out.y = initial ? rand(0, height) : height * rand(0.62, 1.08);
      out.r = radius;
      out.vy = rand(8, 18) * (0.7 + radius / 3);
      out.amp = rand(4, 14);
      out.freq = rand(0.3, 0.7);
      out.phase = rand(0, Math.PI * 2);
      out.color = `${r},${g},${bl}`;
      out.alpha = i === RGB.length - 1 ? rand(0.45, 0.8) : rand(0.16, 0.38);
      out.life = initial ? rand(0.2, 0.9) : 0;
      return out;
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const n = targetCount();
      if (bubbles.length > n) bubbles.length = n;
      while (bubbles.length < n) bubbles.push(spawn(null, true));
      // Keep existing bubbles inside the new bounds.
      for (const b of bubbles) {
        if (b.x > width) b.x = rand(0, width);
        if (b.y > height + 60) b.y = rand(0, height);
      }
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, width, height);
      for (const b of bubbles) {
        const fadeIn = Math.min(1, b.life * 4);
        const fadeOut = Math.min(1, Math.max(0, b.y / (height * 0.28)));
        const a = b.alpha * fadeIn * fadeOut;
        if (a <= 0.005) continue;
        const x = b.x + Math.sin(t * b.freq + b.phase) * b.amp;

        ctx!.beginPath();
        ctx!.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${b.color},${a})`;
        ctx!.fill();
        // Hairline rim gives white bubbles an edge against the cream page
        ctx!.lineWidth = 0.75;
        ctx!.strokeStyle = `rgba(39,33,29,${a * 0.22})`;
        ctx!.stroke();

        if (b.r > 1.35) {
          ctx!.beginPath();
          ctx!.arc(x - b.r * 0.28, b.y - b.r * 0.28, b.r * 0.26, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(255,255,255,${a * 0.85})`;
          ctx!.fill();
        }
      }
    }

    function step(now: number) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      const t = now / 1000;
      for (const b of bubbles) {
        b.y -= b.vy * dt;
        b.life = Math.min(1, b.life + dt * 0.6);
        if (b.y < -b.r * 2) spawn(b, false);
      }
      draw(t);
      raf = requestAnimationFrame(step);
    }

    function start() {
      if (running || reduceMql.matches || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function applyMotionPreference() {
      if (reduceMql.matches) {
        stop();
        // One calm static frame: sparser and fainter.
        bubbles = bubbles.filter((_, i) => i % 2 === 0);
        draw(0);
      } else {
        resize();
        start();
      }
    }

    function onVisibility() {
      if (document.hidden) stop();
      else start();
    }

    resize();
    applyMotionPreference();

    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        resize();
        if (reduceMql.matches) draw(0);
      });
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    reduceMql.addEventListener("change", applyMotionPreference);

    return () => {
      stop();
      cancelAnimationFrame(resizeRaf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduceMql.removeEventListener("change", applyMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-[100svh] w-full"
    />
  );
}
