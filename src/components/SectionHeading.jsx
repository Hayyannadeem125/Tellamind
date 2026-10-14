import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Eyebrow({ children }) { return <div className="eyebrow"><span className="eyebrow-dot"/>{children}</div>; }
export function SectionHeading({ kicker, title, copy, link, to = '/contact' }) {
  return <div className="section-heading"><div><Eyebrow>{kicker}</Eyebrow><h2>{title}</h2></div><div className="heading-side">{copy && <p>{copy}</p>}{link && <Link className="text-link arrow-link" to={to}>{link} <ArrowRight size={15}/></Link>}</div></div>;
}
