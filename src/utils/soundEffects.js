// Web Audio API Synthesized Sound Effects for zero-dependency, instantaneous cinematic audio feedback

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Mechanical metallic click for the combination lock tumbler
 */
export function playMechanicalClick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(140, now);
  osc.frequency.exponentialRampToValueAtTime(38, now + 0.04);

  gain.gain.setValueAtTime(0.25, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);

  // Add subtle metallic tick
  const tickOsc = ctx.createOscillator();
  const tickGain = ctx.createGain();
  tickOsc.type = 'sine';
  tickOsc.frequency.setValueAtTime(1800, now);
  tickOsc.frequency.exponentialRampToValueAtTime(600, now + 0.02);

  tickGain.gain.setValueAtTime(0.12, now);
  tickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

  tickOsc.connect(tickGain);
  tickGain.connect(ctx.destination);

  tickOsc.start(now);
  tickOsc.stop(now + 0.025);
}

/**
 * Ascending chime when a correct character / year is unlocked
 */
export function playKeySuccess(step = 1) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const baseFreq = 320 + (step * 24); // Rises gracefully with progress
  
  [1, 1.5, 2].forEach((mult, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq * mult, now + (i * 0.03));

    gain.gain.setValueAtTime(0, now + (i * 0.03));
    gain.gain.linearRampToValueAtTime(0.12 / (i + 1), now + (i * 0.03) + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (i * 0.03) + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + (i * 0.03));
    osc.stop(now + (i * 0.03) + 0.65);
  });
}

/**
 * Gentle error tone (not harsh, gentle vintage vibration)
 */
export function playKeyError() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(110, now);
  osc.frequency.linearRampToValueAtTime(80, now + 0.12);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.16);
}

/**
 * Deep cinematic portal woosh and swell when 17th character is unlocked
 */
export function playPortalOpen() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Sub-bass swell
  const subOsc = ctx.createOscillator();
  const subGain = ctx.createGain();
  subOsc.type = 'sine';
  subOsc.frequency.setValueAtTime(45, now);
  subOsc.frequency.exponentialRampToValueAtTime(120, now + 1.2);

  subGain.gain.setValueAtTime(0.001, now);
  subGain.gain.linearRampToValueAtTime(0.3, now + 0.7);
  subGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

  subOsc.connect(subGain);
  subGain.connect(ctx.destination);
  subOsc.start(now);
  subOsc.stop(now + 2.3);

  // Shimmering harmonic sweep
  const notes = [440, 554.37, 659.25, 830.61, 987.77, 1318.51];
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const startDelay = 0.4 + (idx * 0.12);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + startDelay);

    gain.gain.setValueAtTime(0.0001, now + startDelay);
    gain.gain.linearRampToValueAtTime(0.08, now + startDelay + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + startDelay + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + startDelay);
    osc.stop(now + startDelay + 1.3);
  });
}

/**
 * Candle ignite flame whoosh
 */
export function playCandleIgnite() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(260, now);
  osc.frequency.exponentialRampToValueAtTime(520, now + 0.35);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.5);
}

/**
 * Gentle celebration pop
 */
export function playConfettiPop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [180, 240, 310].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const delay = i * 0.05;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 2, now + delay);
    osc.frequency.exponentialRampToValueAtTime(freq, now + delay + 0.1);

    gain.gain.setValueAtTime(0.15, now + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + 0.13);
  });
}

function playAudioFile(src, volume = 0.45) {
  try {
    const audio = new Audio(src);
    audio.volume = volume;
    audio.play().catch(() => {});
  } catch (e) {}
}

/**
 * Soft pop when a photograph appears
 */
export function playPhotoPop() {
  playAudioFile('/assets/audio/photo-pop.mp3', 0.35);
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(480, now);
  osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.09);
}

/**
 * Tiny paper/sticker sound when a tag appears
 */
export function playTagPop() {
  playAudioFile('/assets/audio/tag-pop.mp3', 0.25);
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
  gain.gain.setValueAtTime(0.05, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.06);
}

/**
 * Candle extinguish gentle breeze sound
 */
export function playCandleBlow() {
  playAudioFile('/assets/audio/candle.mp3', 0.4);
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.6);
  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.75);
}

/**
 * Warm celebratory chime
 */
export function playCelebrationChime() {
  playAudioFile('/assets/audio/celebration.mp3', 0.5);
  playConfettiPop();
}
