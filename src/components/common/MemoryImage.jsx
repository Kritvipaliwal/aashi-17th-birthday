import React, { useState } from 'react';
import { Sparkles, Camera, Eye } from 'lucide-react';
import './MemoryImage.css';

export default function MemoryImage({ 
  src, 
  alt = "Memory", 
  className = "", 
  placeholderText = "Cherished Memory",
  subtitle = "",
  style = {},
  objectPosition = "center 18%", // Focus on face by default
  fitMode = "cover",
  onClick,
  priority = false
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`memory-image-container ${className} ${isLoaded ? 'loaded' : ''} ${hasError ? 'error-fallback' : ''}`}
      style={style}
      onClick={onClick}
    >
      {!hasError && src ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          style={{
            objectPosition: objectPosition,
            objectFit: fitMode
          }}
          className={`memory-image-element ${isLoaded ? 'visible' : 'hidden'}`}
        />
      ) : null}

      {/* Elegant fallback if image is not yet uploaded */}
      {(hasError || !src || !isLoaded) && (
        <div className={`memory-placeholder ${hasError || !src ? 'active-fallback' : 'skeleton-loader'}`}>
          <div className="placeholder-inner">
            <div className="placeholder-icon-ring">
              <Camera className="placeholder-icon" size={24} />
              <Sparkles className="placeholder-sparkle" size={16} />
            </div>
            <div className="placeholder-text">{placeholderText}</div>
            {subtitle && <div className="placeholder-sub">{subtitle}</div>}
            <div className="placeholder-hint">Awaiting photo</div>
          </div>
        </div>
      )}

      {/* Film sheen overlay */}
      <div className="memory-sheen" />
    </div>
  );
}
