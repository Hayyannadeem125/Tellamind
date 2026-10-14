import React from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Mail, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm.jsx';
import { Eyebrow } from '../components/SectionHeading.jsx';

const bookingUrl = import.meta.env.VITE_BOOKING_URL;
const dedicatedInquiryServices = [
  { label: 'AI automation & agents', slug: 'ai-automation' },
  { label: 'Websites & e-commerce', slug: 'websites-ecommerce' },
  { label: 'Apps & custom software', slug: 'apps-software' },
  { label: 'SEO & digital marketing', slug: 'seo-digital-marketing' },
  { label: 'Snap Star & Snapchat creator support', slug: 'snapstar-support' },
];

export function ContactPage() {
  return <>
    <section className="contact-page-intro section-wrap">
      <Eyebrow>YOUR NEXT STEP STARTS HERE</Eyebrow>
      <h1>Tell us what you need <em>to build.</em></h1>
      <p>Share a few details about your project. We’ll reply about the right service and next steps.</p>
    </section>
    <section className="contact-section contact-page-section">
      <div className="section-wrap contact-layout">
        <div className="contact-copy">
          <h2>Choose how you’d like to <em>contact us.</em></h2>
          <p>Email us, message us on WhatsApp, request a meeting, or use the form. We’re based in Michigan and work worldwide.</p>
          <div className="contact-links">
            <a href="mailto:tellamindwork@gmail.com"><span><Mail size={16}/></span> tellamindwork@gmail.com <ArrowUpRight size={14}/></a>
            <a href="https://wa.me/923324277277" target="_blank" rel="noreferrer"><span><MessageCircle size={16}/></span> WhatsApp: +92 332 427 7277 <ArrowUpRight size={14}/></a>
            {bookingUrl
              ? <a href={bookingUrl} target="_blank" rel="noreferrer"><span><CalendarDays size={16}/></span> Choose a meeting time <ArrowUpRight size={14}/></a>
              : <a href="mailto:tellamindwork@gmail.com?subject=Book%20a%20TellaMind%20meeting"><span><CalendarDays size={16}/></span> Request a meeting time <ArrowUpRight size={14}/></a>}
          </div>
          <div className="timezone-note">Meeting times are confirmed with your local time zone.</div>
          <nav className="contact-specialized" aria-label="Service-specific inquiry forms">
            <span className="contact-specialized-kicker">SERVICE-SPECIFIC INQUIRIES</span>
            <h3>Have a service in mind?</h3>
            <p>Open its page to find the focused inquiry form and share the details that matter for that service.</p>
            <div className="contact-specialized-links">
              {dedicatedInquiryServices.map((service) => (
                <Link key={service.slug} to={`/services/${service.slug}`}>
                  {service.label}<ArrowRight size={14}/>
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <ContactForm/>
      </div>
    </section>
    <section className="contact-alternate section-wrap">
      <div><b>Not ready to fill out a form?</b><p>Email us with a few lines about the project and we will take it from there.</p></div>
      <a href="mailto:tellamindwork@gmail.com">Send an email <ArrowUpRight size={14}/></a>
    </section>
  </>;
}
