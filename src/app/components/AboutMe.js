import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function AboutMe() {
  const { t } = useLanguage();

  return (
    <section id="about" className="site-section about-section" aria-labelledby="about-title">
      <div className="section-marker"><span>02</span><span>PROFILE</span></div>
      <div className="about-layout">
        <motion.div className="section-heading" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6 }}>
          <p className="eyebrow">ABOUT / 01</p>
          <h2 id="about-title" className="display local-display">{t('aboutMeTitle')}</h2>
        </motion.div>

        <motion.div className="about-copy" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.6, delay: 0.08 }}>
          <p className="lead-copy">{t('aboutMeDescription')}</p>
          <p>{t('aboutMeParagraph1')}</p>
          <p>{t('aboutMeParagraph2')}</p>
          <div className="about-links">
            <a className="text-link accent-link" href="#projects">{t('viewProjects')} <span aria-hidden="true">↘</span></a>
            <a className="text-link" href="#contact">{t('contact')} <span aria-hidden="true">↘</span></a>
          </div>
        </motion.div>

        <motion.figure className="about-image-frame" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: 0.16 }}>
          <Image src="/About.jpg" alt="Peeranat at work" fill sizes="(max-width: 768px) 100vw, 40vw" className="about-image" />
          <figcaption>DETAIL-ORIENTED / SYSTEM-MINDED</figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
