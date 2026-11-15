import FadeIn from './FadeIn';
import SectionHeading from './SectionHeading';
import { RATINGS } from '../data/ratings';
import { SERVICE_AREAS, SITE } from '../data/site';
import { Icon, Stars } from './Icons';

export default function Reputation() {
  return (
    <section className="section reputation-section" id="reputation">
      <div className="wrap">
        <FadeIn>
          <SectionHeading eyebrow="Reputation &amp; reach" title="Rated where it counts">
            Our public listings speak for themselves. We keep each platform's rating
            separate — no blended scores, no cherry-picking.
          </SectionHeading>
        </FadeIn>

        <div className="reputation-grid">
          <FadeIn>
            <div className="rep-panel">
              <div className="panel-head">
                <div>
                  <div className="panel-kicker">Public rating snapshot</div>
                  <h3>Across business listings</h3>
                </div>
                <span className="source-pill">Verified Nov 2026</span>
              </div>
              {RATINGS.map((r) => (
                <div className="rating-row" key={r.source}>
                  <div className="rating-source">{r.source}</div>
                  <div
                    className="rating-track"
                    role="img"
                    aria-label={`${r.source} rating ${r.score} out of ${r.outOf}`}
                  >
                    <div className="rating-fill" style={{ width: `${r.fill}%` }} />
                  </div>
                  <div className="rating-score">{r.score.toFixed(1)}</div>
                  <div className="rating-detail">
                    <Stars count={5} /> · {r.detail}
                  </div>
                </div>
              ))}
              <p className="panel-note">
                Ratings are pulled from each platform's own listing and shown with their real
                review counts. Tap a listing on Google or Cybo to check them yourself.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={120}>
            <div className="rep-panel">
              <div className="panel-head">
                <div>
                  <div className="panel-kicker">Why customers call us back</div>
                  <h3>What the listing shows</h3>
                </div>
              </div>
              <div className="signal-list">
                <div className="signal-item">
                  <div className="signal-icon"><Icon name="check" /></div>
                  <div>
                    <strong>Consistent contact details</strong>
                    <span>The same phone number appears across public listings — you reach the same team every time.</span>
                  </div>
                </div>
                <div className="signal-item">
                  <div className="signal-icon"><Icon name="pin" /></div>
                  <div>
                    <strong>Established in {SITE.suburb}, Pretoria</strong>
                    <span>Publicly listed physical presence with a Google Maps profile customers can navigate to.</span>
                  </div>
                </div>
                <div className="signal-item">
                  <div className="signal-icon"><Icon name="whatsapp" /></div>
                  <div>
                    <strong>WhatsApp-first communication</strong>
                    <span>Quotes, photos and job updates over WhatsApp — quick answers without call-centre queues.</span>
                  </div>
                </div>
                <div className="signal-item">
                  <div className="signal-icon"><Icon name="docCheck" /></div>
                  <div>
                    <strong>Compliance paperwork</strong>
                    <span>Electrical and plumbing certificates of compliance issued where the work requires them.</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={80}>
          <div className="stat-band">
            <div className="stat-tile">
              <strong>5.0<i>/5</i></strong>
              <span>Google rating · 1 review</span>
            </div>
            <div className="stat-tile">
              <strong>4.8<i>/5</i></strong>
              <span>Cybo rating · 4 reviews</span>
            </div>
            <div className="stat-tile">
              <strong>4</strong>
              <span>Core trades under one roof</span>
            </div>
            <div className="stat-tile">
              <strong>{SERVICE_AREAS.length}+</strong>
              <span>Pretoria suburbs covered</span>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={140}>
          <div className="analytics-note">
            <Icon name="shield" />
            <span>
              Privacy-friendly analytics: this site measures visits and enquiries with a
              cookie-free, self-hosted tool — no ad trackers, no personal data sold.
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
