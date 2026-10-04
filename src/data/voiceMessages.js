// src/data/voiceMessages.js
/**
 * Personal Voice Recordings Configuration
 * Real audio recordings placed throughout meaningful moments of the memory book.
 * Easily customize the audio files, titles, subtitles, and section placement here.
 */

export const voiceMessages = {
  childhood: {
    id: "childhood-message",
    audio: "/assets/audio/message-1.mp3",
    fallbackAudio: "/assets/audio/recording-3.mp3",
    title: "A little message from me",
    subtitle: "Something I wanted you to hear.",
    introText: "There's something I wish you could hear.",
    outroText: "Remember this.",
    dateTag: "CHILDHOOD MEMORY",
    section: "childhood"
  },

  poem: {
    id: "poem-message",
    audio: "/assets/audio/message-2.mp3",
    fallbackAudio: "/assets/audio/recording-3.mp3",
    title: "Before you read this...",
    subtitle: "Listen to me first.",
    introText: "Before you read this...",
    subIntroText: "Listen to me first.",
    outroText: "Now... read this.",
    dateTag: "PERSONAL LETTER PREFACE",
    section: "poem"
  },

  final: {
    id: "final-message",
    audio: "/assets/audio/message-3.mp3",
    fallbackAudio: "/assets/audio/recording-3.mp3",
    title: "One last thing...",
    subtitle: "Press play.",
    introText: "One last thing...",
    subIntroText: "Press play.",
    outroText: "Happy 17th Birthday ❤️",
    dateTag: "CHAPTER 17 SENDOFF",
    section: "final"
  }
};

export const voiceMessagesList = Object.values(voiceMessages);
