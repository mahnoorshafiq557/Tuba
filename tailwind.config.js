// colour helper: reads "R G B" from CSS variables and keeps opacity utilities working
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // All colours come from CSS variables in src/index.css (:root)
        brand: {
          DEFAULT: v("brand-500"),
          50: v("brand-50"), 100: v("brand-100"), 200: v("brand-200"), 300: v("brand-300"), 400: v("brand-400"),
          500: v("brand-500"), 600: v("brand-600"), 700: v("brand-700"), 800: v("brand-800"), 900: v("brand-900"),
        },
        fg: v("fg"),
        card: v("card"),
        deep: v("deep"),
        onbrand: v("onbrand"),
        accent: v("accent"),
        paper: "rgb(255 253 248 / <alpha-value>)",
        ink: { 900: v("ink-900"), 800: v("ink-800"), 700: v("ink-700") },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        arabic: ["Amiri", "serif"],
      },
      boxShadow: {
        glow: "0 8px 34px rgb(var(--brand-500) / .4)",
        "glow-lg": "0 12px 40px rgb(var(--brand-500) / .6)",
        card: "0 0 36px rgb(var(--brand-500) / .22)",
        terminal: "0 0 60px rgb(var(--brand-500) / .25)",
      },
      transitionTimingFunction: { smooth: "cubic-bezier(.22,.8,.2,1)" },
      backgroundImage: {
        "app-radial": "var(--bg)",
        dots: "radial-gradient(rgb(var(--fg) / .3) 1.3px, transparent 1.8px)",
        "grid-lines":
          "linear-gradient(rgb(var(--brand-300) / .55) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--brand-300) / .55) 1px, transparent 1px)",
      },
      keyframes: {
        sceneIn: { from: { opacity: "0", transform: "scale(1.04)", filter: "blur(12px)" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(22px)", filter: "blur(6px)" } },
        drift: { to: { transform: "translate(8vw,-6vh) scale(1.2)" } },
        twinkle: { "50%": { opacity: ".08" } },
        cloud: { to: { transform: "translateX(130vw) scale(var(--s))" } },
        rise: { to: { transform: "translateY(-115vh) rotate(20deg)" } },
        blink: { "50%": { opacity: "0" } },
        shake: {
          "20%": { transform: "rotate(-7deg)" },
          "40%": { transform: "rotate(7deg)" },
          "60%": { transform: "rotate(-5deg)" },
          "80%": { transform: "rotate(4deg)" },
        },
        burst: {
          "0%": { transform: "translate(0,0) scale(0)", opacity: "1" },
          "25%": { transform: "translate(calc(var(--x)*.6),calc(var(--u)*-1)) scale(1)", opacity: "1" },
          "100%": { transform: "translate(var(--x),55vh) rotate(var(--r))", opacity: "0" },
        },
        beat: {
          "15%": { transform: "scale(1.18)" },
          "30%": { transform: "scale(1)" },
          "45%": { transform: "scale(1.1)" },
        },
        grow: { from: { width: "0%" } },
        flicker: {
          "0%,100%": { transform: "scale(1,1) rotate(-3deg)", opacity: "1" },
          "50%": { transform: "scale(.88,1.14) rotate(3deg)", opacity: ".9" },
        },
        float: { "50%": { transform: "translateY(-10px)" } },
        warp: {
          "0%": { clipPath: "circle(0% at 50% 50%)", opacity: "1" },
          "50%": { clipPath: "circle(75% at 50% 50%)", opacity: "1" },
          "100%": { clipPath: "circle(75% at 50% 50%)", opacity: "0" },
        },
      },
      animation: {
        "scene-in": "sceneIn .9s cubic-bezier(.22,.8,.2,1) both",
        "fade-up": "fadeUp 1s cubic-bezier(.22,.8,.2,1) both",
        "fade-up-fast": "fadeUp .5s cubic-bezier(.22,.8,.2,1) both",
        drift: "drift 40s ease-in-out infinite alternate",
        twinkle: "twinkle ease-in-out infinite",
        cloud: "cloud linear infinite",
        rise: "rise linear infinite",
        blink: "blink 1s steps(1) infinite",
        shake: "shake .8s",
        burst: "burst ease-out forwards",
        beat: "beat 1.6s ease-in-out infinite",
        grow: "grow 1.4s cubic-bezier(.22,.8,.2,1) both",
        "spin-slow": "spin 80s linear infinite",
        float: "float 5s ease-in-out infinite",
        flicker: "flicker .9s ease-in-out infinite",
        warp: "warp 1.5s cubic-bezier(.22,.8,.2,1) both",
      },
    },
  },
  plugins: [],
};
