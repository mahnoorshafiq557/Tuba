import { ChevronLeft, ChevronRight } from "lucide-react";
import ProgressDots from "./ProgressDots.jsx";
import { content } from "../../data/birthday.js";

const navBtn =
  "flex min-h-10 items-center gap-1 rounded-full border border-fg/15 bg-fg/5 px-3.5 py-2 text-[.8rem] font-medium text-fg/70 backdrop-blur-md transition hover:enabled:border-brand hover:enabled:text-fg disabled:opacity-30 max-sm:px-2.5";

export default function SceneControls({ scene, total, onPrev, onNext, onSelect }) {
  return (
    <nav
      aria-label="Scene navigation"
      className="absolute inset-x-0 bottom-0 z-[5] flex items-center justify-between gap-2.5 px-5 pb-[calc(.9rem+env(safe-area-inset-bottom,0px))] pt-3.5"
    >
      <button className={navBtn} onClick={onPrev} disabled={scene === 0} aria-label="Previous scene">
        <ChevronLeft size={18} />
        <span className="max-sm:hidden">{content.nav.previous}</span>
      </button>
      <ProgressDots current={scene} total={total} onSelect={onSelect} />
      <button className={navBtn} onClick={onNext} disabled={scene === total - 1} aria-label="Next scene">
        <span className="max-sm:hidden">{content.nav.next}</span>
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}
