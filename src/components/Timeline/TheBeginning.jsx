import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Film, Heart } from 'lucide-react';
import { beginningMemories } from '../../data/memories';
import MemoryImage from '../common/MemoryImage';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './TheBeginning.css';

export default function TheBeginning() {
  return (
    <section className="beginning-section" id="beginning-section">
      {/* Real Baby Photo Dark Background with Ambient Warmth (Panel 6) */}
      <CinematicPhotoBackground
        src="/assets/photos/real_baby_smile.png"
        alt="Before 17 Origin Background"
        opacity={0.16}
        blur="5px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 40%, rgba(18, 12, 22, 0.75) 0%, rgba(8, 6, 10, 0.92) 75%, rgba(4, 3, 5, 0.98) 100%)"
      />

      <div className="beginning-atmosphere">
        <div className="beginning-glow" />
      </div>

      <div className="beginning-container">
        {/* Section Header */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge">
            <Film size={13} className="text-gold" />
            <span>ORIGIN &bull; THE FIRST CHAPTER</span>
          </div>
          <h2 className="timeline-section-title font-serif text-gold-gradient">
            "Before 17..."
          </h2>
          <p className="timeline-sub-quote font-editorial">
            "This is where the story began."
          </p>
        </motion.div>

        {/* Memory Table / Scrapbook Composition (Panel 6) */}
        <div className="scrapbook-memory-table">
          {/* Handwritten Note Pin (Panel 6) */}
          <motion.div 
            className="scrapbook-pinned-note"
            initial={{ opacity: 0, rotate: -6, scale: 0.85 }}
            whileInView={{ opacity: 1, rotate: -3, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="pinned-tape-top" />
            <div className="pinned-note-body">
              <span className="note-text-line font-handwriting">Tiny hands.</span>
              <span className="note-text-line font-handwriting">Big dreams.</span>
              <span className="note-text-line font-handwriting note-highlight">Same little girl.</span>
              <Heart size={16} className="text-rose note-heart" fill="#df587a" />
            </div>
            <div className="pinned-teddy-accent" title="Little Sister Days">🧸</div>
          </motion.div>

          {/* Overlapping, rotated baby/childhood photographs on memory table */}
          <div className="memory-table-photos-scatter">
            {beginningMemories.map((mem, index) => {
              const rotations = ['-4deg', '3deg', '-2.5deg'];
              const zIndexes = [10, 15, 12];
              const rot = rotations[index % rotations.length];

              return (
                <motion.div
                  key={mem.id}
                  className={`scatter-photo-card card-index-${index}`}
                  style={{ '--card-tilt': rot, zIndex: zIndexes[index % zIndexes.length] }}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: rot }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, delay: index * 0.25 }}
                  whileHover={{ 
                    scale: 1.08, 
                    rotate: '0deg', 
                    zIndex: 25,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.85), 0 0 30px rgba(223, 186, 115, 0.35)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Vintage Film Frame with Perforations */}
                  <div className="vintage-film-frame">
                    <div className="film-perforations-top">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} className="perf-hole" />
                      ))}
                    </div>

                    <div className="film-image-stage">
                      <MemoryImage
                        src={mem.photo}
                        alt={mem.title}
                        placeholderText={mem.title}
                        subtitle="Earliest memory"
                        objectPosition="center 15%"
                        className="film-photo"
                      />
                      <div className="film-leak-overlay" />
                    </div>

                    <div className="film-perforations-bottom">
                      {Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} className="perf-hole" />
                      ))}
                    </div>

                    <div className="film-details">
                      <div className="film-meta">
                        <span className="film-date font-handwriting">{mem.date}</span>
                        <Heart size={14} className="film-heart-icon" />
                      </div>
                      <h3 className="film-title font-serif">{mem.title}</h3>
                      <p className="film-caption font-editorial">"{mem.caption}"</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
