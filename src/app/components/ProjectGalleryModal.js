import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

export default function ProjectGalleryModal({ isOpen, onClose, title, images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 });
  const viewportRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, scrollLeft: 0, scrollTop: 0 });
  const total = images.length;
  const hasMultiple = total > 1;

  const clampZoom = (value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

  const zoomIn = useCallback(() => {
    setZoom((value) => clampZoom(Number((value + ZOOM_STEP).toFixed(2))));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((value) => clampZoom(Number((value - ZOOM_STEP).toFixed(2))));
  }, []);

  const resetZoom = useCallback(() => setZoom(1), []);

  const resetViewportScroll = useCallback(() => {
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.scrollTo({ top: 0, left: 0 });
    }
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((index) => (index === 0 ? total - 1 : index - 1));
    setZoom(1);
  }, [total]);

  const goToNext = useCallback(() => {
    setCurrentIndex((index) => (index === total - 1 ? 0 : index + 1));
    setZoom(1);
  }, [total]);

  const goToIndex = (index) => {
    if (index === currentIndex) return;
    setCurrentIndex(index);
    setZoom(1);
  };

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setZoom(1);
    }
  }, [isOpen, title]);

  useEffect(() => {
    resetViewportScroll();
  }, [currentIndex, resetViewportScroll]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!isOpen || !viewport) return;

    const updateSize = () => {
      setViewportSize({ w: viewport.clientWidth, h: viewport.clientHeight });
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key === 'ArrowLeft') goToPrevious();
      if (event.key === 'ArrowRight') goToNext();
      if (event.key === '+' || event.key === '=') zoomIn();
      if (event.key === '-') zoomOut();
      if (event.key === '0') resetZoom();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, goToPrevious, goToNext, zoomIn, zoomOut, resetZoom]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!isOpen || !viewport) return;

    const handleWheel = (event) => {
      if (!event.ctrlKey && !event.metaKey) return;

      event.preventDefault();
      if (event.deltaY < 0) {
        setZoom((value) => clampZoom(Number((value + ZOOM_STEP).toFixed(2))));
      } else {
        setZoom((value) => clampZoom(Number((value - ZOOM_STEP).toFixed(2))));
      }
    };

    viewport.addEventListener('wheel', handleWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', handleWheel);
  }, [isOpen, currentIndex]);

  const handlePointerDown = (event) => {
    if (zoom <= 1 || event.button !== 0) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    isDraggingRef.current = true;
    dragStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      scrollLeft: viewport.scrollLeft,
      scrollTop: viewport.scrollTop,
    };
    viewport.setPointerCapture(event.pointerId);
    viewport.style.cursor = 'grabbing';
  };

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const deltaX = event.clientX - dragStartRef.current.x;
    const deltaY = event.clientY - dragStartRef.current.y;
    viewport.scrollLeft = dragStartRef.current.scrollLeft - deltaX;
    viewport.scrollTop = dragStartRef.current.scrollTop - deltaY;
  };

  const handlePointerUp = (event) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    const viewport = viewportRef.current;
    if (viewport) {
      viewport.releasePointerCapture(event.pointerId);
      viewport.style.cursor = zoom > 1 ? 'grab' : 'default';
    }
  };

  const currentImage = images[currentIndex];
  const zoomPercent = Math.round(zoom * 100);
  const contentWidth = Math.max(viewportSize.w, viewportSize.w * zoom);
  const contentHeight = Math.max(viewportSize.h, viewportSize.h * zoom);
  const canPan = zoom > 1;

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-stretch justify-center p-1 sm:p-2"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <button
            type="button"
            className="absolute inset-0 bg-base-content/85 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close gallery"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative z-10 w-full h-full max-w-[99vw] max-h-[98vh] flex flex-col bg-base-100 border border-base-content/10 rounded-lg sm:rounded-xl shadow-2xl overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 px-3 sm:px-5 py-2.5 sm:py-3 border-b border-base-content/10 shrink-0">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-lg font-medium text-base-content truncate" data-font="english">
                  {title}
                </h3>
                <p className="text-xs text-base-content/60 mt-0.5" data-font="english">
                  {hasMultiple ? `${currentIndex + 1} / ${total} · ` : ''}
                  Zoom {zoomPercent}%
                  {canPan ? ' · Scroll or drag to pan' : ''}
                </p>
              </div>

              <div className="flex items-center gap-1 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoom <= MIN_ZOOM}
                  className="btn btn-sm btn-ghost rounded-lg min-w-9"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={resetZoom}
                  className="btn btn-sm btn-ghost rounded-lg hidden sm:inline-flex min-w-[4.5rem]"
                  aria-label="Reset zoom"
                  data-font="english"
                >
                  {zoomPercent}%
                </button>
                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoom >= MAX_ZOOM}
                  className="btn btn-sm btn-ghost rounded-lg min-w-9"
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-sm btn-ghost rounded-lg min-w-9 ml-1"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="relative flex-1 min-h-0 bg-base-200/40">
              {hasMultiple && (
                <div className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goToPrevious();
                    }}
                    className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-base-100/95 border border-base-content/10 shadow-lg text-xl sm:text-2xl text-base-content hover:bg-base-100 transition-colors"
                    aria-label="Previous screenshot"
                  >
                    ‹
                  </button>
                </div>
              )}

              <div
                ref={viewportRef}
                className={`absolute inset-0 overflow-auto overscroll-contain touch-pan-x touch-pan-y ${canPan ? 'cursor-grab' : ''}`}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
              >
                <div className="inline-block min-w-full min-h-full">
                  <div
                    className="relative mx-auto"
                    style={{
                      width: contentWidth || '100%',
                      height: contentHeight || '100%',
                      minWidth: viewportSize.w || undefined,
                      minHeight: viewportSize.h || undefined,
                    }}
                  >
                    <Image
                      key={currentImage}
                      src={currentImage}
                      alt={`${title} screenshot ${currentIndex + 1}`}
                      fill
                      className="object-contain object-center select-none pointer-events-none"
                      sizes="100vw"
                      priority
                      draggable={false}
                    />
                  </div>
                </div>
              </div>

              {hasMultiple && (
                <div className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      goToNext();
                    }}
                    className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-base-100/95 border border-base-content/10 shadow-lg text-xl sm:text-2xl text-base-content hover:bg-base-100 transition-colors"
                    aria-label="Next screenshot"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>

            {hasMultiple && (
              <div className="shrink-0 px-3 sm:px-5 py-2 border-t border-base-content/10 overflow-x-auto">
                <div className="flex gap-2 min-w-max">
                  {images.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => goToIndex(index)}
                      className={`relative w-14 h-9 sm:w-20 sm:h-12 rounded-md overflow-hidden border-2 transition-all shrink-0 ${
                        index === currentIndex
                          ? 'border-primary ring-2 ring-primary/30'
                          : 'border-base-content/10 opacity-70 hover:opacity-100'
                      }`}
                      aria-label={`Go to screenshot ${index + 1}`}
                      aria-current={index === currentIndex}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-cover object-top"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
