import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Categories for filtering
const categories = [
  'All',
  'Corporate',
  'Mini Project',
  'Video Production'
];

// Real projects data
const projects = [
  {
    id: 1,
    title: 'Foxbith Official Website',
    description: 'Company website built with Webflow and Strapi CMS',
    image: '/img/exp_foxbith.png',
    category: 'Corporate',
    github: '',
    demo: 'https://www.foxbith.com/',
    tech: ['Webflow', 'Strapi', 'CMS', 'Responsive Design']
  },
  {
    id: 2,
    title: 'Crimson Indigo',
    description: 'E-commerce platform with React and Firebase',
    image: '/img/exp_crimson.png',
    category: 'Corporate',
    github: '',
    demo: 'https://crimson-indigo.com/',
    tech: ['React', 'Firebase', 'Ant Design', 'Bootstrap']
  },
  {
    id: 3,
    title: 'Hello Monday',
    description: 'WordPress website for creative agency',
    image: '/img/exp_hello-monday.png',
    category: 'Corporate',
    github: '',
    demo: 'https://hello-monday.co/',
    tech: ['WordPress', 'Elementor', 'SEO']
  },
  {
    id: 4,
    title: 'ADOP Website',
    description: 'Corporate website built with WordPress',
    image: '/img/exp_adop.png',
    category: 'Corporate',
    github: '',
    demo: 'https://adop.co.th/',
    tech: ['WordPress', 'Elementor', 'SEO']
  },
  {
    id: 5,
    title: 'Amnuaysilpa School',
    description: 'School website with React and Strapi backend',
    image: '/img/exp_amnuaysil.png',
    category: 'Education',
    github: '',
    demo: 'https://www.amnuaysilpa.ac.th/',
    tech: ['React', 'TypeScript', 'Material UI', 'Strapi']
  },
  {
    id: 6,
    title: 'Frontend - E commerce Website',
    description: 'Mockup E-commerce website built with React',
    image: '/img/exp_frontend_ecommerce.png',
    category: 'Mini Project',
    github: 'https://github.com/peem-peeranat/metro-cat_e-commerce',
    demo: 'https://metro-cat-e-commerce-peem-peeranats-projects.vercel.app/',
    tech: ['React.js', 'REST API', 'Material UI']
  },
  {
    id: 7,
    title: 'Movie API',
    description: 'Custom API for movie data with Next.js',
    image: '/img/exp_movie_api.png',
    category: 'Mini Project',
    github: 'https://github.com/peem-peeranat/API_MOVIE',
    demo: 'https://api-movie-three.vercel.app/',
    tech: ['Next.js', 'REST API', 'Material UI']
  },
  {
    id: 8,
    title: 'Weather API',
    description: 'Weather data API service',
    image: '/img/exp_weather-dashboard.png',
    category: 'Mini Project',
    github: 'https://github.com/peem-peeranat/API_WEATHER',
    demo: 'https://api-weather-blond-nine.vercel.app/',
    tech: ['Next.js', 'OpenWeather API', 'Vercel', 'Material UI']
  },
  {
    id: 9,
    title: 'CRUD Application',
    description: 'Fullstack CRUD application with database',
    image: '/img/exp_crud.png',
    category: 'Mini Project',
    github: 'https://github.com/peem-peeranat/crud-frontend',
    demo: 'https://crud-frontend-pi-ecru.vercel.app/',
    tech: ['Next.js', 'Express', 'SQL', 'REST API', 'Material UI']
  },
  {
    id: 10,
    title: 'บอกให้ฟังหน่อยนะ (please tell me)',
    description: 'บอกให้ฟังหน่อยนะ (please tell me) - Serious Copter [ Official MV ]',
    image: 'https://img.youtube.com/vi/H2hb8vPOpt8/maxresdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=H2hb8vPOpt8',
    tech: ['Video editor', 'animate', 'after effect', 'premiere pro', 'photoshop']
  },
  {
    id: 11,
    title: 'หนุ่มออนไลน์กับสาวข้างห้อง | Gen Z The series',
    description: 'Gen Z The Series - หนุ่มออนไลน์กับสาวข้างห้อง',
    image: 'https://img.youtube.com/vi/vVavkLRyVCg/maxresdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=vVavkLRyVCg',
    tech: ['after effect', 'premiere pro']
  },
  {
    id: 12,
    title: 'เงินเก็บแบ่งได้กับยัยซัพพอร์ต | Gen Z The series',
    description: 'Gen Z The Series - เงินเก็บแบ่งได้กับยัยซัพพอร์ต',
    image: 'https://img.youtube.com/vi/mJnJ0r3O9dk/maxresdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=mJnJ0r3O9dk',
    tech: ['after effect', 'premiere pro']
  },
  {
    id: 13,
    title: 'ต๊อด ปนพงษ์ ขอปลูกผมแก้ปลูกกับ Dr.Orn',
    description: 'ต๊อด ปนพงษ์ ขอปลูกผมแก้ปลูกกับ Dr.Orn',
    image: 'https://img.youtube.com/vi/7PHZg1k48GE/maxresdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=7PHZg1k48GE',
    tech: ['after effect', 'premiere pro']
  },
  {
    id: 14,
    title: 'รวมความประทับใจ2022 ผลลัพธ์ปลูกผมกับ Dr.Orn',
    description: 'รวมความประทับใจ2022 ผลลัพธ์ปลูกผมกับ Dr.Orn',
    image: 'https://img.youtube.com/vi/k1k4scCob0w/maxresdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=k1k4scCob0w',
    tech: ['after effect', 'premiere pro', 'camera']
  },
  {
    id: 15,
    title: 'ผมพร้อมแล้ว - Official Trailer',
    description: 'ผมพร้อมแล้ว - Official Trailer',
    image: 'https://img.youtube.com/vi/5LfFjOc2qmk/maxresdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=5LfFjOc2qmk',
    tech: ['after effect', 'premiere pro', 'camera']
  },
  {
    id: 16,
    title: 'BIMMERMEET5 x Dr.Orn Medical Hair Center',
    description: 'BIMMERMEET5 x Dr.Orn Medical Hair Center',
    image: 'https://img.youtube.com/vi/3h3rZN1ICsw/maxresdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=3h3rZN1ICsw',
    tech: ['after effect', 'premiere pro', 'camera']
  },
  {
    id: 17,
    title: 'Frontal fibrosing alopecia (FFA) โรคร้ายรีบรักษาก่อนสาย EP.1',
    description: 'Frontal fibrosing alopecia (FFA) โรคร้ายรีบรักษาก่อนสาย EP.1',
    image: 'https://img.youtube.com/vi/fsdo6axzRfY/hqdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=fsdo6axzRfY',
    tech: ['after effect', 'premiere pro', 'camera']
  },
  {
    id: 18,
    title: 'KHAO LUANG | Cinematic Travel Film',
    description: 'KHAO LUANG | Cinematic Travel Film',
    image: 'https://img.youtube.com/vi/16jruSlYF1A/hqdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=16jruSlYF1A',
    tech: ['after effect', 'premiere pro', 'camera', 'davinci resolve', 'photoshop']
  },
  {
    id: 19,
    title: 'CAMPING | Cinematic Travel Film',
    description: 'CAMPING | Cinematic Travel Film',
    image: 'https://img.youtube.com/vi/hDuMTdcsRTk/hqdefault.jpg',
    category: 'Video Production',
    github: '',
    demo: 'https://www.youtube.com/watch?v=hDuMTdcsRTk',
    tech: ['after effect', 'premiere pro', 'camera', 'davinci resolve', 'photoshop']
  }
];

const ProjectsPage = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllProjects, setShowAllProjects] = useState(false);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = filteredProjects.slice(0, 6);
  const additionalProjects = showAllProjects ? filteredProjects.slice(6) : [];

  const showMoreProjects = () => setShowAllProjects(true);

  // Reset when category changes
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowAllProjects(false);
  };

  // Check if there are more projects to show
  const hasMoreProjects = filteredProjects.length > 6;

  return (
    <section id="projects" className="section relative min-h-screen flex items-center justify-center px-3 sm:px-6 lg:px-8 py-12 sm:py-16 bg-base-200 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-base-content/5 mix-blend-overlay"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-base-content/5 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10 mt-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12 lg:mb-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight">
            <span className={`text-base-content ${language === 'th' && /[\u0E00-\u0E7F]/.test(t('projects')) ? 'font-thai' : 'font-english'}`}>{t('projects')}</span>
          </h2>
          <div className="w-12 lg:w-16 h-1 bg-base-content/30 mt-3 lg:mt-4 mx-auto"></div>
          <p className="text-base lg:text-lg text-base-content/80 mt-4 lg:mt-6 max-w-2xl mx-auto px-4">
            <span className={`${language === 'th' && /[\u0E00-\u0E7F]/.test(t('projectsDescription')) ? 'font-thai' : 'font-english'}`}>{t('projectsDescription')}</span>
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-8 lg:mb-12"
        >
          {/* Mobile: Horizontal scrollable filter */}
          <div className="lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`flex-shrink-0 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${selectedCategory === category
                    ? 'bg-primary text-base-100 shadow-lg'
                    : 'bg-base-100/50 text-base-content/70 hover:bg-base-100 hover:text-base-content border border-base-content/10'
                    }`}
                >
                  <span data-font="english">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: Centered filter */}
          <div className="hidden lg:flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${selectedCategory === category
                  ? 'bg-primary text-base-100 shadow-lg'
                  : 'bg-base-100/50 text-base-content/70 hover:bg-base-100 hover:text-base-content border border-base-content/10'
                  }`}
              >
                <span data-font="english">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects - Always visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={`featured-${project.id}-${selectedCategory}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              {/* Main project link - covers entire card */}
              {project.demo && (
                <motion.a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                />
              )}

              {/* Mockup frame around the image */}
              <div className="relative mb-4 lg:mb-6">
                <div className="absolute -inset-2 lg:-inset-4 border border-base-content/10 rounded-xl z-0"></div>
                <div className="relative overflow-hidden rounded-lg aspect-video border border-base-content/10 z-10">
                  {/* Image-specific link - covers only the image */}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 z-20 cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  )}
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-base-content/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>

              <h3
                className={`text-lg lg:text-xl font-medium text-base-content mb-2 group-hover:text-primary transition-colors duration-300 ${language === 'th' && /[\u0E00-\u0E7F]/.test(project.title) ? 'font-thai' : 'font-english'}`}
              >
                {project.title}
              </h3>

              <p
                className={`text-sm lg:text-base text-base-content/80 mb-3 lg:mb-4 leading-relaxed ${language === 'th' && /[\u0E00-\u0E7F]/.test(project.description) ? 'font-thai' : 'font-english'}`}
              >
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 text-xs bg-base-100 border border-base-content/10 rounded-full text-base-content/70 transition-all duration-200 hover:bg-base-200/50"
                    data-font="english"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 relative z-20">
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center text-primary text-sm font-medium hover:text-primary/80 transition-colors duration-300"
                  >
                    <span data-font="english">{project.category === 'Video Production' ? 'Watch Video' : 'Live Demo'}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center text-base-content/70 text-sm font-medium hover:text-base-content transition-colors duration-300"
                  >
                    <span data-font="english">GitHub</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </motion.a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Projects - Only shown when expanded */}
        {hasMoreProjects && showAllProjects && (
          <motion.div
            key={`additional-${selectedCategory}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 lg:mt-12"
          >
            {additionalProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Main project link - covers entire card */}
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  />
                )}

                {/* Mockup frame around the image */}
                <div className="relative mb-4 lg:mb-6">
                  <div className="absolute -inset-2 lg:-inset-4 border border-base-content/10 rounded-xl z-0"></div>
                  <div className="relative overflow-hidden rounded-lg aspect-video border border-base-content/10 z-10">
                    {/* Image-specific link - covers only the image */}
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 z-20 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      />
                    )}
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-content/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>

                <h3
                  className={`text-lg lg:text-xl font-medium text-base-content mb-2 group-hover:text-primary transition-colors duration-300 ${language === 'th' && /[\u0E00-\u0E7F]/.test(project.title) ? 'font-thai' : 'font-english'}`}
                >
                  {project.title}
                </h3>

                <p
                  className={`text-sm lg:text-base text-base-content/80 mb-3 lg:mb-4 leading-relaxed ${language === 'th' && /[\u0E00-\u0E7F]/.test(project.description) ? 'font-thai' : 'font-english'}`}
                >
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-base-100 border border-base-content/10 rounded-full text-base-content/70 transition-all duration-200 hover:bg-base-200/50"
                      data-font="english"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 relative z-20">
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center text-primary text-sm font-medium hover:text-primary/80 transition-colors duration-300"
                    >
                      <span data-font="english">{project.category === 'Video Production' ? 'Watch Video' : 'Live Demo'}</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  )}
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center text-base-content/70 text-sm font-medium hover:text-base-content transition-colors duration-300"
                    >
                      <span data-font="english">GitHub</span>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="ml-1 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 lg:mt-16"
        >
          {hasMoreProjects && !showAllProjects && (
            <button
              onClick={showMoreProjects}
              className="inline-block px-6 lg:px-8 py-2.5 lg:py-3 bg-primary text-base-100 hover:bg-primary/90 rounded-lg transition-all duration-300 ease-in-out glow-on-hover magnetic text-sm lg:text-base"
            >
              <span className={`${language === 'th' && /[\u0E00-\u0E7F]/.test(t('viewAllProjects')) ? 'font-thai' : 'font-english'}`}>{t('viewAllProjects')}</span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsPage;