import FadeIn from './FadeIn';
import SectionHeading from './SectionHeading';
import { AREAS } from '../data/areas';

// Real photographs of the actual suburbs we work in (Wikimedia Commons,
// free licences — credit shown on each card). Honest alternative to generic
// stock renders: this is what these places really look like.
export default function AreasGallery() {
  return (
    <section className="section alt">
      <div className="wrap">
        <FadeIn>
          <SectionHeading eyebrow="Service areas" title="The places we actually work">
            Real photography of the suburbs we cover — from the dense blocks of
            Sunnyside to the estates of Centurion.
          </SectionHeading>
        </FadeIn>
        <div className="areas-grid">
          {AREAS.map((area, i) => (
            <FadeIn key={area.id} delay={(i % 4) * 60}>
              <figure className="area-card">
                <div className="area-img">
                  <img src={area.image} alt={area.imageAlt} loading="lazy" />
                  <span className="area-name">{area.name}</span>
                </div>
                <figcaption>
                  <p>{area.note}</p>
                  <a
                    className="area-credit"
                    href={area.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Photo: {area.credit} · {area.license}
                  </a>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
