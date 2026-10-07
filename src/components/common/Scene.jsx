// Scrollable, centred wrapper used by every scene (safe on small phones).
export default function Scene({ children, className = "" }) {
  return (
    <section className="absolute inset-0 overflow-y-auto overflow-x-hidden">
      <div
        className={`relative mx-auto flex min-h-full w-full max-w-5xl flex-col items-center justify-center gap-[clamp(.7rem,2vh,1.3rem)] px-5 pb-28 pt-12 text-center sm:pt-16 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
