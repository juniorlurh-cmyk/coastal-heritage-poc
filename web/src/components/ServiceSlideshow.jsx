import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/services';
import { Icon } from './Icons';

const FALLBACK =
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85';

const SLIDE_MS = 6000;

export default function ServiceSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = SERVICES.length;
  const active = SERVICES[index];

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % total), SLIDE_MS);
    return () => clearInterval(timer);
  }, [paused, total]);

  const go = (i) => setIndex(((i % total) + total) % total);

  return (
    <div
      className="service-slider"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="slider-viewport" aria-live="polite">
        {SERVICES.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={i === index ? s.imageAlt : ''}
            aria-hidden={i !== index}
            className={`slider-img${i === index ? ' active' : ''}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
            }}
          />
        ))}
        <span className="slider-chip">
          <Icon name={active.icon} /> {active.title}
        </span>
      </div>

      <div className="slider-panel">
        <span className="slider-count">
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <h3>{active.title}</h3>
        <p>{active.lead}</p>
        <ul className="slider-includes">
          {active.includes.slice(0, 4).map((item) => (
            <li key={item}>
              <Icon name="check" /> {item}
            </li>
          ))}
        </ul>
        <Link className="text-link" to={`/services#${active.id}`}>
          View this service <Icon name="arrowRight" />
        </Link>
        <div className="slider-controls">
          <button
            className="slider-arrow"
            aria-label="Previous service"
            onClick={() => go(index - 1)}
          >
            <Icon name="arrowLeft" />
          </button>
          <div className="slider-dots" role="tablist" aria-label="Choose service slide">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                className={`slider-dot${i === index ? ' active' : ''}`}
                role="tab"
                aria-selected={i === index}
                aria-label={s.title}
                onClick={() => go(i)}
              >
                <span key={i === index ? `active-${index}` : `idle-${i}`} />
              </button>
            ))}
          </div>
          <button
            className="slider-arrow"
            aria-label="Next service"
            onClick={() => go(index + 1)}
          >
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>
    </div>
  );
}
