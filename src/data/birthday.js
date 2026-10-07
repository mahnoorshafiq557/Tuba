// ───────────────────────────────────────────────────────────
// ALL the words of the birthday card live here.
// {name} is replaced by the name typed on the first screen.
// ───────────────────────────────────────────────────────────
export const content = {
  nameScreen: {
    title: "Whose birthday is it today?",
    label: "Type the birthday star's name",
    placeholder: "e.g. Enter Name",
    button: "Let's Celebrate →",
  },

  nav: { previous: "Previous", next: "Next" },

  letter: {
    prompt: "A little birthday surprise is waiting for you.",
    openButton: "Open Letter",
    greeting: "Dear {name},",
    paragraphs: [
      "Happy Birthday! Today is all about you, and you deserve every bit of happiness it brings.",
      "Thank you for being the kind of person who makes ordinary days feel special.",
      "Your smile, your kindness and your company are gifts I am grateful for every single day.",
      "May this new year of your life be softer, brighter and full of reasons to laugh.",
      "Make a big wish. You deserve all of them!",
    ],
    closing: "With love & best wishes",
    continueButton: "See the moments →",
  },

  // Put photos in public/images/gallery/ and list them here (1 to 7 photos work well).
  // If a photo can't load, its icon is shown instead.
  gallery: {
    title: "Beautiful moments of {name}",
    items: [
      { src: "/images/gallery/girl.webp", icon: "smile", caption: "That smile" },
      { src: "/images/gallery/girl1.webp", icon: "sparkles", caption: "Winter charm" },
      { src: "/images/gallery/girl2.webp", icon: "heart", caption: "Peaceful vibes" },
    ],
    hint: "Tap a photo to bring it forward",
    stamp: "Happy Birthday",
    subtitle: "Moments worth celebrating, just like you.",
    continueButton: "Continue →",
  },

  wishes: {
    title: "Birthday Wishes for {name}",
    subtitle: "One wish for every kind of joy.",

    items: [
      {
        icon: "heart",
        title: "Happiness",
        text: "May your life always be filled with love, peace and beautiful moments.",
      },
      {
        icon: "star",
        title: "Big Dreams",
        text: "May you always have the courage to dream, and the luck to see them come true.",
      },
      {
        icon: "shield",
        title: "Good Health",
        text: "May you stay healthy, strong and full of energy all year long.",
      },
      {
        icon: "rocket",
        title: "Success",
        text: "May every effort bring you closer to your goals and a bright future.",
      },
      {
        icon: "smile",
        title: "Endless Smiles",
        text: "May every new day bring you countless reasons to smile and laugh.",
      },
      {
        icon: "sparkles",
        title: "Sweet Surprises",
        text: "May this year surprise you with wonderful things you never expected.",
      },
    ],
  },

  blessing: {
    title: "Duas for {name}",
    subtitle: "From the bottom of my heart…",
    caption: "Make a wish!",

    arabic: "اللَّهُمَّ بَارِكْ لَهَا فِي عُمُرِهَا وَصِحَّتِهَا وَرِزْقِهَا",
    arabicMeaning: "O Allah, bless her in her life, her health and her provision.",

    arabic2: "كُلُّ عَامٍ وَأَنْتِ بِخَيْرٍ",
    arabic2Meaning: "May you be well and blessed, every year.",

    wishes: [
      "May Allah fill your life with health, peace and barakah.",
      "May every dua of your heart be accepted.",
      "May this year bring you closer to everything you dream of.",
      "Happy Birthday — always remembered in my dua!",
    ],

    signoff: "With love, always",
  },

  terminal: {
    fileName: "birthday.sh",

    lines: [
      "> initializing birthday_party...",
      "",
      "Guest of honour: {name}",
      "",
      "Happiness ............. 100%",
      "Smiles ................ ∞",
      "Cake .................. loading...",
      "Love .................. ∞",
      "",
      "status: HAPPY_BIRTHDAY!",
    ],

    systemLabel: "System message:",
    systemText: "Wishing you the happiest year yet.",
  },
};

export const fill = (text, name) => text.replaceAll("{name}", name);
