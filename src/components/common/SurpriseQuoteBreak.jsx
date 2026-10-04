import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import './SurpriseQuoteBreak.css';

export default function SurpriseQuoteBreak({
  bgPhoto = "/assets/photos/real_baby_smile.png",
  line1 = "Wait...",
  line2 = "why did you grow up so fast?",
  punchline = "I wasn't ready. 🥺",
  type = "emotional", // "emotional", "interruption", "magical"
  subtleQuote = "YOU WILL ALWAYS BE YOU" // Requirement 10: background large low-opacity quote
}) {
  return (
    <section className={`surprise-quote-break-section type-${type}`}>
      {/* Background Photo Layer with Parallax & Dark Cinematic Overlay */}
      <div 
        className="surprise-bg-photo-layer"
        style={{ backgroundImage: `url(${bgPhoto})` }}
      />
      <div className="surprise-dark-overlay" />
      <div className="surprise-film-grain" />

      {/* Requirement 10: Editorial Background Quote Layer with very low opacity */}
      {subtleQuote && (
        <div className="surprise-background-giant-text font-serif">
          {subtleQuote}
        </div>
      )}

      {/* Foreground Content */}
      <div className="surprise-content-container">
        <motion.div
          className="surprise-text-box glass-panel"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {type === 'interruption' && (
            <div className="interruption-warning-pill font-sans">
              <Sparkles size={13} className="text-gold" />
              <span>OFFICIAL SIBLING BULLETIN</span>
              <Sparkles size={13} className="text-gold" />
            </div>
          )}

          {line1 && (
            <motion.p
              className="surprise-line-1 font-editorial"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {line1}
            </motion.p>
          )}

          {line2 && (
            <motion.h2
              className="surprise-line-2 font-serif text-gold-gradient"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              {line2}
            </motion.h2>
          )}

          {punchline && (
            <motion.p
              className="surprise-punchline font-handwriting"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.9 }}
            >
              "{punchline}"
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
