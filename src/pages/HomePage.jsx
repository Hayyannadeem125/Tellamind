import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { publicAsset } from '../utils/publicAsset.js';
import { ArrowDown, ArrowRight, ArrowUpRight, Play, Sparkles } from 'lucide-react';
import { projects } from '../data.js';
import { SectionHeading } from '../components/SectionHeading.jsx';
import { ServiceGroups } from '../components/ServiceGroups.jsx';
import { ProjectCard } from '../components/ProjectCard.jsx';
import { FAQ } from '../components/FAQ.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { TellaMindMark } from '../components/TellaMindMark.jsx';
import { ServicesTicker } from '../components/ServicesTicker.jsx';
import { motion } from 'motion/react';
import { heroItemVariants, Stagger } from '../components/MotionEffects.jsx';
import { AnimatedShaderBackground } from '../components/AnimatedShaderBackground.jsx';

function HeroVisual() {
  const defaultArtworkRef = useRef(null);
  const lightArtworkRef = useRef(null);

  useEffect(() => {
    const artworks = [defaultArtworkRef.current, lightArtworkRef.current].filter(Boolean);
    const visibleArtworks = new Map(artworks.map((artwork) => [artwork, true]));
    let scrolling = false;
    let resumeTimer = 0;

    const updateArtworkMotion = () => {
      artworks.forEach((artwork) => {
        const paused = !visibleArtworks.get(artwork) || scrolling;
        try {
          const svgDocument = artwork.contentDocument;
          if (!svgDocument) return;

          let scrollStyle = svgDocument.getElementById('tellamind-scroll-motion');
          if (!scrollStyle) {
            scrollStyle = svgDocument.createElementNS('http://www.w3.org/2000/svg', 'style');
            scrollStyle.id = 'tellamind-scroll-motion';
            scrollStyle.textContent = `
              :root[data-scroll-paused="true"] *,
              :root[data-scroll-paused="true"] *::before,
              :root[data-scroll-paused="true"] *::after {
                animation-play-state: paused !important;
                transition-duration: 0s !important;
              }
            `;
            svgDocument.documentElement.append(scrollStyle);
          }
          svgDocument.documentElement.setAttribute('data-scroll-paused', String(paused));
        } catch {
          // The illustration remains visible if the browser blocks SVG document access.
        }
      });
    };

    const onScroll = () => {
      scrolling = true;
      window.clearTimeout(resumeTimer);
      updateArtworkMotion();
      resumeTimer = window.setTimeout(() => {
        scrolling = false;
        updateArtworkMotion();
      }, 240);
    };
    const onArtworkLoad = () => updateArtworkMotion();
    const observer = typeof IntersectionObserver === 'function'
      ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => visibleArtworks.set(entry.target, entry.isIntersecting));
        updateArtworkMotion();
      }, { rootMargin: '80px' })
      : null;

    artworks.forEach((artwork) => {
      artwork.addEventListener('load', onArtworkLoad);
      observer?.observe(artwork);
    });
    window.addEventListener('scroll', onScroll, { passive: true });
    updateArtworkMotion();

    return () => {
      window.clearTimeout(resumeTimer);
      window.removeEventListener('scroll', onScroll);
      artworks.forEach((artwork) => artwork.removeEventListener('load', onArtworkLoad));
      observer?.disconnect();
    };
  }, []);

  return <div className="hero-visual">
    <AnimatedShaderBackground />
    <div className="visual-orbit orbit-one" />
    <div className="visual-orbit orbit-two" />
    <div className="visual-glow" />
    <object ref={defaultArtworkRef} className="hero-object hero-object-default" data={publicAsset('tellamind-hero-v3.svg')} type="image/svg+xml" role="img" aria-label="Animated cube illustration with orbital paths" />
    <object ref={lightArtworkRef} className="hero-object hero-object-light" data={publicAsset('tellamind-hero-green-v3.svg')} type="image/svg+xml" role="img" aria-label="Animated green cube illustration with orbital paths" />
    <span className="floating-star star-b">✦</span>
  </div>;
}

export function HomePage() {
  return <div className="home-page">
    <section className="hero section-wrap"><div className="hero-copy"><div className="eyebrow"><span className="eyebrow-dot"/> DIGITAL PRODUCTS. SMARTER WORK.</div><h1><span className="hero-title-gradient">Websites, apps & AI that help your business <em>move forward.</em></span></h1><p className="hero-lede">We help startups, shops, clinics, real estate teams, and creators launch online and reduce repetitive work.</p><div className="hero-actions"><Link className="button button-dark" to="/contact">Start a project <ArrowRight size={16}/></Link><Link className="text-link" to="/work"><span className="play-circle"><Play size={11} fill="currentColor"/></span> Explore our projects</Link></div><div className="hero-meta"><div className="hero-brand-mini" aria-hidden="true"><img src={publicAsset('tellamind-mark.svg')} alt=""/></div><p><b>Clear scope.</b><br/>Useful technology, built around your goals.</p><span className="meta-divider"/><p className="meta-location">Based in Michigan<br/>Working worldwide <ArrowUpRight size={12}/></p></div></div><HeroVisual/><Link className="scroll-cue" to="/services"><ArrowDown size={13}/> EXPLORE SERVICES</Link></section>
    <section className="trust-strip"><div className="section-wrap trust-inner">
      <div className="trust-brand"><img src={publicAsset('tellamind-mark.svg')} alt="TellaMind"/><div><span className="trust-label">BUILT FOR WHAT’S NEXT</span><b>Technology that moves work forward</b><small>For startups, teams & creators</small></div></div>
      <article className="trust-item"><span className="trust-item-icon"><TellaMindMark/></span><div><b>Smarter operations</b><small>AI and automation for everyday work</small></div></article>
      <article className="trust-item"><span className="trust-item-icon"><TellaMindMark/></span><div><b>Better experiences</b><small>Websites, apps, and digital products</small></div></article>
      <article className="trust-item"><span className="trust-item-icon"><TellaMindMark/></span><div><b>Room to grow</b><small>Social, search, and creator support</small></div></article>
    </div></section>
    <ServicesTicker/>
    <section className="services section-wrap" id="services"><SectionHeading kicker="SERVICES" title={<>Build what your business needs.<br/><em>One clear next step.</em></>} copy="Choose a service to see how we can help you launch, improve, or manage your digital work." link="Explore all services" to="/services"/><ServiceGroups/><div className="service-note"><span><Sparkles size={15}/> Not sure what you need?</span><p>Tell us what you need help with and we’ll point you to the right service.</p><Link to="/contact">Let’s figure it out <ArrowRight size={14}/></Link></div></section>
    <section className="work-section"><div className="section-wrap"><SectionHeading kicker="OUR PROJECTS" title={<>Technology made<br/><em>practical.</em></>} copy="Explore projects built by TellaMind across recruitment, property websites, and creator support." link="View all projects" to="/work"/><Stagger className="project-grid">{projects.map((project) => <ProjectCard key={project.slug} project={project}/>)}</Stagger><div className="concept-disclaimer"><span className="disclaimer-icon">i</span><p><b>About the project details</b><br/>These are TellaMind-built projects. Applicant, property, and creator information in the interactive previews is illustrative, not client results. Snapchat alone decides Snap Star approval and monetization eligibility.</p></div></div></section>
    <section className="about-section section-wrap"><div className="about-art about-home-art" aria-hidden="true"><div className="about-grid-lines"/><div className="about-orb"><span/><span/><span/></div></div><div className="about-copy"><div className="eyebrow"><span className="eyebrow-dot"/> ABOUT TELLAMIND</div><h2>Technology should make the next step <em>feel possible.</em></h2><p>Established in 2016, TellaMind helps turn practical technology into useful products and services for businesses, teams, and creators.</p><p>Tell us what you want to improve. We’ll understand the goal, recommend a practical approach, and agree on the work and timeline before we begin.</p><Link className="button button-outline" to="/about">More about TellaMind <ArrowRight size={15}/></Link><div className="about-facts"><div><b>Established 2016</b><span>Building useful technology</span></div><div><b>Michigan</b><span>Our home base</span></div><div><b>Worldwide</b><span>Where we work</span></div></div></div></section>
    <section className="process-section"><div className="section-wrap"><SectionHeading kicker="HOW WE WORK" title={<>Good work starts<br/><em>with a good process.</em></>} copy="No mystery handoffs. Just a clear path from the first conversation to launch." link="See how we work" to="/how-we-work"/><Stagger className="process-grid">{[['Listen & learn','We get to know your goals, customers, constraints, and what success needs to look like.'],['Plan the right thing','You get a clear recommendation, project scope, timeline, and proposal before we build.'],['Build together','We share progress, gather feedback at the right moments, and keep decisions moving.'],['Launch & support','We help you go live, hand over the keys, and stay available for what comes next.']].map(([title,copy])=><motion.article variants={heroItemVariants} className="process-step" key={title}><div className="step-line"/><h3>{title}</h3><p>{copy}</p></motion.article>)}</Stagger></div></section>
    <section className="pricing section-wrap"><div className="pricing-panel"><div className="pricing-mark"><img src={publicAsset('tellamind-mark.svg')} alt="TellaMind logo"/></div><div className="pricing-copy"><div className="eyebrow"><span className="eyebrow-dot"/> PRICING & ESTIMATES</div><h2>Thoughtful work.<br/><em>A clear investment.</em></h2><p>Project costs depend on the features and support you need. We’ll share the scope, timeline, and estimate before work begins.</p><Link className="button button-dark" to="/contact">Start a project <ArrowRight size={15}/></Link><span className="pricing-small">Clear scope and estimate before you commit.</span></div><div className="pricing-aside"><div className="aside-rule"/><b>What to expect</b><ul><li>✓ A recommendation that fits your goals</li><li>✓ Clear deliverables and timeline</li><li>✓ A written proposal before work begins</li></ul><Link to="/contact">Ask about a project <ArrowUpRight size={14}/></Link></div></div></section>
    <FAQ compact/><CTASection/>
  </div>;
}
