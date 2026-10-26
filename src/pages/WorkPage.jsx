import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { projects } from '../data.js';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { Eyebrow, SectionHeading } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { Stagger } from '../components/MotionEffects.jsx';
import { WorkHeroOrbit } from '../components/WorkHeroOrbit.jsx';

export function WorkPage() {
  return <><section className="page-hero section-wrap work-page-hero"><div className="work-page-hero-copy"><Eyebrow>OUR PROJECTS</Eyebrow><h1>Work we have built,<br/><em>made tangible.</em></h1><p>Explore TellaMind-built projects across recruitment, property websites, and Snapchat creator support. The interactive views show how each experience works; personal and business details are illustrative.</p><Link className="button button-dark" to="/contact">Start a project <ArrowRight size={15}/></Link></div><WorkHeroOrbit /></section><section className="work-section work-route"><div className="section-wrap"><Stagger className="project-grid">{projects.map(project=><ProjectCard key={project.slug} project={project}/>)}</Stagger><div className="concept-disclaimer"><span className="disclaimer-icon">i</span><p><b>About the project details</b><br/>These are TellaMind-built projects. Property listings, applicant profiles, and creator details shown here are illustrative and are not client results. Snapchat alone decides Snap Star and monetization eligibility.</p></div></div></section><CTASection title={<>Have a real project in <em>mind?</em></>} copy="Tell us what you are trying to make possible. We can start with a conversation."/></>;
}
