import React, { useState } from 'react';
import MemoryLock from './components/MemoryLock/MemoryLock';
import CinematicIntro from './components/CinematicIntro/CinematicIntro';
import Hero from './components/Hero/Hero';
import Timeline from './components/Timeline/Timeline';
import Gallery from './components/Gallery/Gallery';
import VideoMemories from './components/VideoMemories/VideoMemories';
import MemoryCards from './components/MemoryCards/MemoryCards';
import PoemSection from './components/PoemSection/PoemSection';
import FinalCelebration from './components/FinalCelebration/FinalCelebration';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import BackgroundPhotoStream from './components/common/BackgroundPhotoStream';
import SectionQuoteCard from './components/common/SectionQuoteCard';
import { quotes } from './data/quotes';
import { Lock, Sparkles } from 'lucide-react';
import './App.css';

export default function App() {
  // Stages: 'lock' -> 'intro' -> 'story'
  const [stage, setStage] = useState('lock');

  const handleLockUnlocked = () => {
    setStage('intro');
  };

  const handleIntroComplete = () => {
    setStage('story');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRelock = () => {
    setStage('lock');
  };

  return (
    <div className="app-root">
      {/* Film Grain Texture Overlay */}
      <div className="film-grain" />

      {/* Floating Ambient Glowing Orbs */}
      <div className="ambient-glows">
        <div className="ambient-glow-1" />
        <div className="ambient-glow-2" />
      </div>

      {/* 1. The 17-Character Combination Lock */}
      {stage === 'lock' && (
        <MemoryLock onUnlocked={handleLockUnlocked} />
      )}

      {/* 2. Cinematic Intro Transition */}
      {stage === 'intro' && (
        <CinematicIntro onComplete={handleIntroComplete} />
      )}

      {/* 3. The Full Memory Book Story */}
      {stage === 'story' && (
        <main className="story-experience">
          {/* Subtle Ambient Background Stream of Real Memories */}
          <BackgroundPhotoStream />

          {/* Floating Audio Player (♪) */}
          <AudioPlayer />

          {/* Quick Lock Button */}
          <button 
            type="button" 
            className="floating-relock-btn" 
            onClick={handleRelock}
            title="Lock Memory Book"
            aria-label="Lock Vault"
          >
            <Lock size={15} />
            <span>Lock</span>
          </button>

          {/* Hero Section */}
          <Hero />

          {/* Chronological Timeline: Beginning, Childhood, Growing Up, Teenage Era, Chapter 17 */}
          <Timeline />

          {/* Photo Memories Gallery */}
          <Gallery />

          {/* Sibling Scrapbook Quote */}
          <SectionQuoteCard
            text={quotes[3].text}
            author={quotes[3].author}
            subtext={quotes[3].subtext}
            type="funny"
            rotate="-1.5deg"
          />

          {/* Moving Video Memories */}
          <VideoMemories />

          {/* Teasing Phone & Charger Quote */}
          <SectionQuoteCard
            text={quotes[4].text}
            author={quotes[4].author}
            subtext={quotes[4].subtext}
            type="funny"
            rotate="2deg"
          />

          {/* The Little Things Interactive Cards */}
          <MemoryCards />

          {/* Version 17 Upgrade Quote */}
          <SectionQuoteCard
            text={quotes[9].text}
            author={quotes[9].author}
            subtext={quotes[9].subtext}
            type="magical"
            rotate="-1deg"
          />

          {/* The Main Emotional Page — Seventeen Years Poem */}
          <PoemSection />

          {/* Final Birthday Celebration & Everlasting Closing Screen */}
          <FinalCelebration />
        </main>
      )}
    </div>
  );
}
