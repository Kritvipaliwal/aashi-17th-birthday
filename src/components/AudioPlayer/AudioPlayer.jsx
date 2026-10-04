import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { birthdayConfig } from '../../config/birthdayConfig';
import './AudioPlayer.css';

const trackList = [
  { id: "memory", title: "Memory Theme", src: "/assets/audio/memory-music.mp3" },
  { id: "birthday", title: "Birthday Theme", src: "/assets/audio/birthday-music.mp3" }
];

export default function AudioPlayer({ autoStart = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const activeTrack = trackList[currentTrackIndex];

  // Auto-start music after lock unlock
  useEffect(() => {
    if (autoStart && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Browser policy requires user gesture, wait for first click
          });
      }
    }
  }, [autoStart]);

  // Listen to custom track change events from sections (e.g. birthday celebration)
  useEffect(() => {
    const handleSwitchTrack = (e) => {
      const trackId = e.detail?.trackId;
      const foundIdx = trackList.findIndex(t => t.id === trackId);
      if (foundIdx !== -1 && foundIdx !== currentTrackIndex) {
        setCurrentTrackIndex(foundIdx);
      }
    };

    window.addEventListener('switchBackgroundTrack', handleSwitchTrack);
    return () => window.removeEventListener('switchBackgroundTrack', handleSwitchTrack);
  }, [currentTrackIndex]);

  // Background music ducking when voice recordings play (100% -> 15% -> 100%)
  const fadeIntervalRef = useRef(null);

  const fadeVolumeTo = (targetVolume, duration = 400) => {
    const audio = audioRef.current;
    if (!audio) return;

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const startVolume = audio.volume;
    const diff = targetVolume - startVolume;
    if (Math.abs(diff) < 0.02) {
      audio.volume = targetVolume;
      return;
    }

    const steps = 15;
    const stepTime = duration / steps;
    let stepCount = 0;

    fadeIntervalRef.current = setInterval(() => {
      stepCount++;
      const progress = stepCount / steps;
      const currentVal = startVolume + diff * progress;
      audio.volume = Math.max(0, Math.min(1, currentVal));

      if (stepCount >= steps) {
        audio.volume = targetVolume;
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
    }, stepTime);
  };

  useEffect(() => {
    const handleDuck = () => {
      fadeVolumeTo(0.15, 350);
    };

    const handleRestore = () => {
      fadeVolumeTo(1.0, 500);
    };

    window.addEventListener('duckBackgroundMusic', handleDuck);
    window.addEventListener('restoreBackgroundMusic', handleRestore);

    return () => {
      window.removeEventListener('duckBackgroundMusic', handleDuck);
      window.removeEventListener('restoreBackgroundMusic', handleRestore);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  const toggleTrack = (e) => {
    e.stopPropagation();
    setCurrentTrackIndex((prev) => (prev + 1) % trackList.length);
  };

  return (
    <div className="audio-player-fixed">
      <audio
        ref={audioRef}
        src={activeTrack.src}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div className="music-pill-control">
        <button
          type="button"
          className={`music-toggle-btn ${isPlaying ? 'music-playing' : 'music-paused'}`}
          onClick={toggleMusic}
          title={isPlaying ? "Pause music" : "Play music"}
          aria-label="Toggle background music"
        >
          <span className="music-note-symbol">♫</span>
          <span className="music-label-text font-sans">
            {isPlaying ? "Music" : "Muted"}
          </span>

          {isPlaying && (
            <div className="music-bars">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </div>
          )}
        </button>

        {/* Mini track switcher badge */}
        <button
          type="button"
          className="music-track-switcher"
          onClick={toggleTrack}
          title={`Switch track (Current: ${activeTrack.title})`}
        >
          <span className="switcher-dot" />
          <span className="switcher-label font-sans">{activeTrack.id === 'memory' ? '1' : '2'}</span>
        </button>
      </div>
    </div>
  );
}
