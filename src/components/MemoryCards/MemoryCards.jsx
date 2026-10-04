import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Smile, Compass, Flame, Trophy, Heart } from 'lucide-react';
import { littleThingsCards } from '../../data/memories';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './MemoryCards.css';

const iconMap = {
  Smile: Smile,
  Compass: Compass,
  Flame: Flame,
  Trophy: Trophy,
  Sparkles: Sparkles,
  Heart: Heart
};

export default function MemoryCards() {
  return (
    <section className="little-things-section" id="little-things-section">
      {/* Real Photo Background for The Little Things Section */}
      <CinematicPhotoBackground
        src="/assets/photos/lock_bed_phone.png"
        alt="The Little Things Atmosphere"
        opacity={0.16}
        blur="5px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(18, 12, 22, 0.78) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      <div className="little-things-container">
        {/* Section Header */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge">
            <Heart size={13} className="text-gold" />
            <span>UNSCRIPTED &bull; THE ESSENCE OF US</span>
          </div>
          <h2 className="timeline-section-title font-serif text-gold-gradient">
            The Little Things
          </h2>
          <p className="timeline-sub-quote font-editorial">
            "It was never just the big milestones. It was all the little moments in between."
          </p>
        </motion.div>

        {/* 3D Tilt Cards Grid */}
        <div className="little-things-grid">
          {littleThingsCards.map((card, index) => {
            const IconComponent = iconMap[card.icon] || Sparkles;

            return (
              <motion.div
                key={card.id}
                className="tilt-card-wrapper"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{
                  y: -8,
                  rotateX: 3,
                  rotateY: index % 2 === 0 ? 3 : -3,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={`little-card glass-panel card-accent-${card.accent}`}>
                  <div className="little-card-header">
                    <div className="little-icon-badge">
                      <IconComponent size={20} className="little-icon" />
                    </div>
                    <span className="little-card-tag font-sans">{card.title}</span>
                  </div>

                  <h3 className="little-card-title font-serif">{card.subtitle}</h3>
                  <p className="little-card-desc font-editorial">"{card.description}"</p>

                  <div className="little-card-corner-star">
                    <Sparkles size={12} className="text-gold" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
