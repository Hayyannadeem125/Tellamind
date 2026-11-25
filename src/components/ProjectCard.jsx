import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { publicAsset } from '../utils/publicAsset.js';
import { motion } from 'motion/react';
import { staggerItemVariants } from './MotionEffects.jsx';

export function ProjectArtwork({ project }) {
  return <div className={`project-art project-art--image project-art--${project.theme}`} aria-hidden="true">
    <div className="project-image-mat">
      <img
        className="project-image"
        src={publicAsset(project.image)}
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
    <span className="project-art-caption">{project.imageCaption}</span>
  </div>;
}

export function ProjectCard({ project }) {
  return <motion.article variants={staggerItemVariants} className={`project-card project-card--${project.theme}`}>
    <Link to={`/work/${project.slug}`} className="project-art-link" aria-label={`Open ${project.name} project page`}><ProjectArtwork project={project}/></Link>
    <div className="project-details"><div><span>{project.badge} · {project.type}</span><h3><Link to={`/work/${project.slug}`}>{project.name}</Link></h3><p>{project.title}</p></div><Link to={`/work/${project.slug}`} aria-label={`Open ${project.name} project page`}><ArrowUpRight size={17}/></Link></div>
  </motion.article>;
}
