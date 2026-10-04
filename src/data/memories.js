// src/data/memories.js

/**
 * 17 Unlock Memories:
 * Each position in the 17-character lock corresponds to one year of her life.
 * Every single year now features a real, authentic photo of Aashi and her family!
 */
export const lockMemories = [
  {
    year: 1,
    title: "Year 01 • The Day You Arrived",
    snippet: "The tiny girl with the sweetest little smile that brightened every room.",
    photo: "/assets/photos/real_baby_smile.png"
  },
  {
    year: 2,
    title: "Year 02 • Tiny First Steps",
    snippet: "Wobbly little feet running straight into my arms, giggling endlessly.",
    photo: "/assets/photos/real_two_babies.png"
  },
  {
    year: 3,
    title: "Year 03 • The Sweet Chatterbox",
    snippet: "Standing tall, making curious faces, asking questions about everything.",
    photo: "/assets/photos/real_toddler.png"
  },
  {
    year: 4,
    title: "Year 04 • The Blanket & Shawl Era",
    snippet: "Refusing to leave the house without your cozy shawl wrapped tight.",
    photo: "/assets/photos/shawl_bun.png"
  },
  {
    year: 5,
    title: "Year 05 • First Day of School",
    snippet: "Looking back with that shy smile to make sure I was still waving goodbye.",
    photo: "/assets/photos/smiling_together.jpg"
  },
  {
    year: 6,
    title: "Year 06 • The Sweet Festival Bonds",
    snippet: "Sharing sweets, laughing together, bound by a lifetime promise.",
    photo: "/assets/photos/lock_sisters_rakhi.png"
  },
  {
    year: 7,
    title: "Year 07 • Playful Mischief & Goofiness",
    snippet: "Curling up on the chair with that funny grin, plotting the next trick.",
    photo: "/assets/photos/chair_curled.jpg"
  },
  {
    year: 8,
    title: "Year 08 • The Afternoon Sleeper",
    snippet: "Earphones plugged in, drifting off into dreamland in your own cozy world.",
    photo: "/assets/photos/sleeping_earphones.png"
  },
  {
    year: 9,
    title: "Year 09 • The Road Trip Nap",
    snippet: "Fast asleep against the car seat while the highway lights blurred past.",
    photo: "/assets/photos/sleeping_car.png"
  },
  {
    year: 10,
    title: "Year 10 • Double Digits with Family!",
    snippet: "Sunny afternoons on the water, surrounded by everyone who loves you most.",
    photo: "/assets/photos/family_lake_trip.png"
  },
  {
    year: 11,
    title: "Year 11 • Night Walk Adventures",
    snippet: "Walking together under city lights, sharing stories and quiet laughs.",
    photo: "/assets/photos/night_walk_sisters.png"
  },
  {
    year: 12,
    title: "Year 12 • Matching Vibes",
    snippet: "Wearing fun sunglasses with grandma, laughing until our cheeks hurt.",
    photo: "/assets/photos/family_vibes.jpg"
  },
  {
    year: 13,
    title: "Year 13 • Officially a Teen",
    snippet: "Lazy afternoons in bed with your phone, sharing songs and jokes.",
    photo: "/assets/photos/lock_bed_phone.png"
  },
  {
    year: 14,
    title: "Year 14 • Signature Cool Demeanor",
    snippet: "Denim, sunglasses, confidence, and that effortless swagger.",
    photo: "/assets/photos/stylish_solo.jpg"
  },
  {
    year: 15,
    title: "Year 15 • Sister Selfie Magic",
    snippet: "Standing side by side, making memories that time will never erase.",
    photo: "/assets/photos/sister_selfie.jpg"
  },
  {
    year: 16,
    title: "Year 16 • Little Black Dress Era",
    snippet: "Grace, elegance, standing tall, and stepping into your radiance.",
    photo: "/assets/photos/black_dress.png"
  },
  {
    year: 17,
    title: "Year 17 • Today & Forever",
    snippet: "Seventeen years of joy. You grew older, but my love never changed.",
    photo: "/assets/photos/cake_celebration.jpg"
  }
];

export const beginningMemories = [
  {
    id: "beg-1",
    photo: "/assets/photos/real_baby_smile.png",
    title: "Day One",
    caption: "The world got so much warmer the second you smiled your first smile.",
    date: "The beginning",
    tags: ["Sweetest Human 💖", "Chhoti Si Shaitaan"],
    entryAnimation: "pop-center"
  },
  {
    id: "beg-2",
    photo: "/assets/photos/real_two_babies.png",
    title: "Together From The Start",
    caption: "Side by side from our earliest days, looking at each other with pure wonder.",
    date: "First Year",
    tags: ["Mummy Ki Partner", "Cute but Dangerous 😭"],
    entryAnimation: "slide-left"
  },
  {
    id: "beg-3",
    photo: "/assets/photos/real_toddler.png",
    title: "Curious Eyes",
    caption: "Always observing everything with wonder, tiny fingers holding mine.",
    date: "Toddler Years",
    tags: ["Padhaku 📚", "Papa Ki Ladli"],
    entryAnimation: "slide-right"
  }
];

export const childhoodPolaroids = [
  {
    id: "ch-1",
    photo: "/assets/photos/real_toddler.png",
    caption: "Standing tall and looking so innocent before the camera 📸",
    rotate: "-3deg",
    yearLabel: "Age 3",
    tags: ["Cute", "Mastikhor"],
    entryAnimation: "polaroid-tilt"
  },
  {
    id: "ch-2",
    photo: "/assets/photos/shawl_bun.png",
    caption: "Wrapped in a cozy floral blanket with the sweetest little hair bun 🌸",
    rotate: "4deg",
    yearLabel: "Age 5",
    tags: ["Little Monster", "Chhoti Si Shaitaan"],
    entryAnimation: "drop-table"
  },
  {
    id: "ch-3",
    photo: "/assets/photos/lock_sisters_rakhi.png",
    caption: "Sweet festivals and that sacred bond that time will never change 💖",
    rotate: "-2deg",
    yearLabel: "Age 9",
    tags: ["Cute", "Chhoti Si Shaitaan"],
    entryAnimation: "rise-focus"
  },
  {
    id: "ch-4",
    photo: "/assets/photos/chair_curled.jpg",
    caption: "Curled up on the chair with that funny mischievous grin 😂",
    rotate: "3deg",
    yearLabel: "Age 12",
    tags: ["Mastikhor", "Little Monster"],
    entryAnimation: "memory-pop"
  }
];

export const growingUpTimeline = [
  {
    stage: "A LITTLE OLDER",
    subtitle: "Taking on the world with endless curiosity",
    description: "Suddenly you weren't being carried everywhere anymore. You were running ahead, exploring everything, and full of joyful energy.",
    photo: "/assets/photos/real_two_babies.png",
    tag: "Milestone 01",
    tags: ["Chhoti Si Shaitaan", "Full Time Bakchod 😜"],
    entryAnimation: "slide-left"
  },
  {
    stage: "A LITTLE TALLER",
    subtitle: "Reaching the top shelves and quiet afternoon moments",
    description: "Somewhere between school breaks and quiet weekends, you shot up. Relaxing with your phone, sharing music, and making everyday moments sweet.",
    photo: "/assets/photos/lock_bed_phone.png",
    tag: "Milestone 02",
    tags: ["Bhukkad 🍕", "Nautanki 👀"],
    entryAnimation: "drop-table"
  },
  {
    stage: "A LITTLE WISER",
    subtitle: "Developing your own style, confidence, and grace",
    description: "You began understanding the world in ways that took my breath away. You listened with your heart, stood tall, and stayed true to who you are.",
    photo: "/assets/photos/stylish_solo.jpg",
    tag: "Milestone 03",
    tags: ["Heroine ✨", "Miss Perfect"],
    entryAnimation: "rise-focus"
  },
  {
    stage: "A LOT MORE YOU",
    subtitle: "Unapologetically brilliant, radiant, and kind",
    description: "Authentically, fiercely, wonderfully yourself. Standing side-by-side with you is the greatest privilege of my life.",
    photo: "/assets/photos/black_dress.png",
    tag: "Milestone 04",
    tags: ["Ghar Ki Celebrity 🌟", "Main Character"],
    entryAnimation: "memory-pop"
  }
];

export const teenageMemories = [
  {
    id: "teen-1",
    photo: "/assets/photos/canon_portrait.png",
    title: "Cinematic Glow",
    subtitle: "Through The Lens",
    description: "That radiant smile captured right through the DSLR camera screen.",
    tags: ["Heroine", "Main Character"],
    entryAnimation: "rise-focus"
  },
  {
    id: "teen-2",
    photo: "/assets/photos/night_walk_sisters.png",
    title: "Late Night Walks",
    subtitle: "Evening Adventures",
    description: "Walking together under city lights, sharing stories and quiet laughs.",
    tags: ["Overacting Department", "Certified Pagal"],
    entryAnimation: "slide-left"
  },
  {
    id: "teen-3",
    photo: "/assets/photos/black_dress.png",
    title: "Elegance & Radiance",
    subtitle: "Stepping Out",
    description: "Full of grace, poise, and that effortless natural glow.",
    tags: ["Main Character", "Drama Queen"],
    entryAnimation: "pop-center"
  },
  {
    id: "teen-4",
    photo: "/assets/photos/chair_curled.jpg",
    title: "The Snack Raid",
    subtitle: "Lazy Comfort",
    description: "Curled up comfortably, searching for snacks and planning the next chaos.",
    tags: ["Always Hungry", "Certified Pagal"],
    entryAnimation: "memory-pop"
  }
];

export const photoGallery = [
  {
    id: "gal-1",
    photo: "/assets/photos/canon_portrait.png",
    caption: "Pure cinematic radiance captured on camera",
    aspect: "tall",
    era: "Present",
    tags: ["Heroine ✨", "Camera Ki Favourite 📸"],
    entryAnimation: "memory-pop"
  },
  {
    id: "gal-2",
    photo: "/assets/photos/family_lake_trip.png",
    caption: "Family lake day: surrounded by those who love you most",
    aspect: "wide",
    era: "Growing Up",
    tags: ["Papa Ki Ladli", "Mummy Ki Partner"],
    entryAnimation: "slide-left"
  },
  {
    id: "gal-3",
    photo: "/assets/photos/black_dress.png",
    caption: "Chapter 17: Elegant, radiant, and stepping into your light",
    aspect: "tall",
    era: "Present",
    tags: ["Main Character 🌟", "Miss Perfect"],
    entryAnimation: "rise-focus"
  },
  {
    id: "gal-4",
    photo: "/assets/photos/sleeping_car.png",
    caption: "To sleep beside you: peaceful roadtrip naps",
    aspect: "tall",
    era: "Teen",
    tags: ["Too Much Energy (Drained)", "Sweetest Human"],
    entryAnimation: "drop-table"
  },
  {
    id: "gal-5",
    photo: "/assets/photos/cake_celebration.jpg",
    caption: "The 17th birthday cake celebration: laughter and sweet wishes",
    aspect: "tall",
    era: "Present",
    tags: ["Bhukkad 🍕", "Make A Wish ✨"],
    entryAnimation: "pop-center"
  },
  {
    id: "gal-6",
    photo: "/assets/photos/real_baby_smile.png",
    caption: "The sweetest baby smile that started it all",
    aspect: "wide",
    era: "Childhood",
    tags: ["Chhoti Si Shaitaan", "Little Monster ❤️"],
    entryAnimation: "slide-right"
  },
  {
    id: "gal-7",
    photo: "/assets/photos/chair_curled.jpg",
    caption: "Curled up on the chair with that unmistakable mischievous grin",
    aspect: "tall",
    era: "Teen",
    tags: ["Professional Troublemaker 😂", "Certified Pagal"],
    entryAnimation: "polaroid-tilt"
  },
  {
    id: "gal-8",
    photo: "/assets/photos/night_walk_sisters.png",
    caption: "Two sisters, one heart, always walking together",
    aspect: "square",
    era: "Teen",
    tags: ["Drama Queen 🎭", "Full Time Bakchod"],
    entryAnimation: "slide-left"
  },
  {
    id: "gal-9",
    photo: "/assets/photos/shawl_bun.png",
    caption: "Warm and cozy wrapped in blankets with messy hair",
    aspect: "square",
    era: "Childhood",
    tags: ["Mood Swing Queen 👑", "Always Hungry"],
    entryAnimation: "drop-table"
  },
  {
    id: "gal-10",
    photo: "/assets/photos/lock_sisters_rakhi.png",
    caption: "Festivals, tradition, and an unbreakable lifetime bond",
    aspect: "wide",
    era: "Growing Up",
    tags: ["Sweetest Human", "Lifetime Bond 💖"],
    entryAnimation: "rise-focus"
  },
  {
    id: "gal-11",
    photo: "/assets/photos/sleeping_earphones.png",
    caption: "Drifting to sleep with music playing softly",
    aspect: "square",
    era: "Teen",
    tags: ["Nautanki 👀", "Peaceful Dreamer"],
    entryAnimation: "memory-pop"
  },
  {
    id: "gal-12",
    photo: "/assets/photos/stylish_solo.jpg",
    caption: "Full of confidence, radiance, and impeccable style",
    aspect: "tall",
    era: "Teen",
    tags: ["Heroine ✨", "Miss Perfect"],
    entryAnimation: "slide-right"
  }
];

export const videoMemories = [
  {
    id: "vid-1",
    title: "The Uncontrollable Giggles",
    thumbnail: "/assets/photos/cake_celebration.jpg",
    videoSrc: "/assets/videos/memory1.mp4",
    duration: "0:24",
    caption: "We couldn't stop laughing for 10 straight minutes over absolutely nothing."
  },
  {
    id: "vid-2",
    title: "Family Boat Trip",
    thumbnail: "/assets/photos/family_lake_trip.png",
    videoSrc: "/assets/videos/memory2.mp4",
    duration: "0:36",
    caption: "Breezy afternoon on the water, laughing and enjoying the view together."
  },
  {
    id: "vid-3",
    title: "Blowing Out the Birthday Candles",
    thumbnail: "/assets/photos/canon_portrait.png",
    videoSrc: "/assets/videos/memory3.mp4",
    duration: "0:18",
    caption: "Making a big wish and smiling that genuine, heart-melting smile."
  }
];

export const littleThingsCards = [
  {
    id: "lt-1",
    title: "The laughs",
    subtitle: "The kind that make your stomach hurt",
    description: "Those inside jokes nobody else in the universe will ever understand. Just one look across the room and we both lose our composure.",
    icon: "Smile",
    accent: "gold"
  },
  {
    id: "lt-2",
    title: "The random moments",
    subtitle: "Sleeping in the car on long roadtrips",
    description: "Resting your head on the seat, falling fast asleep while the radio played soft songs. Peaceful, effortless moments that I'll cherish forever.",
    icon: "Compass",
    accent: "rose"
  },
  {
    id: "lt-3",
    title: "The fights",
    subtitle: "Over the TV remote and the last slice",
    description: "Drama that lasted exactly five minutes before we were sharing memes and pretending it never happened.",
    icon: "Flame",
    accent: "gold"
  },
  {
    id: "lt-4",
    title: "The little victories",
    subtitle: "Cheering for you always",
    description: "Passing that exam, scoring that goal, learning a new song, or just having the courage to try something scary. I was always cheering the loudest.",
    icon: "Trophy",
    accent: "rose"
  },
  {
    id: "lt-5",
    title: "The chaos",
    subtitle: "Curling up on chairs & late night talks",
    description: "Sitting awkwardly with legs tucked in, laughing at random internet videos until 3 in the morning.",
    icon: "Sparkles",
    accent: "gold"
  },
  {
    id: "lt-6",
    title: "The moments nobody planned",
    subtitle: "The unscripted masterpieces",
    description: "Sitting quietly side-by-side doing nothing at all, listening to the rain, feeling safe and understood without a single word.",
    icon: "Heart",
    accent: "rose"
  }
];
