import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Sparkles, Heart } from 'lucide-react';
import { childhoodPolaroids } from '../../data/memories';
import MemoryCardFrame from '../common/MemoryCardFrame';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import VoiceMessage from '../common/VoiceMessage';
import { voiceMessages } from '../../data/voiceMessages';
import './Childhood.css';

export default function Childhood() {
  return (
    <section className="childhood-section" id="childhood-section">
      {/* Real Childhood Photo Darkened Background (Panel 7) */}
      <CinematicPhotoBackground
        src="/assets/photos/shawl_bun.png"
        alt="Childhood memories background"
        opacity={0.16}
        blur="5px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 35%, rgba(18, 12, 22, 0.76) 0%, rgba(8, 6, 10, 0.93) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      {/* Floating Ambient Stardust */}
      <div className="childhood-cosmic-dust">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="childhood-dust-dot"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 29) % 100}%`,
              animationDelay: `${(i * 0.7)}s`,
              animationDuration: `${5 + (i % 4)}s`
            }}
          />
        ))}
      </div>

      <div className="childhood-container">
        {/* Header */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge">
            <Camera size={13} className="text-gold" />
            <span>NOSTALGIA &bull; INNOCENCE &bull; POLAROID SCRAPBOOK</span>
          </div>
          <h2 className="timeline-section-title font-serif text-gold-gradient">
            "The Little Years"
          </h2>
          <p className="timeline-sub-quote font-editorial">
            "You were little then, and every single day was magic. (Click any photo to inspect)"
          </p>
        </motion.div>

        {/* Polaroid Scrapbook Grid using MemoryCardFrame with animated handmade tags */}
        <div className="polaroid-scrapbook-grid">
          {childhoodPolaroids.map((item, index) => (
            <MemoryCardFrame
              key={item.id}
              src={item.photo}
              alt={item.caption}
              caption={item.caption}
              subtitle={item.yearLabel}
              tags={item.tags || []}
              entryAnimation={item.entryAnimation || "polaroid-tilt"}
              frameStyle="polaroid"
              tilt={item.rotate}
              delay={index * 0.18}
            />
          ))}
        </div>

        {/* Childhood Personal Voice Recording (Moment 1) */}
        <motion.div 
          className="childhood-voice-envelope"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          style={{ maxWidth: '640px', margin: '45px auto 10px auto' }}
        >
          <div className="voice-emotional-preface" style={{ textAlign: 'center', marginBottom: '18px' }}>
            <span className="font-sans" style={{ fontSize: '0.72rem', letterSpacing: '0.12em', color: 'var(--gold-primary)', fontWeight: 600 }}>
              AUDIO RECORDING &bull; REAL VOICE
            </span>
            <h3 className="font-editorial text-gold-gradient" style={{ fontSize: '1.45rem', marginTop: '6px', marginBottom: '4px' }}>
              "There's something I wish you could hear."
            </h3>
          </div>

          <VoiceMessage
            id={voiceMessages.childhood.id}
            audio={voiceMessages.childhood.audio}
            fallbackAudio={voiceMessages.childhood.fallbackAudio}
            title={voiceMessages.childhood.title}
            subtitle={voiceMessages.childhood.subtitle}
            dateTag={voiceMessages.childhood.dateTag}
          />

          <p className="font-editorial" style={{ textAlign: 'center', marginTop: '16px', color: 'rgba(255, 255, 255, 0.75)', fontSize: '1.05rem', fontStyle: 'italic' }}>
            "Remember this."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
