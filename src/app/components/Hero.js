import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import TiltSurface, { useMotionPreference } from './TiltSurface';

const socialLinks = [
  ['LinkedIn', 'https://www.linkedin.com/in/peeranat-rattanakulpermpoon-854141272/'],
  ['GitHub', 'https://github.com/peem-peeranat'],
  ['Instagram', 'https://www.instagram.com/peanut.prn/'],
];

export default function Hero() {
  const { t } = useLanguage();
  const reduceMotion = useMotionPreference();
  const { scrollY } = useScroll();
  const imageOffset = useTransform(scrollY, [0, 900], [0, 64]);
  const copyOffset = useTransform(scrollY, [0, 900], [0, -22]);
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.65, ease: [0.16, 1, 0.3, 1] };

  return (
    <section id="hero" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-grid">
        <motion.div className="hero-kicker" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
          <span>01 / INTRODUCTION</span>
          <span>BANGKOK, THAILAND</span>
        </motion.div>

        <h1 id="hero-title" className="display hero-title" aria-label="Full Stack Developer for reliable workflows">
          {['FULL–STACK', 'DEVELOPER', 'FOR RELIABLE', 'WORKFLOWS'].map((line, index) => (
            <span key={line} className="hero-title-line">
              <motion.span
                initial={{ opacity: 0, y: reduceMotion ? 0 : '105%', rotateX: reduceMotion ? 0 : 28 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                style={{ transformPerspective: 1000 }}
                transition={{ ...transition, delay: reduceMotion ? 0 : 0.1 + index * 0.09 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="hero-image-frame motion-portrait"
          style={{ y: reduceMotion ? 0 : imageOffset, transformPerspective: 1200 }}
          initial={{ opacity: 0, rotateY: reduceMotion ? 0 : -14, scale: reduceMotion ? 1 : 0.95 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          transition={{ ...transition, duration: reduceMotion ? 0 : 0.95, delay: reduceMotion ? 0 : 0.32 }}
        >
          <TiltSurface intensity={8}>
            <Image src="/Profile.jpg" alt="Peeranat Rattanakulpermpoon" fill priority sizes="(max-width: 768px) 88vw, 29vw" className="hero-image" />
            <span className="image-caption">PEERANAT / 2026</span>
          </TiltSurface>
        </motion.div>

        <motion.div className="hero-intro" style={{ y: reduceMotion ? 0 : copyOffset }} initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }} animate={{ opacity: 1, y: 0 }} transition={{ ...transition, delay: reduceMotion ? 0 : 0.5 }}>
          <p>{t('heroDescription')}</p>
          <div className="hero-actions">
            <a className="text-link accent-link" href="#projects">{t('viewProjects')} <span aria-hidden="true">↘</span></a>
            <a className="text-link" href="#about">{t('aboutMe')} <span aria-hidden="true">↓</span></a>
          </div>
        </motion.div>

        <div className="hero-footer-meta">
          <span>{t('currentlyAvailable')}</span>
          <div className="hero-socials" aria-label="Social media links">
            {socialLinks.map(([label, href]) => <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label}</a>)}
          </div>
        </div>
      </div>
    </section>
  );
}
