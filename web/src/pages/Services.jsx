import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import CtaBand from '../components/CtaBand';
import { Icon } from '../components/Icons';
import { SERVICES } from '../data/services';
import { SITE } from '../data/site';

const FALLBACK =
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85';

function PageHeader() {
  return (
    <section className="page-header">
      <img
        className="bg"
        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        onError={(e) => { if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK; }}
      />
      <div className="wrap">
        <div className="crumbs">
          <Link to="/">Home</Link>
          <Icon name="arrowRight" />
          <span>Services</span>
        </div>
        <h1>Building, plumbing & electrical — done properly.</h1>
        <p>
          Every service below is quoted in writing before we start. If your job touches
          more than one trade, we handle the coordination for you.
        </p>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <PageHeader />
      <section className="section">
        <div className="wrap">
          {SERVICES.map((service, i) => (
            <FadeIn key={service.id}>
              <div className="service-row" id={service.id}>
                <div>
                  <span className="eyebrow">{String(i + 1).padStart(2, '0')} / {service.id}</span>
                  <h2>{service.title}</h2>
                  <p className="row-lead">{service.lead}</p>
                  <div className="row-body">
                    <p>{service.body}</p>
                  </div>
                  <ul className="service-includes">
                    {service.includes.map((item) => (
                      <li key={item}><Icon name="check" /> {item}</li>
                    ))}
                  </ul>
                  <Link className="text-link" to={`/contact?service=${service.id}`}>
                    Get a quote for this <Icon name="arrowRight" />
                  </Link>
                </div>
                <div className="service-visual">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    loading="lazy"
                    onError={(e) => { if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK; }}
                  />
                  <span className="visual-chip">{SITE.suburb} &amp; greater Pretoria</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      <CtaBand
        title="Not sure which trade you need?"
        text="Describe the problem — we will tell you honestly what it takes to fix and what it should cost."
      />
    </>
  );
}
