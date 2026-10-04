import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Sparkles, ChevronRight, RotateCw, Heart } from 'lucide-react';
import MemoryImage from '../common/MemoryImage';
import MemoryTag from '../common/MemoryTag';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './MemoryPhotoStack.css';

const stackPhotos = [
  {
    id: "stack-1",
    src: "/assets/photos/real_baby_smile.png",
    alt: "Little Baby Giggles",
    caption: "The start of everything cute and chaotic.",
    tags: ["Chhoti Si Shaitaan", "Sweetest Human 💖"],
    initialRotate: -6,
    era: "Baby Days"
  },
  {
    id: "stack-2",
    src: "/assets/photos/shawl_bun.png",
    alt: "Shawl & Hair Bun",
    caption: "Cozy blankets, messy bun, and 100% drama.",
    tags: ["Mood Swing Queen 👑", "Drama Queen 🎭"],
    initialRotate: 3,
    era: "Age 5"
  },
  {
    id: "stack-3",
    src: "/assets/photos/chair_curled.jpg",
    alt: "Chair Mischief",
    caption: "Curled up plotting the next household prank.",
    tags: ["Professional Troublemaker 😂", "Certified Pagal"],
    initialRotate: -3,
    era: "Age 8"
  },
  {
    id: "stack-4",
    src: "/assets/photos/lock_bed_phone.png",
    alt: "Teen Lounging",
    caption: "Phone in hand, snacks nearby, zero regrets.",
    tags: ["Bhukkad 🍕", "Nautanki 👀"],
    initialRotate: 5,
    era: "Age 13"
  },
  {
    id: "stack-5",
    src: "/assets/photos/stylish_solo.jpg",
    alt: "Signature Cool",
    caption: "Effortlessly cool, undeniably radiant.",
    tags: ["Heroine ✨", "Miss Perfect"],
    initialRotate: -2,
    era: "Age 15"
  },
  {
    id: "stack-6",
    src: "/assets/photos/cake_celebration.jpg",
    alt: "17th Birthday Celebration",
    caption: "Seventeen years of blessing our lives.",
    tags: ["Main Character 🌟", "17 & Fabulous 🎉"],
    initialRotate: 4,
    era: "Today • 17"
  }
];

export default function MemoryPhotoStack() {
  const [photos, setPhotos] = useState(stackPhotos);
  const [spreadMode, setSpreadMode] = useState(false);

  // Cycle the top card to the bottom like shuffling an old album
  const cycleForward = () => {
    setPhotos((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  return (
    <section className="memory-stack-section">
      {/* Real Photo Background for Memory Photo Stack */}
      <CinematicPhotoBackground
        src="/assets/photos/night_walk_sisters.png"
        alt="Memory Photo Stack Background"
        opacity={0.16}
        blur="5px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(18, 12, 22, 0.78) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      <div className="memory-stack-container">
        {/* Header */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge">
            <Layers size={13} className="text-gold" />
            <span>INTERACTIVE ALBUM &bull; THE MEMORY TABLE</span>
          </div>
          <h2 className="timeline-section-title font-serif text-gold-gradient">
            The Living Photo Stack
          </h2>
          <p className="timeline-sub-quote font-editorial">
            "Like spreading family photographs onto an old wooden table. Click any photo to shuffle."
          </p>

          <div className="stack-actions-row">
            <button
              type="button"
              className="btn-cinema btn-stack-action"
              onClick={cycleForward}
            >
              <RotateCw size={15} />
              <span>Shuffle Next Memory</span>
            </button>
            <button
              type="button"
              className={`btn-cinema btn-stack-toggle ${spreadMode ? 'active-spread' : ''}`}
              onClick={() => setSpreadMode(!spreadMode)}
            >
              <Sparkles size={15} />
              <span>{spreadMode ? "Stack Album" : "Spread on Table"}</span>
            </button>
          </div>
        </motion.div>

        {/* The Table / Stack Stage */}
        <div className={`memory-table-stage ${spreadMode ? 'table-spread-view' : 'table-stacked-view'}`}>
          <div className="table-ambient-light" />

          {photos.map((item, idx) => {
            const isTop = idx === 0;
            // Offsets for natural stacking
            const rotateDeg = spreadMode 
              ? (idx - (photos.length - 1) / 2) * 5 
              : item.initialRotate;
            const xOffset = spreadMode 
              ? (idx - (photos.length - 1) / 2) * 90 
              : (idx % 2 === 0 ? idx * 4 : -idx * 4);
            const yOffset = spreadMode 
              ? (Math.abs(idx - 2) * 12) 
              : idx * 6;

            return (
              <motion.div
                key={item.id}
                layout
                className={`table-photo-card ${isTop ? 'card-on-top' : ''}`}
                style={{
                  zIndex: photos.length - idx,
                  rotate: `${rotateDeg}deg`,
                  x: xOffset,
                  y: yOffset
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 220, damping: 20 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 0,
                  zIndex: 50,
                  transition: { duration: 0.25 }
                }}
                onClick={cycleForward}
              >
                {/* Vintage Polaroid Style Border */}
                <div className="table-polaroid-inner">
                  <div className="table-photo-media">
                    <MemoryImage
                      src={item.src}
                      alt={item.alt}
                      placeholderText={item.alt}
                      subtitle={item.era}
                      objectPosition="center 15%"
                      className="table-img"
                    />
                  </div>

                  <div className="table-photo-meta">
                    <span className="table-era-badge font-sans">{item.era}</span>
                    <p className="table-caption font-editorial">"{item.caption}"</p>
                  </div>
                </div>

                {/* Personality Tags Attached */}
                {item.tags && item.tags.length > 0 && (
                  <div className="table-tags-wrap">
                    <MemoryTag
                      text={item.tags[0]}
                      variant="sticker"
                      position="top-right"
                      rotate="6deg"
                      delay={0.1}
                    />
                    {item.tags.length > 1 && (
                      <MemoryTag
                        text={item.tags[1]}
                        variant="tape"
                        position="bottom-left"
                        rotate="-5deg"
                        delay={0.2}
                      />
                    )}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="stack-tap-hint font-editorial">
          ✨ Tip: Click the cards or tap "Shuffle" to flip through each memory like a real scrapbook.
        </p>
      </div>
    </section>
  );
}
