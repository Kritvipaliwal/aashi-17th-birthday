import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles } from 'lucide-react';
import MemoryImage from '../common/MemoryImage';
import './SlidingMemoryTransition.css';

const ribbonPhotos = [
  { src: "/assets/photos/real_baby_smile.png", label: "Baby Smile" },
  { src: "/assets/photos/shawl_bun.png", label: "Blanket Era" },
  { src: "/assets/photos/family_lake_trip.png", label: "Family Lake Day" },
  { src: "/assets/photos/chair_curled.jpg", label: "Playful Mischief" },
  { src: "/assets/photos/night_walk_sisters.png", label: "Night Walks" },
  { src: "/assets/photos/stylish_solo.jpg", label: "Signature Style" },
  { src: "/assets/photos/canon_portrait.png", label: "Cinematic Glow" },
  { src: "/assets/photos/black_dress.png", label: "Chapter 17" }
];

export default function SlidingMemoryTransition({ label = "Moving Forward Through The Years" }) {
  // Duplicate array to enable infinite seamless scroll
  const duplicated = [...ribbonPhotos, ...ribbonPhotos];

  return (
    <div className="sliding-memory-transition-wrapper">
      <div className="transition-divider-line">
        <span className="divider-glow" />
        <div className="divider-label-pill">
          <Sparkles size={12} className="text-gold" />
          <span className="font-sans">{label}</span>
          <Sparkles size={12} className="text-gold" />
        </div>
      </div>

      <div className="sliding-ribbon-track">
        <div className="ribbon-gradient-edge left-edge" />
        <div className="ribbon-gradient-edge right-edge" />

        <div className="sliding-ribbon-content">
          {duplicated.map((item, idx) => (
            <motion.div
              key={idx}
              className="sliding-ribbon-card"
              whileHover={{ scale: 1.08, y: -6, zIndex: 10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ribbon-card-frame">
                <MemoryImage
                  src={item.src}
                  alt={item.label}
                  placeholderText={item.label}
                  subtitle="Memory Slide"
                  objectPosition="center 15%"
                  className="ribbon-img"
                />
                <div className="ribbon-card-sheen" />
              </div>
              <span className="ribbon-card-label font-handwriting">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
