// Birthday cake with flickering candles. Colours follow the theme (CSS variables in index.css).
const c = (n) => `rgb(var(${n}))`;
const CANDLES = [
  { x: 92, fill: "--a1", d: "0s" },
  { x: 120, fill: "--a2", d: ".25s" },
  { x: 148, fill: "--a3", d: ".5s" },
];
const SPRINKLES = [
  [56, 176, -20, "--a2"], [84, 188, 30, "--a3"], [112, 178, 70, "--a1"], [140, 190, -40, "--a2"],
  [168, 178, 20, "--a3"], [196, 188, -60, "--a1"], [78, 128, 40, "--a1"], [112, 136, -30, "--a3"],
  [146, 126, 60, "--a2"], [172, 136, -10, "--a1"],
];

export default function Cake({ className = "" }) {
  return (
    <svg viewBox="0 0 240 240" role="img" aria-label="Birthday cake" className={className}>
      {/* plate */}
      <ellipse cx="120" cy="222" rx="104" ry="10" style={{ fill: "rgb(0 0 0 / .18)" }} />
      <ellipse cx="120" cy="214" rx="98" ry="9" style={{ fill: "#fffdf8" }} />

      {/* bottom tier */}
      <rect x="30" y="152" width="180" height="62" rx="14" style={{ fill: c("--brand-400") }} />
      <path d="M30 166c0-14 10-14 14-14h152c4 0 14 0 14 14 0 12-9 14-15 6-6 10-14 10-20 0-6 12-14 12-20 0-6 12-14 12-20 0-6 10-14 10-20 0-6 12-14 12-20 0-6 10-14 10-20 0-6 6-15 4-15-6Z" style={{ fill: "#fffdf8" }} />

      {/* top tier */}
      <rect x="55" y="104" width="130" height="52" rx="12" style={{ fill: c("--brand-300") }} />
      <path d="M55 116c0-12 8-12 12-12h106c4 0 12 0 12 12 0 10-8 12-13 5-5 9-12 9-17 0-5 10-12 10-17 0-5 10-12 10-17 0-5 10-12 10-17 0-5 5-13 3-13-5Z" style={{ fill: "#fffdf8" }} />

      {/* sprinkles */}
      {SPRINKLES.map(([x, y, r, f], i) => (
        <rect key={i} x={x} y={y} width="9" height="3.6" rx="1.8" transform={`rotate(${r} ${x + 4} ${y + 2})`} style={{ fill: c(f) }} />
      ))}

      {/* candles + flames */}
      {CANDLES.map(({ x, fill, d }) => (
        <g key={x}>
          <rect x={x - 4} y="74" width="8" height="32" rx="3" style={{ fill: c(fill) }} />
          <rect x={x - 4} y="82" width="8" height="4" style={{ fill: "rgb(255 255 255 / .55)" }} />
          <g className="animate-flicker [transform-box:fill-box] origin-bottom" style={{ animationDelay: d }}>
            <path d={`M${x} 52c7 9 8 15 0 21-8-6-7-12 0-21Z`} style={{ fill: "#fbbf24" }} />
            <path d={`M${x} 60c3 4 3 8 0 11-3-3-3-7 0-11Z`} style={{ fill: "#fff7d6" }} />
          </g>
        </g>
      ))}
    </svg>
  );
}
