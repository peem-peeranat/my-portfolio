import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { memo, useMemo, useCallback } from 'react';

// Memoized animated image component to prevent re-renders
const AnimatedImage = memo(() => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="relative group w-full max-w-sm sm:max-w-md lg:max-w-lg flex-shrink-0 mx-auto lg:mx-0 order-2 lg:order-1"
  >
    <div className="relative overflow-hidden rounded-2xl aspect-square border border-base-content/10 w-full h-80 sm:h-96 lg:h-[500px] shadow-lg">
      <Image
        src="/About.jpg"
        alt="Peeranat's Profile"
        width={600}
        height={600}
        className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="absolute -z-10 inset-0 translate-x-4 translate-y-4 sm:translate-x-6 sm:translate-y-6 border border-base-content/20 rounded-2xl"></div>
  </motion.div>
));

AnimatedImage.displayName = 'AnimatedImage';

// Memoized animated content wrapper
const AnimatedContent = memo(({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="max-w-2xl flex-1 text-center lg:text-left order-1 lg:order-2"
  >
    {children}
  </motion.div>
));

AnimatedContent.displayName = 'AnimatedContent';



export default function AboutMe() {
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

  // Memoize the image component to prevent any re-renders
  const memoizedImage = useMemo(() => <AnimatedImage key="about-image" />, []);



  return (
    <section id="about" className="section relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-16 sm:py-20 lg:py-24 bg-base-200 overflow-hidden">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center lg:items-start gap-10 sm:gap-12 lg:gap-24 relative z-10">
        {/* Profile Image - memoized to prevent re-renders */}
        {memoizedImage}

        {/* Content - memoized wrapper with language-dependent content inside */}
        <AnimatedContent>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight">
              <span className="text-base-content">{t('aboutMeTitle')}</span>
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-base-content/30 mt-3 sm:mt-4 mx-auto lg:mx-0"></div>
          </div>

          <p className="text-base sm:text-lg text-base-content/80 mb-6 sm:mb-8 leading-relaxed px-2 sm:px-0">
            {t('aboutMeDescription')}
          </p>

          <div className="space-y-4 sm:space-y-6 text-base-content/80 mb-8 sm:mb-12">
            <p className="text-base sm:text-lg leading-relaxed">
              {t('aboutMeParagraph1')}
            </p>

            <p className="text-base sm:text-lg leading-relaxed">
              {t('aboutMeParagraph2')}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
            <motion.button
              onClick={() => smoothScrollTo('projects')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-primary rounded-none px-5 sm:px-6 border border-primary/20 hover:border-primary/40 bg-primary hover:bg-primary/90 text-primary-content transition-all duration-300 ease-in-out glow-on-hover magnetic"
            >
              {t('viewProjects')}
            </motion.button>

            <motion.button
              onClick={() => smoothScrollTo('contact')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="btn btn-outline rounded-none px-5 sm:px-6 border border-base-content/30 hover:border-base-content/50 bg-transparent hover:bg-base-content/5 text-base-content transition-all duration-300 ease-in-out glow-on-hover magnetic"
            >
              {t('contact')}
            </motion.button>
          </div>


        </AnimatedContent>
      </div>
    </section>
  );
}