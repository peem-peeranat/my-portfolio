import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

const experiences = [
  { year: 'Jul 2025 - Present', title: 'Full Stack Developer', company: 'Siamraj Public Company Limited', description: ['Ship enterprise workflow and document platforms at Siamraj for PTTGC and KB J Capital clients', 'E-Flow (PTTGC): Built and maintained Next.js 15 + React features — workflow builder, approval flows, paper forms, and reporting (Redux Toolkit, Prisma)', 'DDMS (KB J Capital): Delivered SvelteKit 5 + TypeScript features and full-stack fixes on Elixir/Phoenix — dynamic forms, approval workflows, report aggregation, and paper-form flows', 'Fixed production workflow bugs across frontend and backend — approver step labels, request-change flows, draft attachment sync, and report total consistency', 'Maintained quality with Jest, Cypress, Vitest, and Playwright; collaborated via GitHub Issues, pull requests, and code review'] },
  { year: 'Jul 2024 - Apr 2025', title: 'Front End Developer', company: 'ADOP', description: ['Developed and maintained WordPress websites with custom themes and plugins', 'Implemented Google Analytics 4 and Google Tag Manager for tracking and analytics', 'Managed Google Workspace integration and administration', 'Collaborated with cross-functional teams to deliver high-quality web solutions'] },
  { year: 'Jan 2024 - May 2024', title: 'Front End Developer Intern', company: 'Foxbith', description: ['Developed responsive web applications using modern frontend technologies', 'Worked on user interface design and implementation', 'Collaborated with development team on various client projects', 'Gained hands-on experience with industry best practices and workflows'] },
  { year: 'Nov 2023 - Jan 2024', title: 'Front End Developer Intern', company: 'Phuket Innovative Development', description: ['Built responsive web applications and user interfaces', 'Worked with modern frontend frameworks and technologies', 'Participated in code reviews and team collaboration', 'Developed skills in agile development methodologies'] },
  { year: 'Nov 2022 - Apr 2023', title: 'Video Editor', company: 'Dr.Orn Clinic', description: ['Created and edited promotional videos and marketing content', 'Produced high-quality video content for medical clinic marketing', 'Managed video production workflow from concept to final delivery', 'Collaborated with marketing team to align video content with brand strategy'] },
  { year: 'Nov 2021 - Feb 2022', title: 'Video Editor', company: 'Velcurve', description: ['Edited commercial videos and promotional content for various clients', 'Developed skills in color grading, audio editing, and visual effects', 'Worked on tight deadlines while maintaining high quality standards', 'Collaborated with creative teams to bring vision to life'] },
];

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="site-section experience-section" aria-labelledby="experience-title">
      <div className="section-marker"><span>03</span><span>SELECTED EXPERIENCE</span></div>
      <div className="section-header-wide">
        <div><p className="eyebrow">CAREER / 02</p><h2 id="experience-title" className="display local-display">{t('professionalJourney')}</h2></div>
        <p>{t('experienceDescription')}</p>
      </div>
      <div className="experience-list">
        {experiences.map((experience, index) => (
          <motion.article key={`${experience.company}-${experience.year}`} className="experience-row" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2) }}>
            <time>{experience.year}</time>
            <div className="experience-title"><span>0{index + 1}</span><h3>{experience.title}</h3><p>{experience.company}</p></div>
            <ul>{experience.description.map((item) => <li key={item}>{item}</li>)}</ul>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
