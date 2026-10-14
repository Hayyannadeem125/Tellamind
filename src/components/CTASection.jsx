import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function CTASection({ title = <>Have a project in mind?</>, copy = 'Tell us what you want to launch or improve. We’ll help you choose a practical first step.' }) {
  return <section className="cta-band"><div className="section-wrap cta-band-inner"><div><span className="eyebrow-dot"/><h2>{title}</h2><p>{copy}</p></div><Link className="button button-dark" to="/contact">Tell us about your project <ArrowRight size={15}/></Link></div></section>;
}
