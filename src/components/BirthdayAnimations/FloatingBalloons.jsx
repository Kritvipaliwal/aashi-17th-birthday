import React from 'react';
import './FloatingBalloons.css';

export default function FloatingBalloons() {
  // Translucent, elegant glass balloons in champagne and soft rose
  const balloons = [
    { id: 1, left: '6%', size: 48, delay: 0, duration: 18, color: 'gold' },
    { id: 2, left: '14%', size: 62, delay: 6, duration: 22, color: 'rose' },
    { id: 3, left: '22%', size: 40, delay: 11, duration: 16, color: 'gold' },
    { id: 4, left: '78%', size: 55, delay: 3, duration: 20, color: 'rose' },
    { id: 5, left: '86%', size: 68, delay: 8, duration: 24, color: 'gold' },
    { id: 6, left: '94%', size: 44, delay: 14, duration: 17, color: 'rose' },
  ];

  return (
    <div className="floating-balloons-container" aria-hidden="true">
      {balloons.map((b) => (
        <div
          key={b.id}
          className={`glass-balloon balloon-${b.color}`}
          style={{
            left: b.left,
            width: `${b.size}px`,
            height: `${b.size * 1.25}px`,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.duration}s`,
          }}
        >
          {/* Balloon reflection highlight */}
          <div className="balloon-shine" />
          {/* String */}
          <div className="balloon-string" />
        </div>
      ))}
    </div>
  );
}
