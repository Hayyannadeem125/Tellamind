import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, BarChart3, Check, Layers, Target } from 'lucide-react';
import { serviceSlug } from '../data.js';
import { Eyebrow } from '../components/SectionHeading.jsx';
import { CTASection } from '../components/CTASection.jsx';
import { SnapchatReadiness } from '../components/SnapchatReadiness.jsx';
import { ServiceInquiryForm } from '../components/ServiceInquiryForm.jsx';
import { NotFoundPage } from './NotFoundPage.jsx';

const dedicatedInquirySlugs = new Set(['ai-automation', 'websites-ecommerce', 'mobile-app-development', 'cloud-devops', 'qa-software-testing', 'custom-business-software', 'seo-digital-marketing', 'social-creator-growth', 'meta-ads']);

export function ServiceDetailPage() {
  const { slug } = useParams();
  const service = serviceSlug(slug);
  if (!service) return <NotFoundPage />;

  const Icon = service.icon;
  const serviceImage = service.detailImage;
  const hasDedicatedInquiry = dedicatedInquirySlugs.has(service.slug);
  const inquiryTarget = hasDedicatedInquiry ? '#service-inquiry' : `/contact?service=${service.slug}`;

  return <>
    <section className="detail-hero section-wrap">
      <div className="detail-hero-copy">
        <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><span>{service.shortTitle}</span></div>
        <Eyebrow>OUR SERVICES</Eyebrow>
        <h1>{service.title}<br/><em>built around your needs.</em></h1>
        <p>{service.intro}</p>
        {hasDedicatedInquiry
          ? <a className="button button-dark" href={inquiryTarget}>Start a project <ArrowRight size={15}/></a>
          : <Link className="button button-dark" to={inquiryTarget}>Start a project <ArrowRight size={15}/></Link>}
      </div>
      <div className={`detail-icon-art${serviceImage ? ' detail-icon-art--image' : ''}${service.slug === 'websites-ecommerce' ? ' detail-icon-art--website' : ''}${service.slug === 'social-creator-growth' ? ' detail-icon-art--social' : ''}${service.slug === 'qa-software-testing' ? ' detail-icon-art--qa' : ''}${service.slug === 'meta-ads' ? ' detail-icon-art--meta-ads' : ''}`}>
        {serviceImage
          ? <img className={`detail-service-image${service.slug === 'websites-ecommerce' ? ' detail-website-image' : ''}`} src={serviceImage} alt={`${service.shortTitle} service artwork`} fetchPriority="high"/>
          : <><div className="detail-icon-orbit"/><span><Icon size={42}/></span><small>{service.shortTitle}</small></>}
      </div>
    </section>

    <section className="detail-content section-wrap">
      <div className="detail-main">
        <Eyebrow>WHAT WE CAN HELP WITH</Eyebrow>
        <h2>Useful building blocks.<br/><em>A clear project scope.</em></h2>
        <p className="detail-intro">The exact mix depends on your goals and existing setup. Common deliverables include:</p>
        <div className="deliverable-grid">{service.deliverables.map(item => <div className="deliverable-card" key={item}><Check size={15}/><span>{item}</span></div>)}</div>
        {service.slug === 'snapstar-support' && <SnapchatReadiness/>}
        {service.slug === 'social-creator-growth' && <>
          <section className="social-growth-platforms">
            <Eyebrow>CHANNELS AND CAMPAIGN SUPPORT</Eyebrow>
            <h3>Choose the channels that fit your audience.</h3>
            <p className="social-growth-intro">We adapt the content and publishing plan to each channel instead of repeating the same post everywhere.</p>
            <div className="social-growth-grid">
              <article><span>FACEBOOK + INSTAGRAM</span><h4>Meta social management</h4><p>Profile improvements, content calendars, posts, Reels, Stories, publishing, and agreed comment or inbox support.</p></article>
              <article><span>YOUTUBE</span><h4>Channel and video planning</h4><p>Channel organization, long-form and Shorts planning, upload details, thumbnail direction, publishing, and performance reviews.</p></article>
              <article><span>SNAPCHAT</span><h4>Creator content support</h4><p>Public Profile guidance, Stories and Spotlight planning, Insights review, and creator-readiness preparation.</p></article>
            </div>
            <div className="social-paid-media-note"><p><b>Paid ads are a separate scope.</b> Facebook and Instagram campaigns have their own <Link to="/services/meta-ads">Meta Ads service</Link>. Paid search campaigns are not included in social media management.</p></div>
          </section>
          <div className="snap-support-card">
            <Eyebrow>SNAPCHAT CREATOR SUPPORT</Eyebrow>
            <h3>Prepare your profile and content with a clear plan.</h3>
            <ul><li>Public Profile review and setup guidance</li><li>Stories and Spotlight content planning</li><li>Eligibility readiness review</li><li>Snap Star application preparation using Snapchat’s official process</li><li>Creator media kit and brand partnership readiness</li></ul>
            <p><b>Important:</b> Snapchat makes every eligibility, verification, monetization, and revenue decision. No third party can influence Snap Star eligibility. TellaMind cannot guarantee approval or earnings, and never needs your Snapchat password.</p>
            <div className="snap-official-links"><a href="https://help.snapchat.com/hc/en-us/articles/7012407611412-How-do-I-become-a-Snap-Star" target="_blank" rel="noreferrer">Snap Star eligibility information <ArrowUpRight size={13}/></a><a href="https://help.snapchat.com/hc/en-us/articles/14669003687444-About-Snapchat-s-Monetization-Program" target="_blank" rel="noreferrer">Snapchat monetization program <ArrowUpRight size={13}/></a></div>
          </div>
        </>}
        <div className="usecase-block"><Eyebrow>COMMON USE CASES</Eyebrow><ul>{service.useCases.map(item => <li key={item}>{item}<ArrowUpRight size={13}/></li>)}</ul></div>
      </div>
      <aside className="scope-card"><span className="scope-card-icon"><Icon size={19}/></span><b>What we scope together</b><p>{service.detail}</p><div className="scope-line"/><span className="scope-kicker">YOUR NEXT STEP</span>{hasDedicatedInquiry ? <a href={inquiryTarget}>Start a project inquiry <ArrowRight size={14}/></a> : <Link to={inquiryTarget}>Describe your project <ArrowRight size={14}/></Link>}</aside>
    </section>

    {service.slug === 'meta-ads' && <section className="meta-ads-approach section-wrap">
      <div className="meta-ads-approach-heading"><Eyebrow>HOW WE BUILD THE CAMPAIGN</Eyebrow><h2>One connected path<br/><em>from ad to action.</em></h2><p>Paid social works best when the campaign promise, creative, landing page, and measurement support the same business goal.</p></div>
      <div className="meta-ads-pillars">
        <article><span><Target size={19}/></span><h3>Start with the business goal</h3><p>We clarify the offer, audience, geography, and action that matters, then match the campaign plan and budget to that objective.</p></article>
        <article><span><Layers size={19}/></span><h3>Make every placement count</h3><p>We shape copy and creative direction for the selected Facebook and Instagram placements, then keep the destination page consistent with the ad.</p></article>
        <article><span><BarChart3 size={19}/></span><h3>Measure, learn, improve</h3><p>We review available tracking, agree on useful measures, and use campaign data to guide the next round of testing and budget decisions.</p></article>
      </div>
      <div className="meta-ads-policy-links"><span>Campaigns remain subject to Meta review and advertising policies.</span><a href="https://transparency.meta.com/policies/ad-standards/" target="_blank" rel="noreferrer">Meta Advertising Standards <ArrowUpRight size={13}/></a><a href="https://www.facebook.com/business/ads/facebook-instagram-reels-ads" target="_blank" rel="noreferrer">Meta Reels ad guidance <ArrowUpRight size={13}/></a></div>
    </section>}

    {hasDedicatedInquiry && <ServiceInquiryForm serviceSlug={service.slug}/>}
    <section className="service-process-strip"><div className="section-wrap"><Eyebrow>A PRACTICAL START</Eyebrow><div className="mini-process"><span>Understand the goal</span><i>→</i><span>Agree on scope</span><i>→</i><span>Build and review</span><i>→</i><span>Launch or hand off</span></div></div></section>
    <CTASection title={<>Let’s talk about <em>{service.shortTitle.toLowerCase()}.</em></>} copy="We will learn about your goals and help define a sensible scope."/>
  </>;
}
