export default function ProgressDots({ current, total, onSelect }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div role="tablist" aria-label="Scenes" className="flex gap-1">
        {Array.from({ length: total }, (_, i) => {
          const on = i === current;
          return (
            <button
              key={i}
              role="tab"
              aria-selected={on}
              aria-label={`Scene ${i + 1}`}
              onClick={() => onSelect(i)}
              className={`relative h-5 w-5 border-0 bg-transparent after:absolute after:transition-all after:duration-500 after:ease-smooth ${
                on
                  ? "after:inset-y-1.5 after:-inset-x-0.5 after:rounded-md after:bg-brand after:shadow-[0_0_12px_rgb(var(--brand-400))]"
                  : "after:inset-[7px] after:rounded-full after:bg-fg/25"
              }`}
            />
          );
        })}
      </div>
      <span className="font-mono text-[.7rem] text-fg/60">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}
