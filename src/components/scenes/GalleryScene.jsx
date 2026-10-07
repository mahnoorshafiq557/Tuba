import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import Scene from "../common/Scene.jsx";
import Reveal from "../common/Reveal.jsx";
import Button from "../common/Button.jsx";
import { Lead, Title } from "../common/Text.jsx";
import { ICONS } from "../common/icons.js";
import { content, fill } from "../../data/birthday.js";

// Photos are shown as polaroid cards in a fan. Tap / click a card to bring it to the front.
// Photos + captions: src/data/birthday.js  (gallery.items)

function Polaroid({ item, k, n, active, onSelect, i }) {
  const [failed, setFailed] = useState(false);
  const Icon = ICONS[item.icon] || Sparkles;
  const half = Math.max(1, (n - 1) / 2);
  const tilt = (k / half) * 7; // degrees
  const lift = active ? -14 : Math.abs(k) * 7;

  return (
    <button
      type="button"
      onClick={() => onSelect(i)}
      aria-label={item.caption || `Photo ${i + 1}`}
      aria-pressed={active}
      className="absolute left-1/2 top-1/2 aspect-[9/14] w-[min(55cqh,50cqw)] cursor-pointer outline-offset-8 transition-[transform,box-shadow] duration-500 ease-smooth"
      style={{
        zIndex: active ? 30 : 20 - Math.round(Math.abs(k) * 2),
        transform: `translate(calc(-50% + min(34cqh, 24cqw) * ${k}), calc(-50% + ${lift}px)) rotate(${active ? 0 : tilt}deg) scale(${active ? 1.07 : 1})`,
      }}
    >
      <Reveal delay={0.4 + i * 0.2} className="h-full w-full">
        <figure
          className={`relative m-0 flex h-full w-full flex-col rounded-md bg-paper p-[4%] pb-0 ${
            active ? "shadow-[0_26px_60px_rgb(0_0_0/.35)]" : "shadow-[0_14px_34px_rgb(0_0_0/.25)]"
          }`}
        >
          {/* tape */}
          <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-[34%] -translate-x-1/2 -rotate-3 rounded-sm bg-brand-200/80 shadow-sm" />

          {item.src && !failed ? (
            <img
              src={item.src}
              alt={item.caption || ""}
              onError={() => setFailed(true)}
              draggable="false"
              className="min-h-0 w-full flex-1 rounded-[3px] object-cover"
              style={{ objectPosition: "50% 18%" }}
            />
          ) : (
            <span className="grid min-h-0 w-full flex-1 place-items-center rounded-[3px] bg-brand-100 text-brand-600">
              <Icon aria-hidden="true" className="h-1/4 w-1/4" />
            </span>
          )}

          <figcaption className="grid h-[16%] shrink-0 place-items-center font-display text-[clamp(.78rem,2.6cqw,1.05rem)] italic text-deep/85">
            {item.caption}
          </figcaption>

          <Heart aria-hidden="true" size={20} className={`absolute -bottom-2 -right-2 fill-accent text-accent ${active ? "animate-beat" : ""}`} />
        </figure>
      </Reveal>
    </button>
  );
}

export default function GalleryScene({ name, onNext }) {
  const c = content.gallery;
  const items = c.items;
  const n = items.length;
  const [current, setCurrent] = useState(Math.floor((n - 1) / 2));

  return (
    <Scene>
      <Title delay={0.1}>{fill(c.title, name)}</Title>

      <div className="relative h-[clamp(15rem,calc(100dvh-22rem),27rem)] w-full max-w-3xl [container-type:size]">
        {items.map((item, i) => (
          <Polaroid key={i} item={item} i={i} n={n} k={i - (n - 1) / 2} active={i === current} onSelect={setCurrent} />
        ))}

        {/* birthday stamp */}
        <Reveal delay={1.2} className="absolute bottom-0 right-1 z-40 flex -rotate-6 items-center gap-1.5 rounded-full border-2 border-dashed border-accent/70 bg-card/90 px-3 py-1 backdrop-blur-sm">
          <Sparkles aria-hidden="true" className="animate-pulse text-accent" size={16} />
          <span className="font-display text-[.85rem] italic leading-none text-accent">{c.stamp}</span>
        </Reveal>
      </div>

      {n > 1 && <Reveal delay={1.3} className="text-xs text-fg/55">{c.hint}</Reveal>}
      <Lead delay={1.5}>{fill(c.subtitle, name)}</Lead>
      <Reveal delay={1.7}>
        <Button onClick={onNext}>{c.continueButton}</Button>
      </Reveal>
    </Scene>
  );
}
