import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { TellaMindMark } from './TellaMindMark.jsx';

export function ServiceCard({ service }) {
  return <Link className="service-card-link" to={`/services/${service.slug}`} aria-label={`Open ${service.title} service page`}><article className="service-card"><div className="service-card-top"><span className="service-icon" aria-hidden="true"><TellaMindMark/></span></div><h3>{service.title}</h3><p>{service.summary}</p><div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="card-arrow" aria-hidden="true"><ArrowUpRight size={17}/></span></article></Link>;
}
