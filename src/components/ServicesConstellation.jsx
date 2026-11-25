import React from 'react';
import { Bot, Globe2, Smartphone } from 'lucide-react';

const servicePillars = [
  { icon: Globe2, title: 'Websites', detail: 'A clearer way to show up' },
  { icon: Smartphone, title: 'Apps', detail: 'Tools shaped around people' },
  { icon: Bot, title: 'AI & automation', detail: 'Less repetitive work' },
];

export function ServicesConstellation() {
  return <div className="services-constellation service-pillars" role="img" aria-label="TellaMind service areas">
    <div className="service-pillars-heading"><span>WHAT WE BUILD</span><b>Useful technology,<br />built around your goal.</b></div>
    <div className="service-pillars-list">
      {servicePillars.map(({ icon: Icon, title, detail }, index) => <div className="service-pillar" key={title}>
        <span className="service-pillar-icon"><Icon size={19} strokeWidth={1.7} /></span>
        <span><b>{title}</b><small>{detail}</small></span>
        <i>0{index + 1}</i>
      </div>)}
    </div>
    <div className="service-pillars-foot"><span /> START WITH THE OUTCOME</div>
  </div>;
}
