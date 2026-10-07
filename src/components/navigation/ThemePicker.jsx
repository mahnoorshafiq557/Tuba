import { useEffect, useState } from "react";
import { Palette, Check } from "lucide-react";
import { THEMES, DEFAULT_THEME } from "../../data/themes.js";

const KEY = "bd-theme-v1";

export default function ThemePicker() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (THEMES.some((t) => t.id === saved)) return saved;
    } catch {}
    return DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(KEY, theme);
    } catch {}
  }, [theme]);

  return (
    <div className="absolute right-3 top-3 z-30 flex flex-col items-end gap-2 pt-[env(safe-area-inset-top,0px)]">
      <button
        type="button"
        aria-label="Change theme"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="grid h-10 w-10 place-items-center rounded-full border border-fg/20 bg-fg/10 text-fg backdrop-blur-md transition hover:border-brand hover:bg-fg/20"
      >
        <Palette size={18} />
      </button>
      {open && (
        <div className="animate-fade-up-fast flex max-h-[70dvh] w-60 flex-col gap-1 overflow-y-auto rounded-2xl border border-fg/15 bg-card/95 p-2 backdrop-blur-xl">
          {THEMES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTheme(t.id)}
              className={`flex items-center gap-3 rounded-xl px-2.5 py-2 text-left text-sm transition hover:bg-fg/10 ${
                theme === t.id ? "bg-fg/10 font-semibold" : "text-fg/80"
              }`}
            >
              <span
                className="h-6 w-6 shrink-0 rounded-full ring-1 ring-fg/30"
                style={{ background: `linear-gradient(135deg, ${t.preview[0]} 50%, ${t.preview[1]} 50%)` }}
              />
              <span className="flex-1">{t.name}</span>
              {theme === t.id && <Check size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
