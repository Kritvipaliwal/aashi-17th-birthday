import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowDown, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import MemoryImage from '../common/MemoryImage';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './CinematicIntro.css';

// Film strip images entering from the edges (Panel 4)
const filmStripLeft = [
  { id: 'fl-1', src: '/assets/photos/real_baby_smile.png', year: '01' },
  { id: 'fl-2', src: '/assets/photos/real_toddler.png', year: '03' },
  { id: 'fl-3', src: '/assets/photos/shawl_bun.png', year: '05' },
  { id: 'fl-4', src: '/assets/photos/lock_sisters_rakhi.png', year: '07' }
];

const filmStripRight = [
  { id: 'fr-1', src: '/assets/photos/sleeping_car.png', year: '09' },
  { id: 'fr-2', src: '/assets/photos/chair_curled.jpg', year: '11' },
  { id: 'fr-3', src: '/assets/photos/night_walk_sisters.png', year: '14' },
  { id: 'fr-4', src: '/assets/photos/black_dress.png', year: '17' }
];

export default function CinematicIntro({ onComplete }) {
  const [step, setStep] = useState(1);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(2), 2800),  // "Some are measured in memories."
      setTimeout(() => setStep(3), 5600),  // "This one is both."
      setTimeout(() => setStep(4), 8400),  // "17 YEARS OF MEMORIES" + Grand Visual Reveal
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="cinematic-intro-wrapper">
      {/* 1. Full-Screen Cinematic Real Photo Background with Ken Burns Zoom & Warm Light Leak (Panel 4) */}
      <CinematicPhotoBackground
        src={birthdayConfig.heroPhoto || '/assets/photos/canon_portrait.png'}
        alt="Aashi 17 Years Memory Film"
        opacity={0.32}
        blur="3px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 40%, rgba(18, 12, 22, 0.72) 0%, rgba(8, 6, 10, 0.9) 70%, rgba(4, 3, 5, 0.98) 100%)"
      />

      {/* Floating Stardust Particles */}
      <div className="intro-stars-layer">
        {Array.from({ length: 28 }).map((_, i) => (
          <div 
            key={i} 
            className="intro-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
              opacity: 0.2 + Math.random() * 0.6
            }}
          />
        ))}
      </div>

      {/* 2. Vintage Film Strips Entering From Left and Right Borders (Panel 4) */}
      <motion.div 
        className="intro-film-strip strip-left"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 0.85 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <div className="film-strip-spine">
          {filmStripLeft.map(item => (
            <div key={item.id} className="film-frame-cell">
              <div className="film-perf-holes">
                <span className="perf" /><span className="perf" /><span className="perf" />
              </div>
              <div className="film-cell-media">
                <img src={item.src} alt={`Year ${item.year}`} />
              </div>
              <div className="film-cell-stamp font-sans">YR {item.year}</div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="intro-film-strip strip-right"
        initial={{ x: 120, opacity: 0 }}
        animate={{ x: 0, opacity: 0.85 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        <div className="film-strip-spine">
          {filmStripRight.map(item => (
            <div key={item.id} className="film-frame-cell">
              <div className="film-perf-holes">
                <span className="perf" /><span className="perf" /><span className="perf" />
              </div>
              <div className="film-cell-media">
                <img src={item.src} alt={`Year ${item.year}`} />
              </div>
              <div className="film-cell-stamp font-sans">YR {item.year}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 3. Center Narrative Stage */}
      <div className="intro-center-stage">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.p
              key="step-1"
              className="intro-line font-editorial"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.2 }}
            >
              "Some stories are measured in years."
            </motion.p>
          )}

          {step === 2 && (
            <motion.p
              key="step-2"
              className="intro-line font-editorial"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 1.2 }}
            >
              "Some are measured in memories."
            </motion.p>
          )}

          {step === 3 && (
            <motion.p
              key="step-3"
              className="intro-line font-editorial intro-line-emphasis"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2 }}
            >
              "This one is both."
            </motion.p>
          )}

          {step >= 4 && (
            <motion.div
              key="step-4"
              className="intro-monumental-reveal"
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="intro-badge">
                <Sparkles size={14} className="text-gold" />
                <span>SEVENTEEN YEARS &bull; FOREVER LOVED</span>
                <Sparkles size={14} className="text-gold" />
              </div>

              {/* Title exact from Panel 4 */}
              <h1 className="intro-monument font-serif text-gold-gradient">
                17 YEARS<br />OF MEMORIES
              </h1>

              <div className="intro-heart-symbol">
                <Heart size={20} className="text-rose" fill="#df587a" />
              </div>

              {/* Central Framed Real Photograph */}
              <div className="intro-photo-frame-wrap">
                <div className="intro-photo-frame">
                  <div className="intro-frame-glow" />
                  <MemoryImage
                    src={birthdayConfig.heroPhoto}
                    alt={birthdayConfig.name}
                    placeholderText={`${birthdayConfig.name} at Seventeen`}
                    subtitle="Seventeen Years of Grace"
                    className="intro-photo"
                    priority={true}
                  />
                </div>
                <div className="intro-photo-caption">
                  <span className="font-handwriting">Still the same little girl &hearts;</span>
                </div>
              </div>

              <motion.button
                className="btn-cinema enter-story-btn"
                onClick={onComplete}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <span>Step Into Her Story</span>
                <ArrowDown size={16} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skip button in top corner */}
      <button 
        type="button" 
        className="intro-skip-btn"
        onClick={onComplete}
      >
        <span>Skip to Story &rarr;</span>
      </button>
    </div>
  );
}
