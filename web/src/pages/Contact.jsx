import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import EnquiryForm from '../components/EnquiryForm';
import { Icon } from '../components/Icons';
import { SITE, WHATSAPP_DEFAULT } from '../data/site';

const FALLBACK =
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85';

const SERVICE_OPTIONS = {
  building: 'Building / structural work',
  renovation: 'Renovation / improvements',
  plumbing: 'Plumbing',
  electrical: 'Electrical work',
};

function PageHeader() {
  return (
    <section className="page-header">
      <img
        className="bg"
        src="https://images.unsplash.com/photo-1521790797524-b2497295b8a0?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        onError={(e) => { if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK; }}
      />
      <div className="wrap">
        <div className="crumbs">
          <Link to="/">Home</Link>
          <Icon name="arrowRight" />
          <span>Contact</span>
        </div>
        <h1>Let's talk about your project.</h1>
        <p>
          Call, WhatsApp or send the form — you will get a real person and a straight
          answer about scope, timing and cost.
        </p>
      </div>
    </section>
  );
}

export default function Contact() {
  const [params] = useSearchParams();

  useEffect(() => {
    const service = params.get('service');
    if (service && SERVICE_OPTIONS[service]) {
      const select = document.getElementById('projectType');
      if (select) select.value = SERVICE_OPTIONS[service];
    }
  }, [params]);

  return (
    <>
      <PageHeader />
      <section className="section">
        <div className="wrap contact-grid">
          <FadeIn className="contact-copy">
            <span className="eyebrow">Get in touch</span>
            <h2>Three ways to reach us — pick whichever suits you.</h2>
            <p>
              WhatsApp is usually fastest: send a short description and a photo of the
              problem and we will take it from there.
            </p>
            <div className="contact-details">
              <a className="contact-detail" href={`tel:${SITE.phoneTel}`}>
                <span className="icon"><Icon name="phone" /></span>
                <span>
                  <small>Call the team</small>
                  <strong>{SITE.phoneDisplay}</strong>
                </span>
              </a>
              <a className="contact-detail" href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer">
                <span className="icon"><Icon name="whatsapp" /></span>
                <span>
                  <small>WhatsApp — usually fastest</small>
                  <strong>{SITE.phoneDisplay}</strong>
                </span>
              </a>
              <a className="contact-detail" href={`mailto:${SITE.email}`}>
                <span className="icon"><Icon name="mail" /></span>
                <span>
                  <small>Email</small>
                  <strong>{SITE.email}</strong>
                </span>
              </a>
              <a className="contact-detail" href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                <span className="icon"><Icon name="pin" /></span>
                <span>
                  <small>Find us</small>
                  <strong>{SITE.suburb}, Pretoria · view on Google Maps</strong>
                </span>
              </a>
              <div className="contact-detail">
                <span className="icon"><Icon name="clock" /></span>
                <span>
                  <small>Hours</small>
                  <strong>{SITE.hours} — {SITE.hoursNote}</strong>
                </span>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={120}>
            <EnquiryForm />
          </FadeIn>
        </div>
      </section>
    </>
  );
}
