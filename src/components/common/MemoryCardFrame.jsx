import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ZoomIn } from 'lucide-react';
import MemoryImage from './MemoryImage';
import MemoryTag from './MemoryTag';
import { photoJokes } from '../../data/quotes';
import './MemoryCardFrame.css';

// Entry Animation presets corresponding to User Requirements
const entryVariants = {
  // Effect A: Memory Pop (thrown onto table and landing softly)
  'memory-pop': {
    hidden: { opacity: 0, scale: 0.75, rotate: -5, filter: 'blur(8px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0, 
      filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 220, damping: 18 }
    }
  },
  // Animation 1: Slide from left + slight rotation
  'slide-left': {
    hidden: { opacity: 0, x: -60, rotate: -6, filter: 'blur(6px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotate: 0, 
      filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 240, damping: 20 }
    }
  },
  // Animation 2: Slide from right + slight rotation
  'slide-right': {
    hidden: { opacity: 0, x: 60, rotate: 6, filter: 'blur(6px)' },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotate: 0, 
      filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 240, damping: 20 }
    }
  },
  // Animation 3: Pop from center
  'pop-center': {
    hidden: { opacity: 0, scale: 0.5, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      scale: 1, 
      filter: 'blur(0px)',
      transition: { type: "spring", stiffness: 300, damping: 22 }
    }
  },
  // Animation 4: Drop from above like falling on a table
  'drop-table': {
    hidden: { opacity: 0, y: -70, rotate: 4, scale: 1.08 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotate: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 17 }
    }
  },
  // Animation 5: Rise from bottom with blur-to-focus
  'rise-focus': {
    hidden: { opacity: 0, y: 50, filter: 'blur(12px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  },
  // Animation 6: Polaroid-style rotation into place
  'polaroid-tilt': {
    hidden: { opacity: 0, scale: 0.85, rotate: -12 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 16 }
    }
  }
};

export default function MemoryCardFrame({
  src,
  alt = "Memory",
  caption = "",
  subtitle = "",
  tags = [], // e.g. ["Heroine ✨", "Mastikhor 😂"]
  entryAnimation = "memory-pop",
  frameStyle = "luxury", // "luxury", "polaroid", "film", "clean"
  objectPosition = "center 15%",
  tilt = "0deg",
  className = "",
  delay = 0.1
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Lookup photo-specific joke from tags
  const matchedJoke = (() => {
    if (!tags || tags.length === 0) return null;
    for (const t of tags) {
      const upper = t.toUpperCase();
      for (const [key, joke] of Object.entries(photoJokes)) {
        if (upper.includes(key)) {
          return joke;
        }
      }
    }
    return null;
  })();

  const selectedVariant = entryVariants[entryAnimation] || entryVariants['memory-pop'];

  return (
    <>
      <motion.div
        className={`memory-card-frame-container frame-style-${frameStyle} ${className}`}
        style={{ '--frame-tilt': tilt }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={selectedVariant}
        transition={{ delay }}
        whileHover={{ 
          scale: 1.03, 
          y: -6, 
          boxShadow: "0 25px 50px rgba(0,0,0,0.8), 0 0 30px rgba(223, 186, 115, 0.25)",
          transition: { duration: 0.3 } 
        }}
        onClick={() => setIsPopupOpen(true)}
      >
        {/* Frame Outer Structure */}
        <div className="memory-card-frame-inner">
          <div className="card-media-box">
            <MemoryImage
              src={src}
              alt={alt}
              placeholderText={alt}
              subtitle={subtitle}
              objectPosition={objectPosition}
              className="card-media-img"
            />
            {/* Soft Hover Zoom Prompt */}
            <div className="card-hover-prompt">
              <ZoomIn size={18} className="text-gold" />
            </div>
          </div>

          {/* Caption / Note in Polaroid Style */}
          {(caption || subtitle || matchedJoke) && (
            <div className="card-text-zone">
              {caption && <p className="card-caption font-editorial">"{caption}"</p>}
              {subtitle && <span className="card-sub-tag font-sans">{subtitle}</span>}
              {matchedJoke && (
                <span className="card-photo-joke font-handwriting">
                  "{matchedJoke}"
                </span>
              )}
            </div>
          )}
        </div>

        {/* Personality Tags Attached to the Photo */}
        {tags && tags.length > 0 && (
          <div className="card-tags-layer">
            <MemoryTag
              text={tags[0]}
              variant={frameStyle === 'polaroid' ? 'doodle' : 'sticker'}
              position="bottom-right"
              rotate="4deg"
              delay={delay + 0.35}
            />
            {tags.length > 1 && (
              <MemoryTag
                text={tags[1]}
                variant="tape"
                position="top-left"
                rotate="-6deg"
                delay={delay + 0.5}
              />
            )}
          </div>
        )}
      </motion.div>

      {/* Cinematic Photo Pop-up Modal */}
      <AnimatePresence>
        {isPopupOpen && (
          <motion.div
            className="cinematic-photo-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsPopupOpen(false)}
          >
            {/* Ambient Bokeh Particles around popup */}
            <div className="popup-ambient-particles">
              <span className="popup-particle p-1" />
              <span className="popup-particle p-2" />
              <span className="popup-particle p-3" />
            </div>

            <motion.div
              className="cinematic-photo-popup-content glass-panel"
              initial={{ scale: 0.7, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.75, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="popup-close-btn"
                onClick={() => setIsPopupOpen(false)}
                aria-label="Close photo"
              >
                <X size={20} />
              </button>

              <div className="popup-image-wrapper">
                <MemoryImage
                  src={src}
                  alt={alt}
                  placeholderText={alt}
                  subtitle={subtitle}
                  objectPosition="center 15%"
                  fitMode="contain"
                  className="popup-full-img"
                />
              </div>

              {/* Popup Details & Personality Tags */}
              <div className="popup-footer-details">
                {tags && tags.length > 0 && (
                  <div className="popup-tags-row">
                    {tags.map((t, idx) => (
                      <span key={idx} className="popup-tag-pill font-sans">{t}</span>
                    ))}
                  </div>
                )}
                {caption && <h3 className="popup-caption font-editorial">"{caption}"</h3>}
                {subtitle && <p className="popup-sub font-sans">{subtitle}</p>}
                {matchedJoke && (
                  <p className="popup-photo-joke font-handwriting">
                    &ldquo;{matchedJoke}&rdquo;
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
