// src/data/quotes.js
/**
 * Editable Quotes, Jokes, and Scrapbook Thoughts for Aashi's 17th Birthday Website.
 * Easily add or edit personal jokes, sibling memories, and sweet thoughts here!
 */

export const quotes = [
  {
    id: "q-1",
    text: "She was supposed to grow up. Nobody said she had permission to grow this fast.",
    type: "emotional",
    author: "Big Brother / Sister",
    subtext: "Slow down time, please."
  },
  {
    id: "q-2",
    text: "17 years of being cute... and approximately 17 years of causing problems.",
    type: "funny",
    author: "Official Sibling Report",
    subtext: "Still zero regrets though."
  },
  {
    id: "q-3",
    text: "Small girl. Big attitude.",
    type: "funny",
    author: "Family Consensus",
    subtext: "From day one until forever."
  },
  {
    id: "q-4",
    text: "Some things changed with age. The drama wasn't one of them.",
    type: "funny",
    author: "Daily Observation",
    subtext: "Academy Award winner in the living room."
  },
  {
    id: "q-5",
    text: "From tiny hands... to a phone that is somehow always at 1% battery.",
    type: "funny",
    author: "Charger Mystery",
    subtext: "Where did my charger go again?"
  },
  {
    id: "q-6",
    text: "She grew up. Her appetite did too.",
    type: "funny",
    author: "The Refrigerator's Memory",
    subtext: "First to reach the snack cupboard."
  },
  {
    id: "q-7",
    text: "Proof that being the main character was a full-time job.",
    type: "teasing",
    author: "Living Room Paparazzi",
    subtext: "Always ready for the spotlight."
  },
  {
    id: "q-8",
    text: "Cute since day one. Annoying since approximately day two.",
    type: "funny",
    author: "Lifetime Fact",
    subtext: "Wouldn't trade it for anything."
  },
  {
    id: "q-9",
    text: "17 years. Still stealing everyone's attention.",
    type: "magical",
    author: "Every Single Room She Enters",
    subtext: "The light of the family."
  },
  {
    id: "q-10",
    text: "She didn't grow up. She just upgraded.",
    type: "funny",
    author: "Version 17.0",
    subtext: "New features, same chaos."
  },
  {
    id: "q-11",
    text: "A little bit sweet. A little bit crazy. Mostly both.",
    type: "emotional",
    author: "With Love",
    subtext: "The perfect sister."
  }
];

// Photo-specific jokes mapped by personality tags
export const photoJokes = {
  "PADHAKU": "Evidence that studying occasionally happened.",
  "BHUKKAD": "No explanation required.",
  "MASTIKHOR": "The face of someone who definitely did nothing wrong.",
  "DRAMA QUEEN": "Oscar nomination pending.",
  "HEROINE": "Main character energy since day one.",
  "PROFESSIONAL TROUBLEMAKER": "Somehow, the evidence keeps disappearing.",
  "CERTIFIED PAGAL": "Ask anyone in the house, they will confirm.",
  "MOOD SWING QUEEN": "Approach with chocolate for safety.",
  "CHHOTI SI SHAITAAN": "Don't let that innocent face fool you.",
  "CAMERA KI FAVOURITE": "The camera fell in love instantly.",
  "SWEETEST HUMAN": "Even when she's stealing my french fries."
};

// Full-screen random surprises and interruptions
export const surpriseMoments = [
  {
    id: "surprise-grow-fast",
    bgPhoto: "/assets/photos/real_baby_smile.png",
    line1: "Wait...",
    line2: "why did you grow up so fast?",
    punchline: "I wasn't ready. 🥺",
    type: "emotional"
  },
  {
    id: "surprise-announcement",
    bgPhoto: "/assets/photos/family_vibes.jpg",
    line1: "📢 IMPORTANT ANNOUNCEMENT",
    line2: "She is still annoying.",
    punchline: "Thank you for your attention. 😂",
    type: "interruption"
  },
  {
    id: "surprise-tiny-to-17",
    bgPhoto: "/assets/photos/canon_portrait.png",
    line1: "One minute she was tiny...",
    line2: "...and now she is 17.",
    punchline: "Time really is magic.",
    type: "magical"
  }
];

// Scrapbook doodle notes
export const scrapbookNotes = [
  { text: "LOOK AT HER 😂", arrow: "down" },
  { text: "She really thought she was innocent.", arrow: "up" },
  { text: "Signature pose since day one! ✨", arrow: "left" },
  { text: "Certified 100% drama queen 👑", arrow: "right" }
];
