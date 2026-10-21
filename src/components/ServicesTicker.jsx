import React from 'react';
import { services } from '../data.js';
import { ServiceGlyph } from './ServiceGlyph.jsx';
import { TellaMindMark } from './TellaMindMark.jsx';

export function ServicesTicker() {
  const serviceNames = services.map((service) => ({ service, name: service.title }));

  return <section className="services-ticker" aria-label="TellaMind services">
    <div className="services-ticker-inner">
      <span className="services-ticker-label"><TellaMindMark/><span>OUR SERVICES</span></span>
      <div className="services-ticker-viewport">
        <div className="services-ticker-track" aria-hidden="true">
          {[0, 1].map((copy) => <div className="services-ticker-group" key={copy}>
            {serviceNames.map(({ service, name }) => <span className="services-ticker-item" key={`${copy}-${name}`}><span className="services-ticker-icon"><ServiceGlyph service={service} size={17}/></span><b>{name}</b></span>)}
          </div>)}
        </div>
      </div>
      <span className="sr-only">Services include: {serviceNames.map(({ name }) => name).join(', ')}.</span>
    </div>
  </section>;
}
