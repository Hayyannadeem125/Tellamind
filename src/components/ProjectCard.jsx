import React from 'react';
import { ArrowUpRight, Bot, Check, Workflow } from 'lucide-react';
import { Link } from 'react-router-dom';
import { publicAsset } from '../utils/publicAsset.js';
import { SnapchatGhostIcon } from './SnapchatGhostIcon.jsx';
import { motion } from 'motion/react';
import { staggerItemVariants } from './MotionEffects.jsx';

function AutomationArtwork() {
  const stages = [
    { title: 'New applicants', count: '08', people: [['JM', 'Jordan M.', 'Product Designer', 'LinkedIn']], tone: 'applicant-new' },
    { title: 'Screening', count: '04', people: [['AK', 'Avery K.', 'Frontend Engineer', 'Resume parsed']], tone: 'applicant-screen' },
    { title: 'Interview', count: '02', people: [['TR', 'Taylor R.', 'Operations Lead', 'Invite drafted']], tone: 'applicant-interview' },
    { title: 'Offer', count: '01', people: [['MS', 'Morgan S.', 'UX Researcher', 'Review needed']], tone: 'applicant-offer' },
  ];

  return <div className="project-art project-art--automation" aria-hidden="true">
    <div className="automation-preview">
      <div className="automation-topbar"><span className="automation-logo"><img src={publicAsset('tellamind-mark.svg')} alt=""/></span><div><b>TellaMind</b><small>Recruitment workflow</small></div><span className="preview-tag"><i/> AUTOMATIONS ON</span></div>
      <div className="automation-content"><div className="automation-rail"><i/><i/><i/><i/></div><div className="automation-main"><div className="automation-heading"><div><small>HIRING PIPELINE · PRODUCT DESIGNER</small><b>Candidate journey</b></div><span><i/>4 stages</span></div><div className="recruitment-board">{stages.map((stage) => <div className="recruitment-stage" key={stage.title}><div className="recruitment-stage-heading"><b>{stage.title}</b><span>{stage.count}</span></div>{stage.people.map(([initials, name, role, status]) => <div className={`recruitment-candidate ${stage.tone}`} key={name}><div className="recruitment-candidate-top"><span>{initials}</span><b>{name}</b><ArrowUpRight size={10}/></div><small>{role}</small><em>{status}</em></div>)}</div>)}</div><div className="recruitment-automation"><span><Bot size={12}/></span><b>Automation:</b> application → resume parse → role match → recruiter review <i>● ACTIVE</i></div></div></div>
    </div>
    <span className="project-art-caption">RECRUITMENT WORKFLOW · ILLUSTRATIVE PROFILES</span>
  </div>;
}

function WebsiteArtwork() {
  return <div className="project-art project-art--website" aria-hidden="true">
    <div className="website-preview">
      <div className="website-topbar"><span className="website-wordmark">Home Lease<span>.</span></span><span>Homes　 Neighborhoods　 About</span><b>Book a tour ↗</b></div>
      <div className="website-hero"><div className="website-copy"><small>FIND A PLACE TO CALL HOME</small><b>Make room<br/>for what matters.</b><span>Thoughtful homes. A simpler way to find yours.</span><div className="website-search"><i/> City, neighborhood, or ZIP <b>Search</b></div></div><div className="website-home-art"><img src="https://images.unsplash.com/photo-1781269986378-a2f366df4d0f?fit=crop&fm=webp&w=640&q=62" alt="" loading="lazy" decoding="async" fetchPriority="low"/></div></div>
      <div className="website-listings"><span>Homes worth a closer look</span><div><img src="https://images.unsplash.com/photo-1769494244517-7aabbef35b28?fit=crop&fm=webp&w=144&q=55" alt="" loading="lazy" decoding="async" fetchPriority="low"/><b>Modern family home</b><small>3 beds · 2 baths</small></div><div><img src="https://images.unsplash.com/photo-1773427621086-1f8511c78e39?fit=crop&fm=webp&w=144&q=55" alt="" loading="lazy" decoding="async" fetchPriority="low"/><b>Quiet garden retreat</b><small>2 beds · 2 baths</small></div></div>
    </div>
    <span className="project-art-caption">RESPONSIVE WEBSITES </span>
  </div>;
}

function CreatorArtwork() {
  const checklist = ['50K+ Followers', 'Fulfil views condition', 'Watch hours completed'];
  return <div className="project-art project-art--creator" aria-hidden="true">
    <div className="creator-preview">
      <div className="creator-topbar"><span>Creator workspace</span><b>CREATOR SUPPORT</b></div>
      <div className="creator-content"><div className="creator-profile"><div className="creator-avatar"><SnapchatGhostIcon/></div><small>SNAPCHAT PROFILE</small><b>Creator profile</b><span>Stories · Spotlight · Public profile</span><div className="creator-profile-line"/><span className="creator-note">A clear place to plan your next step.</span></div><div className="creator-checklist"><small>MONETISATION READINESS</small><b>Creator checklist</b>{checklist.map(item => <div key={item}><span><Check size={12}/></span>{item}</div>)}<p>Illustrative checklist · Snapchat decides eligibility.</p></div></div>
    </div>
    <span className="project-art-caption">SNAPCHAT CREATOR SUPPORT · PROJECT OVERVIEW</span>
  </div>;
}

export function ProjectArtwork({ project }) {
  if (project.theme === 'automation') return <AutomationArtwork/>;
  if (project.theme === 'website') return <WebsiteArtwork/>;
  return <CreatorArtwork/>;
}

export function ProjectCard({ project }) {
  return <motion.article variants={staggerItemVariants} className={`project-card project-card--${project.theme}`}>
    <Link to={`/work/${project.slug}`} className="project-art-link" aria-label={`Open ${project.name} project page`}><ProjectArtwork project={project}/></Link>
    <div className="project-details"><div><span>{project.badge} · {project.type}</span><h3><Link to={`/work/${project.slug}`}>{project.name}</Link></h3><p>{project.title}</p></div><Link to={`/work/${project.slug}`} aria-label={`Open ${project.name} project page`}><ArrowUpRight size={17}/></Link></div>
  </motion.article>;
}
