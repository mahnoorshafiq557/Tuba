import { Fragment } from "react";
import Reveal from "./Reveal.jsx";

// Renders an array of lines with <br /> between them.
export const Lines = ({ lines }) =>
  lines.map((l, i) => (
    <Fragment key={i}>
      {l}
      {i < lines.length - 1 && <br />}
    </Fragment>
  ));

export const Title = ({ children, delay, className = "" }) => (
  <Reveal
    as="h2"
    delay={delay}
    className={`font-display text-[length:clamp(1.7rem,5vw,3rem)] font-semibold leading-tight ${className}`}
  >
    {children}
  </Reveal>
);

export const Name = ({ children, delay, className = "" }) => (
  <Reveal
    as="h2"
    delay={delay}
    className={`font-display text-[length:clamp(1.7rem,5.5vw,3.2rem)] font-semibold italic leading-tight text-accent ${className}`}
  >
    {children}
  </Reveal>
);

export const Lead = ({ children, delay, className = "" }) => (
  <Reveal
    as="p"
    delay={delay}
    className={`max-w-xl text-[length:clamp(1rem,2.2vw,1.2rem)] leading-relaxed text-fg/75 ${className}`}
  >
    {children}
  </Reveal>
);

export const Code = ({ children, delay, className = "" }) => (
  <Reveal
    as="p"
    delay={delay}
    className={`font-mono text-[length:clamp(.78rem,2vw,.98rem)] font-medium text-accent ${className}`}
  >
    {children}
  </Reveal>
);
