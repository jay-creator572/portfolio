/* All site copy and asset lists live here. Edit text in this file only. */

window.SITE = {
  name: "Jasmine Gao",
  role: "AI Short Drama Director & Visual Developer",
  about: [
    "I’m an AIGC creator studying at University College London (UCL), making vertical short dramas with generative AI.",
    "Each series here is adapted from an existing script; everything after the page is my own work — storyboards and direction, character and world design, key art and posters, AI video generation, editing and the AI-generated score.",
    "All four series are now streaming on VibeShort, StoryReel and Dailymotion."
  ],
  email: "jasmingao7@outlook.com",
  linkedin: "www.linkedin.com/in/ming-gao-46567838a",
  // Streaming platforms (all four series are on all three). url: null = no confirmed link yet,
  // shown as a "search in app" hint instead of a button. Fill in the official URL when confirmed.
  platforms: [
    { name: "VibeShort", url: null },
    { name: "StoryReel", url: null },
    { name: "Dailymotion", url: "https://www.dailymotion.com" }
  ],
  roles: [
    "Director & Storyboard",
    "AI Video Generation & Editing",
    "Character, World & Key-Art Design",
    "Script Adaptation & AI Score"
  ]
};

window.DRAMAS = [
  {
    id: "burn",
    no: "01",
    title: "Burn in Regret",
    altTitle: "",
    genre: ["Dragon Fantasy", "Regret Romance"],
    format: "Vertical short drama · 9:16 · English",
    accent: "#e8c58c",
    logline: "For ten years she was the fire prince’s living sleeping draught. He called her a toy. So she walked away — into the arms of the Dragon King.",
    synopsis: [
      "Fire-dragon prince Leo suffers from a hereditary fire poison that leaves him sleepless with pain. Orphan Elfrin, born with rare pure water-healing magic, is chosen at ten to become his personal attendant. Over ten years she saves his life in secret — but Leo believes his saviour was the socialite Vera, and calls Elfrin a toy to be discarded.",
      "When her contract ends, Elfrin pushes the Queen’s jewels to the floor and leaves. Betrayed at the Beast Trials and hunted by the prince she protected, she is summoned by Cyrus, the young Dragon King of the black dragons, cursed by a thousand-year frost that only her lost royal water-blood can break."
    ],
    visual: "A gilded dragon keep above the clouds, aurora valleys and frozen battlefields; fire and ice set against midnight blues.",
    posters: ["burn-1", "burn-2", "burn-3"],
    trailers: [{ label: "Trailer", src: "assets/trailers/burn-in-regret.mp4" }],
    characters: [
      {
        name: "Elfrin",
        role: "Female lead",
        line: "Lost princess of the water dragons, raised as an orphan. Her pure healing magic keeps the prince alive — and unseen.",
        figure: "elfrin",
        face: [0.432, 0.118, 0.205, 0.082], // detected face box (x, y, w, h) as fractions of the front view
        outfit: "Everyday look",
        looks: [
          ["elfrin-daily", "Everyday look"],
          ["elfrin-awakened", "Awakened"],
          ["elfrin-maid", "Attendant uniform"],
          ["elfrin-child", "Childhood"],
          ["elfrin-wounded", "Wounded"]
        ]
      },
      {
        name: "Cyrus",
        role: "Male lead",
        line: "The youngest and most powerful Dragon King, slowly consumed by a thousand-year frost curse. Cold to the world, fiercely protective of his own.",
        figure: "cyrus",
        face: [0.341, 0.148, 0.209, 0.068], // detected face box (x, y, w, h) as fractions of the front view
        outfit: "Battle armour",
        looks: [
          ["cyrus-armour-2", "Battle armour, wings folded"],
          ["cyrus-armour-1", "Battle armour, wings spread"],
          ["cyrus-daily", "Primal form"]
        ]
      },
      {
        name: "Leo",
        role: "Second male lead",
        line: "Fire-dragon crown prince, proud and impulsive, blind to who truly saved him until it is too late.",
        figure: "leo",
        face: [0.444, 0.110, 0.217, 0.076], // detected face box (x, y, w, h) as fractions of the front view
        outfit: "Everyday look",
        looks: [
          ["leo-daily", "Everyday look"],
          ["leo-ceremony", "Founding ceremony"],
          ["leo-training", "Training"],
          ["leo-home", "At home"],
          ["leo-child", "Childhood"]
        ]
      },
      {
        name: "Vera",
        role: "Second female lead",
        line: "A celebrated socialite of noble blood — vain, ambitious, and wearing a stolen claim to Elfrin’s heroism.",
        figure: "vera",
        face: [0.392, 0.128, 0.242, 0.078], // detected face box (x, y, w, h) as fractions of the front view
        outfit: "Hall of Beasts",
        looks: [
          ["vera-beast-hall", "Hall of Beasts"],
          ["vera-ceremony", "Founding ceremony"],
          ["vera-daily", "Everyday look"]
        ]
      }
    ],
    scenes: [
      ["dragon-keep", "The Dragon Keep"],
      ["aurora-valley", "Aurora Valley"],
      ["hidden-cave", "Hidden Cave, Aurora Valley"],
      ["celebration-hall", "Celebration Hall"],
      ["arena", "Dragon Arena"],
      ["sacred-nest-hall", "Hall of the Sacred Nest"],
      ["renewal-hall", "Contract Renewal Hall"],
      ["leo-chamber", "Leo’s Chamber"],
      ["vera-chamber", "Vera’s Chamber"],
      ["ice-battlefield", "The Ice Battlefield"],
      ["keep-garden", "The Keep Gardens"],
      ["annas-cottage", "Anna’s Cottage"]
    ],
    score: [
      { title: "Elfrin’s Last Echo", src: "assets/music/elfrins-last-echo.mp3" },
      { title: "Pendant Awakens", src: "assets/music/pendant-awakens.mp3" },
      { title: "Throne of Ash", src: "assets/music/throne-of-ash.mp3" },
      { title: "Crown in Ashes", src: "assets/music/crown-in-ashes.mp3" },
      { title: "Echo of Fate — Episode 1 Theme", src: "assets/music/destiny-echo.m4a" }
    ]
  },

  {
    id: "dragon",
    no: "02",
    title: "His Dragon’s Stolen Bride",
    altTitle: "La Novia Raptada por el Dragón",
    genre: ["Sci-Fi Romance", "Fantasy"],
    format: "Vertical short drama · 9:16 · Spanish-language release",
    accent: "#c4d0e2",
    logline: "A dragon archaeologist teaches a lonely ancient dragon how to court a mate — and he decides the lesson was a proposal.",
    synopsis: [
      "On Dragonbone Bay, a research station is bolted into the eye socket of a colossal dragon skeleton, half-sunk in a jade-green sea. Graduate researcher Lyra studies the dragons that nest among the islands — and one of them, the strongest and most beautiful of all, has never once flown a courtship flight.",
      "Determined to help, she straps on bionic gliding wings and performs the ritual herself. He learns it perfectly. Then he takes it as her answer — and carries her off to his lair. Draven is no ordinary dragon: he is an ancient black dragon king, woken after ten thousand years."
    ],
    visual: "Interstellar deep-sea myth: cold alloy research tech embedded in primeval bone, fire-opal scales against jade water and storm-lit skies.",
    posters: ["dragon-1", "dragon-2", "dragon-3", "dragon-4"],
    trailers: [
      { label: "Promo A", src: "assets/trailers/dragon-a.mp4" },
      { label: "Promo B", src: "assets/trailers/dragon-b.mp4" }
    ],
    score: [
      { title: "Daga y Alba", src: "assets/music/daga-y-alba.mp3" },
      { title: "Isabel and Lux", src: "assets/music/isabel-and-lux.mp3" },
      { title: "Salt Air Tension", src: "assets/music/salt-air-tension.mp3" }
    ]
  },

  {
    id: "merman",
    no: "03",
    title: "Kiss My Merman’s Tail",
    altTitle: "Reborn to Love Him",
    genre: ["Rebirth", "Modern Fantasy Romance"],
    format: "Vertical short drama · 9:16 · English",
    accent: "#7fe6d2",
    logline: "She married a merman to save her boyfriend’s startup and broke him. He died saving her anyway. Reborn on their wedding night, she asks one question: can I kiss your tail?",
    synopsis: [
      "Sunny married Kael Hayward for money — her boyfriend Alex Carter’s biotech startup needed saving. Kael was aloof, hungry for her, and ashamed of his tail. She used that shame against him, again and again.",
      "When Alex had her killed, Kael tore out every last scale to save her and dissolved into sea foam beneath the sun he loved. Sunny wakes at the Silver Bay estate in 2026 — the night of their wedding — with every memory intact, and a second chance to love him the way he deserved."
    ],
    visual: "Sun-bleached coastal luxury against cold ocean depths; iridescent scale detail and warm golden-hour intimacy.",
    posters: ["merman-1"],
    trailers: [{ label: "Trailer", src: "assets/trailers/merman.mp4" }],
    score: [
      { title: "Sunny Speaks", src: "assets/music/sunny-speaks.mp3" },
      { title: "Glass Oath", src: "assets/music/glass-oath.mp3" },
      { title: "Velvet Pulse", src: "assets/music/velvet-pulse.mp3" }
    ]
  },

  {
    id: "reborn",
    no: "04",
    title: "Reborn to Swap Shifter Husbands with My Sister",
    altTitle: "",
    genre: ["Rebirth", "Shifter Fantasy"],
    format: "Vertical short drama · 9:16 · English",
    accent: "#f2b3e6",
    logline: "Two fox princesses, two beast princes, one second life — her sister grabs the husband who became king. She takes the one who died, and decides he won’t this time.",
    synopsis: [
      "Seren and her sister Isolde, princesses of the defeated Spirit Fox clan, are traded to the Beast Realm as brides. In their first life Isolde chose the elegant Serpent Prince, who failed his Awakening; Seren was left with the savage Wolf Prince, who rose to become Alpha King.",
      "Now both sisters have been sent back to the day they choose. Isolde seizes the Wolf Prince, certain she has won. Seren lowers her head, pretends to grieve — and walks to Cassian, the Serpent Prince, knowing exactly why he died last time, and exactly how to keep him alive."
    ],
    visual: "Moonlit beast-realm palaces, silver serpent scales and pale fox fur; soft pearl light against shadowed rival courts.",
    posters: ["reborn-1", "reborn-2", "reborn-3"],
    trailers: [{ label: "Trailer", src: "assets/trailers/reborn.mp4" }],
    score: [
      { title: "Serpent Crown Overture", src: "assets/music/serpent-crown-overture.mp3" },
      { title: "Moonlit Carriage", src: "assets/music/moonlit-carriage.mp3" },
      { title: "Unresolved Chord", src: "assets/music/unresolved-chord.mp3" }
    ]
  }
];
