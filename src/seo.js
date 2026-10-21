import { projectSlug, serviceSlug } from './data.js';

const pages = {
  '/': {
    title: 'Web, App & Custom Software Development | TellaMind',
    description: 'TellaMind is a Michigan-based technology company building business websites, mobile apps, custom software, and AI automation for teams worldwide.',
  },
  '/services': {
    title: 'Website, App, Software & Digital Services | TellaMind',
    description: 'Explore TellaMind services for business websites, mobile apps, custom software, AI automation, cloud and DevOps, QA, SEO, social media, and Meta Ads.',
  },
  '/work': {
    title: 'Selected Digital Product Projects | TellaMind',
    description: 'Explore interactive projects built by TellaMind across recruitment workflows, property websites, and Snapchat creator support. Project data is illustrative.',
  },
  '/about': {
    title: 'About TellaMind | Michigan Technology Company',
    description: 'Learn about TellaMind, a Michigan-based technology company established in 2016 and working with businesses worldwide.',
  },
  '/team': {
    title: 'TellaMind Team & Project Roles',
    description: 'Meet the people and project disciplines behind TellaMind’s website, software, automation, and digital growth work.',
  },
  '/how-we-work': {
    title: 'Our Process for Building Digital Products | TellaMind',
    description: 'See how TellaMind scopes, plans, builds, reviews, and launches technology projects with clear deliverables and communication.',
  },
  '/contact': {
    title: 'Contact TellaMind | Discuss a Project',
    description: 'Contact TellaMind about a website, mobile app, custom software, automation, or digital marketing project. Based in Michigan, working worldwide.',
  },
  '/privacy': { title: 'Privacy Policy | TellaMind', description: 'Read how TellaMind handles information submitted through website inquiries.' },
  '/terms': { title: 'Terms of Service | TellaMind', description: 'Read the terms that apply to using the TellaMind website.' },
};

const serviceSeo = {
  'websites-ecommerce': ['Website Design & E-commerce Development | TellaMind', 'Plan a business website, landing page, or online store with TellaMind. Explore website design, e-commerce development, redesign, and website care.'],
  'mobile-app-development': ['Mobile App Development for iOS & Android | TellaMind', 'Plan and build an iOS, Android, or cross-platform mobile app with TellaMind, from product scope and user flows to a focused first release.'],
  'custom-business-software': ['Custom Business Software Development | TellaMind', 'Build custom business software around your workflows, including dashboards, client portals, internal tools, and system integrations.'],
  'brand-launch': ['Business Branding & Digital Launch Services | TellaMind', 'Prepare a new business for launch with brand identity direction, social profile assets, website copy planning, and a practical digital launch checklist.'],
  'ai-automation': ['AI Automation & Business Workflow Services | TellaMind', 'Reduce repetitive business work with practical AI assistants, workflow automation, lead routing, and integrations planned around your tools.'],
  'cloud-devops': ['Cloud & DevOps Services for AWS and Azure | TellaMind', 'Plan cloud migration, AWS or Azure setup, CI/CD pipelines, deployment workflows, monitoring, and infrastructure reviews with TellaMind.'],
  'qa-software-testing': ['Software QA, Testing & Release Readiness | TellaMind', 'Find and document software issues with functional, regression, browser, and device testing for websites, apps, and business software.'],
  'seo-digital-marketing': ['SEO & Digital Marketing Services | TellaMind', 'Improve technical and on-page SEO, local search foundations, analytics, and email campaign setup with a clearly scoped digital marketing plan.'],
  'social-creator-growth': ['Social Media Management & Creator Support | TellaMind', 'Plan platform-specific content and social media support for Facebook, Instagram, YouTube, and Snapchat, with publishing and reporting scoped to your needs.'],
  'meta-ads': ['Facebook & Instagram Ads Management | TellaMind', 'Plan and manage Meta ad campaigns for Facebook and Instagram, including campaign strategy, creative direction, tracking review, and optimization.'],
  'snapstar-support': ['Snapchat Creator & Snap Star Readiness Support | TellaMind', 'Get help reviewing a Snapchat Public Profile, planning creator content, and organizing Snap Star application materials. Snapchat makes all approval decisions.'],
};

const projectSeo = {
  'hireflow-recruitment': ['Recruitment Workflow Project | TellaMind', 'Explore a TellaMind-built recruitment workflow preview for applicant intake, role matching, and recruiter-reviewed interview preparation.'],
  'government-website': ['Property Website Project | TellaMind', 'Explore a TellaMind-built property website preview with listing filters, property details, and a tour request flow. Listing data is illustrative.'],
  'creator-readiness': ['Snapchat Creator Support Project | TellaMind', 'Explore a TellaMind-built Snapchat creator support preview for profile planning and application preparation. Creator details are illustrative.'],
};

function cleanPath(pathname) {
  const path = `/${pathname.replace(/^\/+|\/+$/g, '')}`;
  return path === '/' ? '/' : path;
}

export function getSeoMetadata(pathname, siteUrl = 'https://hayyannadeem125.github.io/Tellamind') {
  const path = cleanPath(pathname);
  const serviceMatch = path.match(/^\/services\/([^/]+)$/);
  const projectMatch = path.match(/^\/work\/([^/]+)$/);
  const service = serviceMatch && serviceSlug(serviceMatch[1]);
  const project = projectMatch && projectSlug(projectMatch[1]);
  const [title, description] = (service && serviceSeo[service.slug]) || (project && projectSeo[project.slug]) || [pages[path]?.title || 'Page not found | TellaMind', pages[path]?.description || 'The page you requested could not be found. Explore TellaMind services or return to the homepage.'];
  const canonicalPath = service ? `/services/${service.slug}` : project ? `/work/${project.slug}` : path;
  const canonical = `${siteUrl.replace(/\/+$/, '')}${canonicalPath === '/' ? '/' : `${canonicalPath}/`}`;
  const siteRoot = `${siteUrl.replace(/\/+$/, '')}/`;
  const graph = [{
    '@type': 'Organization',
    '@id': `${siteRoot}#organization`,
    name: 'TellaMind',
    url: siteRoot,
    logo: `${siteRoot}tellamind-mark.svg`,
    email: 'tellamindwork@gmail.com',
    description: 'Michigan-based technology company building websites, apps, custom software, and AI automation for businesses worldwide.',
    areaServed: ['Michigan, United States', 'Worldwide'],
  }];
  if (path === '/') graph.push({
    '@type': 'WebSite',
    '@id': `${siteRoot}#website`,
    url: siteRoot,
    name: 'TellaMind',
    alternateName: 'TellaMind Technology Company',
    publisher: { '@id': `${siteRoot}#organization` },
  });
  if (service) graph.push({
    '@type': 'Service',
    '@id': `${canonical}#service`,
    name: service.title,
    serviceType: service.title,
    description,
    provider: { '@id': `${siteRoot}#organization` },
    areaServed: ['Michigan, United States', 'Worldwide'],
    url: canonical,
  });
  if (service || project) {
    const parent = service ? ['Services', `${siteRoot}services/`] : ['Our Work', `${siteRoot}work/`];
    const currentName = service?.title || project.name;
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: siteRoot },
        { '@type': 'ListItem', position: 2, name: parent[0], item: parent[1] },
        { '@type': 'ListItem', position: 3, name: currentName, item: canonical },
      ],
    });
  }
  return { title, description, canonical, schema: { '@context': 'https://schema.org', '@graph': graph } };
}
