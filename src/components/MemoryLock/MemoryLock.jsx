import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, AlertCircle, ArrowRight, Eye, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import { lockMemories } from '../../data/memories';
import { playMechanicalClick, playKeySuccess, playKeyError, playPortalOpen, playCelebrationChime } from '../../utils/soundEffects';
import MemoryImage from '../common/MemoryImage';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import CuteAashiZoom from '../common/CuteAashiZoom';
import './MemoryLock.css';

export default function MemoryLock({ onUnlocked }) {
  // Secret code requested: HAPPYBIRTHDAY17 (15 characters typed, unlocks all 17 memory positions)
  const secretCode = (birthdayConfig.secretCode || "HAPPYBIRTHDAY17").toUpperCase();
  const totalLength = 17; // Exactly 17 positions

  const [currentIndex, setCurrentIndex] = useState(0);
  const [unlockedItems, setUnlockedItems] = useState([]);
  const [activeMemory, setActiveMemory] = useState(null);
  const [shake, setShake] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");
  const [isFullyUnlocked, setIsFullyUnlocked] = useState(false);
  const [showPortalTransition, setShowPortalTransition] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [recentInput, setRecentInput] = useState("");

  const lockRef = useRef(null);

  // Handle character input
  const handleCharInput = (char) => {
    if (isFullyUnlocked) return;
    const inputChar = char.toUpperCase();
    setRecentInput(inputChar);

    // Expected character from HAPPYBIRTHDAY17
    const expectedChar = secretCode[currentIndex] || "1";

    playMechanicalClick();

    if (inputChar === expectedChar) {
      // Correct character!
      const nextIndex = currentIndex + 1;
      const memory = lockMemories[currentIndex] || {
        year: nextIndex,
        title: `Year ${nextIndex.toString().padStart(2, '0')}`,
        snippet: `Memory of year ${nextIndex}...`,
        photo: `/assets/photos/year${nextIndex.toString().padStart(2, '0')}.jpg`
      };

      playKeySuccess(nextIndex);
      setActiveMemory(memory);
      setErrorNotice("");

      // When the user enters the 15th character of HAPPYBIRTHDAY17 ('7'):
      // Auto-illuminate the final celebration positions to complete all 17 memory nodes!
      if (nextIndex >= secretCode.length || nextIndex >= totalLength) {
        setCurrentIndex(totalLength);
        setUnlockedItems(Array.from({ length: totalLength }, (_, i) => i));
        playCelebrationChime();
        triggerFinalUnlock();
      } else {
        setCurrentIndex(nextIndex);
        setUnlockedItems(prev => [...prev, currentIndex]);
      }
    } else {
      // Wrong character
      playKeyError();
      setShake(true);
      setErrorNotice("Not this memory... try another letter or number");
      setTimeout(() => setShake(false), 500);
    }
  };

  // Physical keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        handleCharInput(e.key);
      } else if (e.key === 'Backspace' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
        setUnlockedItems(prev => prev.slice(0, -1));
        setActiveMemory(lockMemories[currentIndex - 2] || null);
        playMechanicalClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isFullyUnlocked]);

  // Final unlock sequence
  const triggerFinalUnlock = () => {
    setIsFullyUnlocked(true);
    playPortalOpen();

    setTimeout(() => {
      setShowPortalTransition(true);
    }, 1800);

    setTimeout(() => {
      if (onUnlocked) onUnlocked();
    }, 4200);
  };

  // Instant unlock / skip for quick preview
  const handleInstantUnlock = () => {
    setCurrentIndex(totalLength);
    setUnlockedItems(Array.from({ length: totalLength }, (_, i) => i));
    triggerFinalUnlock();
  };

  // Common keyboard keys for easy mobile & mouse tapping
  const alphabetRows = [
    ['H', 'A', 'P', 'Y', 'B', 'I', 'R', 'T', 'D'],
    ['Q', 'W', 'E', 'O', 'S', 'F', 'G', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'N', 'M', '1', '7', '!']
  ];

  return (
    <div className={`memory-lock-wrapper ${showPortalTransition ? 'portal-active' : ''}`} ref={lockRef}>
      {/* Cinematic Dark Background with childhood collage & ambient gold warmth */}
      <CinematicPhotoBackground
        src="/assets/photos/real_baby_smile.png"
        alt="Childhood memory background"
        opacity={0.16}
        blur="6px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(circle at 50% 45%, rgba(14, 10, 18, 0.78) 0%, rgba(8, 6, 10, 0.95) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      {/* Ambient Starry Atmosphere & Floating Orbs */}
      <div className="lock-atmosphere">
        <div className="lock-aurora aurora-1" />
        <div className="lock-aurora aurora-2" />
        <div className="lock-particles" />
      </div>

      {/* Tiny floating photographs drifting around edges */}
      <div className="lock-floating-drifting-photos">
        <div className="drifting-thumb thumb-1">
          <img src="/assets/photos/real_toddler.png" alt="Drifting childhood memory" />
        </div>
        <div className="drifting-thumb thumb-2">
          <img src="/assets/photos/shawl_bun.png" alt="Drifting childhood memory" />
        </div>
        <div className="drifting-thumb thumb-3">
          <img src="/assets/photos/sleeping_car.png" alt="Drifting childhood memory" />
        </div>
        <div className="drifting-thumb thumb-4">
          <img src="/assets/photos/chair_curled.jpg" alt="Drifting childhood memory" />
        </div>
      </div>

      {/* Main Lock Layout with the 2 Special Framed Photos */}
      <div className="lock-page-layout">
        
        {/* Left Photo Frame on Lock Page */}
        <motion.div 
          className="lock-side-photo photo-left"
          initial={{ opacity: 0, x: -30, rotate: -4 }}
          animate={{ opacity: 1, x: 0, rotate: -3 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="lock-polaroid-card">
            <div className="lock-polaroid-media">
              <MemoryImage
                src="/assets/photos/lock_bed_phone.png"
                alt="Quiet memory"
                placeholderText="Sweet Memory"
                subtitle="Unfiltered moments"
                objectPosition="center 15%"
                className="lock-frame-img"
              />
            </div>
            <div className="lock-polaroid-note">
              <span className="font-handwriting">Quiet days & gentle smiles &hearts;</span>
              <span className="lock-photo-badge">TREASURED</span>
            </div>
          </div>
        </motion.div>

        {/* Center: The Circular Cinematic Lock & Controls */}
        <div className="lock-content">
          {/* Header Titles */}
          <motion.div 
            className="lock-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="lock-badge">
              <Sparkles size={14} className="text-gold" />
              <span>A PRIVATE DIGITAL VAULT</span>
            </div>

            <div className="lock-title-group">
              <h2 className="lock-sub-statement">17 YEARS &bull; 17 MEMORIES &bull; ONE STORY</h2>
              <h1 className="lock-main-title font-serif text-gold-gradient">
                UNLOCK {birthdayConfig.name.toUpperCase()}'S STORY
              </h1>
            </div>

            <p className="lock-instruction font-editorial">
              Enter the 17-character memory code: <strong className="text-gold">HAPPYBIRTHDAY17</strong>
            </p>

            {/* Playful First Page Zooming Card */}
            <CuteAashiZoom 
              title="Is Aashi looking cute on it? 🥺"
              imageSrc="/assets/photos/aashi_cute_angry.png"
              alt="Cute angry baby Aashi"
            />
          </motion.div>

          {/* Circular Mechanical 17-Position Lock with Real Photo Nodes */}
          <div className="circular-lock-container">
            {/* Glowing ray expansion for final unlock (Panel 3) */}
            {isFullyUnlocked && (
              <div className="final-unlock-rays-burst">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="unlock-ray" style={{ transform: `rotate(${i * 30}deg)` }} />
                ))}
              </div>
            )}

            <motion.div 
              className={`circular-dial ${shake ? 'dial-shake' : ''} ${isFullyUnlocked ? 'dial-unlocked' : ''}`}
              animate={{ rotate: isFullyUnlocked ? 360 : currentIndex * (360 / totalLength) }}
              transition={{ 
                rotate: isFullyUnlocked 
                  ? { duration: 18, repeat: Infinity, ease: "linear" } 
                  : { type: "spring", stiffness: 120, damping: 14 } 
              }}
            >
              <div className="dial-outer-track" />
              <div className="dial-inner-track" />

              {/* 17 Circular Real Photograph Nodes (Panels 1, 2, 3) */}
              {Array.from({ length: totalLength }).map((_, i) => {
                const angle = (i * (360 / totalLength)) - 90;
                const radius = 158;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                const isUnlocked = unlockedItems.includes(i) || isFullyUnlocked;
                const isCurrent = i === currentIndex && !isFullyUnlocked;
                const nodeMemory = lockMemories[i] || {};
                const charLabel = secretCode[i] || "♥";

                return (
                  <div 
                    key={i}
                    className={`lock-node-wrap ${isUnlocked ? 'unlocked' : ''} ${isCurrent ? 'current' : ''}`}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    title={`Year ${i + 1} (${charLabel})`}
                  >
                    {/* Glowing Connection Line toward center hub */}
                    {isUnlocked && <div className="connection-beam-to-center" />}

                    <div className="lock-node-circle">
                      {/* Real circular miniature photo for each year */}
                      {nodeMemory.photo && (
                        <img 
                          src={nodeMemory.photo} 
                          alt={`Year ${i + 1}`} 
                          className="node-mini-photo"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      
                      <div className="node-photo-scrim" />

                      {/* Character / Year badge */}
                      <span className="node-char-text font-serif">
                        {isUnlocked ? charLabel : (i + 1).toString().padStart(2, '0')}
                      </span>

                      {/* Golden border aura */}
                      {(isUnlocked || isCurrent) && <span className="node-glow-ring" />}
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Center Hub: Shows Progress and Status (Panels 1, 2, 3) */}
            <div className="lock-center-hub">
              <div className="hub-glass-circle">
                {isFullyUnlocked ? (
                  <motion.div 
                    className="hub-unlocked-state"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <Unlock className="hub-unlock-icon text-gold" size={38} />
                    <div className="hub-counter font-serif text-gold">17 / 17</div>
                    <div className="hub-label font-serif">17 YEARS UNLOCKED</div>
                    <div className="hub-sublabel font-editorial">THE STORY BEGINS...</div>
                  </motion.div>
                ) : (
                  <div className="hub-locked-state">
                    {/* If memory is active, show the small preview in center hub (Panel 2) */}
                    {activeMemory ? (
                      <div className="hub-memory-preview">
                        <div className="hub-memory-avatar">
                          <img src={activeMemory.photo} alt={activeMemory.title} />
                        </div>
                        <div className="hub-counter font-serif">
                          <span className="hub-current text-gold">{currentIndex.toString().padStart(2, '0')}</span>
                          <span className="hub-slash">/</span>
                          <span className="hub-total">17</span>
                        </div>
                        <span className="hub-sub-memory font-editorial">
                          Another little memory...
                        </span>
                      </div>
                    ) : (
                      <>
                        <Lock className="hub-lock-icon" size={28} />
                        <div className="hub-counter font-serif">
                          <span className="hub-current text-gold">{currentIndex.toString().padStart(2, '0')}</span>
                          <span className="hub-slash">/</span>
                          <span className="hub-total">17</span>
                        </div>
                        <div className="hub-letter-box">
                          <span className="hub-prompt-text font-editorial">
                            {currentIndex === 0 ? "UNLOCK 17 YEARS" : `YEAR ${currentIndex + 1}`}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Progress Slot Indicators (17 Stars / Character Slots) */}
          <div className="lock-slot-stars">
            {Array.from({ length: totalLength }).map((_, idx) => (
              <span 
                key={idx} 
                className={`slot-dot ${idx < currentIndex || isFullyUnlocked ? 'filled' : ''} ${idx === currentIndex ? 'active' : ''}`}
              >
                {idx < currentIndex || isFullyUnlocked ? (secretCode[idx] || "★") : "•"}
              </span>
            ))}
          </div>

          {/* Live Feedback / Memory Toast on Unlock */}
          <AnimatePresence mode="wait">
            {errorNotice && !isFullyUnlocked && (
              <motion.div 
                className="lock-alert lock-error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <AlertCircle size={16} />
                <span>{errorNotice}</span>
              </motion.div>
            )}

            {activeMemory && !isFullyUnlocked && (
              <motion.div 
                key={activeMemory.year}
                className="unlocked-memory-toast glass-panel-gold"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -15 }}
                transition={{ duration: 0.35 }}
              >
                <div className="toast-img-wrap">
                  <MemoryImage 
                    src={activeMemory.photo} 
                    alt={activeMemory.title} 
                    placeholderText={`Year ${activeMemory.year}`}
                    objectPosition="center 15%"
                    className="toast-img" 
                  />
                </div>
                <div className="toast-body">
                  <div className="toast-badge">
                    <Sparkles size={12} className="text-gold" />
                    <span>MEMORY {activeMemory.year.toString().padStart(2, '0')} UNLOCKED</span>
                  </div>
                  <h4 className="toast-title font-serif">{activeMemory.title}</h4>
                  <p className="toast-snippet font-editorial">"{activeMemory.snippet}"</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keypad for mobile & touch interaction */}
          {!isFullyUnlocked && (
            <div className="lock-keypad">
              <div className="keypad-rows">
                {alphabetRows.map((row, rIdx) => (
                  <div key={rIdx} className="keypad-row">
                    {row.map(char => (
                      <button
                        key={char}
                        className={`keypad-btn ${recentInput === char ? 'active-key' : ''}`}
                        onClick={() => handleCharInput(char)}
                        type="button"
                      >
                        {char}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              {/* Helper Controls */}
              <div className="lock-actions">
                <button 
                  type="button" 
                  className="action-btn-subtle"
                  onClick={() => setShowHint(prev => !prev)}
                >
                  <Eye size={14} />
                  <span>{showHint ? "Hide Password" : "Show Password Code"}</span>
                </button>

                <button 
                  type="button" 
                  className="action-btn-gold"
                  onClick={handleInstantUnlock}
                >
                  <span>Instant Unlock & Open Memory Book</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {showHint && (
                <motion.div 
                  className="hint-card glass-panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p>
                    <strong>Secret Code:</strong> <span className="text-gold font-bold">HAPPYBIRTHDAY17</span>
                    <br />
                    Next letter to press: <span className="text-gold font-bold">"{secretCode[currentIndex] || 'Done'}"</span>
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Right Photo Frame on Lock Page */}
        <motion.div 
          className="lock-side-photo photo-right"
          initial={{ opacity: 0, x: 30, rotate: 4 }}
          animate={{ opacity: 1, x: 0, rotate: 3 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <div className="lock-polaroid-card">
            <div className="lock-polaroid-media">
              <MemoryImage
                src="/assets/photos/lock_sisters_rakhi.png"
                alt="Two sisters together"
                placeholderText="Forever Bonded"
                subtitle="Sweet Celebrations"
                objectPosition="center 15%"
                className="lock-frame-img"
              />
            </div>
            <div className="lock-polaroid-note">
              <span className="font-handwriting">Always beside you, forever &hearts;</span>
              <span className="lock-photo-badge">UNBREAKABLE</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Portal Expansion Overlay on 17/17 */}
      {showPortalTransition && (
        <div className="portal-overlay">
          <div className="portal-vortex" />
          <div className="portal-light-burst" />
          <div className="portal-message font-serif">
            <h2>17 YEARS UNLOCKED. THE STORY BEGINS...</h2>
          </div>
        </div>
      )}
    </div>
  );
}
