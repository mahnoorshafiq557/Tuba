const variants = {
  primary:
    "bg-gradient-to-br from-brand-300 to-brand text-onbrand shadow-glow hover:enabled:shadow-glow-lg",
  ghost: "border border-fg/20 bg-fg/5 text-fg hover:enabled:border-brand hover:enabled:bg-fg/10",
};

export default function Button({ children, variant = "primary", className = "", ...rest }) {
  return (
    <button
      className={`min-h-[46px] rounded-full px-7 py-3 text-[length:clamp(.9rem,2vw,1rem)] font-bold transition duration-300 ease-smooth hover:enabled:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
