import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { services } from '../data.js';
import { publicAsset } from '../utils/publicAsset.js';

function readTheme() {
  try {
    if (typeof window === 'undefined') return 'dark';
    const savedTheme = window.localStorage.getItem('tellamind-theme');
    return savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : 'dark';
  } catch {
    return 'dark';
  }
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = theme === 'light' ? '#f3f7f2' : '#050403';
  try {
    window.localStorage.setItem('tellamind-theme', theme);
  } catch {
    // The toggle still works for this visit when storage is unavailable.
  }
}

function Logo() {
  return (
    <Link className="logo" to="/" aria-label="TellaMind home">
      <img className="logo-mark-img" src={publicAsset('tellamind-mark.svg')} alt="" />
      <span>
        Tella<span className="logo-light">Mind</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [servicesOpen, setServicesOpen] = React.useState(false);
  const [theme, setTheme] = React.useState('dark');
  const initialThemeApplied = React.useRef(false);
  const { pathname } = useLocation();
  React.useEffect(() => {
    if (!initialThemeApplied.current) {
      initialThemeApplied.current = true;
      const savedTheme = readTheme();
      if (savedTheme !== theme) setTheme(savedTheme);
      applyTheme(savedTheme);
      return;
    }
    applyTheme(theme);
  }, [theme]);
  React.useEffect(() => { setOpen(false); setServicesOpen(false); }, [pathname]);
  React.useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') { setOpen(false); setServicesOpen(false); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="header"><div className="nav-shell"><Logo />
      <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Main navigation">
        <div className="nav-dropdown-wrap">
          <NavLink to="/services" onClick={() => setOpen(false)}>Services</NavLink><button className="nav-dropdown-trigger" aria-label="Show service pages" aria-expanded={servicesOpen} onClick={() => setServicesOpen(!servicesOpen)}><ChevronDown size={13}/></button>
          {servicesOpen && <div className="services-dropdown"><NavLink className="all-services-link" to="/services" onClick={() => { setServicesOpen(false); setOpen(false); }}>All services<ArrowUpRight size={12}/></NavLink>{services.map((service) => <NavLink key={service.slug} to={`/services/${service.slug}`} onClick={() => { setServicesOpen(false); setOpen(false); }}>{service.shortTitle}<ArrowUpRight size={12}/></NavLink>)}</div>}
        </div>
        <NavLink to="/work" onClick={() => setOpen(false)}>Our Work</NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
        <NavLink to="/team" onClick={() => setOpen(false)}>Team</NavLink>
        <NavLink to="/how-we-work" onClick={() => setOpen(false)}>How We Work</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>
      </nav>
      <button className="theme-toggle" type="button" onClick={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={theme === 'light'}>{theme === 'dark' ? <Sun size={17} aria-hidden="true"/> : <Moon size={17} aria-hidden="true"/>}<span className="sr-only">{theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}</span></button>
      <Link className="button button-dark nav-cta" to="/contact">Let’s talk <ArrowUpRight size={15}/></Link>
      <button className="menu-toggle" aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </div></header>
  </>;
}

export { Logo };
