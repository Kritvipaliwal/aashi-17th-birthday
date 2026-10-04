import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Play, Pause, Volume2, VolumeX, Maximize, X, Sparkles, Film, Heart } from 'lucide-react';
import MemoryImage from '../common/MemoryImage';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './VideoMemories.css';

// Featured primary montage video + individual video memory moments (Panel 13)
const videoCollection = [
  {
    id: "vid-montage",
    title: "17 Years in Motion • Complete Life Montage",
    subtitle: "FEATURING ALL 17 MEMORIES & SOUNDTRACK",
    thumbnail: "/assets/photos/canon_portrait.png",
    videoSrc: "/assets/videos/memory_montage.mp4",
    duration: "0:51",
    caption: "A cinematic journey spanning infancy, childhood laughter, family road trips, festival bonds, and the 17-year-old she is today — scored with your authentic voice recording & soundtrack.",
    isFeature: true
  },
  {
    id: "vid-1",
    title: "17th Birthday Cake Celebration",
    subtitle: "THE BIG MILESTONE",
    thumbnail: "/assets/photos/cake_celebration.jpg",
    videoSrc: "/assets/videos/memory_montage.mp4",
    duration: "0:51",
    caption: "Laughter, cake cutting, and sweet wishes surrounded by family warmth.",
    isFeature: false
  },
  {
    id: "vid-2",
    title: "Family Lake & Boat Trip",
    subtitle: "SUNSHINE & WATER",
    thumbnail: "/assets/photos/family_lake_trip.png",
    videoSrc: "/assets/videos/memory_montage.mp4",
    duration: "0:51",
    caption: "Breezy afternoon on the lake, smiling with mom, dad, and sister.",
    isFeature: false
  },
  {
    id: "vid-3",
    title: "Inseparable Sisters • Rakhi & Sweet Bonds",
    subtitle: "A LIFETIME PROMISE",
    thumbnail: "/assets/photos/lock_sisters_rakhi.png",
    videoSrc: "/assets/videos/memory_montage.mp4",
    duration: "0:51",
    caption: "Two sisters, one heartbeat, forever standing side-by-side.",
    isFeature: false
  }
];

export default function VideoMemories() {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoPlayerRef = useRef(null);

  const openVideo = (video) => {
    setActiveVideo(video);
    setIsPlaying(true);
    setIsMuted(false);
    document.body.style.overflow = 'hidden';
    // Duck website background music so montage video soundtrack plays with full clarity
    window.dispatchEvent(new CustomEvent('duckBackgroundMusic'));
  };

  const closeVideo = () => {
    setActiveVideo(null);
    setIsPlaying(false);
    document.body.style.overflow = '';
    // Restore website background music
    window.dispatchEvent(new CustomEvent('restoreBackgroundMusic'));
  };

  return (
    <section className="videos-section" id="videos-section">
      {/* Real Photo Background for Video Memories (Panel 13) */}
      <CinematicPhotoBackground
        src="/assets/photos/canon_portrait.png"
        alt="Video Archive Atmosphere"
        opacity={0.18}
        blur="6px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(18, 12, 22, 0.8) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      <div className="videos-container">
        {/* Header (Panel 13) */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge">
            <Film size={13} className="text-gold" />
            <span>PHOTO MEMORIES &bull; MOVIE ARCHIVE</span>
          </div>
          <h2 className="timeline-section-title font-serif text-gold-gradient">
            Moving Memories
          </h2>
          <p className="timeline-sub-quote font-editorial">
            "Some moments are best felt, not just seen."
          </p>
        </motion.div>

        {/* Masterpiece Featured Video Banner (Panel 13) */}
        <motion.div
          className="feature-video-banner glass-panel"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          onClick={() => openVideo(videoCollection[0])}
        >
          {/* Blurred Version of Thumbnail Behind It (Panel 13) */}
          <div className="feature-video-backdrop-blur">
            <img src={videoCollection[0].thumbnail} alt="Backdrop blur" />
          </div>

          <div className="feature-video-thumb-stage">
            <MemoryImage
              src={videoCollection[0].thumbnail}
              alt={videoCollection[0].title}
              placeholderText="17 Years Montage"
              subtitle="All 17 Photos in Motion"
              objectPosition="center 15%"
              className="feature-video-img"
            />

            <div className="feature-video-overlay">
              <div className="play-button-ring-large">
                <Play size={32} className="play-icon text-gold" />
              </div>
              <span className="feature-play-prompt">PLAY FULL 17-YEAR MONTAGE (WITH SOUND)</span>
            </div>

            <div className="feature-video-pill">
              <Sparkles size={12} className="text-gold" />
              <span>{videoCollection[0].duration} &bull; 17 MEMORIES COMPLETE</span>
            </div>
          </div>

          <div className="feature-video-meta">
            <span className="feature-badge text-gold">{videoCollection[0].subtitle}</span>
            <h3 className="feature-title font-serif">{videoCollection[0].title}</h3>
            <p className="feature-caption font-editorial">"{videoCollection[0].caption}"</p>
          </div>
        </motion.div>

        {/* Small Video Thumbnails Row Below (Panel 13) */}
        <div className="videos-grid">
          {videoCollection.slice(1).map((vid, index) => (
            <motion.div
              key={vid.id}
              className="video-card glass-panel"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => openVideo(vid)}
            >
              <div className="video-thumb-stage">
                <MemoryImage
                  src={vid.thumbnail}
                  alt={vid.title}
                  placeholderText={vid.title}
                  subtitle={vid.subtitle}
                  objectPosition="center 15%"
                  className="video-thumb-img"
                />

                <div className="video-play-overlay">
                  <div className="play-button-ring">
                    <Play size={22} className="play-icon text-gold" />
                  </div>
                </div>

                <div className="video-duration-pill">{vid.duration}</div>
              </div>

              <div className="video-card-meta">
                <span className="video-card-sub text-gold">{vid.subtitle}</span>
                <h3 className="video-card-title font-serif">{vid.title}</h3>
                <p className="video-card-caption font-editorial">"{vid.caption}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cinematic Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            className="video-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeVideo}
          >
            <div className="video-modal-container" onClick={(e) => e.stopPropagation()}>
              <div className="video-modal-header">
                <div>
                  <div className="video-modal-title font-serif">{activeVideo.title}</div>
                  <div className="video-modal-sub font-sans">{activeVideo.subtitle}</div>
                </div>
                <button type="button" className="video-close-btn" onClick={closeVideo}>
                  <X size={20} />
                </button>
              </div>

              <div className="video-player-wrap">
                <video
                  ref={videoPlayerRef}
                  src={activeVideo.videoSrc}
                  className="cinematic-video-element"
                  autoPlay
                  playsInline
                  controls
                  onEnded={() => {
                    setIsPlaying(false);
                    window.dispatchEvent(new CustomEvent('restoreBackgroundMusic'));
                  }}
                />
              </div>

              <div className="video-modal-caption font-editorial">
                "{activeVideo.caption}"
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
