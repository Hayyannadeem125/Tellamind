import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { TellaMindMark } from './TellaMindMark.jsx';

export function ContactHeroOrbit() {
  const reduceMotion = useReducedMotion();

  return <div className="contact-hero-orbit" aria-hidden="true">
    <div className="contact-hero-orbit-glow" />
    <motion.div
      className="contact-hero-orbit-ring contact-hero-orbit-ring-one"
      animate={reduceMotion ? undefined : { rotate: 360 }}
      transition={reduceMotion ? undefined : { duration: 38, ease: 'linear', repeat: Infinity }}
    />
    <motion.div
      className="contact-hero-orbit-ring contact-hero-orbit-ring-two"
      animate={reduceMotion ? undefined : { rotate: -360 }}
      transition={reduceMotion ? undefined : { duration: 52, ease: 'linear', repeat: Infinity }}
    />
    <motion.div
      className="contact-hero-orbit-core"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <TellaMindMark className="contact-hero-orbit-mark" />
      <span>LET’S TALK</span>
      <small>Michigan · Worldwide</small>
    </motion.div>
    <span className="contact-hero-orbit-dot contact-hero-orbit-dot-one" />
    <span className="contact-hero-orbit-dot contact-hero-orbit-dot-two" />
  </div>;
}
