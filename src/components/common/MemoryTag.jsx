import React from 'react';
import { motion } from 'framer-motion';
import './MemoryTag.css';

/**
 * Playful, tactile scrapbook sticker / tape label attached to photographs
 * Appears 300-500ms after the photo lands with a spring bounce.
 */
export default function MemoryTag({ 
  text, 
  variant = "sticker", // "sticker", "tape", "doodle", "stamp"
  position = "bottom-right", // "top-left", "top-right", "bottom-left", "bottom-right", "bottom-center"
  rotate = "-4deg",
  delay = 0.4
}) {
  if (!text) return null;

  return (
    <motion.div
      className={`memory-tag-wrapper tag-pos-${position} tag-variant-${variant}`}
      style={{ '--tag-rotate': rotate }}
      initial={{ opacity: 0, scale: 0.3, y: 12, rotate: 0 }}
      whileInView={{ 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        rotate: rotate,
        transition: {
          type: "spring",
          stiffness: 380,
          damping: 18,
          delay: delay
        }
      }}
      viewport={{ once: true }}
      whileHover={{ 
        scale: 1.15, 
        rotate: '0deg',
        transition: { type: "spring", stiffness: 400, damping: 15 } 
      }}
    >
      <div className="memory-tag-inner">
        {variant === "tape" && <div className="tape-texture-line" />}
        <span className="memory-tag-text font-sans">{text}</span>
        {variant === "stamp" && <div className="stamp-serration" />}
      </div>
    </motion.div>
  );
}
