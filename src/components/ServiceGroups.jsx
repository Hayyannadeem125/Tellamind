import React from 'react';
import { services } from '../data.js';
import { ServiceCard } from './ServiceCard.jsx';
import { Stagger } from './MotionEffects.jsx';

export function ServiceGroups() {
  const servicesForGrid = [...services];
  const snapStarIndex = servicesForGrid.findIndex((service) => service.slug === 'snapstar-support');
  const finalRowStart = Math.floor((servicesForGrid.length - 1) / 3) * 3;

  if (snapStarIndex > finalRowStart) {
    const [snapStar] = servicesForGrid.splice(snapStarIndex, 1);
    servicesForGrid.splice(finalRowStart, 0, snapStar);
  }

  return <Stagger className="service-grid">
    {servicesForGrid.map((service) => <ServiceCard key={service.slug} service={service}/>)}
  </Stagger>;
}
