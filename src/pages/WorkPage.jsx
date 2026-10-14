import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data.js';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { Eyebrow, SectionHeading } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';

export function WorkPage() {
  return <><section className="page-hero section-wrap"><Eyebrow>TELLA MIND STUDIO PROJECTS</Eyebrow><h1>Interactive work,<br/><em>made tangible.</em></h1><p>Try a recruitment workflow, business website, and Snapchat creator-readiness demo. All use sample data and are labelled as studio projects.</p><Link className="button button-dark" to="/contact">Discuss a project <ArrowRight size={15}/></Link></section><section className="work-section work-route"><div className="section-wrap"><div className="project-grid">{projects.map(project=><ProjectCard key={project.slug} project={project}/>)}</div><div className="concept-disclaimer"><span className="disclaimer-icon">i</span><p><b>Studio demos, clearly labelled</b><br/>These are sample projects, not client work or measured results. Snapchat alone decides Snap Star approval and monetization eligibility.</p></div></div></section><CTASection title={<>Have a real project in <em>mind?</em></>} copy="Tell us what you are trying to make possible. We can start with a conversation."/></>;
}
