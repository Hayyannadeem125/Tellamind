import React from 'react';
import { services } from '../data.js';

export function ServicesTicker() {
  const serviceNames = services.map((service) => service.shortTitle);

  return <section className="services-ticker" aria-label="TellaMind services">
    <div className="services-ticker-inner">
      <span className="services-ticker-label">WHAT WE DO</span>
      <div className="services-ticker-viewport">
        <div className="services-ticker-track" aria-hidden="true">
          {[0, 1].map((copy) => <div className="services-ticker-group" key={copy}>
            {serviceNames.map((name) => <span className="services-ticker-item" key={`${copy}-${name}`}><i aria-hidden="true"/>{name}</span>)}
          </div>)}
        </div>
      </div>
      <span className="sr-only">Services include: {serviceNames.join(', ')}.</span>
    </div>
  </section>;
}
