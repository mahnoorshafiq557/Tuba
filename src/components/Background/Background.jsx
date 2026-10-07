import { memo } from "react";
import PatternLayer from "./PatternLayer.jsx";

const ring = "absolute rounded-full border border-fg/10";

function Background({ bright = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden bg-app-radial transition-[filter] duration-[1200ms] ease-smooth ${
        bright ? "brightness-[1.03] saturate-[1.15]" : ""
      }`}
    >
      {/* soft colour washes */}
      <div className="absolute -left-[12%] -top-[18%] h-[55vw] max-h-[640px] w-[55vw] max-w-[640px] animate-drift rounded-full bg-brand opacity-30 blur-[100px]" />
      <div className="absolute -bottom-[22%] -right-[12%] h-[50vw] max-h-[600px] w-[50vw] max-w-[600px] animate-drift rounded-full bg-accent opacity-[.18] blur-[110px] [animation-delay:-14s]" />

      {/* animated pattern (changes with the theme) */}
      <PatternLayer />

      {/* concentric rings (top-right) */}
      <div className="absolute -right-40 -top-40 h-[26rem] w-[26rem]">
        <i className={`${ring} inset-0`} />
        <i className={`${ring} inset-12`} />
        <i className={`${ring} inset-24`} />
        <i className={`${ring} inset-36 border-brand/30`} />
      </div>
      <i className="absolute -bottom-48 -left-48 h-[30rem] w-[30rem] animate-spin-slow rounded-full border-2 border-dashed border-fg/15" />
    </div>
  );
}
export default memo(Background);
