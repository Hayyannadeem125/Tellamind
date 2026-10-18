import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { projectSlug } from '../data.js';
import { ProjectArtwork } from '../components/ProjectCard.jsx';
import { ProjectDemo } from '../components/ProjectDemos.jsx';
import { Eyebrow } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';

export function ProjectDetailPage() {
  const { slug } = useParams(); const project = projectSlug(slug);
  if (!project) return <NotFoundPage />;
  return <><section className="page-hero project-detail-hero section-wrap"><div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/work">TellaMind Projects</Link><span>/</span><span>{project.name}</span></div><Eyebrow>{project.badge}</Eyebrow><h1>{project.name}:<br/><em>{project.title}</em></h1><p>{project.intro}</p><ProjectArtwork project={project}/></section><section className="project-detail-body section-wrap"><div><Eyebrow>INSIDE THIS PROJECT</Eyebrow><h2>Explore the experience.<br/><em>Try the interaction.</em></h2><p>Explore the project preview below. Personal and business details are illustrative, and the interactions are not connected to third-party systems.</p></div><div className="project-demonstrates">{project.demonstrates.map(item=><div key={item}><Check size={15}/><span>{item}</span></div>)}</div></section><section className="project-demo-wrap section-wrap"><ProjectDemo project={project}/></section><section className="concept-disclaimer section-wrap project-notice"><span className="disclaimer-icon">i</span><p><b>{project.badge}</b><br/>{project.disclaimer}</p></section><CTASection title={<>Let’s build something <em>for your business.</em></>} copy="Share your goals and we will help shape a project that fits."/></>;
}
