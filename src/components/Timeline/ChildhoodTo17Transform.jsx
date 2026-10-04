import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Heart, Play, Pause } from 'lucide-react';
import MemoryImage from '../common/MemoryImage';
import MemoryTag from '../common/MemoryTag';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './ChildhoodTo17Transform.css';

const transformationStages = [
  {
    stage: 1,
    title: "Baby Steps & Little Giggles",
    age: "Little Girl",
    photo: "/assets/photos/real_baby_smile.png",
    subtitle: "When the story first started",
    tag: "Chhoti Si Shaitaan",
    narrative: "When you were little, everything was tiny, fragile, and pure magic."
  },
  {
    stage: 2,
    title: "The Shawl & Blanket Era",
    age: "Toddler Years",
    photo: "/assets/photos/shawl_bun.png",
    subtitle: "Messy hair & boundless laughter",
    tag: "Mood Swing Queen 👑",
    narrative: "Wrapped up tight in your cozy world, curious about every sound."
  },
  {
    stage: 3,
    title: "Inseparable Festivals & Bonds",
    age: "Growing Child",
    photo: "/assets/photos/lock_sisters_rakhi.png",
    subtitle: "Two sisters, forever linked",
    tag: "Sweetest Human 💖",
    narrative: "Laughing together through every festival, making childhood unforgettable."
  },
  {
    stage: 4,
    title: "Confidence & Finding Her Voice",
    age: "Teen Years",
    photo: "/assets/photos/stylish_solo.jpg",
    subtitle: "Stepping into her own light",
    tag: "Heroine ✨",
    narrative: "Finding your style, your laugh, your dreams, and your courage."
  },
  {
    stage: 5,
    title: "Chapter 17 • Radiant & Complete",
    age: "17 Today",
    photo: "/assets/photos/black_dress.png",
    subtitle: "The Masterpiece",
    tag: "Main Character 🌟",
    narrative: "Standing tall, radiant, graceful, and full of wonderful promise."
  }
];

export default function ChildhoodTo17Transform() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto progression
  useEffect(() => {
    let timer = null;
    if (isAutoPlaying) {
      timer = setTimeout(() => {
        setActiveStep((prev) => (prev + 1) % transformationStages.length);
      }, 3500);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, activeStep]);

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % transformationStages.length);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const currentStage = transformationStages[activeStep];
  const isFinal = activeStep === transformationStages.length - 1;

  return (
    <section className="transform-section" id="transformation-moment">
      {/* Real Photo Background transforming with each stage */}
      <CinematicPhotoBackground
        src={currentStage.photo}
        alt={currentStage.title}
        opacity={0.18}
        blur="6px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(18, 12, 22, 0.78) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      {/* Ambient Light Leak Overlay */}
      <div className="transform-light-leak" />

      <div className="transform-container">
        {/* Header with Emotional Words */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge badge-gold">
            <Sparkles size={13} className="text-gold" />
            <span>TRANSFORMATION &bull; THROUGH THE YEARS</span>
          </div>

          <h2 className="transform-title font-serif text-gold-gradient">
            "You grew up..."
          </h2>
          <p className="transform-sub-quote font-editorial">
            "...but somehow, you were always you."
          </p>
        </motion.div>

        {/* The Card Stage with Layered Peel Effect */}
        <div className="transform-stage-box">
          <div className="transform-card-deck">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage.stage}
                className="transform-card glass-panel"
                initial={{ opacity: 0, x: 80, rotate: 6, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, x: 0, rotate: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -90, rotate: -8, scale: 0.9, filter: 'blur(8px)' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Glowing Border Halo */}
                <div className="transform-card-glow" />

                <div className="transform-media-container">
                  <MemoryImage
                    src={currentStage.photo}
                    alt={currentStage.title}
                    placeholderText={currentStage.title}
                    subtitle={currentStage.age}
                    objectPosition="center 15%"
                    className="transform-image"
                  />
                  <div className="transform-film-vignette" />

                  {/* Personality Tag */}
                  <MemoryTag
                    text={currentStage.tag}
                    variant="sticker"
                    position="bottom-right"
                    rotate="5deg"
                    delay={0.4}
                  />
                </div>

                <div className="transform-details">
                  <div className="transform-badge-row">
                    <span className="transform-age-pill font-sans">{currentStage.age}</span>
                    <span className="transform-stage-num font-serif">0{currentStage.stage} / 05</span>
                  </div>

                  <h3 className="transform-card-title font-serif">{currentStage.title}</h3>
                  <p className="transform-card-narrative font-editorial">
                    "{currentStage.narrative}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stepper Dots & Controls */}
          <div className="transform-controls">
            <div className="transform-dots-row">
              {transformationStages.map((st, i) => (
                <button
                  key={st.stage}
                  type="button"
                  className={`transform-dot-btn ${activeStep === i ? 'dot-active' : ''}`}
                  onClick={() => setActiveStep(i)}
                  title={`View ${st.age}`}
                >
                  <span className="dot-fill" />
                  <span className="dot-label font-sans">{st.age}</span>
                </button>
              ))}
            </div>

            <div className="transform-btn-actions">
              <button
                type="button"
                className="btn-cinema"
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              >
                {isAutoPlaying ? <Pause size={15} /> : <Play size={15} />}
                <span>{isAutoPlaying ? "Pause Story" : "Auto-Play Story"}</span>
              </button>

              <button
                type="button"
                className="btn-cinema btn-next-stage"
                onClick={handleNext}
              >
                <span>{isFinal ? "Start From Baby" : "Next Milestone"}</span>
                {isFinal ? <RotateCcw size={15} /> : <ArrowRight size={15} />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
