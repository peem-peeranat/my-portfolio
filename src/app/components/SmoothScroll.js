'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

let pageScroller = null;

export function scrollPageTo(top) {
  if (pageScroller) pageScroller.scrollTo(top, { duration: 0.7 });
  else window.scrollTo({ top, behavior: 'instant' });
}

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      anchors: { offset: -76 },
      duration: 1.05,
      easing: (value) => 1 - Math.pow(1 - value, 4),
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
      stopInertiaOnNavigate: true,
      respectReducedMotion: true,
    });

    pageScroller = lenis;
    return () => {
      if (pageScroller === lenis) pageScroller = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
