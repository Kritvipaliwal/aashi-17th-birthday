import React from 'react';
import TheBeginning from './TheBeginning';
import Childhood from './Childhood';
import SlidingMemoryTransition from './SlidingMemoryTransition';
import MemoryPhotoStack from './MemoryPhotoStack';
import GrowingUp from './GrowingUp';
import ChildhoodTo17Transform from './ChildhoodTo17Transform';
import TeenageEra from './TeenageEra';
import Chapter17 from './Chapter17';
import CandleBlowingMoment from '../BirthdayAnimations/CandleBlowingMoment';
import FamilyPhotoString from './FamilyPhotoString';
import SectionQuoteCard from '../common/SectionQuoteCard';
import SurpriseQuoteBreak from '../common/SurpriseQuoteBreak';
import { quotes, surpriseMoments } from '../../data/quotes';

export default function Timeline() {
  return (
    <div className="timeline-master-wrapper">
      {/* 1. Origin: Earliest baby days and family beginnings */}
      <TheBeginning />

      {/* Sibling Scrapbook Quote */}
      <SectionQuoteCard
        text={quotes[0].text}
        author={quotes[0].author}
        subtext={quotes[0].subtext}
        type="emotional"
        rotate="-1.8deg"
      />

      {/* 2. Childhood Polaroids & messy hair days */}
      <Childhood />

      {/* Funny Scrapbook Note */}
      <SectionQuoteCard
        text={quotes[1].text}
        author={quotes[1].author}
        subtext={quotes[1].subtext}
        type="funny"
        rotate="2deg"
      />

      {/* 3. Cinematic Sliding Memory Ribbon between eras */}
      <SlidingMemoryTransition label="Flipping Through The Early Years" />

      {/* 4. Requirement 7: Random Surprise Quote Break over blurred memory */}
      <SurpriseQuoteBreak
        bgPhoto={surpriseMoments[0].bgPhoto}
        line1={surpriseMoments[0].line1}
        line2={surpriseMoments[0].line2}
        punchline={surpriseMoments[0].punchline}
        type="emotional"
        subtleQuote="YOU WILL ALWAYS BE YOU"
      />

      {/* 5. Memory Photo Stack / Family Table Album Effect */}
      <MemoryPhotoStack />

      {/* 6. Dedicated Hanging Family Photo String Installation */}
      <FamilyPhotoString />

      {/* 7. Chronological Growth Milestones */}
      <GrowingUp />

      {/* Teasing Sister Quote */}
      <SectionQuoteCard
        text={quotes[2].text}
        author={quotes[2].author}
        subtext={quotes[2].subtext}
        type="funny"
        rotate="-2.5deg"
      />

      {/* 7. Childhood to 17 Transformation: 'You grew up... but somehow, you were always you.' */}
      <ChildhoodTo17Transform />

      {/* 8. Teenage Glow & Style Era */}
      <TeenageEra />

      {/* 9. Requirement 8: Funny Interruption Screen ("She is still annoying") */}
      <SurpriseQuoteBreak
        bgPhoto={surpriseMoments[1].bgPhoto}
        line1={surpriseMoments[1].line1}
        line2={surpriseMoments[1].line2}
        punchline={surpriseMoments[1].punchline}
        type="interruption"
        subtleQuote="CERTIFIED 100% SISTER"
      />

      {/* 10. Special Candle-Blowing Cake Moment with sequential narrative & candlelight aura */}
      <CandleBlowingMoment />

      {/* 11. Chapter 17 Grand Feature */}
      <Chapter17 />
    </div>
  );
}
