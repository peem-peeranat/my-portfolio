import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.25;

export default function ProjectGalleryModal({ isOpen, onClose, title, images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const dialogRef = useRef(null);
  const previousFocusRef = useRef(null);
  const total = images.length;
  const hasMultiple = total > 1;
  const currentImage = images[currentIndex];

  const goTo = useCallback((index) => {
    setCurrentIndex((index + total) % total);
    setZoom(1);
  }, [total]);

  const goPrevious = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + total) % total);
    setZoom(1);
  }, [total]);

  const goNext = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % total);
    setZoom(1);
  }, [total]);

  useEffect(() => {
    if (!isOpen) return;
    previousFocusRef.current = document.activeElement;
    setCurrentIndex(0);
    setZoom(1);
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && hasMultiple) goPrevious();
      if (event.key === 'ArrowRight' && hasMultiple) goNext();
      if (event.key === '+' || event.key === '=') setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP));
      if (event.key === '-') setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP));
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    requestAnimationFrame(() => dialogRef.current?.querySelector('[data-autofocus]')?.focus());
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, onClose, hasMultiple, goPrevious, goNext]);

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div className="gallery-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
          <motion.div ref={dialogRef} className="gallery-dialog" role="dialog" aria-modal="true" aria-labelledby="gallery-title" data-lenis-prevent initial={{ opacity: 0, scale: 0.985 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.985 }} onMouseDown={(event) => event.stopPropagation()}>
            <header className="gallery-header">
              <div><p id="gallery-title">{title}</p><span>{hasMultiple ? `${currentIndex + 1} / ${total}` : '01 / 01'} · {Math.round(zoom * 100)}%</span></div>
              <div className="gallery-controls">
                <button type="button" onClick={() => setZoom((value) => Math.max(MIN_ZOOM, value - ZOOM_STEP))} disabled={zoom <= MIN_ZOOM} aria-label="Zoom out">−</button>
                <button type="button" onClick={() => setZoom(1)} aria-label="Reset zoom">100%</button>
                <button type="button" onClick={() => setZoom((value) => Math.min(MAX_ZOOM, value + ZOOM_STEP))} disabled={zoom >= MAX_ZOOM} aria-label="Zoom in">+</button>
                <button type="button" data-autofocus onClick={onClose} aria-label="Close gallery">×</button>
              </div>
            </header>
            <div className="gallery-stage">
              {hasMultiple && <button type="button" className="gallery-direction previous" onClick={goPrevious} aria-label="Previous screenshot">←</button>}
              <div className="gallery-image-wrap"><Image src={currentImage} alt={`${title} screenshot ${currentIndex + 1}`} fill priority sizes="100vw" className="gallery-image" style={{ transform: `scale(${zoom})` }} /></div>
              {hasMultiple && <button type="button" className="gallery-direction next" onClick={goNext} aria-label="Next screenshot">→</button>}
            </div>
            {hasMultiple && <div className="gallery-thumbnails">{images.map((src, index) => <button key={src} type="button" className={index === currentIndex ? 'is-current' : ''} onClick={() => goTo(index)} aria-label={`View screenshot ${index + 1}`} aria-current={index === currentIndex}><Image src={src} alt="" fill sizes="88px" /></button>)}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
