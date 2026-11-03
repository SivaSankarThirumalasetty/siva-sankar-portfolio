import { useEffect, useRef } from 'react';

/**
 * Lightweight "3D" data-node sphere drawn on a 2D canvas (no Three.js).
 * ~42 nodes on a Fibonacci sphere, rotated and perspective-projected each frame.
 * Pauses when off-screen or when the tab is hidden; renders a single static
 * frame when the user prefers reduced motion.
 */
export default function NodeField({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const N = window.innerWidth < 640 ? 30 : 42;
    const pts = Array.from({ length: N }, (_, i) => {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const t = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(t) * r, y, z: Math.sin(t) * r, accent: i % 9 === 0 };
    });
    // Pre-compute edges between near neighbours
    const edges: [number, number][] = [];
    for (let i = 0; i < N; i++)
      for (let j = i + 1; j < N; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y, pts[i].z - pts[j].z);
        if (d < 0.62) edges.push([i, j]);
      }

    let w = 0, h = 0, dpr = 1, raf = 0, running = true, visible = true;
    let angle = 0.6;
    let tiltX = 0.35, targetTilt = 0.35;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const dark = document.documentElement.classList.contains('dark');
      const lime = dark ? '127,255,0' : '52,110,0';
      const pink = '255,20,147';
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.38;
      const cx = w / 2, cy = h / 2;
      const cosA = Math.cos(angle), sinA = Math.sin(angle);
      const cosT = Math.cos(tiltX), sinT = Math.sin(tiltX);
      const proj = pts.map((p) => {
        const x = p.x * cosA - p.z * sinA;
        let z = p.x * sinA + p.z * cosA;
        const y = p.y * cosT - z * sinT;
        z = p.y * sinT + z * cosT;
        const s = 2.6 / (2.6 + z);
        return { sx: cx + x * R * s, sy: cy + y * R * s, z, s, accent: p.accent };
      });
      ctx.lineWidth = 1;
      for (const [a, b] of edges) {
        const pa = proj[a], pb = proj[b];
        const depth = 1 - (pa.z + pb.z + 2) / 4; // 0 back … 1 front
        ctx.strokeStyle = `rgba(${lime},${0.05 + depth * 0.28})`;
        ctx.beginPath(); ctx.moveTo(pa.sx, pa.sy); ctx.lineTo(pb.sx, pb.sy); ctx.stroke();
      }
      for (const p of proj) {
        const depth = 1 - (p.z + 1) / 2;
        const r = (p.accent ? 3.2 : 1.8) * p.s;
        ctx.fillStyle = p.accent ? `rgba(${pink},${0.45 + depth * 0.55})` : `rgba(${lime},${0.3 + depth * 0.7})`;
        ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const loop = () => {
      if (!running || !visible) return;
      angle += 0.0025;
      tiltX += (targetTilt - tiltX) * 0.04;
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetTilt = 0.35 + ((e.clientY - rect.top) / rect.height - 0.5) * 0.5;
    };

    resize();
    draw();
    const ro = new ResizeObserver(() => { resize(); draw(); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduce) { cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); }
    });
    io.observe(canvas);
    const onVis = () => { running = !document.hidden; if (running && !reduce) raf = requestAnimationFrame(loop); };
    document.addEventListener('visibilitychange', onVis);
    const themeObs = new MutationObserver(draw);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    if (!reduce) window.addEventListener('pointermove', onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); themeObs.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
