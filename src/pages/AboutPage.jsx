import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Code2, Lightbulb, PackageCheck, PanelsTopLeft, Search, Share2, Sparkles, Workflow } from 'lucide-react';
import { Eyebrow, SectionHeading } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { publicAsset } from '../utils/publicAsset.js';

const principles = [
  ['Start with people', 'Understand the customers and teams who will use the experience.'],
  ['Choose useful technology', 'Solve the real business problem instead of adding tools for their own sake.'],
  ['Make the scope clear', 'Agree on what is included, what happens next, and how progress will be reviewed.'],
];

const waysWeHelp = [
  { icon: PanelsTopLeft, title: 'Bring an idea to life', text: 'Build a clear digital foundation with a website, app, online store, or launch-ready brand.' },
  { icon: Workflow, title: 'Make work run smoother', text: 'Connect practical AI assistants, apps, and automations to reduce repetitive work.' },
  { icon: Share2, title: 'Grow your social presence', text: 'Plan content, manage selected social channels, publish consistently, and understand what is working.' },
  { icon: Camera, title: 'Support Snapchat creators', text: 'We help review public profiles, plan content, understand published eligibility guidance, and prepare organized application materials. Snapchat makes all approval and earnings decisions.' },
];

const workSteps = [
  { icon: Search, title: 'Understand the challenge', text: 'We listen to what you want to improve, who it affects, and what a useful outcome would look like.' },
  { icon: Lightbulb, title: 'Find a practical fit', text: 'We recommend the right service or combination of services, then agree on scope, timing, and responsibilities.' },
  { icon: Code2, title: 'Build and review', text: 'We create the agreed work, share progress, and use feedback at clear review points.' },
  { icon: PackageCheck, title: 'Launch and hand over', text: 'We help prepare for launch, transfer agreed access, and explain support options for what comes next.' },
];

export function AboutPage() {
  return <>
    <section className="about-page-hero section-wrap">
      <div className="about-art about-page-art" aria-hidden="true">
        <div className="about-grid-lines" />
        <div className="about-orb"><span /><span /><span /></div>
        <div className="about-label label-top">THOUGHTFUL BY DESIGN</div>
        <div className="about-label label-bottom"><span className="eyebrow-dot" /> HUMAN IDEAS. USEFUL TECHNOLOGY.</div>
        <div className="about-mini-card"><Sparkles size={14} /><span>Clear thinking<br /><b>better building</b></span></div>
      </div>
      <div className="about-page-copy">
        <Eyebrow>ABOUT TELLAMIND</Eyebrow>
        <h1>Technology that helps businesses <em>move forward.</em></h1>
        <span className="about-established">Established in 2016 <i /> Michigan, USA</span>
        <p>TellaMind exists to make useful technology more practical and good digital products easier to access. We help people and businesses turn an idea or challenge into a clear next step.</p>
        <p>Based in Michigan, USA, we work with startups, shops, clinics, real estate teams, creators, and growing businesses worldwide.</p>
        <Link className="button button-dark" to="/contact">Start a conversation <ArrowRight size={15} /></Link>
      </div>
    </section>

    <section className="about-story section-wrap">
      <div className="about-story-copy">
        <Eyebrow>WHY TELLAMIND EXISTS</Eyebrow>
        <h2>Good technology should be easier to <em>put to work.</em></h2>
        <p>Technology can help businesses serve customers, manage everyday work, and build an online presence. But choosing the right tools and putting them to work can feel harder than it needs to be.</p>
        <p>Since 2016, TellaMind’s purpose has been to bring practical technology into reach through useful products and services. We start by understanding the problem, then help find and implement a solution that fits the agreed goal and scope.</p>
      </div>
      <aside className="about-founder-card" aria-label="TellaMind founder">
        <div className="about-founder-top"><span className="about-founder-mark"><img src={publicAsset('tellamind-mark.svg')} alt="TellaMind logo" /></span><span className="about-founder-kicker">TELLAMIND · SINCE 2016</span></div>
        <div className="about-founder-rule" />
        <p className="about-founder-label">FOUNDER &amp; CEO</p>
        <h3>Hayyan Nadeem</h3>
        <p className="about-founder-note">Helping make technology practical through useful digital products and services.</p>
      </aside>
    </section>

    <section className="about-capabilities">
      <div className="section-wrap">
        <SectionHeading kicker="WHAT WE HELP WITH" title={<>Technology for the next <em>business step.</em></>} copy="We start with the outcome you need, then shape the digital work around it." />
        <div className="about-capability-grid">
          {waysWeHelp.map(({ icon: Icon, title, text }) => <article className="about-capability-card" key={title}>
            <div className="about-capability-top"><Icon size={23} strokeWidth={1.7} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="about-workflow">
      <div className="section-wrap">
        <SectionHeading kicker="A CLEAR WAY FORWARD" title={<>From the challenge to a <em>working solution.</em></>} copy="You’ll know what we’re doing, what we need from you, and what happens at each stage." />
        <div className="about-workflow-grid">
          {workSteps.map(({ icon: Icon, title, text }) => <article className="about-workflow-card" key={title}>
            <span><Icon size={20} strokeWidth={1.8} /></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>)}
        </div>
      </div>
    </section>

    <section className="about-principles">
      <div className="section-wrap">
        <SectionHeading kicker="HOW WE SHOW UP" title={<>Clear thinking.<br /><em>Useful technology.</em></>} copy="We keep decisions and project expectations understandable from the first conversation to handoff." />
        <div className="principle-grid">{principles.map(([title, copy]) => <article key={title}><h3>{title}</h3><p>{copy}</p></article>)}</div>
      </div>
    </section>

    <section className="about-location section-wrap">
      <div>
        <Eyebrow>WHERE WE WORK</Eyebrow>
        <h2>Rooted in Michigan.<br /><em>Ready for anywhere.</em></h2>
        <p>TellaMind is based in Michigan, USA and works remotely with businesses worldwide. Project communication, time zones, and working arrangements are agreed at the start.</p>
      </div>
      <div className="location-card"><span className="location-orb"><img src={publicAsset('tellamind-mark.svg')} alt="TellaMind logo" /></span><b>Michigan, USA</b><small>Remote projects worldwide</small></div>
    </section>
    <CTASection />
  </>;
}
