import React from 'react';
import { ArrowRight, ArrowUpRight, CalendarDays, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ContactForm } from '../components/ContactForm.jsx';
import { Eyebrow } from '../components/SectionHeading.jsx';
import { services } from '../data.js';
import { ContactHeroOrbit } from '../components/ContactHeroOrbit.jsx';

const bookingUrl = import.meta.env.VITE_BOOKING_URL;

export function ContactPage() {
  return <>
    <section className="contact-page-intro section-wrap contact-page-hero">
      <div className="contact-page-hero-copy">
        <Eyebrow>YOUR NEXT STEP STARTS HERE</Eyebrow>
        <h1>Tell us what you need <em>to build.</em></h1>
        <p>Share a few details about your project. We’ll reply about the right service and next steps.</p>
      </div>
      <ContactHeroOrbit />
    </section>
    <section className="contact-section contact-page-section">
      <div className="section-wrap contact-layout">
        <div className="contact-copy">
          <h2>Choose how you’d like to <em>contact us.</em></h2>
          <p>Email us, request a meeting, or use the form. We’re based in Michigan and work worldwide.</p>
          <div className="contact-links">
            <a href="mailto:tellamindwork@gmail.com"><span><Mail size={16}/></span> tellamindwork@gmail.com <ArrowUpRight size={14}/></a>
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
              {services.map((service) => (
                <Link key={service.slug} to={`/services/${service.slug}`}>
                  {service.title}<ArrowRight size={14}/>
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
