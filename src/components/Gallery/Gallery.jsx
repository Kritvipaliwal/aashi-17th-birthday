import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2, Sparkles, Heart } from 'lucide-react';
import { photoGallery } from '../../data/memories';
import MemoryImage from '../common/MemoryImage';
import MemoryTag from '../common/MemoryTag';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './Gallery.css';

export default function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterEra, setFilterEra] = useState('All');

  const eras = ['All', 'Childhood', 'Growing Up', 'Teenage Years', 'Family'];

  const filteredPhotos = filterEra === 'All' 
    ? photoGallery 
    : photoGallery.filter(p => {
        if (filterEra === 'Teenage Years') return p.era === 'Teen' || p.era === 'Present';
        if (filterEra === 'Family') return p.tags?.some(t => t.toLowerCase().includes('papa') || t.toLowerCase().includes('mummy') || t.toLowerCase().includes('sister') || t.toLowerCase().includes('family'));
        return p.era === filterEra;
      });

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index);
    setZoomLevel(1);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
    setZoomLevel(1);
    document.body.style.overflow = '';
  };

  const nextPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length);
    setZoomLevel(1);
  };

  const prevPhoto = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
    setZoomLevel(1);
  };

  const toggleZoom = () => {
    setZoomLevel((prev) => (prev === 1 ? 1.6 : 1));
  };

  return (
    <section className="gallery-section" id="gallery-section">
      {/* Real Photo Background for Gallery (Panel 12) */}
      <CinematicPhotoBackground
        src="/assets/photos/night_walk_sisters.png"
        alt="Photo Gallery Atmosphere"
        opacity={0.16}
        blur="5px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(18, 12, 22, 0.78) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      <div className="gallery-container">
        {/* Header */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge">
            <ImageIcon size={13} className="text-gold" />
            <span>THE ARCHIVE &bull; MEMORY VAULT</span>
          </div>
          <h2 className="timeline-section-title font-serif text-gold-gradient">
            Photo Gallery
          </h2>
          <p className="timeline-sub-quote font-editorial">
            "Scattered memories, timeless smiles. Every frame holds a piece of our story."
          </p>

          {/* Era Filter Badges (Panel 12) */}
          <div className="gallery-filters">
            {eras.map(era => (
              <button
                key={era}
                type="button"
                className={`filter-btn ${filterEra === era ? 'active-filter' : ''}`}
                onClick={() => setFilterEra(era)}
              >
                {era}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Scattered Scrapbook Masonry Grid with Rotations & Depth (Panel 12) */}
        <div className="gallery-masonry">
          {filteredPhotos.map((item, index) => {
            const tilts = ['-1.5deg', '2deg', '-2.5deg', '1.5deg', '-1deg', '2.5deg'];
            const tilt = tilts[index % tilts.length];

            return (
              <motion.div
                key={item.id}
                className={`gallery-item item-${item.aspect || 'square'}`}
                style={{ '--item-tilt': tilt }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -8, 
                  zIndex: 20, 
                  transition: { duration: 0.25 } 
                }}
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-item-inner">
                  <MemoryImage
                    src={item.photo}
                    alt={item.caption}
                    placeholderText={`Photo #${index + 1}`}
                    subtitle={item.era}
                    className="gallery-img"
                  />

                  {/* Personality Tags Attached */}
                  {item.tags && item.tags.length > 0 && (
                    <MemoryTag
                      text={item.tags[0]}
                      variant="sticker"
                      position="top-right"
                      rotate="5deg"
                      delay={0.2}
                    />
                  )}

                  <div className="gallery-overlay">
                    <div className="overlay-top">
                      <span className="overlay-era">{item.era}</span>
                      <Maximize2 size={16} className="text-gold" />
                    </div>
                    <p className="overlay-caption font-editorial">"{item.caption}"</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cinematic Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
          <motion.div
            className="lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              {/* Toolbar */}
              <div className="lightbox-toolbar">
                <div className="lightbox-counter font-serif">
                  {selectedPhotoIndex + 1} / {filteredPhotos.length}
                </div>
                <div className="lightbox-tools">
                  <button type="button" className="lightbox-tool-btn" onClick={toggleZoom} title="Zoom">
                    {zoomLevel === 1 ? <ZoomIn size={18} /> : <ZoomOut size={18} />}
                  </button>
                  <button type="button" className="lightbox-tool-btn" onClick={closeLightbox} title="Close">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Main Image Stage */}
              <div className="lightbox-image-stage">
                <motion.div
                  className="lightbox-zoom-wrap"
                  animate={{ scale: zoomLevel }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <MemoryImage
                    src={filteredPhotos[selectedPhotoIndex].photo}
                    alt={filteredPhotos[selectedPhotoIndex].caption}
                    placeholderText={`Memory #${selectedPhotoIndex + 1}`}
                    subtitle={filteredPhotos[selectedPhotoIndex].era}
                    fitMode="contain"
                    className="lightbox-active-img"
                  />
                </motion.div>

                {/* Nav Arrows */}
                <button
                  type="button"
                  className="lightbox-nav-arrow arrow-left"
                  onClick={prevPhoto}
                  aria-label="Previous photograph"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  type="button"
                  className="lightbox-nav-arrow arrow-right"
                  onClick={nextPhoto}
                  aria-label="Next photograph"
                >
                  <ChevronRight size={28} />
                </button>
              </div>

              {/* Caption & Tags */}
              <div className="lightbox-footer">
                <div className="lightbox-meta-top">
                  <span className="lightbox-era-badge">{filteredPhotos[selectedPhotoIndex].era}</span>
                  {filteredPhotos[selectedPhotoIndex].tags && (
                    <div className="lightbox-tags-row">
                      {filteredPhotos[selectedPhotoIndex].tags.map((t, idx) => (
                        <span key={idx} className="lightbox-tag-pill font-sans">{t}</span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="lightbox-caption font-editorial">
                  "{filteredPhotos[selectedPhotoIndex].caption}"
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
