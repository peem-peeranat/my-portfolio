import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { scrollPageTo } from './SmoothScroll';

const skillGroups = [
  ['Frontend', ['Next.js', 'React', 'TypeScript', 'SvelteKit', 'Redux Toolkit', 'TanStack Query', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'Material UI', 'Bootstrap']],
  ['Backend & Databases', ['Elixir', 'Phoenix', 'Node.js', 'Express.js', 'Prisma', 'PostgreSQL', 'RESTful API', 'GraphQL', 'MySQL', 'SQL', 'NoSQL', 'Firebase']],
  ['CMS & Tools', ['Wordpress', 'Webflow', 'Strapi', 'Git & GitHub', 'Google Analytics 4', 'Google Tag Manager']],
  ['Testing & Tooling', ['Jest', 'Cypress', 'Playwright', 'Vitest', 'Bun', 'Zod']],
  ['Design & Video', ['Photoshop', 'Premiere Pro', 'After Effects', 'DaVinci Resolve']],
];

const horizontalQuery = '(min-width: 761px) and (min-height: 620px) and (prefers-reduced-motion: no-preference)';
const pinTop = 64;

// Each group has a reading interval before moving; the final group gets a full interval.
function panelAtProgress(progress) {
  const position = Math.max(0, Math.min(progress, 1)) * skillGroups.length;
  const panel = Math.min(Math.floor(position), skillGroups.length - 1);
  if (panel === skillGroups.length - 1) return panel;
  const transition = Math.max(0, Math.min((position - panel - 0.42) / 0.58, 1));
  return panel + transition * transition * (3 - 2 * transition);
}

export default function Skills() {
  const { t, language } = useLanguage();
  const stageRef = useRef(null);
  const [layout, setLayout] = useState({ width: 0, distance: 0 });
  const [activeGroup, setActiveGroup] = useState(0);
  const horizontal = layout.width > 0;
  // Match the exact CSS pin start and release: the frame stays below the 64px nav.
  const { scrollYProgress } = useScroll({ target: stageRef, offset: ['start 64px', 'end end'] });
  const x = useTransform(scrollYProgress, (progress) => -panelAtProgress(progress) * layout.width);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    setActiveGroup(Math.round(panelAtProgress(progress)));
  });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;
    const media = window.matchMedia(horizontalQuery);
    const measure = () => {
      const width = media.matches ? stage.clientWidth : 0;
      const distance = width ? Math.round(Math.max(520, window.innerHeight * 0.9) * skillGroups.length) : 0;
      setLayout((previous) => previous.width === width && previous.distance === distance ? previous : { width, distance });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    media.addEventListener('change', measure);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      media.removeEventListener('change', measure);
      window.removeEventListener('resize', measure);
    };
  }, []);

  const selectGroup = (index) => {
    const stage = stageRef.current;
    if (!stage || !horizontal) return;
    const start = stage.getBoundingClientRect().top + window.scrollY - pinTop;
    scrollPageTo(start + ((index + 0.2) / skillGroups.length) * layout.distance);
  };

  return (
    <section id="skills" className={`site-section skills-section${horizontal ? ' is-horizontal' : ''}`} aria-labelledby="skills-title">
      <div className="section-marker"><span>04</span><span>TOOLKIT</span></div>
      <div ref={stageRef} className="skills-scroll-stage" style={horizontal ? { '--skills-distance': `${layout.distance}px` } : undefined}>
        <div className="skills-scroll-sticky">
          <div className="section-header-wide skills-heading">
            <div><p className="eyebrow">CAPABILITIES / 03</p><h2 id="skills-title" className="display local-display">{t('skills')}</h2></div>
            <p>{t('skillsDescription')}</p>
          </div>
          <div className="skills-window">
            <motion.div className="skills-list" style={horizontal ? { x, width: layout.width * skillGroups.length } : { x: 0, width: '100%' }}>
              {skillGroups.map(([category, skills], index) => (
                <article id={`skill-group-${index + 1}`} key={category} className="skill-group" style={horizontal ? { width: layout.width } : undefined}>
                  <div className="skill-group-heading">
                    <span className="skill-number">0{index + 1} / 0{skillGroups.length}</span>
                    <h3>{category}</h3>
                  </div>
                  <ul className="skill-technologies">
                    {skills.map((skill) => <li key={skill}>{skill}</li>)}
                  </ul>
                </article>
              ))}
            </motion.div>
          </div>
          {horizontal && (
            <div className="skills-navigation">
              <div className="skills-reading-hint"><span>{language === 'th' ? 'เลื่อนเพื่อสำรวจทักษะ' : 'SCROLL TO EXPLORE'}</span><span aria-hidden="true">{String(activeGroup + 1).padStart(2, '0')} / 05 ↔</span></div>
              <div className="skills-selectors" role="group" aria-label={language === 'th' ? 'เลือกกลุ่มทักษะ' : 'Select skill group'}>
                {skillGroups.map(([category], index) => (
                  <button type="button" key={category} onClick={() => selectGroup(index)} aria-current={activeGroup === index ? 'step' : undefined} aria-controls={`skill-group-${index + 1}`}>
                    <span className="skill-selector-number">0{index + 1}</span><span>{category}</span>
                  </button>
                ))}
              </div>
              <div className="skills-track-progress" aria-hidden="true"><motion.span style={{ scaleX: scrollYProgress }} /></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
