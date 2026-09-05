'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState, useSyncExternalStore } from 'react';
import './motion.css';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

function subscribeToMotionPreference(onChange) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

function getMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

// Keep changes made in the operating system effective without reloading the page.
export function useMotionPreference() {
  return useSyncExternalStore(subscribeToMotionPreference, getMotionPreference, () => false);
}

export default function TiltSurface({ children, className = '', intensity = 7 }) {
  const reduceMotion = useMotionPreference();
  const [finePointer, setFinePointer] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(pointerX, { stiffness: 180, damping: 23, mass: 0.6 });
  const rotateY = useSpring(pointerY, { stiffness: 180, damping: 23, mass: 0.6 });
  const enabled = finePointer && !reduceMotion;

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFinePointer(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (enabled) return;
    pointerX.set(0);
    pointerY.set(0);
    rotateX.jump(0);
    rotateY.jump(0);
  }, [enabled, pointerX, pointerY, rotateX, rotateY]);

  const reset = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const followPointer = (event) => {
    if (!enabled || event.pointerType === 'touch') return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    if (!width || !height) return;
    const x = Math.max(-1, Math.min(1, ((event.clientX - left) / width - 0.5) * 2));
    const y = Math.max(-1, Math.min(1, ((event.clientY - top) / height - 0.5) * 2));
    pointerX.set(-y * intensity);
    pointerY.set(x * intensity);
  };

  return (
    <div
      className={`tilt-surface ${className}`}
      data-tilt-enabled={enabled ? 'true' : 'false'}
      onPointerMove={followPointer}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onFocusCapture={reset}
    >
      <motion.div
        className="tilt-plane"
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
      >
        {children}
      </motion.div>
    </div>
  );
}
