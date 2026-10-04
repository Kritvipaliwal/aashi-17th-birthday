import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, Crown, Heart } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import MemoryImage from '../common/MemoryImage';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './Chapter17.css';

export default function Chapter17() {
  return (
    <section className="chapter17-section" id="chapter17-section">
      {/* Full-Screen Real Photo Background with Warm Sunset/Gold Lighting & Particles (Panel 10) */}
      <CinematicPhotoBackground
        src={birthdayConfig.currentBestPhoto || '/assets/photos/black_dress.png'}
        alt="Chapter 17 Sunset Background"
        opacity={0.24}
        blur="4px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(25, 16, 28, 0.72) 0%, rgba(12, 8, 16, 0.9) 70%, rgba(4, 3, 5, 0.98) 100%)"
      />

      <div className="chapter17-backdrop">
        <div className="chapter17-portal-ring" />
      </div>

      <div className="chapter17-container">
        {/* Cinematic Step-By-Step Transition */}
        <motion.div
          className="chapter17-lead-in"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 1 }}
        >
          <span className="chapter17-whisper font-editorial">
            "And then..."
          </span>
          <h2 className="chapter17-giant-title font-serif text-gold-gradient">
            Chapter 17
          </h2>
          <div className="chapter17-subtitle-group font-editorial">
            <p className="chapter17-line">"Still you."</p>
            <p className="chapter17-line">"Just older."</p>
            <p className="chapter17-line text-gold-gradient font-bold">"And so much more you."</p>
          </div>
        </motion.div>

        {/* Current Photograph Reveal Stage */}
        <motion.div
          className="chapter17-stage"
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="chapter17-card">
            {/* Glowing Golden Aura */}
            <div className="chapter17-aura" />

            <div className="chapter17-media">
              <MemoryImage
                src={birthdayConfig.currentBestPhoto}
                alt={`${birthdayConfig.name} at 17`}
                placeholderText={`${birthdayConfig.name} • 17 Years Today`}
                subtitle="The Masterpiece"
                objectPosition="center 15%"
                className="chapter17-img"
              />
            </div>

            <div className="chapter17-caption-box">
              <div className="chapter17-badge-row">
                <Crown size={15} className="text-gold" />
                <span className="chapter17-tag">THE PRESENT &bull; 17 YEARS OF LIGHT</span>
              </div>
              <h3 className="chapter17-name font-serif">{birthdayConfig.name}</h3>
              <p className="chapter17-note font-editorial">
                "You are seventeen now, but somewhere in my heart, you will always be that little girl I wanted beside me."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
