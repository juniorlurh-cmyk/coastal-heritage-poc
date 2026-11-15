import { Icon } from './Icons';

const FALLBACK =
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=900&q=85';

export default function ProjectCard({ project }) {
  return (
    <article className={`project-card${project.featured ? ' featured' : ''}`}>
      <div className="project-image">
        <img
          src={project.image}
          alt={project.imageAlt}
          loading="lazy"
          onError={(e) => {
            if (e.currentTarget.src !== FALLBACK) e.currentTarget.src = FALLBACK;
          }}
        />
        <span className="project-tag">{project.categoryLabel}</span>
        <span className="project-loc">
          <Icon name="pin" /> {project.suburb}
        </span>
      </div>
      <div className="project-body">
        <div className="project-meta">
          <span>{project.duration}</span>
          <span>{project.year}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.scope}</p>
        <div className="project-foot">
          <span>{project.suburb}, Pretoria</span>
        </div>
      </div>
    </article>
  );
}
