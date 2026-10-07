# Happy Birthday – interactive card

React + Vite + **Tailwind CSS**. Every word comes from one data file.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Edit the text
Open `src/data/birthday.js`. Name screen, letter, gallery captions, **wish cards**, duas and the `birthday.sh` terminal are all there.
- `{name}` is replaced by the name typed on the first screen.
- Add/remove wish cards in `wishes.items` (`icon`, `title`, `text`).
- Icons: heart, lightbulb, rocket, shield, star, code, book, trophy, smile, sparkles, compass, flame.
- Duas are written for a girl (`لَهَا`, `أَنْتِ`). For a boy change them to `لَهُ` and `أَنْتَ` in `blessing.arabic` / `blessing.arabic2`.

## Photos
Put photos in `public/images/gallery/` and list them in `gallery.items` (1–7 photos work well).
They appear as polaroid cards in a fan; tap a card to bring it forward.
Tall phone photos are cropped to show the top part (face). Change `objectPosition` in `GalleryScene.jsx` if needed.

## Scenes
Name screen (cake) → Envelope letter → Photo gallery → Wishes cards → `birthday.sh` terminal → Duas & wishes.

## Themes
Top-right palette button: Party Confetti (default), Balloon Sky, Peach Bubbles, Lilac Fiesta, Mint Candy, Midnight Fireworks.
Colours are CSS variables in **`src/index.css`**; the picker list, default and the animated pattern of each theme
(`confetti`, `balloons`, `bubbles`, `fireworks`) are in `src/data/themes.js`. The choice is remembered.
Fonts: Fraunces (headings), DM Sans (body), Fira Code (code).

## Controls
Next/Previous buttons, ← → keys, Space, swipe on mobile, or tap the dots.
