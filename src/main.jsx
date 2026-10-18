import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { SiteFooter } from './components/SiteFooter.jsx';
import { HomePage } from './pages/HomePage.jsx';
const ServicesPage = React.lazy(() => import('./pages/ServicesPage.jsx').then((module) => ({ default: module.ServicesPage })));
const ServiceDetailPage = React.lazy(() => import('./pages/ServiceDetailPage.jsx').then((module) => ({ default: module.ServiceDetailPage })));
const WorkPage = React.lazy(() => import('./pages/WorkPage.jsx').then((module) => ({ default: module.WorkPage })));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage.jsx').then((module) => ({ default: module.ProjectDetailPage })));
const AboutPage = React.lazy(() => import('./pages/AboutPage.jsx').then((module) => ({ default: module.AboutPage })));
const TeamPage = React.lazy(() => import('./pages/TeamPage.jsx').then((module) => ({ default: module.TeamPage })));
const ProcessPage = React.lazy(() => import('./pages/ProcessPage.jsx').then((module) => ({ default: module.ProcessPage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage.jsx').then((module) => ({ default: module.ContactPage })));
const LegalPage = React.lazy(() => import('./pages/LegalPage.jsx').then((module) => ({ default: module.LegalPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage.jsx').then((module) => ({ default: module.NotFoundPage })));
import { serviceSlug, projectSlug } from './data.js';
import './styles.css';
import './theme-light-1.css';

function ScrollAndTitle() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const staticTitles = {
      '/': 'Websites, Apps & AI for Business',
      '/services': 'Services',
      '/work': 'Our Work',
      '/about': 'About TellaMind',
      '/team': 'Our Team',
      '/how-we-work': 'How We Work',
      '/contact': 'Contact',
      '/privacy': 'Privacy Policy',
      '/terms': 'Terms of Service',
    };
    const descriptions = {
      '/': 'TellaMind builds thoughtful websites, apps, AI agents, and automations for ambitious businesses worldwide.',
      '/services': 'Explore TellaMind services: AI automation, websites, apps, social media, Meta Ads, SEO, cloud, and software testing.',
      '/work': 'Explore websites, recruitment workflows, and creator-support projects built by TellaMind. Personal and business details in interactive previews are illustrative.',
      '/about': 'Meet TellaMind, a Michigan-based technology company working with businesses worldwide.',
      '/team': 'Meet the people and project roles behind TellaMind, a Michigan-based technology company.',
      '/how-we-work': 'See how TellaMind scopes, builds, launches, and supports thoughtful digital projects.',
      '/contact': 'Tell TellaMind about your project and request a clear next step.',
    };
    const serviceMatch = pathname.match(/^\/services\/([^/]+)$/);
    const projectMatch = pathname.match(/^\/work\/([^/]+)$/);
    const service = serviceMatch && serviceSlug(serviceMatch[1]);
    const project = projectMatch && projectSlug(projectMatch[1]);
    const routeTitle = (service && service.title) || (project && project.name) || staticTitles[pathname] || 'Page not found';
    document.title = `${routeTitle} | TellaMind`;
    const description = (service && `${service.title}: ${service.summary}`) || (project && `${project.name}, built by TellaMind. Personal and business details in this interactive project preview are illustrative.`) || descriptions[pathname] || 'Explore TellaMind services and project information.';
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.append(meta); }
    meta.content = description;
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.content = description;
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.content = document.title;
    const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '');
    const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');
    const siteUrl = configuredSiteUrl || `${window.location.origin}${basePath}`;
    const routePath = pathname.replace(/^\/+/, '');
    const canonicalUrl = new URL(routePath, `${siteUrl}/`).href;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = canonicalUrl;
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); document.head.append(ogUrl); }
    ogUrl.content = canonicalUrl;
    const schema = { '@context': 'https://schema.org', '@type': 'Organization', name: 'TellaMind', url: `${siteUrl}/`, email: 'tellamindwork@gmail.com', description: 'Michigan-based technology company building websites, apps, AI agents, and automations for clients worldwide.', areaServed: ['Michigan, United States', 'Worldwide'] };
    let structuredData = document.querySelector('#tellamind-organization-schema');
    if (!structuredData) { structuredData = document.createElement('script'); structuredData.id = 'tellamind-organization-schema'; structuredData.type = 'application/ld+json'; document.head.append(structuredData); }
    structuredData.textContent = JSON.stringify(schema);
  }, [pathname]);
  return null;
}

function App() {
  return <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
    <ScrollAndTitle />
    <Navbar/>
    <main id="main-content">
      <React.Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/how-we-work" element={<ProcessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<LegalPage kind="privacy" />} />
          <Route path="/terms" element={<LegalPage kind="terms" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </React.Suspense>
    </main>
    <SiteFooter />
  </BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
