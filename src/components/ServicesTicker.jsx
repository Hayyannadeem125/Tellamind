import React from 'react';
import { services } from '../data.js';
import { TellaMindMark } from './TellaMindMark.jsx';

export function ServicesTicker() {
  const serviceNames = services.map((service) => service.title);

  return <section className="services-ticker" aria-label="TellaMind services">
    <div className="services-ticker-inner">
      <span className="services-ticker-label"><TellaMindMark/><span>OUR SERVICES</span></span>
      <div className="services-ticker-viewport">
        <div className="services-ticker-track" aria-hidden="true">
          {[0, 1].map((copy) => <div className="services-ticker-group" key={copy}>
            {serviceNames.map((name, index) => <span className="services-ticker-item" key={`${copy}-${name}`}><i className="services-ticker-number">{String(index + 1).padStart(2, '0')}</i><b>{name}</b></span>)}
          </div>)}
        </div>
      </div>
      <span className="sr-only">Services include: {serviceNames.join(', ')}.</span>
    </div>
  </section>;
}
