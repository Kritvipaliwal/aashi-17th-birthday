import React from 'react';
import './CinematicPhotoBackground.css';

/**
 * Reusable CinematicPhotoBackground component
 * Provides a dark, luxury, filmic background using real uploaded photographs.
 * Supports:
 * - real image
 * - custom opacity
 * - blur
 * - slow Ken Burns zoom
 * - parallax / floating depth
 * - dark gradient overlay
 * - vignette
 * - film grain
 * - warm golden light leak
 */
export default function CinematicPhotoBackground({
  src = '/assets/photos/canon_portrait.png',
  alt = 'Background Memory',
  opacity = 0.22,
  blur = '3px',
  zoom = true,
  parallax = false,
  vignette = true,
  filmGrain = true,
  lightLeak = true,
  darkGradient = 'linear-gradient(180deg, rgba(8, 6, 9, 0.72) 0%, rgba(6, 4, 7, 0.88) 60%, rgba(6, 4, 7, 0.98) 100%)',
  objectPosition = 'center 20%',
  className = '',
  children
}) {
  return (
    <div className={`cinematic-bg-container ${className}`}>
      {/* 1. Underlying Real Photograph with optional Ken Burns Zoom */}
      <div 
        className={`cinematic-bg-media ${zoom ? 'ken-burns' : ''} ${parallax ? 'subtle-parallax' : ''}`}
        style={{
          filter: blur ? `blur(${blur})` : 'none',
          opacity: opacity
        }}
      >
        <img
          src={src}
          alt={alt}
          className="cinematic-bg-img"
          style={{ objectPosition }}
          loading="lazy"
          onError={(e) => {
            // Graceful fallback to hero if file not found
            if (e.target.src !== '/assets/photos/hero.jpg') {
              e.target.src = '/assets/photos/hero.jpg';
            }
          }}
        />
      </div>

      {/* 2. Dark Luxury Gradient Overlay */}
      <div 
        className="cinematic-bg-gradient" 
        style={{ background: darkGradient }}
      />

      {/* 3. Deep Cinematic Vignette */}
      {vignette && <div className="cinematic-bg-vignette" />}

      {/* 4. Warm Golden / Rose Light Leak */}
      {lightLeak && <div className="cinematic-bg-lightleak" />}

      {/* 5. Analog Film Grain */}
      {filmGrain && <div className="cinematic-bg-grain" />}

      {/* 6. Floating Warm Dust Particles */}
      <div className="cinematic-bg-dust">
        <span className="bg-dust-mote mote-1" />
        <span className="bg-dust-mote mote-2" />
        <span className="bg-dust-mote mote-3" />
        <span className="bg-dust-mote mote-4" />
      </div>

      {/* Optional In-Section Content */}
      {children && (
        <div className="cinematic-bg-content">
          {children}
        </div>
      )}
    </div>
  );
}
