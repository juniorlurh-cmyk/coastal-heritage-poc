import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import Reputation from '../components/Reputation';
import CtaBand from '../components/CtaBand';
import ProjectCard from '../components/ProjectCard';
import ServiceSlideshow from '../components/ServiceSlideshow';
import { Icon } from '../components/Icons';
import { SITE } from '../data/site';
import { PROJECTS } from '../data/projects';

const FALLBACK =
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85';

function Hero() {
  return (
    <section className="hero">
      <img
        className="hero-image"
        src={FALLBACK}
        alt="Construction team at work on a building site"
        fetchPriority="high"
      />
      <div className="wrap">
        <div className="hero-content">
          <span className="eyebrow">{SITE.descriptor}</span>
          <h1>
            Your property,<br />
            <em>properly looked after.</em>
          </h1>
          <p className="hero-copy">
            Building work, renovations, plumbing and electrical — one reliable team for
            homes, rentals and small businesses across Pretoria.
          </p>
          <div className="hero-actions">
            <Link className="btn" to="/contact">
              Request a quote <Icon name="arrowRight" />
            </Link>
            <a className="btn btn-outline" href={`tel:${SITE.phoneTel}`}>
              <Icon name="phone" /> Call {SITE.phoneDisplay}
            </a>
          </div>
          <div className="hero-note">
            <span><Icon name="check" /> Free site assessments</span>
            <span><Icon name="check" /> WhatsApp-first updates</span>
            <span><Icon name="check" /> Pretoria &amp; surrounds</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = [
    {
      icon: 'star',
      title: '5.0 on Google',
      sub: 'Rated 5.0 · Google listing',
    },
    {
      icon: 'star',
      title: '4.8 on Cybo',
      sub: 'Rated 4.8 · 4 reviews',
    },
    {
      icon: 'pin',
      title: `${SITE.suburb}, Pretoria`,
      sub: 'Publicly listed business location',
    },
    {
      icon: 'docCheck',
      title: 'Certificates issued',
      sub: 'Electrical & plumbing CoC where required',
    },
  ];
  return (
    <section className="trust-strip" aria-label="Business highlights">
      <div className="wrap trust-grid">
        {items.map((item) => (
          <div className="trust-item" key={item.title}>
            <span className="trust-icon"><Icon name={item.icon} /></span>
            <span>
              <strong>{item.title}</strong>
              <span>{item.sub}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Intro() {
  return (
    <section className="section">
      <div className="wrap intro-grid">
        <FadeIn className="intro-visual">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=85"
            alt="Well-maintained residential property exterior"
            loading="lazy"
            onError={(e) => { if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK; }}
          />
          <div className="visual-card">
            <strong>One team, four trades.</strong>
            <span>No chasing three different contractors</span>
          </div>
        </FadeIn>
        <FadeIn className="intro-copy" delay={100}>
          <span className="eyebrow">About Coastal Heritage</span>
          <h2>Big enough to handle the job. Small enough to care about it.</h2>
          <p className="lead">
            We are a Pretoria-based building and property services team. Whether it is a
            leaking geyser, a full bathroom renovation or a boundary wall that needs
            rebuilding, you deal with the people doing the work.
          </p>
          <ul className="tick-list">
            <li><Icon name="check" /> Clear written quotes before work starts — no surprise extras</li>
            <li><Icon name="check" /> Building, plumbing and electrical coordinated under one roof</li>
            <li><Icon name="check" /> Progress updates and photos sent straight to your WhatsApp</li>
          </ul>
          <Link className="text-link" to="/about">
            More about the team <Icon name="arrowRight" />
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="section services-section">
      <div className="wrap">
        <FadeIn>
          <SectionHeading eyebrow="What we do" title="Four trades. One call.">
            From structural work to certificates of compliance — if it is part of your
            property, we probably work on it.
          </SectionHeading>
        </FadeIn>
        <FadeIn>
          <ServiceSlideshow />
        </FadeIn>
      </div>
    </section>
  );
}

function FeaturedProjects() {
  const featured = PROJECTS.filter((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured).slice(0, 4);
  return (
    <section className="section">
      <div className="wrap">
        <div className="portfolio-top">
          <FadeIn>
            <SectionHeading eyebrow="Recent work" title="Jobs we are proud of">
              A sample of recent projects around Pretoria — from quick plumbing call-outs
              to full renovations.
            </SectionHeading>
          </FadeIn>
          <FadeIn delay={120}>
            <Link className="btn btn-ghost" to="/projects">
              All projects <Icon name="arrowRight" />
            </Link>
          </FadeIn>
        </div>
        <div className="project-grid">
          {[...featured, ...rest].map((project, i) => (
            <FadeIn key={project.id} delay={i * 70}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const steps = [
    {
      num: '01',
      title: 'Tell us what needs doing',
      text: 'Call, WhatsApp or send the form — photos help us understand the job faster.',
    },
    {
      num: '02',
      title: 'Site visit & clear quote',
      text: 'We assess the work, then send a written quote with scope and pricing broken down.',
    },
    {
      num: '03',
      title: 'Scheduled & done properly',
      text: 'We arrive when we say we will, protect your space and keep you updated as we go.',
    },
    {
      num: '04',
      title: 'Sign-off & paperwork',
      text: 'Walkthrough on completion, plus certificates and warranty info where applicable.',
    },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <FadeIn>
          <SectionHeading eyebrow="How it works" title="From first message to finished job">
            A straightforward process — you always know what happens next and what it costs.
          </SectionHeading>
        </FadeIn>
        <FadeIn>
          <div className="process-grid">
            {steps.map((step) => (
              <article className="process-step" key={step.num}>
                <span className="num">{step.num}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Intro />
      <ServicesPreview />
      <FeaturedProjects />
      <Reputation />
      <Process />
      <CtaBand />
    </>
  );
}
