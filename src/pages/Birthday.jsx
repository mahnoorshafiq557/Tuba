import { useCallback, useEffect, useRef, useState } from "react";
import Background from "../components/Background/Background.jsx";
import ThemePicker from "../components/navigation/ThemePicker.jsx";
import SceneControls from "../components/navigation/SceneControls.jsx";
import Scene from "../components/common/Scene.jsx";
import Reveal from "../components/common/Reveal.jsx";
import Cake from "../components/common/Cake.jsx";
import Button from "../components/common/Button.jsx";
import { Title } from "../components/common/Text.jsx";
import LetterScene from "../components/scenes/LetterScene.jsx";
import GalleryScene from "../components/scenes/GalleryScene.jsx";
import WishesScene from "../components/scenes/WishesScene.jsx";
import CodeScene from "../components/scenes/CodeScene.jsx";
import BlessingScene from "../components/scenes/BlessingScene.jsx";
import { content } from "../data/birthday.js";

const TOTAL = 5;

export default function Birthday() {
  const form = content.nameScreen;
  const [guestName, setGuestName] = useState("");
  const [draft, setDraft] = useState("");
  const [scene, setScene] = useState(0);
  const [launching, setLaunching] = useState(false);
  const [bright, setBright] = useState(false);
  const touch = useRef(null);
  const timers = useRef([]);

  const next = useCallback(() => setScene((s) => Math.min(s + 1, TOTAL - 1)), []);
  const prev = useCallback(() => setScene((s) => Math.max(s - 1, 0)), []);

  useEffect(() => {
    if (!guestName) return;
    const onKey = (e) => {
      const tag = e.target.tagName;
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === " " && tag !== "BUTTON" && tag !== "INPUT") {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [guestName, next, prev]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = (e) => {
    e.preventDefault();
    const n = draft.trim();
    if (!n) return;
    setLaunching(true);
    timers.current.push(setTimeout(() => { setGuestName(n); setScene(0); }, 700));
    timers.current.push(setTimeout(() => setLaunching(false), 1500));
  };

  const onTouchStart = (e) => { touch.current = e.changedTouches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null || !guestName) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    touch.current = null;
    if (Math.abs(dx) > 70) (dx < 0 ? next : prev)();
  };

  const p = { name: guestName, onNext: next };
  const scenes = [
    <LetterScene {...p} setBright={setBright} />,
    <GalleryScene {...p} />,
    <WishesScene {...p} />,
    <CodeScene {...p} />,
    <BlessingScene {...p} />,
  ];

  return (
    <main className="fixed inset-0 h-dvh overflow-hidden bg-ink-900" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <Background bright={bright} />
      <ThemePicker />

      {!guestName ? (
        <Scene key="name">
          <form className="flex w-full max-w-[26rem] flex-col items-center gap-4" onSubmit={start}>
            <Reveal delay={0.05}>
              <Cake className={`mx-auto w-[clamp(150px,30vh,260px)] animate-float transition-transform duration-700 ${launching ? "-translate-y-6 scale-110" : ""}`} />
            </Reveal>
            <Title delay={0.2}>{form.title}</Title>
            <Reveal as="label" htmlFor="gname" delay={0.6} className="text-[length:clamp(1rem,2.2vw,1.2rem)] text-fg/75">
              {form.label}
            </Reveal>
            <Reveal delay={0.9} className="w-full">
              <input
                id="gname"
                value={draft}
                maxLength={40}
                autoFocus
                autoComplete="off"
                placeholder={form.placeholder}
                onChange={(e) => setDraft(e.target.value)}
                className="w-full rounded-2xl border border-fg/20 bg-card/95 px-5 py-4 text-center text-lg font-medium text-fg backdrop-blur-md placeholder:text-fg/35 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/25"
              />
            </Reveal>
            <Reveal delay={1.2}>
              <Button type="submit" disabled={!draft.trim()}>{form.button}</Button>
            </Reveal>
          </form>
        </Scene>
      ) : (
        <>
          <div className="absolute inset-0 animate-scene-in" key={scene}>{scenes[scene]}</div>
          <SceneControls scene={scene} total={TOTAL} onPrev={prev} onNext={next} onSelect={setScene} />
        </>
      )}

      {launching && <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 animate-warp bg-[radial-gradient(circle,#fff_0%,rgb(var(--brand-400))_20%,rgb(var(--ink-900))_60%)]" />}
    </main>
  );
}
