import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TellaMindMark } from './TellaMindMark.jsx';
import { AnimatedShaderBackground } from './AnimatedShaderBackground.jsx';

export function WorkHeroOrbit() {
  const reduceMotion = useReducedMotion();

  return <div className="work-hero-orbit" aria-hidden="true">
    <AnimatedShaderBackground />
    <div className="work-orbit-glow" />
    <div className="work-orbit-ring work-orbit-ring-one"><i /></div>
    <div className="work-orbit-ring work-orbit-ring-two"><i /></div>
    <div className="work-orbit-ring work-orbit-ring-three"><i /></div>
    <motion.div
      className="work-orbit-core"
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0 }}
    >
      <TellaMindMark className="work-orbit-mark" />
      <span>Ideas in motion</span>
    </motion.div>
    <span className="work-orbit-spark work-orbit-spark-one" />
    <span className="work-orbit-spark work-orbit-spark-two" />
  </div>;
}
