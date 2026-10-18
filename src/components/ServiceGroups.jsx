import React from 'react';
import { services, serviceCategories } from '../data.js';
import { ServiceCard } from './ServiceCard.jsx';

export function ServiceGroups() {
  return serviceCategories.map((category) => {
    const groupedServices = services.filter((service) => service.category === category.slug);

    return <section className="service-category" key={category.slug} aria-labelledby={`service-category-${category.slug}`}>
      <div className="service-category-heading">
        <h2 id={`service-category-${category.slug}`}>{category.title}</h2>
        <p>{category.description}</p>
      </div>
      <div className="service-grid">
        {groupedServices.map((service) => <ServiceCard key={service.slug} service={service}/>)}
      </div>
    </section>;
  });
}
