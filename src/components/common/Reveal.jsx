// Fade-up entrance. `delay` is in seconds.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", style, ...rest }) {
  return <Tag className={`animate-fade-up ${className}`} style={{ animationDelay: `${delay}s`, ...style }} {...rest} />;
}
