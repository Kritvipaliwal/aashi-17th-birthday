import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Heart } from 'lucide-react';
import { growingUpTimeline } from '../../data/memories';
import MemoryCardFrame from '../common/MemoryCardFrame';
import CinematicPhotoBackground from '../common/CinematicPhotoBackground';
import './GrowingUp.css';

export default function GrowingUp() {
  const milestoneFlow = ["BABY", "LITTLE GIRL", "SCHOOL YEARS", "TEENAGER", "17"];

  return (
    <section className="growing-up-section" id="growing-section">
      {/* Real Photo Background for Growing Up Timeline (Panel 8) */}
      <CinematicPhotoBackground
        src="/assets/photos/stylish_solo.jpg"
        alt="Growing Up Atmosphere"
        opacity={0.16}
        blur="5px"
        zoom={true}
        vignette={true}
        filmGrain={true}
        lightLeak={true}
        darkGradient="radial-gradient(ellipse at 50% 30%, rgba(18, 12, 22, 0.78) 0%, rgba(8, 6, 10, 0.94) 75%, rgba(4, 3, 5, 0.99) 100%)"
      />

      <div className="growing-container">
        {/* Section Header */}
        <motion.div
          className="timeline-header-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="timeline-badge">
            <TrendingUp size={13} className="text-gold" />
            <span>TRANSFORMATION &bull; THE PASSING SEASONS</span>
          </div>
          <h2 className="timeline-section-title font-serif text-gold-gradient">
            "And then, somehow, you started growing up."
          </h2>
          <p className="timeline-sub-quote font-editorial">
            "A little older. A little taller. A little wiser."
          </p>

          {/* Visual Progression Pills (Panel 8) */}
          <div className="growing-flow-ribbon">
            {milestoneFlow.map((stage, idx) => (
              <React.Fragment key={stage}>
                <span className="flow-pill font-sans">{stage}</span>
                {idx < milestoneFlow.length - 1 && <span className="flow-arrow text-gold">&rarr;</span>}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        {/* Chronological Timeline Track */}
        <div className="growing-timeline-track">
          <div className="growing-central-line" />

          {growingUpTimeline.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.stage}
                className={`growing-timeline-row ${isEven ? 'row-left' : 'row-right'}`}
                initial={{ opacity: 0, x: isEven ? -50 : 50, y: 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {/* Timeline Center Node */}
                <div className="timeline-spine-node">
                  <div className="node-inner-dot" />
                  <span className="node-step-num">0{index + 1}</span>
                </div>

                {/* Content Card */}
                <div className="growing-card glass-panel">
                  <div className="growing-card-media">
                    <MemoryCardFrame
                      src={item.photo}
                      alt={item.stage}
                      subtitle={item.subtitle}
                      tags={item.tags || []}
                      entryAnimation={item.entryAnimation || (isEven ? 'slide-left' : 'slide-right')}
                      frameStyle="luxury"
                      delay={0.2}
                    />
                  </div>

                  <div className="growing-card-body">
                    <span className="growing-stage-badge text-gold">{item.tag}</span>
                    <h3 className="growing-stage-title font-serif text-gold-gradient">
                      {item.stage}
                    </h3>
                    <h4 className="growing-stage-sub font-editorial">
                      {item.subtitle}
                    </h4>
                    <p className="growing-stage-desc">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
