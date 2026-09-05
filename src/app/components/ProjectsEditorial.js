import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { projects } from './Projects';
import ProjectGalleryModal from './ProjectGalleryModal';
import TiltSurface, { useMotionPreference } from './TiltSurface';

const categories = ['All', ...new Set(projects.map((project) => project.category))];

function ProjectRow({ project, index, onOpenGallery }) {
  const reduceMotion = useMotionPreference();
  const hasGallery = project.gallery?.length > 0;
  const primaryAction = project.demo ? project.demo : null;
  const label = project.category === 'Video Production' ? 'Watch Video' : 'Live Demo';
  const isRemotePreview = project.image.startsWith('http');

  return (
    <motion.article
      className="project-row motion-project-row"
      initial={reduceMotion ? false : { opacity: 0, y: 34, rotateX: 6 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      style={{ transformPerspective: 1400 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
      <div className="project-main">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-description">{project.description}</p>
        <p className="project-tech">{project.tech.join(' / ')}</p>
        <div className="project-actions">
          {primaryAction && <a className="text-link accent-link" href={primaryAction} target="_blank" rel="noopener noreferrer">{label} <span aria-hidden="true">↗</span></a>}
          {project.github && <a className="text-link" href={project.github} target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a>}
          {hasGallery && <button type="button" className="text-link button-link" data-cursor="VIEW" onClick={() => onOpenGallery(project)}>View screenshots <span aria-hidden="true">↗</span></button>}
        </div>
      </div>
      <TiltSurface className="project-preview" intensity={9}>
        {primaryAction ? (
          <a href={primaryAction} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`} data-cursor="OPEN">
            <Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 767px) 100vw, 32vw" className="project-image" unoptimized={isRemotePreview} />
          </a>
        ) : (
          <button type="button" onClick={() => onOpenGallery(project)} aria-label={`View ${project.title} screenshots`} data-cursor="VIEW">
            <Image src={project.image} alt={`${project.title} preview`} fill sizes="(max-width: 767px) 100vw, 32vw" className="project-image" unoptimized={isRemotePreview} />
          </button>
        )}
      </TiltSurface>
    </motion.article>
  );
}

export default function ProjectsEditorial() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [galleryProject, setGalleryProject] = useState(null);
  const filteredProjects = useMemo(() => selectedCategory === 'All' ? projects : projects.filter((project) => project.category === selectedCategory), [selectedCategory]);
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);
  const hasMore = filteredProjects.length > visibleProjects.length;

  const changeCategory = (category) => {
    setSelectedCategory(category);
    setShowAll(false);
  };

  return (
    <section id="projects" className="site-section projects-section" aria-labelledby="projects-title">
      <div className="section-marker"><span>05</span><span>SELECTED WORK</span></div>
      <div className="section-header-wide projects-heading">
        <div><p className="eyebrow">PORTFOLIO / 04</p><h2 id="projects-title" className="display local-display">{t('projects')}</h2></div>
        <p>{t('projectsDescription')}</p>
      </div>

      <div className="filter-viewport">
        <div className="project-filter" role="group" aria-label="Filter projects by category">
          {categories.map((category) => (
            <button key={category} type="button" className={selectedCategory === category ? 'is-active' : ''} onClick={() => changeCategory(category)} aria-pressed={selectedCategory === category}>{category}</button>
          ))}
        </div>
      </div>

      <div className="project-list" aria-live="polite">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => <ProjectRow key={`${selectedCategory}-${project.id}`} project={project} index={index} onOpenGallery={setGalleryProject} />)}
        </AnimatePresence>
      </div>

      {hasMore && (
        <button type="button" className="show-more" onClick={() => setShowAll(true)}>{t('viewAllProjects')} <span aria-hidden="true">↓</span></button>
      )}

      <ProjectGalleryModal
        isOpen={Boolean(galleryProject)}
        onClose={() => setGalleryProject(null)}
        title={galleryProject?.title ?? ''}
        images={galleryProject?.gallery ?? []}
      />
    </section>
  );
}
