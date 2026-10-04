import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, Crown, ArrowUp, Star } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import MemoryImage from '../common/MemoryImage';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import VoiceMessage from '../common/VoiceMessage';
import { voiceMessages } from '../../data/voiceMessages';
import { playConfettiPop } from '../../utils/soundEffects';
import './FinalCelebration.css';

export default function FinalCelebration() {
  const [celebrationStep, setCelebrationStep] = useState(0);

  useEffect(() => {
    // Progressive grand reveal sequence
    const timers = [
      setTimeout(() => setCelebrationStep(1), 1000), // "17 years later..."
      setTimeout(() => setCelebrationStep(2), 2800), // "And I still want you around."
      setTimeout(() => {
        setCelebrationStep(3); // HAPPY 17TH BIRTHDAY + Photo + Fireworks (Panel 16)
        fireGrandCelebration();
      }, 5000)
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const fireGrandCelebration = () => {
    playConfettiPop();

    // Elegant multi-wave gold & rose confetti
    const duration = 4.5 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);

      confetti({
        particleCount,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors: ['#dfba73', '#f2a7b8', '#ffffff', '#ffd700']
      });

      confetti({
        particleCount,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors: ['#dfba73', '#f2a7b8', '#ffffff', '#ffd700']
      });
    }, 350);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="final-celebration-section" id="celebration-section">
      {/* Real Photo Background for Final Celebration & Closing Screen (Panel 16 & 18) */}
      <CinematicPhotoBackground
        src={birthdayConfig.heroPhoto || '/assets/photos/canon_portrait.png'}
        alt="Final Celebration Background"
        opacity={0.25}
        blur="4px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(22, 14, 26, 0.72) 0%, rgba(10, 7, 14, 0.92) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      {/* Ambient Fireworks & Distant Starbursts */}
      <div className="celebration-sky-atmosphere">
        <div className="firework-burst burst-1" />
        <div className="firework-burst burst-2" />
        <div className="firework-burst burst-3" />
        <div className="grand-light-leak" />
      </div>

      <div className="celebration-content">
        {/* Step 1 & 2: Quiet Emotional Lead-in */}
        {celebrationStep < 3 ? (
          <div className="celebration-intro-stage">
            <motion.p
              key="intro-line-1"
              className="celebration-whisper font-editorial"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              "17 years later..."
            </motion.p>

            {celebrationStep >= 2 && (
              <motion.p
                key="intro-line-2"
                className="celebration-lead font-editorial text-gold-gradient"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                "And I still want you around."
              </motion.p>
            )}
          </div>
        ) : (
          /* Step 3: Grand Birthday Climax & Everlasting Final Screen (Panels 16 & 18) */
          <motion.div
            className="grand-reveal-card"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Golden 17 Emblem (Panel 16) */}
            <div className="celebration-crown-row">
              <Crown size={22} className="text-gold" />
              <div className="glowing-17-pill font-serif">17</div>
              <Crown size={22} className="text-gold" />
            </div>

            <p className="chapter-begins-line font-editorial">
              "Chapter 17 begins..."
            </p>

            <h1 className="grand-birthday-title font-serif text-gold-gradient">
              HAPPY 17TH BIRTHDAY
            </h1>
            <h2 className="grand-sister-name font-serif">
              {birthdayConfig.name.toUpperCase()}
            </h2>

            {/* Central Masterpiece Frame */}
            <div className="celebration-portrait-stage">
              <div className="portrait-outer-glow" />
              <div className="celebration-photo-frame">
                <MemoryImage
                  src={birthdayConfig.heroPhoto}
                  alt={`${birthdayConfig.name} at 17`}
                  placeholderText={`${birthdayConfig.name} at 17`}
                  subtitle="A Lifetime of Wonder"
                  objectPosition="center 15%"
                  className="celebration-img"
                  priority={true}
                />
              </div>
            </div>

            {/* Moment 3: Final Voice Message Near Celebration */}
            <motion.div 
              className="final-voice-envelope"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9 }}
              style={{ maxWidth: '640px', margin: '30px auto', width: '100%' }}
            >
              <div className="final-voice-header" style={{ textAlign: 'center', marginBottom: '14px' }}>
                <span className="font-sans text-gold" style={{ fontSize: '0.72rem', letterSpacing: '0.14em', fontWeight: 600 }}>
                  ONE LAST AUDIO MESSAGE
                </span>
                <h3 className="font-editorial text-gold-gradient" style={{ fontSize: '1.45rem', marginTop: '6px' }}>
                  "One last thing... Press play."
                </h3>
              </div>

              <VoiceMessage
                id={voiceMessages.final.id}
                audio={voiceMessages.final.audio}
                fallbackAudio={voiceMessages.final.fallbackAudio}
                title={voiceMessages.final.title}
                subtitle={voiceMessages.final.subtitle}
                dateTag={voiceMessages.final.dateTag}
                theme="gold"
              />

              <p className="font-serif text-rose" style={{ textAlign: 'center', marginTop: '16px', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.02em' }}>
                Happy 17th Birthday &hearts;
              </p>
            </motion.div>

            {/* Final Emotional Screen (Panel 18) */}
            <div className="final-screen-card glass-panel">
              <div className="final-lines font-editorial">
                <p className="final-line-1">"17 years down."</p>
                <p className="final-line-2">"A lifetime to go."</p>
                <p className="final-line-love font-serif">
                  "I love you." <Heart size={22} className="final-heart-icon text-rose" fill="#df587a" />
                </p>
              </div>

              <div className="final-birthday-blessing font-editorial">
                <h3 className="final-blessing-title font-serif text-gold-gradient">
                  Happy 17th Birthday.
                </h3>
                <p className="final-small-reason font-editorial">
                  "Not just because you're my sister,<br />
                  but because you're you."
                </p>
              </div>

              <div className="final-actions">
                <button
                  type="button"
                  className="btn-cinema"
                  onClick={scrollToTop}
                >
                  <ArrowUp size={16} />
                  <span>Revisit From The Beginning</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
