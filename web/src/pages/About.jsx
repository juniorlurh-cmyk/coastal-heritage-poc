import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import CtaBand from '../components/CtaBand';
import { Icon } from '../components/Icons';
import { SITE, SERVICE_AREAS } from '../data/site';

const FALLBACK =
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85';

function PageHeader() {
  return (
    <section className="page-header">
      <img
        className="bg"
        src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        onError={(e) => { if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK; }}
      />
      <div className="wrap">
        <div className="crumbs">
          <Link to="/">Home</Link>
          <Icon name="arrowRight" />
          <span>About</span>
        </div>
        <h1>A Pretoria team that treats your property like its own.</h1>
        <p>
          Coastal Heritage brings building, plumbing and electrical work under one roof —
          so customers get one quote, one schedule and one accountable team.
        </p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section className="section">
      <div className="wrap intro-grid">
        <FadeIn className="intro-visual">
          <img
            src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1100&q=85"
            alt="Site supervisor reviewing work on a tablet"
            loading="lazy"
            onError={(e) => { if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK; }}
          />
          <div className="visual-card">
            <strong>Based in {SITE.suburb}.</strong>
            <span>Serving greater Pretoria &amp; Centurion</span>
          </div>
        </FadeIn>
        <FadeIn className="intro-copy" delay={100}>
          <span className="eyebrow">Who we are</span>
          <h2>Built on referrals — and built to earn the next one.</h2>
          <p className="lead">
            Coastal Heritage is a {SITE.suburb}-based property services business. Most of
            our work comes from repeat customers and word of mouth — which is exactly how
            we want to keep it.
          </p>
          <p>
            Property work has a reputation problem: quotes that grow, teams that disappear,
            finishes that do not last. We run the business the other way — written quotes
            upfront, a named contact on every job, and photo updates so you can see progress
            even when you are not on site.
          </p>
          <p>
            Because we cover building, plumbing and electrical work, you do not need to
            coordinate three contractors and hope they arrive in the right order. We
            sequence the trades ourselves and hand over one finished job.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Values() {
  const values = [
    {
      icon: 'docCheck',
      title: 'Quote it like it is',
      text: 'Written scope and pricing before work starts. If something changes on site, we flag it and agree before continuing — never after.',
    },
    {
      icon: 'shield',
      title: 'Safe, compliant work',
      text: 'Certificates of compliance issued where the law requires them, and workmanship that passes inspection the first time.',
    },
    {
      icon: 'whatsapp',
      title: 'Communication you can see',
      text: 'Progress photos and plain-language updates over WhatsApp. You never have to chase us to know where the job stands.',
    },
    {
      icon: 'clock',
      title: 'Show up when promised',
      text: 'Confirmed arrival windows and realistic timelines. If we are running late, you hear it from us first.',
    },
    {
      icon: 'users',
      title: 'Respect for your space',
      text: 'Dust sheets down, tools packed away, site swept daily. It is your home or business — we work like guests, not tenants.',
    },
    {
      icon: 'ruler',
      title: 'Finish properly',
      text: 'We would rather take an extra day on detail than hand over work we would not accept in our own homes.',
    },
  ];
  return (
    <section className="section services-section">
      <div className="wrap">
        <FadeIn>
          <SectionHeading eyebrow="How we work" title="The standards behind every job">
            These are not slogans on a wall — they are how we quote, schedule and hand
            over work every week.
          </SectionHeading>
        </FadeIn>
        <div className="value-grid">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 60}>
              <div className="value-card">
                <h3><Icon name={v.icon} /> {v.title}</h3>
                <p>{v.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Credentials() {
  const items = [
    {
      icon: 'docCheck',
      title: 'Electrical Certificate of Compliance (CoC)',
      sub: 'Issued on electrical installations where required for sales and insurance',
    },
    {
      icon: 'docCheck',
      title: 'Plumbing compliance certificates',
      sub: 'Available for applicable plumbing installations',
    },
    {
      icon: 'shield',
      title: 'Trade-qualified workmanship',
      sub: 'Plumbing and electrical work carried out or signed off by appropriately qualified tradespeople',
    },
    {
      icon: 'users',
      title: 'Company registration & insurance',
      sub: 'Registration details and cover confirmation available on request',
    },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <FadeIn>
          <div className="cred-panel">
            <div>
              <span className="eyebrow">Credentials</span>
              <h3>Registered, qualified & accountable</h3>
              <p>
                Certificates, registration documents and insurance details are provided
                with quotes on request — ask and we will send them through on WhatsApp.
              </p>
            </div>
            <ul className="cred-list">
              {items.map((item) => (
                <li key={item.title}>
                  <Icon name={item.icon} />
                  <span>
                    {item.title}
                    <small>{item.sub}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Areas() {
  return (
    <section className="section services-section">
      <div className="wrap">
        <FadeIn>
          <SectionHeading eyebrow="Service area" title="Working across greater Pretoria">
            Based in {SITE.suburb} and covering the greater Pretoria area and Centurion.
            For work further out, just ask — we take on projects across Gauteng by
            arrangement.
          </SectionHeading>
        </FadeIn>
        <FadeIn>
          <div className="area-chips">
            {SERVICE_AREAS.map((area) => (
              <span className="area-chip" key={area}>
                <Icon name="pin" /> {area}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <PageHeader />
      <Story />
      <Values />
      <Credentials />
      <Areas />
      <CtaBand />
    </>
  );
}
