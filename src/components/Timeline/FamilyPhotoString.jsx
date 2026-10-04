import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Users, X, ZoomIn } from 'lucide-react';
import { familyStringPhotos } from '../../data/familyMemories';
import MemoryImage from '../common/MemoryImage';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './FamilyPhotoString.css';

export default function FamilyPhotoString() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section className="family-string-section" id="family-installation">
      {/* Background: Cinematic Real Family Photo with Warm Lighting (Panel 11) */}
      <CinematicPhotoBackground
        src="/assets/photos/family_lake_trip.png"
        alt="Family Memories Background"
        opacity={0.18}
        blur="5px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(18, 12, 22, 0.78) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      <div className="family-ambient-warmth" />

      <div className="family-string-container">
        {/* Section Header */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge badge-gold">
            <Users size={13} className="text-gold" />
            <span>FAMILY ARCHIVE &bull; HANGING MEMORY LINE</span>
          </div>

          <h2 className="timeline-section-title font-serif text-gold-gradient">
            The people behind the memories ❤️
          </h2>
          <p className="timeline-sub-quote font-editorial">
            "The people who watched her grow. Where all the chaos lives."
          </p>
        </motion.div>

        {/* The Hanging Photo String Installation */}
        <div className="photo-string-installation">
          {/* Curved Realistic String / Clothesline Rope */}
          <div className="curved-string-line">
            <svg 
              className="string-svg" 
              viewBox="0 0 1200 80" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,25 Q300,55 600,60 Q900,55 1200,25" 
                fill="none" 
                stroke="rgba(223, 186, 115, 0.45)" 
                strokeWidth="2.5" 
                strokeDasharray="4 2"
              />
              <path 
                d="M0,25 Q300,55 600,60 Q900,55 1200,25" 
                fill="none" 
                stroke="rgba(255, 240, 200, 0.6)" 
                strokeWidth="1" 
              />
            </svg>
          </div>

          {/* Hanging Photos Row */}
          <div className="hanging-photos-grid">
            {familyStringPhotos.map((item, index) => (
              <motion.div
                key={item.id}
                className="hanging-photo-node"
                style={{ '--hang-tilt': item.tilt }}
                initial={{ opacity: 0, y: -70, scale: 0.85 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + (index * 0.22),
                  type: "spring",
                  stiffness: 220,
                  damping: 18
                }}
                onClick={() => setSelectedPhoto(item)}
              >
                {/* Vertical Cord Line from String to Clip */}
                <div className="string-hanger-drop" />

                {/* Wooden Clip / Metal Pin */}
                <div className={`string-clip-peg ${item.clipType}`}>
                  <span className="clip-metal-spring" />
                </div>

                {/* Hanging Polaroid Card with Natural Swing Motion */}
                <motion.div
                  className="hanging-card-wrapper"
                  whileHover={{ 
                    scale: 1.05, 
                    rotate: 0,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.85), 0 0 35px rgba(223, 186, 115, 0.35)",
                    transition: { duration: 0.3 }
                  }}
                  animate={{
                    rotate: [item.tilt, `calc(${item.tilt} + 1.8deg)`, `calc(${item.tilt} - 1.8deg)`, item.tilt]
                  }}
                  transition={{
                    duration: item.swingDuration || 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="hanging-card-inner glass-panel">
                    <div className="hanging-photo-frame">
                      <MemoryImage
                        src={item.src}
                        alt={item.title}
                        placeholderText={item.title}
                        subtitle={item.caption}
                        objectPosition="center 15%"
                        className="hanging-img"
                      />
                      <div className="hanging-photo-sheen" />
                      
                      <div className="hanging-zoom-hint">
                        <ZoomIn size={16} className="text-gold" />
                      </div>
                    </div>

                    <div className="hanging-caption-area">
                      <h4 className="hanging-title font-handwriting">{item.caption}</h4>
                      <p className="hanging-sub font-editorial">"{item.subCaption}"</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / Desktop tap hint */}
        <p className="family-string-hint font-editorial">
          ✨ Tip: Hover or tap any hanging photo to inspect and read family stories.
        </p>
      </div>

      {/* Enlarged Modal for Family Photograph */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="family-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="family-modal-content glass-panel"
              initial={{ scale: 0.8, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="family-modal-close"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>

              <div className="family-modal-media">
                <MemoryImage
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  placeholderText={selectedPhoto.title}
                  subtitle={selectedPhoto.caption}
                  objectPosition="center 15%"
                  fitMode="contain"
                  className="family-modal-img"
                />
              </div>

              <div className="family-modal-footer">
                <span className="family-badge font-sans">FAMILY MEMORY &bull; AUTHENTIC MOMENT</span>
                <h3 className="family-modal-caption font-serif">"{selectedPhoto.caption}"</h3>
                <p className="family-modal-desc font-editorial">"{selectedPhoto.subCaption}"</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
