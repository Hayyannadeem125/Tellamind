import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Eyebrow, SectionHeading } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { motion } from 'motion/react';
import { Stagger, staggerItemVariants } from '../components/MotionEffects.jsx';
import { ProcessJourney } from '../components/ProcessJourney.jsx';

const processSteps = [
  ['Listen & learn','We get to know your goals, customers, current tools, constraints, and what success needs to look like.','A focused discovery conversation and a list of the important questions.'],
  ['Plan the right thing','We recommend a sensible approach and outline the scope before building.','Written deliverables, assumptions, dependencies, timeline, and a proposal.'],
  ['Build together','We share progress and gather feedback at agreed review points.','A focused build with clear decisions and defined change requests.'],
  ['Launch & support','We help prepare the launch, hand over access, and agree on next-step support.','A launch/handoff plan, training where needed, and any agreed care plan.'],
];

export function ProcessPage() {
  return <>
    <section className="page-hero section-wrap process-page-hero">
      <div className="process-page-copy">
        <Eyebrow>HOW WE WORK</Eyebrow>
        <h1>A clear path from <em>idea to launch.</em></h1>
        <p>You’ll know what we’re building, who needs to do what, when feedback is needed, and what happens after launch.</p>
        <Link className="button button-dark" to="/contact">Start a project <ArrowRight size={15}/></Link>
      </div>
      <ProcessJourney />
    </section>
    <Stagger as="section" className="process-detail section-wrap">
      {processSteps.map(([title,copy,output]) => <motion.article variants={staggerItemVariants} className="process-detail-step" key={title}>
        <div>
          <h2>{title}</h2>
          <p>{copy}</p>
          <div className="process-output"><Check size={15}/><span><b>Typical output:</b> {output}</span></div>
        </div>
      </motion.article>)}
    </Stagger>
    <section className="scope-band">
      <div className="section-wrap scope-band-inner">
        <div><Eyebrow>BEFORE WORK BEGINS</Eyebrow><h2>Agree on the details <em>before work begins.</em></h2></div>
        <ul><li>Scope and deliverables</li><li>Owner responsibilities and required access</li><li>Timeline and feedback points</li><li>Payment and ongoing support terms</li></ul>
      </div>
    </section>
    <CTASection title={<>Let’s plan your <em>next step.</em></>} copy="Tell us what you are hoping to build or improve." />
  </>;
}
