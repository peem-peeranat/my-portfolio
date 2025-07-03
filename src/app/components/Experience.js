import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Experience() {
  const { t } = useLanguage();

  const experiences = [
    {
      year: "Jul 2024 - Apr 2025",
      title: "Front End Developer",
      company: "ADOP",
      description: [
        "Developed and maintained WordPress websites with custom themes and plugins",
        "Implemented Google Analytics 4 and Google Tag Manager for tracking and analytics",
        "Managed Google Workspace integration and administration",
        "Collaborated with cross-functional teams to deliver high-quality web solutions"
      ]
    },
    {
      year: "Jan 2024 - May 2024",
      title: "Front End Developer Intern",
      company: "Foxbith",
      description: [
        "Developed responsive web applications using modern frontend technologies",
        "Worked on user interface design and implementation",
        "Collaborated with development team on various client projects",
        "Gained hands-on experience with industry best practices and workflows"
      ]
    },
    {
      year: "Nov 2023 - Jan 2024",
      title: "Front End Developer Intern",
      company: "Phuket Innovative Development",
      description: [
        "Built responsive web applications and user interfaces",
        "Worked with modern frontend frameworks and technologies",
        "Participated in code reviews and team collaboration",
        "Developed skills in agile development methodologies"
      ]
    },
    {
      year: "Nov 2022 - Apr 2023",
      title: "Video Editor",
      company: "Dr.Orn Clinic",
      description: [
        "Created and edited promotional videos and marketing content",
        "Produced high-quality video content for medical clinic marketing",
        "Managed video production workflow from concept to final delivery",
        "Collaborated with marketing team to align video content with brand strategy"
      ]
    },
    {
      year: "Nov 2021 - Feb 2022",
      title: "Video Editor",
      company: "Velcurve",
      description: [
        "Edited commercial videos and promotional content for various clients",
        "Developed skills in color grading, audio editing, and visual effects",
        "Worked on tight deadlines while maintaining high quality standards",
        "Collaborated with creative teams to bring vision to life"
      ]
    }
  ];

  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Animate the timeline line growth
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-16 bg-base-200 overflow-hidden"
    >
      <div className="max-w-7xl w-full relative z-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-medium leading-tight">
            <span className="text-base-content">{t('professionalJourney')}</span>
          </h2>
          <div className="w-16 h-1 bg-base-content/30 mt-4 mx-auto"></div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line with glow - Desktop */}
          <motion.div
            className="absolute left-1/2 top-0 w-0.5 h-full bg-base-content/40 transform -translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.1)] hidden lg:block"
            style={{ height: lineHeight }}
          />

          {/* Timeline line with glow - Mobile */}
          <motion.div
            className="absolute left-5 top-0 w-0.5 h-full bg-base-content/40 shadow-[0_0_10px_rgba(255,255,255,0.1)] lg:hidden"
            style={{ height: lineHeight }}
          />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            const position = index / (experiences.length - 1);

            return (
              <motion.div
                key={index}
                className={`relative pb-12 lg:pb-16 last:pb-0 ${isLeft ? 'lg:pr-[50%]' : 'lg:pl-[50%]'} pl-12 lg:pl-0 lg:pr-0`}
              >
                {/* Timeline dot with glow - Desktop */}
                <div className="absolute left-1/2 top-1 h-4 w-4 rounded-full bg-base-content/50 border-2 border-base-100 transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)] hidden lg:block" />

                {/* Timeline dot with glow - Mobile */}
                <div className="absolute left-3.5 top-1 h-4 w-4 rounded-full bg-base-content/50 border-2 border-base-100 z-10 shadow-[0_0_15px_rgba(255,255,255,0.2)] lg:hidden" />

                {/* Experience content */}
                <motion.div
                  className={`p-4 lg:p-6 ${isLeft ? 'lg:text-right lg:pr-8' : 'lg:text-left lg:pl-8'} text-left pl-3 lg:pl-4`}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <div className="text-xs lg:text-sm font-mono text-base-content/70 mb-1" data-font="english">{exp.year}</div>
                  <h3 className="text-lg lg:text-xl font-medium text-base-content" data-font="english">{exp.title}</h3>
                  <div className="text-base lg:text-lg font-light italic text-base-content/80 mb-3 lg:mb-4" data-font="english">{exp.company}</div>

                  <ul className={`space-y-2 lg:space-y-3 text-base-content/90 ${isLeft ? 'lg:ml-auto' : 'lg:mr-auto'} mr-auto text-sm lg:text-base`} style={{ maxWidth: '400px' }}>
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        className={`relative ${isLeft ? 'lg:pr-5 lg:before:right-0' : 'lg:pl-5 lg:before:left-0'} pl-4 lg:pl-5 before:left-0 before:absolute before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-base-content/40 before:shadow-[0_0_8px_rgba(255,255,255,0.15)]`}
                        data-font="english"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + i * 0.1 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}