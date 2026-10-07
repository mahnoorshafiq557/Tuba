import { useEffect, useRef } from "react";
import { THEMES, DEFAULT_THEME } from "../../data/themes.js";

// Animated birthday background, drawn on a canvas.
// Which pattern a theme uses is set in src/data/themes.js:
//   confetti | balloons | bubbles | fireworks   (+ optional twinkling stars)
// Colours come from the theme (brand, accent, a1, a2, a3 in src/index.css).

const readVar = (n) => {
  const p = getComputedStyle(document.documentElement).getPropertyValue(`--${n}`).trim().split(/\s+/).map(Number);
  return p.length === 3 && p.every((x) => !Number.isNaN(x)) ? p : [128, 128, 128];
};
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const rnd = (a, b) => a + Math.random() * (b - a);
const shade = (c, k) => c.map((v) => Math.round(v * k));
const TAU = Math.PI * 2;

export default function PatternLayer() {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv.getContext("2d");
    let w = 0, h = 0, dpr = 1, raf = 0, last = 0, t = 0, nextBurst = 0;
    let cfg = THEMES[0].pattern;
    let col = { pal: [], light: true, fg: [0, 0, 0] };
    let stars = [], items = [], bursts = [];

    const pickColor = () => Math.floor(Math.random() * Math.max(1, col.pal.length));
    const pickChar = (s) => { const a = Array.from(s); return a[Math.floor(Math.random() * a.length)]; };

    /* ───────────── creators ───────────── */
    const piece = (init) => ({
      x: rnd(0, w), y: init ? rnd(-20, h) : rnd(-80, -10),
      s: rnd(7, 13), v: rnd(40, 100), sw: rnd(10, 34), p: rnd(0, TAU), r: rnd(0, TAU), vr: rnd(-3.5, 3.5),
      k: cfg.glyphs && Math.random() < 0.25 ? "g" : ["rect", "rect", "circle", "tri"][Math.floor(Math.random() * 4)],
      c: pickColor(), g: cfg.glyphs ? pickChar(cfg.glyphs) : "",
    });
    const balloon = (init) => ({
      x: rnd(0, w), y: init ? rnd(h * 0.1, h + 80) : h + rnd(80, 220),
      r: rnd(24, 40), v: rnd(18, 42), sw: rnd(8, 24), p: rnd(0, TAU), c: pickColor(),
    });
    const bubble = (init) => ({
      x: rnd(0, w), y: init ? rnd(0, h) : h + rnd(30, 120),
      r: rnd(8, cfg.shapes ? 22 : 38), v: rnd(14, 40), sw: rnd(10, 40), p: rnd(0, TAU),
      g: cfg.shapes ? pickChar(cfg.shapes) : null, c: pickColor(),
    });

    const build = () => {
      stars = cfg.stars
        ? Array.from({ length: Math.round((w * h) / 9000) }, () => ({ x: rnd(0, w), y: rnd(0, h * 0.8), r: rnd(0.6, 1.8), p: rnd(0, TAU), s: rnd(0.8, 2.4) }))
        : [];
      bursts = []; nextBurst = 0;
      if (cfg.mode === "confetti") items = Array.from({ length: Math.min(110, Math.max(36, Math.round((w * h) / 16000))) }, () => piece(true));
      else if (cfg.mode === "balloons") items = Array.from({ length: Math.min(14, Math.max(6, Math.round(w / 110))) }, () => balloon(true));
      else if (cfg.mode === "bubbles") items = Array.from({ length: 22 }, () => bubble(true));
      else items = [];
    };

    const loadTheme = () => {
      const id = document.documentElement.dataset.theme || DEFAULT_THEME;
      cfg = (THEMES.find((x) => x.id === id) || THEMES[0]).pattern;
      const ink = readVar("ink-900");
      const light = (0.299 * ink[0] + 0.587 * ink[1] + 0.114 * ink[2]) / 255 > 0.6;
      col = { light, fg: readVar("fg"), pal: ["brand-500", "accent", "a1", "a2", "a3"].map(readVar) };
      build();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    };

    /* ───────────── patterns ───────────── */
    const drawConfetti = (dt) => {
      for (const o of items) {
        o.y += o.v * dt; o.r += o.vr * dt;
        if (o.y > h + 20) Object.assign(o, piece(false));
        const x = o.x + Math.sin(t * 1.1 + o.p) * o.sw;
        const flip = 0.25 + 0.75 * Math.abs(Math.cos(o.r)); // fake 3D flutter
        ctx.save();
        ctx.translate(x, o.y); ctx.rotate(o.r * 0.5); ctx.scale(1, flip);
        ctx.fillStyle = rgba(col.pal[o.c], col.light ? 0.85 : 0.9);
        if (o.k === "rect") ctx.fillRect(-o.s / 2, -o.s * 0.3, o.s, o.s * 0.6);
        else if (o.k === "circle") { ctx.beginPath(); ctx.arc(0, 0, o.s * 0.4, 0, TAU); ctx.fill(); }
        else if (o.k === "tri") { ctx.beginPath(); ctx.moveTo(0, -o.s * 0.5); ctx.lineTo(o.s * 0.5, o.s * 0.4); ctx.lineTo(-o.s * 0.5, o.s * 0.4); ctx.closePath(); ctx.fill(); }
        else { ctx.font = `${o.s * 2}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(o.g, 0, 0); }
        ctx.restore();
      }
    };

    const drawBalloons = (dt) => {
      ctx.save();
      ctx.globalAlpha = col.light ? 0.6 : 0.85;
      for (const o of items) {
        o.y -= o.v * dt;
        const rh = o.r * 1.22;
        if (o.y < -rh - 110) Object.assign(o, balloon(false));
        const x = o.x + Math.sin(t * 0.7 + o.p) * o.sw, y = o.y, c = col.pal[o.c];
        const sway = Math.sin(t * 1.3 + o.p);
        // string
        ctx.strokeStyle = rgba(col.fg, 0.35); ctx.lineWidth = 1.2;
        ctx.beginPath(); ctx.moveTo(x, y + rh + 8);
        ctx.bezierCurveTo(x - 8 + sway * 6, y + rh + 32, x + 8 - sway * 6, y + rh + 58, x + sway * 5, y + rh + 90);
        ctx.stroke();
        // body with a shiny highlight
        const g = ctx.createRadialGradient(x - o.r * 0.35, y - rh * 0.4, o.r * 0.1, x, y, o.r * 1.15);
        g.addColorStop(0, rgba([255, 255, 255], 0.8)); g.addColorStop(0.35, rgba(c, 0.95)); g.addColorStop(1, rgba(shade(c, 0.7), 1));
        ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(x, y, o.r, rh, 0, 0, TAU); ctx.fill();
        // knot
        ctx.fillStyle = rgba(shade(c, 0.85), 1);
        ctx.beginPath(); ctx.moveTo(x, y + rh - 1); ctx.lineTo(x - 5, y + rh + 9); ctx.lineTo(x + 5, y + rh + 9); ctx.closePath(); ctx.fill();
      }
      ctx.restore();
    };

    const drawBubbles = (dt) => {
      for (const o of items) {
        o.y -= o.v * dt;
        if (o.y < -50) Object.assign(o, bubble(false));
        const x = o.x + Math.sin(t * 0.8 + o.p) * o.sw, c = col.pal[o.c];
        if (o.g) {
          ctx.font = `${o.r * 1.8}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillStyle = rgba(c, col.light ? 0.55 : 0.7);
          ctx.fillText(o.g, x, o.y);
        } else {
          const g = ctx.createRadialGradient(x - o.r * 0.3, o.y - o.r * 0.3, 1, x, o.y, o.r);
          g.addColorStop(0, rgba([255, 255, 255], col.light ? 0.55 : 0.4)); g.addColorStop(0.6, rgba(c, 0.15)); g.addColorStop(1, rgba(c, 0.45));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, o.y, o.r, 0, TAU); ctx.fill();
          ctx.strokeStyle = rgba(c, 0.65); ctx.lineWidth = 1.2; ctx.stroke();
        }
      }
    };

    const spawnBurst = () => {
      bursts.push({ x: rnd(w * 0.12, w * 0.88), ty: rnd(h * 0.15, h * 0.5), y: h + 10, state: 0, c: col.pal[pickColor()], parts: [] });
    };
    const drawFireworks = (dt) => {
      if (t >= nextBurst) { spawnBurst(); nextBurst = t + rnd(0.7, 1.5); }
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const b of bursts) {
        if (b.state === 0) {
          b.y -= 520 * dt;
          const g = ctx.createLinearGradient(b.x, b.y, b.x, b.y + 30);
          g.addColorStop(0, rgba(b.c, 0.9)); g.addColorStop(1, rgba(b.c, 0));
          ctx.strokeStyle = g; ctx.lineWidth = 2.2;
          ctx.beginPath(); ctx.moveTo(b.x, b.y); ctx.lineTo(b.x, b.y + 30); ctx.stroke();
          if (b.y <= b.ty) {
            b.state = 1;
            const n = Math.round(rnd(38, 64));
            b.parts = Array.from({ length: n }, () => {
              const a = rnd(0, TAU), s = rnd(60, 230);
              return { x: b.x, y: b.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, d: rnd(0.5, 0.9) };
            });
          }
        } else {
          for (const p of b.parts) {
            if (p.life <= 0) continue;
            p.vx *= 0.985; p.vy += 90 * dt;
            p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt * p.d;
            ctx.strokeStyle = rgba(b.c, Math.max(0, p.life) * 0.8); ctx.lineWidth = 1.6;
            ctx.beginPath(); ctx.moveTo(p.x - p.vx * 0.04, p.y - p.vy * 0.04); ctx.lineTo(p.x, p.y); ctx.stroke();
            ctx.fillStyle = rgba([255, 255, 255], Math.max(0, p.life));
            ctx.beginPath(); ctx.arc(p.x, p.y, 1.4, 0, TAU); ctx.fill();
          }
        }
      }
      ctx.restore();
      bursts = bursts.filter((b) => b.state === 0 || b.parts.some((p) => p.life > 0));
    };

    const drawStars = () => {
      for (const s of stars) {
        const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.s + s.p));
        ctx.fillStyle = rgba(col.light ? col.pal[0] : [255, 255, 255], a * (col.light ? 0.7 : 1));
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, TAU); ctx.fill();
      }
    };

    const frame = (now) => {
      const dt = Math.min((now - last) / 1000 || 0.016, 0.05);
      last = now; t += dt;
      ctx.clearRect(0, 0, w, h);
      if (col.pal.length) {
        if (stars.length) drawStars();
        if (cfg.mode === "confetti") drawConfetti(dt);
        else if (cfg.mode === "balloons") drawBalloons(dt);
        else if (cfg.mode === "bubbles") drawBubbles(dt);
        else if (cfg.mode === "fireworks") drawFireworks(dt);
      }
      raf = requestAnimationFrame(frame);
    };

    resize();
    loadTheme();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const mo = new MutationObserver(loadTheme);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    raf = requestAnimationFrame(frame);
    const vis = () => { cancelAnimationFrame(raf); if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); } };
    document.addEventListener("visibilitychange", vis);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); mo.disconnect(); document.removeEventListener("visibilitychange", vis); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
