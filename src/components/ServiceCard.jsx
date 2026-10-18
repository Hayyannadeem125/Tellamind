import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export function ServiceCard({ service }) {
  const Icon = service.icon;
  const isAiLogo = service.slug === 'ai-automation';
  const isSeoLogo = service.slug === 'seo-digital-marketing';
  const isWebsiteLogo = service.slug === 'websites-ecommerce';
  const isSnapchatLogo = service.slug === 'snapstar-support';
  const isMetaAdsLogo = service.slug === 'meta-ads';
  const useImage = service.logo && !isAiLogo;
  const iconClasses = `service-icon${useImage ? ' service-icon-image' : ''}${isAiLogo ? ' service-icon-ai' : ''}${isSeoLogo ? ' service-icon-seo' : ''}${isWebsiteLogo ? ' service-icon-website' : ''}${isSnapchatLogo ? ' service-icon-snapchat' : ''}${isMetaAdsLogo ? ' service-icon-meta-ads' : ''}`;
  const logoSrc = isSnapchatLogo ? `${service.logo}?v=3` : isSeoLogo || isWebsiteLogo ? `${service.logo}?v=2` : service.logo;
  return <Link className="service-card-link" to={`/services/${service.slug}`} aria-label={`Open ${service.title} service page`}><article className="service-card"><div className="service-card-top"><span className={iconClasses} aria-hidden="true">{useImage ? <img className="service-card-logo" src={logoSrc} alt="" loading="lazy"/> : <Icon size={22} strokeWidth={1.7}/>}</span></div><h3>{service.title}</h3><p>{service.summary}</p><div className="tag-list">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><span className="card-arrow" aria-hidden="true"><ArrowUpRight size={17}/></span></article></Link>;
}
