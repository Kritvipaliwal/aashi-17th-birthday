import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Sparkles, Play, Pause, ChevronRight, RotateCcw, Heart, Feather, Volume2, VolumeX } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import FloatingBalloons from '../BirthdayAnimations/FloatingBalloons';
import Candle17 from '../BirthdayAnimations/Candle17';
import SecretEasterEgg from '../SecretEasterEgg/SecretEasterEgg';
import MemoryImage from '../common/MemoryImage';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import VoiceMessage from '../common/VoiceMessage';
import { voiceMessages } from '../../data/voiceMessages';
import { playCandleIgnite, playConfettiPop } from '../../utils/soundEffects';
import { speakPoemLine, stopPoemSpeech } from '../../utils/poemReader';
import './PoemSection.css';

// Exact poem lines structured with metadata for transitions, highlights, and voice reading
const poemLines = [
  { id: 1, text: "When you were little,", bgPhoto: "baby", highlight: null },
  { id: 2, text: "all I ever wanted", bgPhoto: null, highlight: null },
  { id: 3, text: "was to be around you.", bgPhoto: null, highlight: null },
  { id: 4, text: "To sleep beside you,", bgPhoto: null, highlight: null },
  { id: 5, text: "eat with you,", bgPhoto: null, highlight: null },
  { id: 6, text: "play with you,", bgPhoto: null, highlight: null },
  { id: 7, text: "laugh with you,", bgPhoto: null, highlight: null },
  { id: 8, text: "and do every little thing with you.", bgPhoto: null, highlight: null },
  { id: 9, text: "You grew one year older every year,", bgPhoto: "childhood", highlight: null },
  { id: 10, text: "but somehow,", bgPhoto: null, highlight: null },
  { id: 11, text: "the feeling inside me never changed.", bgPhoto: null, highlight: null },
  { id: 12, text: "You were little then,", bgPhoto: null, highlight: null },
  { id: 13, text: "and you are seventeen now,", bgPhoto: "current", highlight: null },
  { id: 14, text: "but to me,", bgPhoto: null, highlight: null },
  { id: 15, text: "you have always mattered the same.", bgPhoto: null, highlight: "same" },
  { id: 16, text: "Every second,", bgPhoto: null, highlight: "every second" },
  { id: 17, text: "every breath,", bgPhoto: null, highlight: "every breath" },
  { id: 18, text: "I just wanted you around.", bgPhoto: null, highlight: null },
  { id: 19, text: "To laugh with you,", bgPhoto: null, highlight: null },
  { id: 20, text: "fight with you,", bgPhoto: null, highlight: null },
  { id: 21, text: "be stupid with you,", bgPhoto: null, highlight: null },
  { id: 22, text: "talk about random things,", bgPhoto: null, highlight: null },
  { id: 23, text: "and sometimes do nothing at all—", bgPhoto: null, highlight: null },
  { id: 24, text: "just be with you.", bgPhoto: null, highlight: null },
  { id: 25, text: "You are not just my sister,", bgPhoto: null, highlight: null },
  { id: 26, text: "someone whose company I enjoy", bgPhoto: null, highlight: null },
  { id: 27, text: "because we are family.", bgPhoto: null, highlight: null },
  { id: 28, text: "You are so much more than that.", bgPhoto: null, highlight: null },
  { id: 29, text: "You matter to me.", bgPhoto: null, highlight: null },
  { id: 30, text: "More than I can ever explain.", bgPhoto: null, highlight: null },
  { id: 31, text: "I don't care for you", bgPhoto: null, highlight: null },
  { id: 32, text: "just because you are my sister.", bgPhoto: null, highlight: null },
  { id: 33, text: "I care for you", bgPhoto: null, highlight: null },
  { id: 34, text: "because I love you.", bgPhoto: null, highlight: "love" },
  { id: 35, text: "That's it.", bgPhoto: null, highlight: null },
  { id: 36, text: "No reason.", bgPhoto: null, highlight: null },
  { id: 37, text: "No condition.", bgPhoto: null, highlight: null },
  { id: 38, text: "You matter to me", bgPhoto: null, highlight: null },
  { id: 39, text: "because you are you.", bgPhoto: null, highlight: "you" },
  { id: 40, text: "You can grow older,", bgPhoto: null, highlight: null },
  { id: 41, text: "you can change,", bgPhoto: null, highlight: null },
  { id: 42, text: "you can become whoever you want to be,", bgPhoto: null, highlight: null },
  { id: 43, text: "but somewhere in my heart,", bgPhoto: null, highlight: null },
  { id: 44, text: "you will always be", bgPhoto: null, highlight: null },
  { id: 45, text: "that little girl", bgPhoto: null, highlight: null },
  { id: 46, text: "I wanted beside me.", bgPhoto: null, highlight: null },
  { id: 47, text: "And if I ever got the chance", bgPhoto: null, highlight: null },
  { id: 48, text: "to live those seventeen years again,", bgPhoto: null, highlight: null },
  { id: 49, text: "I would choose the same thing.", bgPhoto: null, highlight: "same" },
  { id: 50, text: "You.", bgPhoto: "special_you", highlight: "You." }, // Special treatment
  { id: 51, text: "Every time.", bgPhoto: null, highlight: null },
  { id: 52, text: "Every year.", bgPhoto: null, highlight: null },
  { id: 53, text: "Every second.", bgPhoto: null, highlight: "every second" },
  { id: 54, text: "Every breath.", bgPhoto: null, highlight: "every breath", lightBurst: true },
  { id: 55, text: "Happy 17th Birthday.", bgPhoto: null, highlight: "birthday", confetti: true },
  { id: 56, text: "I love you.", bgPhoto: null, highlight: "love" },
  { id: 57, text: "Not just because you're my sister,", bgPhoto: null, highlight: null },
  { id: 58, text: "but because you're you. ❤️", bgPhoto: null, highlight: "you_heart", candleIntense: true },
];

export default function PoemSection({ onPoemFinished }) {
  const [revealedCount, setRevealedCount] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // Let user trigger playback with audio
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [activeBgMemory, setActiveBgMemory] = useState('baby');
  const [isSpecialYouActive, setIsSpecialYouActive] = useState(false);
  const [hasLightBurst, setHasLightBurst] = useState(false);
  const [hasCandleIntense, setHasCandleIntense] = useState(false);

  const poemContainerRef = useRef(null);
  const activeLineRef = useRef(null);

  // Trigger twin-side celebratory confetti
  const triggerConfetti = () => {
    playConfettiPop();
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ['#dfba73', '#f2a7b8', '#ffffff', '#ffd700']
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.5),
      angle: 60,
      spread: 55,
      origin: { x: 0.1, y: 0.75 }
    });

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.5),
      angle: 120,
      spread: 55,
      origin: { x: 0.9, y: 0.75 }
    });
  };

  // Speak the newest line if voice is enabled
  const speakCurrentLine = (line) => {
    if (isVoiceEnabled && line) {
      speakPoemLine(line.text);
    }
  };

  // Progressive auto-advancing line timer
  useEffect(() => {
    let timer = null;
    if (isPlaying && revealedCount < poemLines.length) {
      const currentLine = poemLines[revealedCount - 1];
      let delay = 2400; // Comfortable spoken duration
      if (currentLine.id === 50) delay = 3400; // "You."
      if (currentLine.id === 54) delay = 2600; // "Every breath."
      if (currentLine.id === 55) delay = 3600; // "Happy 17th Birthday."

      timer = setTimeout(() => {
        advanceLine();
      }, delay);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, revealedCount, isVoiceEnabled]);

  const advanceLine = () => {
    setRevealedCount((prev) => {
      const next = prev + 1;
      const target = poemLines[next - 1];
      if (target) {
        // Read aloud with sound
        speakCurrentLine(target);

        // Background photo cues
        if (target.bgPhoto) {
          setActiveBgMemory(target.bgPhoto);
        }

        // Special "You." treatment
        if (target.highlight === "You.") {
          setIsSpecialYouActive(true);
        } else if (next > 51) {
          setIsSpecialYouActive(false);
        }

        // Light burst cue
        if (target.lightBurst) {
          setHasLightBurst(true);
          setTimeout(() => setHasLightBurst(false), 2000);
        }

        // Confetti cue
        if (target.confetti) {
          triggerConfetti();
        }

        // Candle intense glow cue
        if (target.candleIntense) {
          setHasCandleIntense(true);
          playCandleIgnite();
        }
      }
      return Math.min(next, poemLines.length);
    });
  };

  const handleNextLine = () => {
    if (revealedCount < poemLines.length) {
      advanceLine();
    }
  };

  const handleToggleVoice = () => {
    if (isVoiceEnabled) {
      stopPoemSpeech();
      setIsVoiceEnabled(false);
    } else {
      setIsVoiceEnabled(true);
      const current = poemLines[revealedCount - 1];
      if (current) speakPoemLine(current.text);
    }
  };

  const handleStartNarration = () => {
    setIsPlaying(true);
    setIsVoiceEnabled(true);
    const current = poemLines[revealedCount - 1];
    if (current) speakPoemLine(current.text);
  };

  const handleRevealAll = () => {
    setRevealedCount(poemLines.length);
    setHasCandleIntense(true);
    triggerConfetti();
  };

  const handleRestart = () => {
    stopPoemSpeech();
    setRevealedCount(1);
    setIsSpecialYouActive(false);
    setHasCandleIntense(false);
    setActiveBgMemory('baby');
    setIsPlaying(false);
  };

  // Render line with special word treatment
  const renderLineContent = (line) => {
    const text = line.text;

    if (line.highlight === "You.") {
      return (
        <span className="special-you-token font-serif">
          {text}
        </span>
      );
    }

    if (line.highlight === "same") {
      return (
        <span>
          {text.replace("same", "")}
          <strong className="keyword-highlight keyword-gold">same.</strong>
        </span>
      );
    }

    if (line.highlight === "love") {
      return (
        <span>
          {text.replace("love you", "").replace("love", "")}
          <strong className="keyword-highlight keyword-rose">love you.</strong>
        </span>
      );
    }

    if (line.highlight === "you") {
      return (
        <span>
          You matter to me because you are{" "}
          <strong className="keyword-highlight keyword-gold">you.</strong>
        </span>
      );
    }

    if (line.highlight === "every second") {
      return <strong className="keyword-highlight keyword-gold">{text}</strong>;
    }

    if (line.highlight === "every breath") {
      return <strong className="keyword-highlight keyword-rose">{text}</strong>;
    }

    if (line.highlight === "birthday") {
      return (
        <span className="poem-birthday-highlight font-serif text-gold-gradient">
          {text}
        </span>
      );
    }

    if (line.highlight === "you_heart") {
      return (
        <span className="poem-final-highlight font-serif">
          but because you're <span className="text-gold font-bold">you.</span>{" "}
          <Heart size={20} className="heart-pulse-icon" fill="#df587a" />
        </span>
      );
    }

    return text;
  };

  return (
    <section 
      className={`poem-section ${isSpecialYouActive ? 'special-you-mode' : ''}`} 
      id="poem-section"
      ref={poemContainerRef}
    >
      {/* Real Photo Background for Emotional Letter (Panel 15) */}
      <CinematicPhotoBackground
        src="/assets/photos/black_dress.png"
        alt="Poem Letter Background"
        opacity={0.2}
        blur="6px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(20, 14, 22, 0.8) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      {/* Subtle Rising Translucent Balloons */}
      <FloatingBalloons />

      {/* Floating Birthday Particles */}
      <div className="poem-floating-particles">
        {Array.from({ length: 22 }).map((_, i) => (
          <div
            key={i}
            className={`poem-particle particle-type-${i % 3}`}
            style={{
              top: `${(i * 17) % 100}%`,
              left: `${(i * 23) % 100}%`,
              animationDelay: `${(i * 0.4)}s`,
              animationDuration: `${6 + (i % 5)}s`
            }}
          />
        ))}
      </div>

      {/* Soft Background Collage of Real Photos - Face Centered */}
      <div className="poem-bg-collage">
        <div className={`collage-photo-wrap photo-baby ${activeBgMemory === 'baby' ? 'active-memory' : ''}`}>
          <MemoryImage
            src="/assets/photos/real_baby_smile.png"
            alt="Little baby years"
            placeholderText="Little Days"
            subtitle="When you were little"
            objectPosition="center 15%"
            className="collage-img"
          />
        </div>

        <div className={`collage-photo-wrap photo-childhood ${activeBgMemory === 'childhood' ? 'active-memory' : ''}`}>
          <MemoryImage
            src="/assets/photos/shawl_bun.png"
            alt="Childhood"
            placeholderText="Growing Taller"
            subtitle="One year older"
            objectPosition="center 15%"
            className="collage-img"
          />
        </div>

        <div className={`collage-photo-wrap photo-current ${activeBgMemory === 'current' || isSpecialYouActive ? 'active-memory' : ''}`}>
          <MemoryImage
            src="/assets/photos/black_dress.png"
            alt="Seventeen"
            placeholderText="Seventeen Today"
            subtitle="You"
            objectPosition="center 15%"
            className="collage-img"
          />
        </div>
      </div>

      {/* Warm Light Burst behind text */}
      {hasLightBurst && <div className="light-burst-flash" />}

      <div className="poem-container">
        {/* Lead-in Statement */}
        <motion.div
          className="poem-preface"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="poem-badge">
            <Feather size={14} className="text-gold" />
            <span>A PERSONAL LETTER &bull; SEVENTEEN YEARS</span>
            {/* Secret Easter Egg Icon */}
            <SecretEasterEgg />
          </div>

          <h2 className="poem-whisper-title font-editorial">
            "There is something I've wanted you to know."
          </h2>

          {/* Voice Read Aloud Toggle Header Pill */}
          <div className="voice-narrator-pill">
            <button
              type="button"
              className={`voice-narrate-btn ${isVoiceEnabled ? 'voice-on' : 'voice-off'}`}
              onClick={handleToggleVoice}
              title="Toggle reading aloud"
            >
              {isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span>{isVoiceEnabled ? "Voice Narration: ON" : "Voice Narration: OFF"}</span>
            </button>
            {isVoiceEnabled && (
              <span className="narrator-speaking-label font-sans">
                {isPlaying ? "♪ Reading aloud..." : "Press Play to listen"}
              </span>
            )}
          </div>

          {/* Moment 2: Personal Voice Recording before the poem */}
          <div className="poem-voice-lead-block" style={{ maxWidth: '620px', margin: '24px auto 16px auto', textAlign: 'center' }}>
            <p className="font-editorial text-gold-gradient" style={{ fontSize: '1.4rem', marginBottom: '14px', fontWeight: 600 }}>
              "Before you read this... Listen to me first."
            </p>

            <VoiceMessage
              id={voiceMessages.poem.id}
              audio={voiceMessages.poem.audio}
              fallbackAudio={voiceMessages.poem.fallbackAudio}
              title={voiceMessages.poem.title}
              subtitle={voiceMessages.poem.subtitle}
              dateTag={voiceMessages.poem.dateTag}
              theme="rose"
            />

            <p className="font-editorial" style={{ marginTop: '14px', fontSize: '1.1rem', color: 'rgba(255, 255, 255, 0.85)', letterSpacing: '0.04em' }}>
              "Now... read this." &darr;
            </p>
          </div>
        </motion.div>

        {/* The Cinematic Letter Stage */}
        <div className="cinematic-letter-stage glass-panel">
          <div className="letter-corner-accent corner-tl" />
          <div className="letter-corner-accent corner-br" />

          {/* Letter Body Lines */}
          <div className="letter-verses font-editorial">
            {poemLines.slice(0, revealedCount).map((line, idx) => {
              const isLatest = idx === revealedCount - 1;

              return (
                <motion.p
                  key={line.id}
                  ref={isLatest ? activeLineRef : null}
                  className={`poem-line ${line.highlight ? 'line-highlighted' : ''} ${isLatest ? 'line-newest' : ''}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  {renderLineContent(line)}
                </motion.p>
              );
            })}
          </div>

          {/* Birthday Candles 17 */}
          {revealedCount >= 54 && (
            <motion.div
              className="poem-candles-stage"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Candle17 isBright={hasCandleIntense} />
            </motion.div>
          )}

          {/* Letter Progress & Controls Bar */}
          <div className="poem-controls-bar">
            <div className="poem-progress-info">
              <span className="poem-line-counter font-sans">
                Line {revealedCount} of {poemLines.length}
              </span>
              <div className="poem-progress-track">
                <div 
                  className="poem-progress-fill" 
                  style={{ width: `${(revealedCount / poemLines.length) * 100}%` }} 
                />
              </div>
            </div>

            <div className="poem-btn-group">
              {!isPlaying ? (
                <button
                  type="button"
                  className="poem-ctrl-btn btn-highlight"
                  onClick={handleStartNarration}
                >
                  <Play size={15} />
                  <span>Play with Voice</span>
                </button>
              ) : (
                <button
                  type="button"
                  className="poem-ctrl-btn"
                  onClick={() => setIsPlaying(false)}
                >
                  <Pause size={15} />
                  <span>Pause</span>
                </button>
              )}

              {revealedCount < poemLines.length ? (
                <>
                  <button
                    type="button"
                    className="poem-ctrl-btn"
                    onClick={handleNextLine}
                  >
                    <span>Next Line</span>
                    <ChevronRight size={15} />
                  </button>
                  <button
                    type="button"
                    className="poem-ctrl-btn btn-subtle"
                    onClick={handleRevealAll}
                  >
                    <span>Read Entire Letter</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="poem-ctrl-btn"
                  onClick={handleRestart}
                >
                  <RotateCcw size={15} />
                  <span>Replay Letter</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
