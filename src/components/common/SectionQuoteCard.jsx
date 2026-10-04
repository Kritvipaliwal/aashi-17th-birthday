import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Star, Quote } from 'lucide-react';
import './SectionQuoteCard.css';

export default function SectionQuoteCard({
  text,
  author = "",
  subtext = "",
  type = "funny", // "funny", "emotional", "magical", "teasing"
  rotate = "-1.5deg",
  className = ""
}) {
  return (
    <motion.div
      className={`section-quote-card-wrapper quote-type-${type} ${className}`}
      style={{ '--card-tilt': rotate }}
      initial={{ opacity: 0, y: 35, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ 
        scale: 1.02, 
        rotate: '0deg', 
        transition: { duration: 0.3 } 
      }}
    >
      {/* Scrapbook Washi Tape Strip */}
      <div className="quote-washi-tape" />

      {/* Decorative Doodles */}
      <div className="quote-doodle-d1">
        <Star size={14} className="text-gold" />
      </div>
      <div className="quote-doodle-d2">
        <Heart size={14} className="text-rose" />
      </div>

      <div className="quote-card-inner glass-panel">
        <Quote size={24} className="quote-mark-icon text-gold" />
        
        <p className="quote-main-text font-editorial">
          "{text}"
        </p>

        {(author || subtext) && (
          <div className="quote-footer-meta">
            {author && <span className="quote-author font-handwriting">&mdash; {author}</span>}
            {subtext && <span className="quote-subtext font-sans">{subtext}</span>}
          </div>
        )}

        {/* Playful Handwritten Stamp */}
        <div className="quote-scrapbook-stamp font-handwriting">
          {type === 'funny' ? '100% Real 😂' : type === 'emotional' ? 'From the heart ❤️' : 'Pure Truth ✨'}
        </div>
      </div>
    </motion.div>
  );
}
