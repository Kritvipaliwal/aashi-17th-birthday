import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ZoomIn, ZoomOut, X, Smile, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playCelebrationChime, playMechanicalClick } from '../../utils/soundEffects';
import './CuteAashiZoom.css';

export default function CuteAashiZoom({
  title = "Is Aashi looking cute on it? 🥺",
  imageSrc = "/assets/photos/aashi_cute_angry.png",
  alt = "Cute angry Aashi avatar",
  initialZoomed = false,
  position = "floating" // "floating" | "inline"
}) {
  const [isZoomed, setIsZoomed] = useState(initialZoomed);
  const [reactionText, setReactionText] = useState("");
  const [reactionVotes, setReactionVotes] = useState({ cute: 17, angryCute: 42 });
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (type) => {
    playCelebrationChime();
    setHasVoted(true);

    if (type === 'cute') {
      setReactionVotes(prev => ({ ...prev, cute: prev.cute + 1 }));
      setReactionText("Verdict: 1000% CUTENESS OVERLOAD! She definitely agrees! 🥺❤️");
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff4081', '#dfba73', '#ffd700', '#ffffff']
      });
    } else {
      setReactionVotes(prev => ({ ...prev, angryCute: prev.angryCute + 1 }));
      setReactionText("Verdict: Adorable Angry Baby Bird energy! Don't mess with her! 🐣🔥");
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff3b30', '#ff9500', '#dfba73']
      });
    }
  };

  const handleCardClick = () => {
    playMechanicalClick();
    setIsZoomed(true);
  };

  const closeZoom = (e) => {
    if (e) e.stopPropagation();
    setIsZoomed(false);
  };

  return (
    <>
      {/* Mini Floating Card on First Page */}
      <motion.div
        className={`cute-aashi-card ${position === 'floating' ? 'card-floating-pos' : 'card-inline-pos'}`}
        initial={{ opacity: 0, scale: 0.85, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        onClick={handleCardClick}
        title="Click to zoom in on cute Aashi!"
      >
        <div className="cute-card-glow" />
        
        {/* Playful Tag */}
        <div className="cute-badge-tag">
          <Sparkles size={11} className="text-gold" />
          <span>CUTENESS ALERT</span>
        </div>

        {/* Breathing / Zooming Image Frame */}
        <div className="cute-avatar-frame-wrap">
          <div className="cute-pulsing-aura" />
          <motion.img
            src={imageSrc}
            alt={alt}
            className="cute-avatar-img zoom-pulse"
            animate={{
              scale: [1, 1.09, 1],
              rotate: [0, -2, 2, 0]
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <div className="cute-zoom-indicator">
            <ZoomIn size={14} />
          </div>
        </div>

        {/* The Requested Text */}
        <div className="cute-card-body">
          <h4 className="cute-question-text font-serif">
            {title}
          </h4>
          <span className="cute-tap-hint font-sans">
            Tap to zoom in &hearts;
          </span>
        </div>
      </motion.div>

      {/* Expanded Zoom Modal ("Zooming it!") */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className="cute-zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeZoom}
          >
            <motion.div
              className="cute-zoom-modal glass-panel-gold"
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.7, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                className="cute-close-btn"
                onClick={closeZoom}
                title="Close Zoom"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              <div className="modal-header">
                <div className="modal-pill font-sans">
                  <Sparkles size={13} className="text-gold" />
                  <span>SPECIAL MOOD SCAN</span>
                </div>
                <h3 className="modal-title font-serif text-gold-gradient">
                  {title}
                </h3>
              </div>

              {/* Big High-Impact Zoomed Image */}
              <div className="modal-zoom-display">
                <div className="display-spotlight" />
                <motion.img
                  src={imageSrc}
                  alt={alt}
                  className="modal-hero-img"
                  initial={{ scale: 0.9 }}
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <div className="angry-eyebrow-tag font-handwriting">
                  "Look at those tiny angry cute eyebrows!" 🥺😡❤️
                </div>
              </div>

              {/* Interactive Cute Voting Buttons */}
              <div className="modal-vote-section">
                <p className="vote-prompt font-editorial">
                  Cast your vote on her official cuteness meter:
                </p>

                <div className="vote-buttons-row">
                  <button
                    type="button"
                    className="vote-btn btn-cute font-sans"
                    onClick={() => handleVote('cute')}
                  >
                    <Heart size={16} fill="#ff4081" className="text-rose" />
                    <span>YES! Cutest Baby Ever ({reactionVotes.cute})</span>
                  </button>

                  <button
                    type="button"
                    className="vote-btn btn-angry font-sans"
                    onClick={() => handleVote('angryCute')}
                  >
                    <Flame size={16} className="text-gold" />
                    <span>Angry Cute Bird ({reactionVotes.angryCute})</span>
                  </button>
                </div>

                {reactionText && (
                  <motion.div
                    className="reaction-banner font-editorial"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Smile size={16} className="text-gold" />
                    <span>{reactionText}</span>
                  </motion.div>
                )}
              </div>

              {/* Dismiss hint */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="modal-dismiss-btn font-sans"
                  onClick={closeZoom}
                >
                  <ZoomOut size={14} />
                  <span>Done Zooming (Back to Vault)</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
