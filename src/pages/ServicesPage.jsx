import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { services, serviceCategories } from '../data.js';
import { ServiceGroups } from '../components/ServiceGroups.jsx';
import { SectionHeading, Eyebrow } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';

export function ServicesPage() {
  return <><section className="page-hero section-wrap"><Eyebrow>OUR SERVICES</Eyebrow><h1>Choose the service that fits <em>your next goal.</em></h1><p>Compare what each service includes, then open its page to see the details and send a project inquiry.</p><Link className="button button-dark" to="/contact">Ask us a question <ArrowRight size={15}/></Link></section>
    <section className="services section-wrap services-route"><ServiceGroups/></section>
    <section className="service-approach"><div className="section-wrap approach-grid"><div><Eyebrow>HOW WE THINK ABOUT SCOPE</Eyebrow><h2>We start by understanding <em>what you need.</em></h2><p>Before recommending work, we ask about your goal, current tools, content, timeline, and budget. Your proposal will list the work and any ongoing costs.</p></div><ul>{['Goals and audience','Existing tools and integrations','Content and access needed','Timeline and support expectations'].map(item => <li key={item}><Check size={15}/>{item}</li>)}</ul></div></section>
    <section className="section-wrap service-directory"><SectionHeading kicker="EXPLORE THE DETAILS" title={<>Find the service<br/><em>that fits.</em></>} copy="Open a service to see what’s included, what we need from you, and how to get started."/><div className="service-directory-groups">{serviceCategories.map((category) => <div className="service-directory-group" key={category.slug}><h3>{category.title}</h3><div className="directory-grid">{services.filter(service => service.category === category.slug).map(service => <Link key={service.slug} to={`/services/${service.slug}`}><b>{service.title}</b><ArrowRight size={15}/></Link>)}</div></div>)}</div></section><CTASection title={<>Let’s find your <em>next step.</em></>} copy="Share what you are trying to build or improve. We will help shape the conversation."/></>;
}
