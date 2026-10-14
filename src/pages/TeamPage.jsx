import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, SectionHeading } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { TeamMembers } from '../components/TeamMembers.jsx';

const roles = [
  { number: '01', mark: 'strategy', title: 'Strategy & project direction', text: 'Clarifies the business goal, audience, priorities, scope, and what a useful launch should achieve.' },
  { number: '02', mark: 'design', title: 'Experience & visual design', text: 'Shapes clear page structure, product flows, brand details, and polished responsive interfaces.' },
  { number: '03', mark: 'engineering', title: 'Web & app engineering', text: 'Builds maintainable websites, apps, integrations, and the systems behind the experience.' },
  { number: '04', mark: 'automation', title: 'AI, automation & growth', text: 'Connects practical workflows, creator support, analytics, and discovery-focused improvements.' },
];

function RoleMark({ kind }) {
  const shared = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.65, strokeLinecap: 'round', strokeLinejoin: 'round' };
  return <svg className={`team-role-mark team-role-mark--${kind}`} viewBox="0 0 40 40" aria-hidden="true" {...shared}>
    {kind === 'strategy' && <>
      <circle cx="20" cy="20" r="13.5"/><circle cx="20" cy="20" r="2.2"/>
      <path d="M20 4v4M20 32v4M4 20h4M32 20h4M25.8 13.4l-3.9 8.4-7.7 4.8 3.9-8.4 7.7-4.8Z"/>
    </>}
    {kind === 'design' && <>
      <rect x="5.5" y="6.5" width="29" height="27" rx="3.5"/><path d="M5.5 13h29M12 13v20M17 19h12M17 24h8M17 29h10"/>
      <circle cx="9" cy="9.8" r=".7" fill="currentColor" stroke="none"/><circle cx="12" cy="9.8" r=".7" fill="currentColor" stroke="none"/>
    </>}
    {kind === 'engineering' && <>
      <rect x="5.5" y="7" width="29" height="26" rx="3.5"/><path d="M5.5 13.5h29M12 10.2h.1M16 10.2h.1M17 20l-4 3.5 4 3.5M23 27l4-7M29 20l4 3.5-4 3.5"/>
    </>}
    {kind === 'automation' && <>
      <rect x="5.5" y="7" width="10" height="8" rx="2"/><rect x="24.5" y="25" width="10" height="8" rx="2"/><rect x="24.5" y="7" width="10" height="8" rx="2"/>
      <path d="M15.5 11h4a5 5 0 0 1 5 5v9M20 16v8a5 5 0 0 1-5 5h-1M10.5 18v3M8.5 21h4M27.5 29h4"/><circle cx="29.5" cy="11" r=".7" fill="currentColor" stroke="none"/>
    </>}
  </svg>;
}

export function TeamPage() {
  return <>
    <section className="team-hero section-wrap">
      <div className="team-hero-copy"><Eyebrow>THE PEOPLE BEHIND THE WORK</Eyebrow><h1>A focused team for <em>your next step.</em></h1><p>TellaMind brings the right mix of product thinking, design, engineering, and digital growth around each project. You get a clear point of contact and a team shaped to fit the work.</p><Link className="button button-dark" to="/contact">Tell us what you’re building <ArrowRight size={15}/></Link></div>
      <div className="team-hero-art" aria-hidden="true"><div className="team-orbit team-orbit-one"/><div className="team-orbit team-orbit-two"/><div className="team-core">TM<span>ONE COLLABORATIVE STUDIO</span></div><i className="team-node team-node-one"/><i className="team-node team-node-two"/><i className="team-node team-node-three"/><i className="team-node team-node-four"/></div>
    </section>
    <TeamMembers/>
    <section className="team-roles"><div className="section-wrap"><SectionHeading kicker="HOW WE WORK TOGETHER" title={<>The right skills.<br/><em>One clear direction.</em></>} copy="Project roles are assembled around the agreed scope. These are the disciplines clients can expect us to bring into the conversation."/><div className="team-role-grid">{roles.map(({ number, mark, title, text }) => <article className="team-role-card" key={number}><div className="team-role-card-top"><span>{number}</span><span className="team-role-icon"><RoleMark kind={mark}/></span></div><h2>{title}</h2><p>{text}</p></article>)}</div><p className="team-transparency">These cards describe the skills assembled for projects. Confirmed member profiles appear above once published by the TellaMind team.</p></div></section>
    <section className="team-commitment section-wrap"><div><Eyebrow>WHAT YOU CAN EXPECT</Eyebrow><h2>Work with people who keep the process <em>clear.</em></h2></div><ul><li>A named project contact for communication and decisions</li><li>The skills needed for your agreed scope, without unnecessary layers</li><li>Regular progress updates and clear review points</li><li>A handoff plan for the tools and work delivered</li></ul></section>
    <CTASection title={<>Let’s build with <em>the right team.</em></>} copy="Share your goals and we will recommend a sensible starting point."/>
  </>;
}
