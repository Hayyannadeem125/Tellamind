import React from 'react';
import { Camera, Cloud, Code2, Bug, Layers3, Megaphone, Palette, Search, Share2, Smartphone, Workflow } from 'lucide-react';

const serviceIcons = {
  'websites-ecommerce': Code2,
  'mobile-app-development': Smartphone,
  'custom-business-software': Layers3,
  'brand-launch': Palette,
  'ai-automation': Workflow,
  'cloud-devops': Cloud,
  'qa-software-testing': Bug,
  'seo-digital-marketing': Search,
  'social-creator-growth': Share2,
  'meta-ads': Megaphone,
  'snapstar-support': Camera,
};

export function ServiceGlyph({ service, size = 22, className = '' }) {
  const Icon = serviceIcons[service.slug] || Code2;
  return <Icon className={className} size={size} strokeWidth={1.7} aria-hidden="true"/>;
}
