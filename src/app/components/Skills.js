import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaWordpress, FaGitAlt, FaDatabase, FaGoogle } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript, SiJavascript, SiHtml5, SiCss3, SiBootstrap, SiGraphql, SiMysql, SiFirebase, SiStrapi } from 'react-icons/si';
import { TbBrandWebflow } from 'react-icons/tb';
import { BiCodeAlt } from 'react-icons/bi';
import { FiFilm } from 'react-icons/fi';
import { useLanguage } from '../context/LanguageContext';

const SkillsPage = () => {
  const { t } = useLanguage();

  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'HTML', icon: <SiHtml5 className="text-base-content/80" /> },
        { name: 'CSS', icon: <SiCss3 className="text-base-content/80" /> },
        { name: 'JavaScript', icon: <SiJavascript className="text-base-content/80" /> },
        { name: 'React', icon: <FaReact className="text-base-content/80" /> },
        { name: 'Next.js', icon: <SiNextdotjs className="text-base-content/80" /> },
        { name: 'TypeScript', icon: <SiTypescript className="text-base-content/80" /> },
        { name: 'Material UI', icon: <span className="text-base-content/80 font-medium" data-font="english">MUI</span> },
        { name: 'Bootstrap', icon: <SiBootstrap className="text-base-content/80" /> },
      ]
    },
    {
      category: 'Backend & Databases',
      items: [
        { name: 'Node.js', icon: <FaNodeJs className="text-base-content/80" /> },
        { name: 'Express.js', icon: <BiCodeAlt className="text-base-content/80" /> },
        { name: 'RESTful API', icon: <BiCodeAlt className="text-base-content/80" /> },
        { name: 'GraphQL', icon: <SiGraphql className="text-base-content/80" /> },
        { name: 'MySQL', icon: <SiMysql className="text-base-content/80" /> },
        { name: 'SQL', icon: <FaDatabase className="text-base-content/80" /> },
        { name: 'NoSQL', icon: <FaDatabase className="text-base-content/80" /> },
        { name: 'Firebase', icon: <SiFirebase className="text-base-content/80" /> },
      ]
    },
    {
      category: 'CMS & Tools',
      items: [
        { name: 'Wordpress', icon: <FaWordpress className="text-base-content/80" /> },
        { name: 'Webflow', icon: <TbBrandWebflow className="text-base-content/80" /> },
        { name: 'Strapi', icon: <SiStrapi className="text-base-content/80" /> },
        { name: 'Git & GitHub', icon: <FaGitAlt className="text-base-content/80" /> },
        { name: 'Google Analytics 4', icon: <FaGoogle className="text-base-content/80" /> },
        { name: 'Google Tag Manager', icon: <FaGoogle className="text-base-content/80" /> },
      ]
    },
    {
      category: 'Design & Video',
      items: [
        { name: 'Photoshop', icon: <FiFilm className="text-base-content/80" /> },
        { name: 'Premiere Pro', icon: <FiFilm className="text-base-content/80" /> },
        { name: 'After Effects', icon: <FiFilm className="text-base-content/80" /> },
        { name: 'DaVinci Resolve', icon: <FiFilm className="text-base-content/80" /> },
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <section id="skills" className="section relative min-h-screen flex items-center justify-center px-4 sm:px-8 py-16 bg-base-200 overflow-hidden">
      <div className="max-w-7xl w-full relative z-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-medium leading-tight">
            <span className="text-base-content">{t('skills')}</span>
          </h2>
          <div className="w-16 h-1 bg-base-content/30 mt-4 mx-auto"></div>
          <p className="text-lg text-base-content/80 mt-6 max-w-2xl mx-auto">
            {t('skillsDescription')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skillCategory, index) => (
            <motion.div
              key={skillCategory.category}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-base-100/50 backdrop-blur-sm border border-base-content/10 rounded-lg p-6"
            >
              <h3 className="text-xl font-medium text-base-content mb-6" data-font="english">
                {skillCategory.category}
              </h3>
              <div className="space-y-4">
                {skillCategory.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-base-200/50 transition-colors"
                  >
                    <div className="text-2xl">{skill.icon}</div>
                    <span className="text-base text-base-content/90" data-font="english">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsPage;