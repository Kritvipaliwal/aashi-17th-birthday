// src/utils/poemReader.js
// Tender, emotional speech synthesis narration for the birthday poem

let currentUtterance = null;

/**
 * Find the warmest, most natural voice available in the browser
 */
export function getBestPoeticVoice() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Prioritize premium, natural-sounding English voices
  const preferredNames = [
    'Google UK English Female',
    'Microsoft Aria Online (Natural)',
    'Microsoft Jenny Online (Natural)',
    'Google US English',
    'Samantha',
    'Victoria',
    'Karen',
    'Zira'
  ];

  for (const name of preferredNames) {
    const found = voices.find(v => v.name.includes(name) || v.voiceURI.includes(name));
    if (found) return found;
  }

  // Fallback to any English female or gentle voice
  const englishFemale = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Female') || v.name.includes('Woman')));
  if (englishFemale) return englishFemale;

  // Fallback to any English voice
  const englishVoice = voices.find(v => v.lang.startsWith('en'));
  return englishVoice || voices[0];
}

/**
 * Speak a line of the poem with soft, gentle emotional cadence
 */
export function speakPoemLine(text, onEnd) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  // Clean text from emojis for speech synthesis
  const cleanText = text.replace(/[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|❤️|📸|🎂|👑|🌸|📸/gu, '').trim();
  if (!cleanText) {
    if (onEnd) onEnd();
    return;
  }

  try {
    window.speechSynthesis.cancel(); // Stop previous utterance cleanly

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voice = getBestPoeticVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Tender, contemplative poetic cadence
    utterance.rate = 0.88; // Slightly slower for warmth
    utterance.pitch = 1.05; // Gentle, warm tone
    utterance.volume = 0.95;

    utterance.onend = () => {
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      currentUtterance = null;
      if (onEnd) onEnd();
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn("Speech synthesis error:", err);
    if (onEnd) onEnd();
  }
}

/**
 * Stop any current speech
 */
export function stopPoemSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}
