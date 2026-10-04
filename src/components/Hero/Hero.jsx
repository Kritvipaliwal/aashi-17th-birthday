import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, ChevronDown, X, ZoomIn, Star } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import MemoryImage from '../common/MemoryImage';
import MemoryTag from '../common/MemoryTag';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import CuteAashiZoom from '../common/CuteAashiZoom';
import './Hero.css';

// 10 Surrounding Floating Photographs with personality tags and individual animations (Panel 5)
const surroundingPhotos = [
  {
    id: "fl-1",
    src: "/assets/photos/real_baby_smile.png",
    alt: "Little Baby Smile",
    tag: "Chhoti Si Shaitaan",
    tagVariant: "sticker",
    positionClass: "pos-top-left",
    initial: { opacity: 0, x: -70, rotate: -8 },
    animate: { opacity: 1, x: 0, rotate: -4 },
    delay: 0.7,
    floatDuration: 5.2,
    yRange: [-6, 6, -6],
    rotRange: [-4, -1, -4]
  },
  {
    id: "fl-2",
    src: "/assets/photos/shawl_bun.png",
    alt: "Shawl & Hair Bun",
    tag: "Mood Swing Queen 👑",
    tagVariant: "tape",
    positionClass: "pos-top-right",
    initial: { opacity: 0, y: -60, rotate: 6 },
    animate: { opacity: 1, y: 0, rotate: 3 },
    delay: 0.85,
    floatDuration: 6.0,
    yRange: [-5, 7, -5],
    rotRange: [3, 6, 3]
  },
  {
    id: "fl-3",
    src: "/assets/photos/lock_sisters_rakhi.png",
    alt: "Sister Festival Bond",
    tag: "Drama Queen 🎭",
    tagVariant: "sticker",
    positionClass: "pos-mid-left",
    initial: { opacity: 0, x: -60, scale: 0.8 },
    animate: { opacity: 1, x: 0, scale: 1 },
    delay: 1.0,
    floatDuration: 5.6,
    yRange: [4, -5, 4],
    rotRange: [-3, 0, -3]
  },
  {
    id: "fl-4",
    src: "/assets/photos/stylish_solo.jpg",
    alt: "Signature Cool",
    tag: "Heroine ✨",
    tagVariant: "tape",
    positionClass: "pos-mid-right",
    initial: { opacity: 0, x: 60, rotate: 5 },
    animate: { opacity: 1, x: 0, rotate: 2 },
    delay: 1.15,
    floatDuration: 6.4,
    yRange: [-7, 4, -7],
    rotRange: [2, 5, 2]
  },
  {
    id: "fl-5",
    src: "/assets/photos/chair_curled.jpg",
    alt: "Curled on Chair",
    tag: "Mastikhor 😂",
    tagVariant: "sticker",
    positionClass: "pos-bottom-left",
    initial: { opacity: 0, y: 60, rotate: -5 },
    animate: { opacity: 1, y: 0, rotate: -2 },
    delay: 1.3,
    floatDuration: 5.8,
    yRange: [5, -6, 5],
    rotRange: [-2, 1, -2]
  },
  {
    id: "fl-6",
    src: "/assets/photos/lock_bed_phone.png",
    alt: "Phone & Snacks",
    tag: "Bhukkad 🍕",
    tagVariant: "tape",
    positionClass: "pos-bottom-mid-left",
    initial: { opacity: 0, scale: 0.7 },
    animate: { opacity: 1, scale: 1 },
    delay: 1.45,
    floatDuration: 6.8,
    yRange: [-4, 6, -4],
    rotRange: [1, -2, 1]
  },
  {
    id: "fl-7",
    src: "/assets/photos/sister_selfie.jpg",
    alt: "Sister Selfie",
    tag: "Certified Pagal",
    tagVariant: "sticker",
    positionClass: "pos-bottom-mid-right",
    initial: { opacity: 0, rotate: -12, scale: 0.8 },
    animate: { opacity: 1, rotate: 4, scale: 1 },
    delay: 1.6,
    floatDuration: 5.4,
    yRange: [6, -5, 6],
    rotRange: [4, 1, 4]
  },
  {
    id: "fl-8",
    src: "/assets/photos/black_dress.png",
    alt: "Chapter 17 Radiance",
    tag: "Main Character 🌟",
    tagVariant: "tape",
    positionClass: "pos-bottom-right",
    initial: { opacity: 0, x: 70, scale: 0.85 },
    animate: { opacity: 1, x: 0, scale: 1 },
    delay: 1.75,
    floatDuration: 6.2,
    yRange: [-5, 6, -5],
    rotRange: [-3, 1, -3]
  }
];

export default function Hero() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const scrollToNext = () => {
    const el = document.getElementById('beginning-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section" id="hero-section">
      {/* Cinematic Real Photo Background with subtle sunset warmth (Panel 5) */}
      <CinematicPhotoBackground
        src="/assets/photos/night_walk_sisters.png"
        alt="Hero background atmosphere"
        opacity={0.18}
        blur="4px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 35%, rgba(18, 12, 22, 0.72) 0%, rgba(8, 6, 10, 0.9) 70%, rgba(4, 3, 5, 0.98) 100%)"
      />

      {/* Decorative floating flowers, stars, hearts, and warm bokeh (Panel 5) */}
      <div className="hero-decorations">
        <span className="hero-decor decor-flower-1">🌸</span>
        <span className="hero-decor decor-flower-2">🌺</span>
        <span className="hero-decor decor-heart-1">💖</span>
        <span className="hero-decor decor-heart-2">✨</span>
        <span className="hero-decor decor-star-1">⭐</span>
        <span className="hero-decor decor-star-2">✨</span>
      </div>

      {/* Diagonal Film Strip behind Polaroid memories */}
      <div className="hero-film-strip-ribbon ribbon-left" />
      <div className="hero-film-strip-ribbon ribbon-right" />

      <div className="hero-container">
        {/* Top Eyebrow Badge */}
        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Sparkles size={14} className="text-gold" />
          <span>CHAPTER XVII &bull; CELEBRATING 17 YEARS</span>
          <Sparkles size={14} className="text-gold" />
        </motion.div>

        {/* Main Headline */}
        <motion.div
          className="hero-text-group"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h2 className="hero-greeting font-editorial">Happy 17th Birthday</h2>
          <h1 className="hero-name font-serif text-gold-gradient">
            {birthdayConfig.name}
          </h1>
          <p className="hero-central-motto font-editorial">
            "She grew older, but my love for her never changed."
          </p>
        </motion.div>

        {/* Floating Collage Narrative Header (Exact prompt text) */}
        <motion.div 
          className="hero-collage-narrative"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          <span className="collage-whisper font-editorial">
            "17 years of memories..."
          </span>
          <span className="collage-sub-whisper font-editorial text-gold-gradient">
            "...and somehow, it still feels like yesterday."
          </span>
        </motion.div>

        {/* Memory Collage Stage: Center Master Portrait + 8 Floating Satellites */}
        <div className="hero-collage-stage">
          {/* Central Master Portrait */}
          <motion.div
            className="hero-portrait-stage"
            initial={{ opacity: 0, scale: 0.88, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="hero-portrait-card">
              <div className="hero-aura-ring" />
              <div className="hero-portrait-media-wrap">
                <MemoryImage
                  src={birthdayConfig.heroPhoto}
                  alt={`${birthdayConfig.name}'s Portrait`}
                  placeholderText={`${birthdayConfig.name} at 17`}
                  subtitle="Seventeen Years of Wonder"
                  objectPosition="center 15%"
                  className="hero-portrait-img"
                  priority={true}
                />
              </div>
              
              <div className="hero-polaroid-label">
                <span className="label-caption font-handwriting">The 17-Year-Old You &hearts;</span>
                <span className="label-badge font-sans">OCTOBER 2026</span>
              </div>
            </div>
          </motion.div>

          {/* Surrounding Floating Memory Satellites */}
          {surroundingPhotos.map((item) => (
            <motion.div
              key={item.id}
              className={`hero-floating-card ${item.positionClass}`}
              initial={item.initial}
              animate={item.animate}
              transition={{ duration: 0.9, delay: item.delay, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedPhoto(item)}
            >
              {/* Continuous Gentle Floating Animation */}
              <motion.div
                className="floating-card-body"
                animate={{
                  y: item.yRange,
                  rotate: item.rotRange
                }}
                transition={{
                  duration: item.floatDuration,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{ 
                  scale: 1.12, 
                  zIndex: 30, 
                  boxShadow: "0 20px 45px rgba(0,0,0,0.85), 0 0 25px rgba(223, 186, 115, 0.4)",
                  transition: { duration: 0.25 }
                }}
              >
                <div className="floating-img-frame">
                  <MemoryImage
                    src={item.src}
                    alt={item.alt}
                    placeholderText={item.alt}
                    objectPosition="center 15%"
                    className="floating-thumb-img"
                  />
                  <div className="floating-img-sheen" />
                </div>

                {/* Personality Tag */}
                <MemoryTag
                  text={item.tag}
                  variant={item.tagVariant}
                  position="bottom-right"
                  rotate="-3deg"
                  delay={item.delay + 0.3}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Playful Cuteness Inspection Card */}
        <CuteAashiZoom
          title="Is Aashi looking cute on it? 🥺"
          imageSrc="/assets/photos/aashi_cute_angry.png"
          alt="Cute angry Aashi avatar"
          position="inline"
        />

        {/* Stats Row */}
        <motion.div
          className="hero-stats-row glass-panel"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="hero-stat-item">
            <span className="stat-number font-serif text-gold">17</span>
            <span className="stat-label">Years of Sunshine</span>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat-item">
            <span className="stat-number font-serif text-gold">6,209</span>
            <span className="stat-label">Days of Smiles</span>
          </div>
          <div className="stat-divider" />
          <div className="hero-stat-item">
            <span className="stat-number font-serif text-gold">&infin;</span>
            <span className="stat-label">Unconditional Love</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          className="hero-scroll-cue"
          onClick={scrollToNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
          type="button"
          aria-label="Scroll down to begin story"
        >
          <span className="scroll-cue-text">Explore Her Story</span>
          <ChevronDown className="scroll-cue-arrow" size={20} />
        </motion.button>
      </div>

      {/* Quick Inspection Popup for Floating Photos */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="hero-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="hero-modal-card glass-panel"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="hero-modal-close"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={20} />
              </button>

              <div className="hero-modal-media">
                <MemoryImage
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  placeholderText={selectedPhoto.alt}
                  fitMode="contain"
                  objectPosition="center 15%"
                  className="hero-modal-img"
                />
              </div>

              <div className="hero-modal-caption-bar">
                <span className="hero-modal-tag font-sans">{selectedPhoto.tag}</span>
                <h3 className="hero-modal-title font-editorial">"{selectedPhoto.alt}"</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
