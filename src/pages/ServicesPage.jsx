import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '../data.js';
import { ServiceCard } from '../components/ServiceCard.jsx';
import { Eyebrow } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { Stagger } from '../components/MotionEffects.jsx';
import { ServicesConstellation } from '../components/ServicesConstellation.jsx';

export function ServicesPage() {
  const servicesForGrid = [...services];
  const snapStarIndex = servicesForGrid.findIndex((service) => service.slug === 'snapstar-support');
  const finalRowStart = Math.floor((servicesForGrid.length - 1) / 3) * 3;
  if (snapStarIndex > finalRowStart) {
    const [snapStar] = servicesForGrid.splice(snapStarIndex, 1);
    servicesForGrid.splice(finalRowStart, 0, snapStar);
  }

  return <><section className="page-hero section-wrap services-page-hero"><div className="services-page-copy"><Eyebrow>OUR SERVICES</Eyebrow><h1>Choose the service that fits <em>your next goal.</em></h1><p>Compare what each service includes, then open its page to see the details and send a project inquiry.</p><Link className="button button-dark" to="/contact">Start a project <ArrowRight size={15}/></Link></div><ServicesConstellation /></section>
    <section className="services section-wrap services-route"><Stagger className="service-grid">{servicesForGrid.map((service) => <ServiceCard key={service.slug} service={service}/>)}</Stagger></section>
    <section className="service-approach"><div className="section-wrap approach-grid"><div><Eyebrow>HOW WE THINK ABOUT SCOPE</Eyebrow><h2>We start by understanding <em>what you need.</em></h2><p>Before recommending work, we ask about your goal, current tools, content, timeline, and budget. Your proposal will list the work and any ongoing costs.</p></div><ul>{['Goals and audience','Existing tools and integrations','Content and access needed','Timeline and support expectations'].map(item => <li key={item}><Check size={15}/>{item}</li>)}</ul></div></section>
    <CTASection title={<>Let’s find your <em>next step.</em></>} copy="Share what you are trying to build or improve. We will help shape the conversation."/></>;
}
