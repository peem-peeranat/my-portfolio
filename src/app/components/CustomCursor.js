'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef(null);
  const rafRef = useRef(null);

  const updateMousePosition = useCallback((e) => {
    if (!isVisible) {
      setIsVisible(true);
    }

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, [isVisible]);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', updateMousePosition, { passive: true });

    const handleDocumentMouseLeave = () => {
      setIsVisible(false);
    };

    const handleDocumentMouseEnter = () => {
      setIsVisible(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      }
    };

    document.addEventListener('mouseleave', handleDocumentMouseLeave);
    document.addEventListener('mouseenter', handleDocumentMouseEnter);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .btn, .link, input, textarea, .nav-link');

    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter, { passive: true });
      element.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    });

    return () => {
      document.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleDocumentMouseLeave);
      document.removeEventListener('mouseenter', handleDocumentMouseEnter);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateMousePosition, handleMouseEnter, handleMouseLeave]);

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
      style={{
        transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
        opacity: isVisible ? 1 : 0,
        transition: isVisible ? 'opacity 0.1s ease' : 'none',
      }}
    />
  );
} 