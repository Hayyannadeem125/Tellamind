import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, Routes } from 'react-router-dom';
import { StaticRouter } from 'react-router';
import { Navbar } from './components/Navbar.jsx';
import { SiteFooter } from './components/SiteFooter.jsx';
import { services, projects } from './data.js';
import { HomePage } from './pages/HomePage.jsx';
import { ServicesPage } from './pages/ServicesPage.jsx';
import { ServiceDetailPage } from './pages/ServiceDetailPage.jsx';
import { WorkPage } from './pages/WorkPage.jsx';
import { ProjectDetailPage } from './pages/ProjectDetailPage.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { TeamPage } from './pages/TeamPage.jsx';
import { ProcessPage } from './pages/ProcessPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { LegalPage } from './pages/LegalPage.jsx';
import { NotFoundPage } from './pages/NotFoundPage.jsx';
import { getSeoMetadata } from './seo.js';

function StaticSite() {
  return <>
    <Navbar />
    <main id="main-content">
      <React.Suspense fallback={null}><Routes>
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
      </Routes></React.Suspense>
    </main>
    <SiteFooter />
  </>;
}

export const prerenderPaths = [
  '/', '/services', ...services.map((service) => `/services/${service.slug}`),
  '/work', ...projects.map((project) => `/work/${project.slug}`), '/work/Government-website',
  '/about', '/team', '/how-we-work', '/contact', '/privacy', '/terms',
];
export const prerenderBasePath = import.meta.env.BASE_URL.replace(/\/+$/, '');
export { getSeoMetadata };

export function renderPrerenderedPage(pathname) {
  const location = `${prerenderBasePath}${pathname === '/' ? '/' : pathname}`;
  return renderToString(<StaticRouter basename={prerenderBasePath || '/'} location={location}><StaticSite /></StaticRouter>);
}
