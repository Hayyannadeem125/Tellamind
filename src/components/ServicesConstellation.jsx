import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TellaMindMark } from './TellaMindMark.jsx';

export function ServicesConstellation() {
  const reduceMotion = useReducedMotion();

  return <div className="services-constellation" aria-hidden="true">
    <div className="services-constellation-halo" />
    <motion.div
      className="services-constellation-orbit services-constellation-orbit-one"
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={reduceMotion ? undefined : { duration: 34, ease: 'linear', repeat: Infinity }}
    />
    <motion.div
      className="services-constellation-orbit services-constellation-orbit-two"
      animate={reduceMotion ? undefined : { rotate: -360 }}
      transition={reduceMotion ? undefined : { duration: 48, ease: 'linear', repeat: Infinity }}
    />
    <motion.div
      className="services-constellation-core"
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0 }}
    >
      <TellaMindMark className="services-constellation-mark" />
      <span>Thoughtful technology</span>
    </motion.div>
    <span className="services-constellation-spark services-constellation-spark-one" />
    <span className="services-constellation-spark services-constellation-spark-two" />
  </div>;
}
