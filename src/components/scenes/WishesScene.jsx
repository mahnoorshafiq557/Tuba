import { Sparkles } from "lucide-react";
import Scene from "../common/Scene.jsx";
import Reveal from "../common/Reveal.jsx";
import { Lead, Title } from "../common/Text.jsx";
import { ICONS, ACCENTS } from "../common/icons.js";
import { content, fill } from "../../data/birthday.js";

export default function WishesScene({ name }) {
  const c = content.wishes;
  return (
    <Scene>
      <Title delay={0.1}>{fill(c.title, name)}</Title>
      <Lead delay={0.3}>{fill(c.subtitle, name)}</Lead>
      <ul className="mt-6 grid w-full max-w-4xl grid-cols-1 gap-x-6 gap-y-9 px-1 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((w, i) => {
          const Icon = ICONS[w.icon] || Sparkles;
          return (
            <Reveal as="li" key={i} delay={0.5 + i * 0.15} className="list-none" style={{ "--c": `var(${ACCENTS[i % ACCENTS.length]})` }}>
              {/* paper note card */}
              <div
                className={`group relative h-full overflow-hidden rounded-2xl bg-paper px-5 pb-6 pt-12 text-left text-deep shadow-[0_16px_40px_rgb(0_0_0/.16)] transition duration-500 ease-smooth hover:-translate-y-2 hover:rotate-0 hover:shadow-[0_24px_50px_rgb(0_0_0/.24)] ${
                  i % 2 ? "rotate-[1.2deg]" : "-rotate-[1.2deg]"
                }`}
              >
                {/* coloured top band */}
                <span aria-hidden="true" className="absolute inset-x-0 top-0 h-3 bg-[rgb(var(--c))]" />
                {/* icon badge */}
                <span className="absolute left-5 top-6 grid h-11 w-11 place-items-center rounded-xl bg-[rgb(var(--c)/.14)] text-[rgb(var(--c))]">
                  <Icon size={22} aria-hidden="true" />
                </span>
                {/* number */}
                <span aria-hidden="true" className="absolute right-4 top-5 font-display text-3xl font-bold italic text-[rgb(var(--c)/.25)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold leading-snug">{fill(w.title, name)}</h3>
                <span aria-hidden="true" className="mb-2.5 mt-2 block h-[3px] w-10 rounded-full bg-[rgb(var(--c))] transition-all duration-500 group-hover:w-20" />
                <p className="text-[.93rem] leading-relaxed text-deep/75">{fill(w.text, name)}</p>
              </div>
            </Reveal>
          );
        })}
      </ul>
    </Scene>
  );
}
