import { useEffect, useState } from "react";
import Scene from "../common/Scene.jsx";
import Reveal from "../common/Reveal.jsx";
import { content, fill } from "../../data/birthday.js";

export default function CodeScene({ name }) {
  const c = content.terminal;
  const lines = c.lines.map((l) => fill(l, name));
  const [n, setN] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setN((v) => (v > lines.length + 1 ? v : v + 1)), 480);
    return () => clearInterval(id);
    // eslint-disable-next-line
  }, []);

  return (
    <Scene>
      <Reveal
        delay={0.1}
        className="w-[min(30rem,92vw)] rounded-2xl border border-brand/40 bg-deep/95 text-left shadow-terminal"
      >
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <i className="h-2.5 w-2.5 rounded-full bg-brand" />
          <span className="ml-2 font-mono text-xs text-white/60">{c.fileName}</span>
        </div>
        <pre className="m-0 min-h-[15em] overflow-hidden whitespace-pre p-4 font-mono text-[length:clamp(.68rem,2.8vw,.9rem)] leading-[1.65] text-brand-300">
          {lines.slice(0, n).map((l, i) => (
            <div key={i} className={`animate-fade-up-fast ${i === lines.length - 1 ? "font-semibold text-white" : ""}`}>
              {l || "\u00a0"}
            </div>
          ))}
          <span className="animate-blink">▌</span>
        </pre>
      </Reveal>
      {n > lines.length && (
        <Reveal as="p" className="font-display text-[length:clamp(1.15rem,3.4vw,1.8rem)]">
          <span className="italic text-accent">{c.systemLabel}</span> {c.systemText}
        </Reveal>
      )}
    </Scene>
  );
}
