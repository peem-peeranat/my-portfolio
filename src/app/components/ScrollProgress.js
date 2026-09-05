'use client';

import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.25 });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.span style={{ scaleY: progress }} />
    </div>
  );
}
