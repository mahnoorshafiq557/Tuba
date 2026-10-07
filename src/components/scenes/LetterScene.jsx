import { useEffect, useRef, useState } from "react";
import Scene from "../common/Scene.jsx";
import Reveal from "../common/Reveal.jsx";
import Button from "../common/Button.jsx";
import { content, fill } from "../../data/birthday.js";

const round = "absolute inset-0 rounded-[10px]";

export default function LetterScene({ name, onNext, setBright }) {
  const c = content.letter;
  const [stage, setStage] = useState(0); // 0 closed, 1 opening, 2 letter
  const timer = useRef();

  useEffect(
    () => () => {
      clearTimeout(timer.current);
      setBright(false);
    },
    [setBright]
  );

  const open = () => {
    setStage(1);
    setBright(true);
    timer.current = setTimeout(() => setStage(2), 1500);
  };

  if (stage < 2) {
    const opening = stage === 1;
    return (
      <Scene>
        <div
          aria-hidden="true"
          className={`relative h-[min(190px,47vw)] w-[min(280px,70vw)] [perspective:900px] transition-transform duration-1000 ease-smooth ${
            opening ? "translate-y-2 -rotate-2" : ""
          }`}
        >
          {/* back of envelope */}
          <div className={`${round} z-0 bg-brand-800`} />

          {/* letter paper (inside, rises on open) */}
          <div
            className={`absolute inset-x-[8%] bottom-[10%] top-[8%] z-[1] rounded-[10px] bg-brand-50 px-[10%] pt-[12%] transition-transform delay-500 duration-1000 ease-smooth ${
              opening ? "-translate-y-[55%]" : ""
            }`}
          >
            <div className="mb-2 h-[3px] w-full rounded bg-brand-700/20" />
            <div className="mb-2 h-[3px] w-4/5 rounded bg-brand-700/20" />
            <div className="h-[3px] w-3/5 rounded bg-brand-700/20" />
          </div>

          {/* front pocket */}
          <div
            className={`${round} z-[2] bg-gradient-to-br from-brand-600 to-brand-800 [clip-path:polygon(0_0,50%_55%,100%_0,100%_100%,0_100%)]`}
          />

          {/* flap */}
          <div
            className={`${round} origin-top bg-brand drop-shadow-lg [clip-path:polygon(0_0,100%_0,50%_58%)] ${
              opening ? "z-0 [transform:rotateX(180deg)]" : "z-[3]"
            }`}
            style={{ transition: "transform .7s cubic-bezier(.4,0,.2,1), z-index 0s linear .35s" }}
          />
        </div>
        <p className="max-w-xl text-[length:clamp(1rem,2.2vw,1.2rem)] text-fg/75">{c.prompt}</p>
        {stage === 0 && <Button onClick={open}>{c.openButton}</Button>}
      </Scene>
    );
  }

  const total = c.paragraphs.length + 1; // greeting + paragraphs
  const step = (i) => 0.3 + i * 0.8;
  const line = "mb-2.5 animate-fade-up font-display text-[length:clamp(.92rem,2.1vw,1.1rem)] leading-relaxed";

  return (
    <Scene>
      <article className="max-h-[calc(100dvh-12rem)] w-[min(34rem,92vw)] animate-fade-up overflow-auto rounded-2xl border border-brand/25 bg-gradient-to-br from-white to-brand-50 px-[clamp(1.2rem,3vw,2rem)] py-[clamp(1.1rem,3vh,1.8rem)] text-left text-deep shadow-[0_30px_80px_rgba(0,0,0,.55)]">
        <p className={`${line} text-[1.2em] font-semibold italic text-brand-700`} style={{ animationDelay: `${step(0)}s` }}>
          {fill(c.greeting, name)}
        </p>
        {c.paragraphs.map((t, i) => (
          <p key={i} className={line} style={{ animationDelay: `${step(i + 1)}s` }}>
            {fill(t, name)}
          </p>
        ))}
        <p className={`${line} mb-0 mt-3 text-right font-semibold italic text-brand-700`} style={{ animationDelay: `${step(total)}s` }}>
          {c.closing}
        </p>
      </article>
      <Reveal delay={step(total) + 0.6}>
        <Button onClick={onNext}>{c.continueButton}</Button>
      </Reveal>
    </Scene>
  );
}