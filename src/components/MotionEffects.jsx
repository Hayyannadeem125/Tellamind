import React from 'react';
import { motion } from 'motion/react';

const easeOut = [0.22, 1, 0.36, 1];

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

export function Reveal({ as = 'div', children, className, ...props }) {
  const Element = motion[as] || motion.div;
  return <Element className={className} {...props}>{children}</Element>;
}

export function Stagger({ as = 'div', children, className, ...props }) {
  const Element = motion[as] || motion.div;
  return <Element className={className} {...props}>{children}</Element>;
}

export const heroStaggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

export const heroItemVariants = {
  hidden: { opacity: 0, y: 13 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};
