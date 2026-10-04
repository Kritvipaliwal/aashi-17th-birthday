import React from 'react';
import './BackgroundPhotoStream.css';

// 17 real memories gently floating in the far background
const backgroundStreamPhotos = [
  { src: '/assets/photos/real_baby_smile.png', top: '8%', left: '4%', rot: '-6deg', size: 180 },
  { src: '/assets/photos/real_two_babies.png', top: '18%', right: '3%', rot: '5deg', size: 190 },
  { src: '/assets/photos/real_toddler.png', top: '28%', left: '2%', rot: '4deg', size: 180 },
  { src: '/assets/photos/shawl_bun.png', top: '38%', right: '4%', rot: '-4deg', size: 175 },
  { src: '/assets/photos/family_vibes.jpg', top: '48%', left: '3%', rot: '-5deg', size: 190 },
  { src: '/assets/photos/lock_sisters_rakhi.png', top: '58%', right: '2%', rot: '6deg', size: 200 },
  { src: '/assets/photos/family_lake_trip.png', top: '68%', left: '4%', rot: '3deg', size: 210 },
  { src: '/assets/photos/sleeping_car.png', top: '78%', right: '3%', rot: '-5deg', size: 185 },
  { src: '/assets/photos/black_dress.png', top: '88%', left: '2%', rot: '-4deg', size: 200 },
  { src: '/assets/photos/canon_portrait.png', top: '96%', right: '4%', rot: '5deg', size: 195 },
];

export default function BackgroundPhotoStream() {
  return (
    <div className="bg-photo-stream" aria-hidden="true">
      {backgroundStreamPhotos.map((item, idx) => (
        <div
          key={idx}
          className="bg-floating-photo-frame"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            width: `${item.size}px`,
            height: `${item.size * 1.3}px`,
            transform: `rotate(${item.rot})`,
            animationDelay: `${idx * 1.5}s`
          }}
        >
          <img
            src={item.src}
            alt=""
            loading="lazy"
            className="bg-floating-img"
          />
          <div className="bg-floating-sheen" />
        </div>
      ))}
    </div>
  );
}
