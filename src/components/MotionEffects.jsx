import React from 'react';

export const staggerItemVariants = {
  // Keep content visible from first paint; reveal-on-scroll caused blank gaps
  // when users scrolled quickly through long pages.
  hidden: { opacity: 1, y: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0 },
  },
};

export function Reveal({ as = 'div', children, className, ...props }) {
  const Element = as;
  return <Element className={className} {...props}>{children}</Element>;
}

export function Stagger({ as = 'div', children, className, ...props }) {
  const Element = as;
  return <Element className={className} {...props}>{children}</Element>;
}

export const heroStaggerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

export const heroItemVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};
