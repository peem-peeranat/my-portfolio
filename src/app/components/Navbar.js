import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FiBriefcase, FiFolder, FiGrid, FiHome, FiMail, FiSliders, FiUser } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from './ThemeProvider';
import { useMotionPreference } from './TiltSurface';

const links = [
  ['home', 'hero', FiHome],
  ['about', 'about', FiUser],
  ['work', 'experience', FiBriefcase],
  ['skills', 'skills', FiGrid],
  ['projects', 'projects', FiFolder],
  ['contact', 'contact', FiMail],
];

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const settingsButton = useRef(null);
  const navigation = useRef(null);
  const reduceMotion = useMotionPreference();

  const closeSettings = (restoreFocus = false) => {
    setIsSettingsOpen(false);
    if (restoreFocus) window.requestAnimationFrame(() => settingsButton.current?.focus());
  };

  useEffect(() => {
    if (!isSettingsOpen) return undefined;
    const frame = requestAnimationFrame(() => navigation.current?.querySelector('.utility-button')?.focus({ preventScroll: true }));
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsSettingsOpen(false);
        settingsButton.current?.focus({ preventScroll: true });
      }
    };
    const closeOutside = (event) => {
      if (!navigation.current?.contains(event.target)) setIsSettingsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('pointerdown', closeOutside);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('pointerdown', closeOutside);
    };
  }, [isSettingsOpen]);

  useEffect(() => {
    const sections = links.map(([, id]) => document.getElementById(id)).filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      // Read the section crossing the upper third of the screen, regardless of
      // its height. A tall pinned Skills stage cannot reach ratio thresholds.
      const readingLine = window.innerHeight * 0.35;
      let current = sections[0]?.id ?? 'hero';
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) current = section.id;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = 'contact';
      setActiveSection((previous) => previous === current ? previous : current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    window.addEventListener('hashchange', schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('hashchange', schedule);
    };
  }, []);

  const compactLabels = language === 'th'
    ? ['หน้าแรก', 'รู้จัก', 'งาน', 'ทักษะ', 'ผลงาน', 'ติดต่อ']
    : ['Home', 'About', 'Career', 'Skills', 'Work', 'Contact'];

  return (
    <header className="site-header">
      <nav ref={navigation} className="site-nav" aria-label="Primary navigation" onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsSettingsOpen(false);
      }}>
        <div className="nav-dock">
          {links.map(([label, target, Icon], index) => (
            <motion.a
              key={target}
              href={`#${target}`}
              className="dock-link"
              aria-label={t(label)}
              title={t(label)}
              onClick={() => closeSettings()}
              aria-current={activeSection === target ? 'location' : undefined}
              whileTap={reduceMotion ? undefined : { scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 420, damping: 22 }}
            >
              <span className="dock-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <Icon className="dock-icon" aria-hidden="true" />
              <span className="dock-label" aria-hidden="true">{t(label)}</span>
              <span className="dock-label-compact" aria-hidden="true">{compactLabels[index]}</span>
            </motion.a>
          ))}
          <button
            ref={settingsButton}
            type="button"
            className="dock-link dock-settings"
            onClick={() => setIsSettingsOpen((open) => !open)}
            aria-expanded={isSettingsOpen}
            aria-controls="interface-settings"
            aria-label={isSettingsOpen ? 'Close interface settings' : 'Open interface settings'}
          >
            <FiSliders className="dock-icon" aria-hidden="true" />
            <span className="dock-settings-label">{language.toUpperCase()}</span>
          </button>
        </div>

        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              id="interface-settings"
              className="nav-panel"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : 8, scale: reduceMotion ? 1 : 0.98 }}
              transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="nav-panel-label">{language === 'th' ? 'ปรับการแสดงผล' : 'Make yourself at home.'}</p>
              <div className="nav-utilities">
                <button type="button" className="utility-button" onClick={toggleLanguage} aria-label={`Switch language, current ${language.toUpperCase()}`}>
                  <span>LANGUAGE</span><b>{language === 'en' ? 'ไทย' : 'EN'}</b>
                </button>
                <button type="button" className="utility-button theme-button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
                  <span>APPEARANCE</span><b>{theme === 'light' ? 'DARK' : 'LIGHT'}</b>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
