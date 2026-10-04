import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, X, Heart, Sparkles } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import './SecretEasterEgg.css';

export default function SecretEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="easter-egg-wrapper">
      {/* Tiny Glowing Star */}
      <button
        type="button"
        className="easter-egg-star-btn"
        onClick={() => setIsOpen(true)}
        title="A hidden spark..."
        aria-label="Secret Easter Egg"
      >
        <Star size={16} className="easter-egg-star-icon" fill="currentColor" />
        <span className="star-pulse-ring" />
      </button>

      {/* Secret Handwritten Note Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="secret-note-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="secret-note-letter"
              initial={{ scale: 0.85, y: 30, rotate: -2 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="secret-note-close"
                onClick={() => setIsOpen(false)}
                aria-label="Close secret note"
              >
                <X size={18} />
              </button>

              <div className="secret-note-stamp">
                <Sparkles size={16} className="text-gold" />
                <span>CONFIDENTIAL &bull; FOR YOUR EYES ONLY</span>
              </div>

              <h3 className="secret-note-lead font-editorial">
                "You found something I didn't tell everyone..."
              </h3>

              <div className="secret-note-divider" />

              <p className="secret-note-text font-handwriting">
                {birthdayConfig.secretMessage}
              </p>

              <div className="secret-note-signature">
                <span className="sign-heart"><Heart size={16} fill="currentColor" /></span>
                <span className="sign-text font-handwriting">Always & Forever</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
