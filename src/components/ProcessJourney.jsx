import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TellaMindMark } from './TellaMindMark.jsx';

export function ProcessJourney() {
  const reduceMotion = useReducedMotion();

  return <div className="process-journey" aria-hidden="true">
    <div className="process-journey-glow" />
    <motion.div
      className="process-journey-ring process-journey-ring-one"
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={reduceMotion ? undefined : { duration: 38, ease: 'linear', repeat: Infinity }}
    />
    <motion.div
      className="process-journey-ring process-journey-ring-two"
      animate={reduceMotion ? undefined : { rotate: -360 }}
      transition={reduceMotion ? undefined : { duration: 54, ease: 'linear', repeat: Infinity }}
    />
    <div className="process-journey-center">
      <TellaMindMark className="process-journey-mark" />
      <b>Idea <span>→</span> launch</b>
      <small>A clear, shared path</small>
    </div>
    <span className="process-journey-star process-journey-star-one" />
    <span className="process-journey-star process-journey-star-two" />
  </div>;
}
