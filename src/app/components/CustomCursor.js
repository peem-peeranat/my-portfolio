'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [data-cursor]';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const frameRef = useRef(null);
  const activeTargetRef = useRef(null);
  const [cursor, setCursor] = useState({ visible: false, interactive: false, label: '' });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const pointer = window.matchMedia('(pointer: fine)');
    if (!pointer.matches || reduceMotion) return undefined;

    const body = document.body;
    body.classList.add('has-custom-cursor');

    const setCursorState = (target) => {
      if (target === activeTargetRef.current) return;
      activeTargetRef.current = target;
      setCursor((current) => ({ ...current, interactive: Boolean(target), label: target?.dataset.cursor ?? '' }));
    };

    const handlePointerMove = (event) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        cursorRef.current?.style.setProperty('transform', `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      });
      setCursor((current) => current.visible ? current : { ...current, visible: true });
    };

    const handlePointerOver = (event) => setCursorState(event.target.closest(interactiveSelector));
    const hideCursor = () => setCursor((current) => current.visible ? { ...current, visible: false } : current);
    const showCursor = () => setCursor((current) => current.visible ? current : { ...current, visible: true });
    const handleVisibilityChange = () => { if (document.hidden) hideCursor(); };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerover', handlePointerOver, { passive: true });
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      body.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerover', handlePointerOver);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [reduceMotion]);

  return (
    <div ref={cursorRef} className={`custom-cursor${cursor.visible ? ' is-visible' : ''}${cursor.interactive ? ' is-interactive' : ''}${cursor.label ? ' has-label' : ''}`} aria-hidden="true">
      <span className="custom-cursor-dot" />
      <span className="custom-cursor-ring">{cursor.label}</span>
    </div>
  );
}
