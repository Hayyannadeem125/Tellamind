import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const easeOut = [0.22, 1, 0.36, 1];

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: easeOut },
  },
};

const staggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.075, delayChildren: 0.035 } },
};

export function Reveal({ as = 'div', children, className, delay = 0, distance = 16, ...props }) {
  const Element = motion[as] || motion.div;
  const reduceMotion = useReducedMotion();

  return <Element
    className={className}
    initial={reduceMotion ? false : { opacity: 0, y: distance }}
    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.14, margin: '0px 0px -36px 0px' }}
    transition={{ duration: 0.52, delay, ease: easeOut }}
    {...props}
  >{children}</Element>;
}

export function Stagger({ as = 'div', children, className, ...props }) {
  const Element = motion[as] || motion.div;
  const reduceMotion = useReducedMotion();

  return <Element
    className={className}
    initial={reduceMotion ? false : 'hidden'}
    whileInView={reduceMotion ? undefined : 'visible'}
    viewport={{ once: true, amount: 0.12, margin: '0px 0px -30px 0px' }}
    variants={staggerVariants}
    {...props}
  >{children}</Element>;
}

export const heroStaggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

export const heroItemVariants = {
  hidden: { opacity: 0, y: 13 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
};
