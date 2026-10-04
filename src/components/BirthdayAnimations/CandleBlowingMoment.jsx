import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Wind, RotateCcw, ChevronDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import MemoryImage from '../common/MemoryImage';
import MemoryTag from '../common/MemoryTag';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import { playCandleBlow, playCelebrationChime } from '../../utils/soundEffects';
import './CandleBlowingMoment.css';

export default function CandleBlowingMoment() {
  // Phase 0: "One more thing..."
  // Phase 1: "Make a wish..." + Photo emerges from darkness
  // Phase 2: Candle flames gently flicker
  // Phase 3: Breeze moves across, flames extinguish, smoke rises
  // Phase 4: Brief darkness, "17." appears
  // Phase 5: Light burst, confetti, "Happy 17th Birthday ❤️", "Chapter 17 begins"
  const [phase, setPhase] = useState(0);
  const [flamesActive, setFlamesActive] = useState(true);

  const startSequence = () => {
    setPhase(0);
    setFlamesActive(true);

    const t1 = setTimeout(() => setPhase(1), 1600); // "Make a wish..."
    const t2 = setTimeout(() => setPhase(2), 3800); // Flames flicker
    const t3 = setTimeout(() => {
      setPhase(3); // Breeze blows candles out
      setFlamesActive(false);
      playCandleBlow();
    }, 6200);
    const t4 = setTimeout(() => setPhase(4), 8500); // "17."
    const t5 = setTimeout(() => {
      setPhase(5); // Celebratory light burst & confetti
      playCelebrationChime();
      triggerCandleConfetti();
    }, 11000);

    return [t1, t2, t3, t4, t5];
  };

  useEffect(() => {
    const timers = startSequence();
    return () => timers.forEach(clearTimeout);
  }, []);

  const triggerCandleConfetti = () => {
    const count = 180;
    const defaults = { origin: { y: 0.7 } };
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.5),
      spread: 60,
      colors: ['#dfba73', '#f2a7b8', '#ffd700', '#ffffff'],
      origin: { x: 0.2, y: 0.65 }
    });
    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.5),
      spread: 60,
      colors: ['#dfba73', '#f2a7b8', '#ffd700', '#ffffff'],
      origin: { x: 0.8, y: 0.65 }
    });
  };

  const handleReplay = () => {
    startSequence();
  };

  const scrollToPoem = () => {
    const el = document.getElementById('poem-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={`candle-blowing-section phase-${phase}`} id="candle-moment">
      {/* Real Cake Photo as Cinematic Atmospheric Background (Panel 14) */}
      <CinematicPhotoBackground
        src="/assets/photos/cake_celebration.jpg"
        alt="Candle Celebration Atmosphere"
        opacity={phase === 4 ? 0.08 : 0.22}
        blur="6px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 40%, rgba(20, 14, 18, 0.72) 0%, rgba(8, 6, 10, 0.92) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      {/* Floating Warm Candle Bokeh Particles */}
      <div className="candle-warm-bokeh-container">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className={`candle-bokeh-particle b-${i % 4}`}
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 27) % 95}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      {/* Background Darkening & Ambient Candle Glow */}
      <div className={`candle-moment-atmosphere ${phase >= 1 ? 'dimmed' : ''}`}>
        {flamesActive && <div className="candle-ambient-warmth" />}
      </div>

      <div className="candle-moment-container">
        {/* Phase 0: "One more thing..." Preface */}
        <AnimatePresence>
          {phase === 0 && (
            <motion.div
              className="candle-preface-overlay"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles size={20} className="text-gold mb-2" />
              <h3 className="candle-preface-text font-editorial">
                "One more thing..."
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Phase 1–5: The Authentic Photograph Stage */}
        <motion.div
          className={`candle-photo-stage ${phase >= 1 ? 'photo-visible' : 'photo-hidden'}`}
          initial={{ opacity: 0, y: 70, scale: 0.88, filter: 'blur(12px)' }}
          animate={{ 
            opacity: phase >= 1 ? 1 : 0, 
            y: phase >= 1 ? 0 : 70, 
            scale: phase >= 1 ? 1 : 0.88, 
            filter: phase >= 1 ? 'blur(0px)' : 'blur(12px)',
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
          }}
        >
          <div className="candle-photo-card glass-panel">
            {/* Candlelight Glow & Flicker Halo around the cake candles */}
            {flamesActive && (
              <>
                <div className="candle-flame-aura" />
                <div className="candle-spark-particles">
                  <span className="candle-spark s-1" />
                  <span className="candle-spark s-2" />
                  <span className="candle-spark s-3" />
                  <span className="candle-spark s-4" />
                </div>
              </>
            )}

            {/* Phase 3 Breeze & Smoke Wisps when candles blow out */}
            {phase === 3 && (
              <motion.div
                className="candle-blow-breeze-streak"
                initial={{ x: -120, opacity: 0 }}
                animate={{ x: 120, opacity: [0, 1, 0] }}
                transition={{ duration: 1.4 }}
              >
                <Wind size={28} className="text-gold" />
              </motion.div>
            )}

            {!flamesActive && (
              <div className="candle-smoke-wisps">
                <span className="smoke-wisp w-1" />
                <span className="smoke-wisp w-2" />
                <span className="smoke-wisp w-3" />
              </div>
            )}

            <div className="candle-photo-media">
              <MemoryImage
                src="/assets/photos/cake_celebration.jpg"
                alt="17th Birthday Cake Celebration"
                placeholderText="17th Birthday Candle"
                subtitle="The Birthday Wish"
                objectPosition="center 15%"
                className="candle-photo-img"
                priority={true}
              />
            </div>

            {/* Personality Tags */}
            <MemoryTag
              text="Bhukkad 🍕"
              variant="sticker"
              position="top-right"
              rotate="5deg"
              delay={0.6}
            />
            <MemoryTag
              text="Heroine ✨"
              variant="tape"
              position="bottom-left"
              rotate="-4deg"
              delay={0.8}
            />

            <div className="candle-card-banner">
              <span className="font-handwriting">The 17th Birthday Wish &hearts;</span>
              <span className="candle-card-badge">AUTHENTIC CELEBRATION</span>
            </div>
          </div>
        </motion.div>

        {/* Narrative Text Sequence */}
        <div className="candle-moment-narrative">
          <AnimatePresence mode="wait">
            {phase === 1 && (
              <motion.p
                key="wish"
                className="candle-narrative-line font-editorial text-gold-gradient"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8 }}
              >
                "Make a wish..."
              </motion.p>
            )}

            {phase === 2 && (
              <motion.p
                key="hold"
                className="candle-narrative-line font-editorial"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                "Close your eyes..."
              </motion.p>
            )}

            {phase === 3 && (
              <motion.p
                key="blow"
                className="candle-narrative-line font-handwriting text-rose"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                *blows candles* 🌬️✨
              </motion.p>
            )}

            {phase === 4 && (
              <motion.div
                key="seventeen"
                className="candle-narrative-group"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="candle-giant-num font-serif text-gold-gradient">17.</div>
              </motion.div>
            )}

            {phase >= 5 && (
              <motion.div
                key="happy17"
                className="candle-grand-reveal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <h3 className="candle-birthday-wish font-serif">
                  Happy 17th Birthday <Heart size={24} className="text-rose heart-pulse-icon" fill="#df587a" />
                </h3>
                <p className="candle-chapter-tag font-sans">
                  CHAPTER 17 BEGINS
                </p>
                <p className="candle-sub-promise font-editorial">
                  "And somehow... you're 17 now."
                </p>

                {/* Replay & Continue Controls */}
                <div className="candle-controls-row">
                  <button
                    type="button"
                    className="btn-cinema"
                    onClick={handleReplay}
                  >
                    <RotateCcw size={15} />
                    <span>Relive The Wish</span>
                  </button>

                  <button
                    type="button"
                    className="btn-cinema btn-candle-next"
                    onClick={scrollToPoem}
                  >
                    <span>Read The Letter</span>
                    <ChevronDown size={15} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
