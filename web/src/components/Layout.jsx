import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { SITE, WHATSAPP_DEFAULT } from '../data/site';
import { Icon } from './Icons';

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
];

function Topbar() {
  return (
    <div className="topbar">
      <div className="wrap topbar-inner">
        <div className="topbar-group">
          <a className="topbar-item" href={`tel:${SITE.phoneTel}`}>
            <Icon name="phone" /> {SITE.phoneDisplay}
          </a>
          <span className="topbar-item">
            <Icon name="clock" /> {SITE.hours}
          </span>
          <span className="topbar-item">
            <Icon name="pin" /> {SITE.suburb}, Pretoria
          </span>
        </div>
        <div className="topbar-group">
          <span className="topbar-tag">Building · Plumbing · Electrical</span>
          <a className="topbar-item" href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" /> WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link className="brand" to="/" aria-label="Coastal Heritage home">
          <span className="brand-mark">CH</span>
          <span className="brand-name">
            Coastal Heritage
            <small>{SITE.tagline}</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="navLinks"
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} />
        </button>
        <nav className={`nav-links ${open ? 'open' : ''}`} id="navLinks" aria-label="Main navigation">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {item.label}
            </NavLink>
          ))}
          <Link className="btn" to="/contact">
            Get a quote <Icon name="arrowRight" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  const year = CURRENT_YEAR;
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <div>
            <Link className="brand" to="/">
              <span className="brand-mark">CH</span>
              <span className="brand-name">
                Coastal Heritage
                <small>{SITE.tagline}</small>
              </span>
            </Link>
            <p className="footer-blurb">
              Building, renovation, plumbing and electrical work across Pretoria and
              surrounds — quoted clearly, scheduled properly and finished cleanly.
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <strong>Company</strong>
              <Link to="/about">About us</Link>
              <Link to="/services">Services</Link>
              <Link to="/projects">Projects</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="footer-col">
              <strong>Services</strong>
              <Link to="/services#building">Building work</Link>
              <Link to="/services#renovation">Renovations</Link>
              <Link to="/services#plumbing">Plumbing</Link>
              <Link to="/services#electrical">Electrical</Link>
            </div>
            <div className="footer-col">
              <strong>Get in touch</strong>
              <a href={`tel:${SITE.phoneTel}`}>{SITE.phoneDisplay}</a>
              <a href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer">
                WhatsApp the team
              </a>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <span>{SITE.city}</span>
              <span>{SITE.hours}</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {year} {SITE.name} · Pretoria, Gauteng</span>
          <span className="foot-note">
            Website preview: photography and project details are representative of typical
            work and will be replaced with verified company records before go-live.
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <>
      <Topbar />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <a
        className="whatsapp-float"
        href={WHATSAPP_DEFAULT}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat to Coastal Heritage on WhatsApp"
      >
        <Icon name="whatsapp" />
      </a>
    </>
  );
}
