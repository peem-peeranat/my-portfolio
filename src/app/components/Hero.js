import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useState, useEffect } from 'react';

// Separate component for animated image that doesn't change with language
const AnimatedImage = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="relative group max-w-sm sm:max-w-md mx-auto lg:mx-0"
  >
    <div className="relative overflow-hidden rounded-2xl aspect-square border border-base-content/10 shadow-lg">
      <Image
        src="/Profile.jpg"
        alt="Profile"
        width={600}
        height={600}
        className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 border border-base-content/20 rounded-2xl"></div>
  </motion.div>
);

// Separate component for animated content that doesn't change with language
const AnimatedContent = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="max-w-2xl text-center lg:text-left"
  >
    {children}
  </motion.div>
);

export default function Hero() {
  const { t } = useLanguage();

  // Smooth scroll function
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      });
    }
  };

  return (
    <div id="hero" className="hero section min-h-screen bg-base-200 overflow-hidden relative">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 sm:gap-12 lg:gap-24 relative z-10 px-4 sm:px-8 pt-20 lg:pt-0">
        <AnimatedImage />

        <AnimatedContent>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4 sm:mb-6">
            <span className="text-base-content">{t('hello')} </span>
            <span className="font-semibold text-base-content" data-font="english">Peeranat</span>
          </h1>

          <p className="text-base sm:text-lg text-base-content/80 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
            {t('heroDescription')}
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
            <motion.button
              onClick={() => smoothScrollTo('projects')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary btn-lg rounded-none px-6 sm:px-8 border border-primary/20 hover:border-primary/40 bg-primary hover:bg-primary/90 text-primary-content transition-all duration-300 ease-in-out glow-on-hover magnetic"
            >
              {t('viewProjects')}
            </motion.button>

            <motion.button
              onClick={() => smoothScrollTo('about')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline btn-lg rounded-none px-6 sm:px-8 border border-base-content/30 hover:border-base-content/50 bg-transparent hover:bg-base-content/5 text-base-content transition-all duration-300 ease-in-out glow-on-hover magnetic"
            >
              {t('aboutMe')}
            </motion.button>
          </div>

          <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-base-content/10">
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-6 text-sm">
              <span className="text-base-content/60">{t('currentlyAvailable')}</span>
              <div className="flex gap-3 sm:gap-4">
                {[
                  { label: 'Facebook', href: 'https://www.facebook.com/peem.peeranat.588954/' },
                  { label: 'Instagram', href: 'https://www.instagram.com/peanut.prn/' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/peeranat-rattanakulpermpoon-854141272/' },
                  { label: 'GitHub', href: 'https://github.com/peem-peeranat' }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => window.open(item.href, '_blank')}
                    className="link text-base-content/70 hover:text-base-content transition-colors duration-300 hover:scale-105 glow-on-hover"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </AnimatedContent>
      </div>

      {/* Scroll indicator - more subtle */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
        <motion.button
          onClick={() => smoothScrollTo('about')}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-base-content/30 hover:text-base-content/50 transition-colors duration-300 hover:scale-110"
        >
          <svg width="20" height="20" className="sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}