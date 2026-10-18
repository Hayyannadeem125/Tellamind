import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Logo } from './Navbar.jsx';

const socialLinks = [
  { label: 'LinkedIn', url: import.meta.env.VITE_LINKEDIN_URL, mark: 'linkedin' },
  { label: 'Instagram', url: import.meta.env.VITE_INSTAGRAM_URL, mark: 'instagram' },
  { label: 'Facebook', url: import.meta.env.VITE_FACEBOOK_URL, mark: 'facebook' },
];

function SocialMark({ mark }) {
  if (mark === 'instagram') return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5"/><circle cx="12" cy="12" r="4.1"/><circle className="social-mark-fill" cx="17.65" cy="6.5" r="1.15"/></svg>;
  if (mark === 'facebook') return <svg viewBox="0 0 24 24" aria-hidden="true"><path className="social-mark-fill" d="M13.5 21v-7.4H16l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.5-1.4h1.5V4.9c-.7-.1-1.5-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.2v1.8H7.3v2.9H10V21z"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path className="social-mark-fill" d="M5 9h3v10H5zM6.5 4.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zM10 9h2.9v1.4h.1A3.2 3.2 0 0 1 15.9 8.8c3 0 3.6 2 3.6 4.6V19h-3v-5c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V19h-3z"/></svg>;
}

export function SiteFooter() {
  return <footer className="footer"><div className="section-wrap">
    <div className="footer-main">
      <div><Logo/><p>Thoughtful technology for a business moving forward.</p><span className="footer-establishment">Established in 2016</span><span className="footer-location">Based in Michigan · Working worldwide</span></div>
      <div className="footer-col"><b>Explore</b><Link to="/services">Services</Link><Link to="/work">Our work</Link><Link to="/about">About TellaMind</Link><Link to="/team">Our team</Link><Link to="/how-we-work">How we work</Link></div>
      <div className="footer-col"><b>Get in touch</b><a href="mailto:tellamindwork@gmail.com">Email us</a><Link to="/contact">Request a meeting</Link><div className="footer-socials" aria-label="TellaMind social media profiles">{socialLinks.map(({ label, url, mark }) => url ? <a className="footer-social-link" key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={`TellaMind on ${label}`} title={label}><SocialMark mark={mark}/></a> : <span className="footer-social-link is-unconfigured" key={label} role="img" aria-label={`${label} profile link not configured`} title={`${label} profile URL not configured`}><SocialMark mark={mark}/></span>)}</div></div>
      <div className="footer-col footer-news"><b>A good idea starts somewhere.</b><p>Tell us what you’re working on. We’d love to hear about it.</p><Link className="text-link" to="/contact">Start a conversation <ArrowRight size={14}/></Link></div>
    </div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} TellaMind. All rights reserved.</span><span>Michigan, USA · Serving clients worldwide</span><div><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></div></div>
  </div></footer>;
}
