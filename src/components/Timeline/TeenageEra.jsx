import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronLeft, ChevronRight, Compass, Heart } from 'lucide-react';
import { teenageMemories } from '../../data/memories';
import MemoryImage from '../common/MemoryImage';
import MemoryTag from '../common/MemoryTag';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './TeenageEra.css';

export default function TeenageEra() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="teen-era-section" id="teen-section">
      {/* Real Photo Background for Teenage Era (Panel 9) */}
      <CinematicPhotoBackground
        src="/assets/photos/canon_portrait.png"
        alt="Teenage Era Atmosphere"
        opacity={0.16}
        blur="5px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 35%, rgba(18, 12, 22, 0.78) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      {/* Dark Ambient Light Streaks */}
      <div className="teen-ambient-atmosphere">
        <div className="teen-light-streak streak-1" />
        <div className="teen-light-streak streak-2" />
      </div>

      <div className="teen-era-container">
        {/* Header with Navigation Controls */}
        <div className="teen-header-row">
          <div>
            <div className="timeline-badge badge-dark">
              <Compass size={13} className="text-gold" />
              <span>THE GLOW UP &bull; INDEPENDENCE</span>
            </div>
            <h2 className="teen-section-title font-serif text-rose-gradient">
              "The Teenage Era"
            </h2>
            <p className="teen-sub-quote font-editorial">
              "Same you. Just a little older."
            </p>
          </div>

          <div className="teen-nav-controls">
            <button 
              type="button" 
              className="teen-nav-btn" 
              onClick={() => scroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              type="button" 
              className="teen-nav-btn" 
              onClick={() => scroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal 3D Scrolling Gallery */}
        <div className="teen-horizontal-scroll" ref={scrollRef}>
          {teenageMemories.map((card, index) => (
            <motion.div
              key={card.id}
              className="teen-3d-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ 
                y: -10, 
                rotateY: 4,
                transition: { duration: 0.3 }
              }}
            >
              <div className="teen-card-media-wrapper">
                <MemoryImage
                  src={card.photo}
                  alt={card.title}
                  placeholderText={card.title}
                  subtitle={card.subtitle}
                  objectPosition="center 15%"
                  className="teen-card-img"
                />
                <div className="teen-card-vignette" />
                <span className="teen-era-tag font-sans">{card.subtitle}</span>

                {/* Personality Tags */}
                {card.tags && card.tags.length > 0 && (
                  <MemoryTag
                    text={card.tags[0]}
                    variant="sticker"
                    position="bottom-right"
                    rotate="5deg"
                    delay={0.4}
                  />
                )}
                {card.tags && card.tags.length > 1 && (
                  <MemoryTag
                    text={card.tags[1]}
                    variant="tape"
                    position="top-left"
                    rotate="-4deg"
                    delay={0.6}
                  />
                )}
              </div>

              <div className="teen-card-info">
                <h3 className="teen-card-title font-serif">{card.title}</h3>
                <p className="teen-card-desc">{card.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Handwritten Scrapbook Quote Card (Panel 9) */}
        <motion.div 
          className="teen-scrapbook-quote-card"
          initial={{ opacity: 0, scale: 0.9, y: 25 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="scrapbook-tape-top" />
          <div className="scrapbook-card-content">
            <p className="font-handwriting quote-main">"She didn't grow up.</p>
            <p className="font-handwriting quote-highlight">She just upgraded."</p>
            <div className="scrapbook-card-footer font-sans">
              <Sparkles size={13} className="text-gold" />
              <span>VERSION 17.0 ACTIVE</span>
              <Heart size={13} className="text-rose" fill="#df587a" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
