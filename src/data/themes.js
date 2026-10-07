// Themes in the picker. Colours themselves are in src/index.css.
// preview = [background, main colour] for the swatch.
// pattern = animated background (see Background/PatternLayer.jsx)
//   mode   : confetti (falling paper confetti) | balloons (rising balloons)
//            bubbles (floating bubbles, or floating symbols if "shapes" is set) | fireworks (night sky bursts)
//   glyphs : extra symbols mixed into the confetti            (optional, confetti only)
//   shapes : symbols used by "bubbles" instead of circles     (optional)
//   stars  : twinkling stars                                  (optional)
export const THEMES = [
  { id: "party", name: "Party Confetti", preview: ["rgb(255,224,236)", "rgb(219,39,119)"],
    pattern: { mode: "confetti" } },
  { id: "sky", name: "Balloon Sky", preview: ["rgb(191,230,253)", "rgb(225,29,72)"],
    pattern: { mode: "balloons" } },
  { id: "sunrise", name: "Peach Bubbles", preview: ["rgb(255,217,179)", "rgb(234,88,12)"],
    pattern: { mode: "bubbles", stars: true } },
  { id: "lilac", name: "Lilac Fiesta", preview: ["rgb(233,222,254)", "rgb(124,58,237)"],
    pattern: { mode: "confetti", glyphs: "♥✦" } },
  { id: "mint", name: "Mint Candy", preview: ["rgb(204,251,241)", "rgb(13,148,136)"],
    pattern: { mode: "bubbles", shapes: "✦★✿" } },
  { id: "night", name: "Midnight Fireworks", preview: ["rgb(27,10,74)", "rgb(251,191,36)"],
    pattern: { mode: "fireworks", stars: true } },
];
export const DEFAULT_THEME = "party";
