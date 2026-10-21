import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, SectionHeading } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { TeamMembers } from '../components/TeamMembers.jsx';
import { publicAsset } from '../utils/publicAsset.js';
import { TellaMindMark } from '../components/TellaMindMark.jsx';

const roles = [
  { title: 'Strategy & project direction', text: 'Clarifies the business goal, audience, priorities, scope, and what a useful launch should achieve.' },
  { title: 'Experience & visual design', text: 'Shapes clear page structure, product flows, brand details, and polished responsive interfaces.' },
  { title: 'Web & app engineering', text: 'Builds maintainable websites, apps, integrations, and the systems behind the experience.' },
  { title: 'AI, automation & growth', text: 'Connects practical workflows, creator support, analytics, and discovery-focused improvements.' },
];

export function TeamPage() {
  return <>
    <section className="team-hero section-wrap">
      <div className="team-hero-copy"><Eyebrow>THE PEOPLE BEHIND THE WORK</Eyebrow><h1>A focused team for <em>your next step.</em></h1><p>TellaMind brings the right mix of product thinking, design, engineering, and digital growth around each project. You get a clear point of contact and a team shaped to fit the work.</p><Link className="button button-dark" to="/contact">Tell us what you’re building <ArrowRight size={15}/></Link></div>
      <div className="team-hero-art" aria-hidden="true"><div className="team-orbit team-orbit-one"/><div className="team-orbit team-orbit-two"/><div className="team-core"><img src={publicAsset('tellamind-mark.svg')} alt=""/><span>TECHNOLOGY COMPANY</span></div><i className="team-node team-node-one"/><i className="team-node team-node-two"/><i className="team-node team-node-three"/><i className="team-node team-node-four"/></div>
    </section>
    <TeamMembers/>
    <section className="team-roles"><div className="section-wrap"><SectionHeading kicker="HOW WE WORK TOGETHER" title={<>The right skills.<br/><em>One clear direction.</em></>} copy="Project roles are assembled around the agreed scope. These are the disciplines clients can expect us to bring into the conversation."/><div className="team-role-grid">{roles.map(({ title, text }) => <article className="team-role-card" key={title}><div className="team-role-card-top"><span className="team-role-icon"><TellaMindMark/></span></div><h2>{title}</h2><p>{text}</p></article>)}</div><p className="team-transparency">These cards describe the skills assembled for projects. Confirmed member profiles appear above once published by the TellaMind team.</p></div></section>
    <section className="team-commitment section-wrap"><div><Eyebrow>WHAT YOU CAN EXPECT</Eyebrow><h2>Work with people who keep the process <em>clear.</em></h2></div><ul><li>A named project contact for communication and decisions</li><li>The skills needed for your agreed scope, without unnecessary layers</li><li>Regular progress updates and clear review points</li><li>A handoff plan for the tools and work delivered</li></ul></section>
    <CTASection title={<>Let’s build with <em>the right team.</em></>} copy="Share your goals and we will recommend a sensible starting point."/>
  </>;
}
