import Scene from "../common/Scene.jsx";
import Reveal from "../common/Reveal.jsx";
import { Lead, Title } from "../common/Text.jsx";
import { Heart, Sparkles } from "lucide-react";
import Cake from "../common/Cake.jsx";
import { content, fill } from "../../data/birthday.js";

export default function BlessingScene({ name }) {
  const c = content.blessing;
  return (
    <Scene className="!max-w-6xl">
      <Title delay={0.1}>{fill(c.title, name)}</Title>
      <Lead delay={0.3}>{c.subtitle}</Lead>

      <div className="mt-3 grid w-full items-center gap-8 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)] md:gap-12">
        {/* birthday cake card */}
        <Reveal delay={0.5} className="relative mx-auto w-[min(19rem,78vw)] md:w-[min(22rem,100%)]">
          <div className="absolute -inset-6 -z-10 animate-pulse rounded-full bg-brand/30 blur-3xl" />
          <figure className="m-0 animate-float rounded-[1.4rem] bg-paper p-5 pb-4 shadow-[0_26px_70px_rgb(0_0_0/.35)] [transform:rotate(-3deg)]">
            <Cake className="mx-auto w-full" />
            <figcaption className="pt-1 text-center font-display text-lg italic text-deep/80">{c.caption}</figcaption>
          </figure>
          <Sparkles aria-hidden="true" className="absolute -left-8 top-6 animate-pulse text-accent" size={26} />
          <Heart aria-hidden="true" className="absolute -right-7 bottom-10 animate-beat fill-accent text-accent" size={26} />
        </Reveal>

        {/* dua + wishes */}
        <div className="flex flex-col gap-4 text-left">
          <Reveal delay={0.8} className="rounded-3xl border border-brand/30 bg-card/85 p-5 text-center text-fg shadow-card backdrop-blur-md">
            <p dir="rtl" lang="ar" className="font-arabic text-[length:clamp(1.5rem,4.6vw,2.2rem)] font-bold leading-[1.9] text-accent">
              {c.arabic}
            </p>
            <p className="mt-1 text-sm italic text-fg/75">{c.arabicMeaning}</p>
            <span aria-hidden="true" className="mx-auto my-3 block h-px w-24 bg-gradient-to-r from-transparent via-brand to-transparent" />
            <p dir="rtl" lang="ar" className="font-arabic text-[length:clamp(1.3rem,3.8vw,1.8rem)] leading-[1.9]">{c.arabic2}</p>
            <p className="text-sm italic text-fg/75">{c.arabic2Meaning}</p>
          </Reveal>

          <ul className="flex flex-col gap-2.5">
            {c.wishes.map((w, i) => (
              <Reveal as="li" key={i} delay={1.1 + i * 0.25} className="flex list-none items-start gap-3 rounded-2xl border border-fg/10 bg-card/85 px-4 py-3 text-[.95rem] leading-relaxed text-fg backdrop-blur-md">
                <span>{fill(w, name)}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal as="p" delay={2.3} className="text-center font-display text-lg italic text-accent md:text-right">{c.signoff}</Reveal>
        </div>
      </div>
    </Scene>
  );
}
