import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Sparkles, Volume2 } from 'lucide-react';
import './VoiceMessage.css';

// Preset waveform bar heights for rich cinematic visualizer
const waveformPattern = [
  35, 60, 45, 80, 95, 65, 40, 75, 85, 100,
  70, 45, 90, 80, 60, 95, 85, 50, 70, 90,
  60, 40, 85, 75, 55, 40, 65, 30
];

export default function VoiceMessage({
  id = "voice-msg-1",
  audio = "/assets/audio/message-1.mp3",
  fallbackAudio = "/assets/audio/recording-3.mp3",
  title = "A message for you",
  subtitle = "Something I wanted you to hear.",
  introText = "",
  outroText = "",
  dateTag = "AUDIO NOTE",
  theme = "gold",
  className = "",
  onPlayStateChange,
  onEnded
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);

  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  // Format seconds to mm:ss
  const formatTime = (secs) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Pause when another voice recording starts
  useEffect(() => {
    const handleOtherVoiceStarted = (e) => {
      if (e.detail?.id !== id && isPlaying) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
      }
    };

    window.addEventListener('voiceMessageStarted', handleOtherVoiceStarted);
    return () => window.removeEventListener('voiceMessageStarted', handleOtherVoiceStarted);
  }, [id, isPlaying]);

  // Handle play/pause toggle
  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;

    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
      // Restore background music
      window.dispatchEvent(new CustomEvent('restoreBackgroundMusic'));
      if (onPlayStateChange) onPlayStateChange(false);
    } else {
      // Announce this recording started to pause all others
      window.dispatchEvent(new CustomEvent('voiceMessageStarted', { detail: { id } }));
      // Duck background music volume
      window.dispatchEvent(new CustomEvent('duckBackgroundMusic'));

      el.play()
        .then(() => {
          setIsPlaying(true);
          setHasEnded(false);
          if (onPlayStateChange) onPlayStateChange(true);
        })
        .catch((err) => {
          console.warn("Audio playback notice:", err);
          // Try fallback audio if available
          if (fallbackAudio && el.src !== fallbackAudio) {
            el.src = fallbackAudio;
            el.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        });
    }
  };

  // Audio event handlers
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
    setCurrentTime(duration);
    window.dispatchEvent(new CustomEvent('restoreBackgroundMusic'));
    if (onPlayStateChange) onPlayStateChange(false);
    if (onEnded) onEnded();
  };

  // Scrubbing / seeking along timeline
  const handleScrub = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, clickX / width));

    if (audioRef.current && duration > 0) {
      const newTime = percentage * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setHasEnded(false);
    }
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`voice-message-card glass-panel theme-${theme} ${isPlaying ? 'voice-playing' : ''} ${className}`}>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={audio}
        preload="metadata"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={() => {
          // If primary audio path not loaded, switch to fallback
          if (fallbackAudio && audioRef.current && audioRef.current.src !== fallbackAudio) {
            audioRef.current.src = fallbackAudio;
          }
        }}
      />

      {/* Ambient background particles & glow */}
      <div className="voice-card-glow" />
      <div className="voice-card-grain" />

      {/* Lead-in prompt if provided */}
      {introText && (
        <div className="voice-card-intro font-editorial">
          <span>"{introText}"</span>
        </div>
      )}

      {/* Header with Glowing Mic */}
      <div className="voice-card-header">
        <div className="voice-mic-badge">
          <span className="mic-emoji">🎙️</span>
          {isPlaying && <span className="mic-pulse-ring" />}
        </div>

        <div className="voice-header-meta">
          <div className="voice-tag-row">
            <span className="voice-date-tag font-sans">{dateTag}</span>
            <Sparkles size={12} className="text-gold" />
          </div>
          <h4 className="voice-card-title font-serif">{title}</h4>
          {subtitle && <p className="voice-card-sub font-editorial">"{subtitle}"</p>}
        </div>
      </div>

      {/* Interactive Waveform Visualization */}
      <div 
        className="voice-waveform-container" 
        onClick={handleScrub}
        title="Click waveform to seek"
      >
        <div className="waveform-bars">
          {waveformPattern.map((heightPercent, idx) => {
            const barProgress = (idx / waveformPattern.length) * 100;
            const isPassed = barProgress <= progressPercent;

            return (
              <span
                key={idx}
                className={`wave-bar ${isPassed ? 'bar-passed' : ''} ${isPlaying ? 'bar-dancing' : ''}`}
                style={{
                  height: `${heightPercent}%`,
                  animationDelay: `${(idx * 0.05) % 0.6}s`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Progress Track & Elapsed / Total Duration */}
      <div 
        className="voice-progress-track-wrap"
        ref={progressBarRef}
        onClick={handleScrub}
      >
        <div className="voice-progress-track">
          <div 
            className="voice-progress-fill" 
            style={{ width: `${progressPercent}%` }}
          />
          <div 
            className="voice-progress-thumb" 
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        <div className="voice-time-row font-sans">
          <span className="time-elapsed">{formatTime(currentTime)}</span>
          <span className="time-total">{formatTime(duration || 32)}</span>
        </div>
      </div>

      {/* Controls & Action Row */}
      <div className="voice-card-actions">
        <button
          type="button"
          className="voice-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause voice message" : "Play voice message"}
        >
          {isPlaying ? (
            <Pause size={20} className="btn-icon" />
          ) : hasEnded ? (
            <RotateCcw size={20} className="btn-icon" />
          ) : (
            <Play size={20} className="btn-icon play-offset" />
          )}
          <span className="voice-btn-label font-sans">
            {isPlaying ? "Pause" : hasEnded ? "Replay Message" : "Press to Listen"}
          </span>
        </button>

        {isPlaying && (
          <div className="voice-live-badge font-sans">
            <span className="live-dot" />
            <span>PLAYING VOICE NOTE</span>
          </div>
        )}
      </div>

      {/* Lead-out text after listening */}
      {outroText && (
        <AnimatePresence>
          {(hasEnded || currentTime > 5) && (
            <motion.div 
              className="voice-card-outro font-editorial"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span>"{outroText}"</span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
