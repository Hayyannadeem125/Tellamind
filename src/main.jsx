import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar.jsx';
import { SiteFooter } from './components/SiteFooter.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { getSeoMetadata } from './seo.js';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import './styles.css';
import './theme-light-1.css';

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

function ScrollAndTitle() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
    const basePath = import.meta.env.BASE_URL.replace(/\/+$/, '');
    const routePath = pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname;
    const configuredSiteUrl = import.meta.env.VITE_SITE_URL?.replace(/\/+$/, '');
    const siteUrl = configuredSiteUrl || `${window.location.origin}${basePath}`;
    const { title, description, canonical: canonicalUrl, schema } = getSeoMetadata(routePath, siteUrl);
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.append(meta); }
    meta.content = description;
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) { ogDescription = document.createElement('meta'); ogDescription.setAttribute('property', 'og:description'); document.head.append(ogDescription); }
    ogDescription.content = description;
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) { ogTitle = document.createElement('meta'); ogTitle.setAttribute('property', 'og:title'); document.head.append(ogTitle); }
    ogTitle.content = title;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = canonicalUrl;
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) { ogUrl = document.createElement('meta'); ogUrl.setAttribute('property', 'og:url'); document.head.append(ogUrl); }
    ogUrl.content = canonicalUrl;
    let structuredData = document.querySelector('#tellamind-structured-data');
    if (!structuredData) { structuredData = document.createElement('script'); structuredData.id = 'tellamind-structured-data'; structuredData.type = 'application/ld+json'; document.head.append(structuredData); }
    structuredData.textContent = JSON.stringify(schema);
  }, [pathname]);
  return null;
}

function AnimatedRoutes() {
  const location = useLocation();
  return <AnimatePresence mode="wait" initial={false}>
    <motion.div
      className="route-motion"
      key={location.pathname}
      initial={{ opacity: 0, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <React.Suspense fallback={<div className="route-loading" role="status">Loading page…</div>}>
        <Routes location={location}>
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
    </motion.div>
  </AnimatePresence>;
}

function App() {
  return <MotionConfig reducedMotion="user">
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}>
      <ScrollAndTitle />
      <Navbar/>
      <main id="main-content"><AnimatedRoutes/></main>
      <SiteFooter />
    </BrowserRouter>
  </MotionConfig>;
}

const root = document.getElementById('root');
const app = <React.StrictMode><App /></React.StrictMode>;
if (root.dataset.prerendered === 'true') hydrateRoot(root, app);
else createRoot(root).render(app);
