import { useState } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from '../components/FadeIn';
import SectionHeading from '../components/SectionHeading';
import CtaBand from '../components/CtaBand';
import ProjectCard from '../components/ProjectCard';
import AreasGallery from '../components/AreasGallery';
import { Icon } from '../components/Icons';
import { CATEGORIES, PROJECTS } from '../data/projects';

const FALLBACK =
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=85';

function PageHeader() {
  return (
    <section className="page-header">
      <img
        className="bg"
        src="https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?auto=format&fit=crop&w=1600&q=80"
        alt=""
        aria-hidden="true"
        onError={(e) => { if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK; }}
      />
      <div className="wrap">
        <div className="crumbs">
          <Link to="/">Home</Link>
          <Icon name="arrowRight" />
          <span>Projects</span>
        </div>
        <h1>Recent work across Pretoria.</h1>
        <p>
          A look at the jobs we have taken on — filtered by trade. Each project shows the
          suburb, the scope and how long it took.
        </p>
      </div>
    </section>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const visible = PROJECTS.filter((p) => filter === 'all' || p.category === filter);

  return (
    <>
      <PageHeader />
      <section className="section">
        <div className="wrap">
          <div className="portfolio-top">
            <FadeIn>
              <SectionHeading eyebrow="Portfolio" title="Filter by type of work">
                {visible.length} project{visible.length === 1 ? '' : 's'} shown
              </SectionHeading>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="filter-row" role="group" aria-label="Filter projects">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                    aria-pressed={filter === cat.id}
                    onClick={() => setFilter(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </FadeIn>
          </div>
          <div className="project-grid">
            {visible.map((project, i) => (
              <FadeIn key={project.id} delay={(i % 3) * 60}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="portfolio-note">
              Projects shown are representative of typical work undertaken across Pretoria.
              Client-specific photographs and references are shared privately on request.
            </p>
          </FadeIn>
        </div>
      </section>
      <AreasGallery />
      <CtaBand
        title="Want your project on this list?"
        text="Tell us what you are planning — we will scope it, quote it and get it done."
      />
    </>
  );
}
