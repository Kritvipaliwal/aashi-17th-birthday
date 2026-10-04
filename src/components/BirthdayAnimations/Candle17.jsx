import React from 'react';
import { motion } from 'framer-motion';
import './Candle17.css';

export default function Candle17({ isBright = false }) {
  return (
    <div className={`candle-17-container ${isBright ? 'candle-intense-glow' : ''}`}>
      {/* Candle 1 */}
      <div className="candle-unit">
        <div className="candle-flame-wrapper">
          <div className="candle-flame-halo" />
          <div className="candle-flame-core" />
          <div className="candle-wick" />
          {isBright && (
            <div className="candle-rising-sparkles">
              <span className="spark-particle spark-1" />
              <span className="spark-particle spark-2" />
            </div>
          )}
        </div>
        <div className="candle-wax-body candle-numeral-1">
          <span className="candle-num-text font-serif">1</span>
        </div>
      </div>

      {/* Candle 7 */}
      <div className="candle-unit">
        <div className="candle-flame-wrapper">
          <div className="candle-flame-halo" />
          <div className="candle-flame-core" />
          <div className="candle-wick" />
          {isBright && (
            <div className="candle-rising-sparkles">
              <span className="spark-particle spark-3" />
              <span className="spark-particle spark-4" />
            </div>
          )}
        </div>
        <div className="candle-wax-body candle-numeral-7">
          <span className="candle-num-text font-serif">7</span>
        </div>
      </div>
    </div>
  );
}
