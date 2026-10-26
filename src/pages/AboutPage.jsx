import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Eyebrow, SectionHeading } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { publicAsset } from '../utils/publicAsset.js';
import { TellaMindMark } from '../components/TellaMindMark.jsx';
import { motion } from 'motion/react';
import { Stagger, staggerItemVariants } from '../components/MotionEffects.jsx';

const principles = [
  ['Start with people', 'Understand the customers and teams who will use the experience.'],
  ['Choose useful technology', 'Solve the real business problem instead of adding tools for their own sake.'],
  ['Make the scope clear', 'Agree on what is included, what happens next, and how progress will be reviewed.'],
];

const waysWeHelp = [
  { title: 'Bring an idea to life', text: 'Build a clear digital foundation with a website, app, online store, or launch-ready brand.' },
  { title: 'Make work run smoother', text: 'Connect practical AI assistants, apps, and automations to reduce repetitive work.' },
  { title: 'Grow your social presence', text: 'Plan content, manage selected social channels, publish consistently, and understand what is working.' },
  { title: 'Support Snapchat creators', text: 'We help review public profiles, plan content, understand published eligibility guidance, and prepare organized application materials. Snapchat makes all approval and earnings decisions.' },
];

const workSteps = [
  { title: 'Understand the challenge', text: 'We listen to what you want to improve, who it affects, and what a useful outcome would look like.' },
  { title: 'Find a practical fit', text: 'We recommend the right service or combination of services, then agree on scope, timing, and responsibilities.' },
  { title: 'Build and review', text: 'We create the agreed work, share progress, and use feedback at clear review points.' },
  { title: 'Launch and hand over', text: 'We help prepare for launch, transfer agreed access, and explain support options for what comes next.' },
];

export function AboutPage() {
  return <>
    <section className="about-page-hero section-wrap">
      <div className="about-art about-page-art" aria-hidden="true">
        <div className="about-grid-lines" />
        <div className="about-orb"><span /><span /><span /></div>
      </div>
      <div className="about-page-copy">
        <Eyebrow>ABOUT TELLAMIND</Eyebrow>
        <h1>Technology that helps businesses <em>move forward.</em></h1>
        <span className="about-established">Established in 2016 <i /> Michigan, USA</span>
        <p>TellaMind exists to make useful technology more practical and good digital products easier to access. We help people and businesses turn an idea or challenge into a clear next step.</p>
        <p>Based in Michigan, USA, we work with startups, shops, clinics, real estate teams, creators, and growing businesses worldwide.</p>
        <Link className="button button-dark" to="/contact">Start a project <ArrowRight size={15} /></Link>
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
        <Stagger className="about-capability-grid">
          {waysWeHelp.map(({ title, text }) => <motion.article variants={staggerItemVariants} className="about-capability-card" key={title}>
            <div className="about-capability-top"><TellaMindMark/></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>)}
        </Stagger>
      </div>
    </section>

    <section className="about-workflow">
      <div className="section-wrap">
        <SectionHeading kicker="A CLEAR WAY FORWARD" title={<>From the challenge to a <em>working solution.</em></>} copy="You’ll know what we’re doing, what we need from you, and what happens at each stage." />
        <Stagger className="about-workflow-grid">
          {workSteps.map(({ title, text }) => <motion.article variants={staggerItemVariants} className="about-workflow-card" key={title}>
            <span><TellaMindMark/></span>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.article>)}
        </Stagger>
      </div>
    </section>

    <section className="about-principles">
      <div className="section-wrap">
        <SectionHeading kicker="HOW WE SHOW UP" title={<>Clear thinking.<br /><em>Useful technology.</em></>} copy="We keep decisions and project expectations understandable from the first conversation to handoff." />
        <Stagger className="principle-grid">{principles.map(([title, copy]) => <motion.article variants={staggerItemVariants} key={title}><h3>{title}</h3><p>{copy}</p></motion.article>)}</Stagger>
      </div>
    </section>

    <section className="about-location section-wrap">
      <div>
        <Eyebrow>WHERE WE WORK</Eyebrow>
        <h2>Rooted in Michigan.<br /><em>Ready for anywhere.</em></h2>
        <p>TellaMind is based in Michigan, USA and works remotely with businesses worldwide. Project communication, time zones, and working arrangements are agreed at the start.</p>
      </div>
      <div className="location-card"><span className="location-orb"><svg viewBox="0 0 64 64" role="img" aria-label="TellaMind logo"><path d="M14 18h36M32 18v30M18 48V31l14 12 14-12v17" /></svg></span><b>Michigan, USA</b><small>Remote projects worldwide</small></div>
    </section>
    <CTASection />
  </>;
}
