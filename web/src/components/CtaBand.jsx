import { Link } from 'react-router-dom';
import { SITE, WHATSAPP_DEFAULT } from '../data/site';
import { Icon } from './Icons';

export default function CtaBand({
  title = 'Need work done on your property?',
  text = 'Send us a photo and a short description — we will come back with a straight answer and a clear quote.',
}) {
  return (
    <section className="cta-band">
      <div className="wrap">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-actions">
          <a className="btn" href={WHATSAPP_DEFAULT} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" /> WhatsApp {SITE.phoneDisplay}
          </a>
          <Link className="btn btn-outline" to="/contact">
            Request a quote <Icon name="arrowRight" />
          </Link>
        </div>
      </div>
    </section>
  );
}
