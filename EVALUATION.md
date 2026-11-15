# Research, reflection and evaluation

**Research date:** 14 November 2026  
**Scope:** public discoverability, local proof signals, selected South African construction websites, and a prototype quality review.  
**Important limitation:** there was no access to Coastal Heritage's internal job records, website analytics, customer database, private social accounts, or the owner's first-hand feedback. This is desk research plus an implementation self-evaluation—not customer interviews or a live A/B test.

## 1. Prospect evidence audit

| Area | What public research established | Confidence / action |
|---|---|---|
| Identity | Google business result names Coastal Heritage and categorises it as a construction company. A Cybo record uses Coastal Heritage Plumbing and Electricals. | Medium. Ask the owner to confirm the trading name. |
| Phone | 078 742 8887 is shown on both surfaced listings. | Medium-high. Confirm it is still the best call/WhatsApp number. |
| Location | Google result: 220 Robert Sobukwe St, Sunnyside. Cybo: 89 Vos St, Sunnyside. | Conflicting. Do not publish a street address until checked directly. |
| Ratings | Google surfaced 5.0/5 from 1 rating. Cybo surfaced 4.8/5 from 4 ratings. | Platform-specific snapshots. Never add the counts or average the two scores. |
| Written reviews | No accessible written comments were established in the sources used. | Insufficient to run a defensible sentiment analysis. |
| Services | Construction category and a Cybo name/category pointing to house construction, plumbing and electricals. | Provisional only. Confirm exact scope and qualifications. |
| Projects | No reliable public portfolio with project names, locations, scopes and verified photographs was found. | Unknown. Do not invent completed projects or project metrics. |
| Existing website | A directory references `coastal-heritage.business.site`. Google shut down Business Profile websites in 2024. | Treat as a legacy link, not a live independent website. |

## 2. External website benchmark

The benchmark uses observable features from public websites, not private conversion analytics.

| Reference | Strong public-facing pattern | What the prototype adapts |
|---|---|---|
| Barrow Construction | Rich project entries with location, type, contract value, client and architect metadata. | A case-study structure with scope, location, photographs and project metadata—populated only after the owner verifies it. |
| Tronkon | 71 visible completed projects and filters by sector such as healthcare, commercial, industrial, education, residential and hospitality. | A simple filterable project gallery that can grow as the business supplies evidence. |
| SANJO | Clear service storytelling, featured work, company profile and multiple contact pathways. | A straightforward service hierarchy, visual proof section and prominent contact path. |
| South African builder web-design guidance | Separate needs for homeowners and procurement audiences; portfolio, credentials, quote form, service areas and company profile. | A mobile-first enquiry journey, project catalogue and a place for verified credentials. |

## 3. Design decisions

1. **Lead with a clear promise, not unsupported superlatives.** The hero communicates building/property work in plain language without claiming years of experience, project volume or guaranteed outcomes.
2. **Show proof before making claims.** The portfolio is present as a reusable case-study pattern; all images and project descriptions are explicitly labelled illustrative.
3. **Respect the evidence.** The two rating sources are shown separately with their own sample sizes. No composite rating is created.
4. **Use data as a trust tool.** The analytics area explains what is known and where the evidence is missing. It intentionally does not invent sentiment, projects completed, revenue, lead growth or customer satisfaction.
5. **Reduce enquiry friction.** Call and WhatsApp actions are visible. The form turns the visitor's answers into a pre-filled WhatsApp message.
6. **Keep the first version lightweight.** One standalone HTML file avoids a build system, hosting complexity and maintenance burden for a small-business proof of concept.

## 4. Evaluation rubric

Scores are internal prototype review scores, not independent user-test results. A score of 5 means the requirement is fully addressed in this concept; 1 means it is largely absent.

| Evaluation | Score | Result / evidence |
|---|---:|---|
| Visual hierarchy and professional feel | 5/5 | Clear brand system, contrast, generous spacing, typography and visual hierarchy. |
| Mobile-first layout | 5/5 | Responsive breakpoints, collapsible navigation, stacked cards and forms. |
| Clear service discovery | 4/5 | Three provisional categories; actual scope remains to be confirmed. |
| Portfolio usefulness | 4/5 | Filterable cards and case-study layout; actual company work is not yet available. |
| Review and data integrity | 5/5 | Separate rating sources and counts; explicit limits on review-text analysis. |
| Enquiry path | 5/5 | Click-to-call, WhatsApp CTA and pre-filled enquiry form. |
| Local SEO foundations | 3/5 | Page metadata and basic structured data; final NAP, service areas, canonical domain and profile links need verification. |
| Accessibility foundations | 4/5 | Semantic sections, labelled fields, focus states, aria labels, reduced-motion support; formal screen-reader testing still required. |
| Production readiness | 2/5 | Concept only: no custom domain, hosting, owner-approved copy/assets, privacy review or backend integration. |

**Internal simple-mean score:** 4.1/5 across the nine prototype criteria. This is not a business-performance score or an independent design award.

## 5. Browser smoke-test results

The standalone page was loaded in Chromium at 1365px desktop width and 390px mobile width. External network requests were blocked by the test harness, so remote photos and web fonts were not validated in that run.

| Smoke test | Result |
|---|---|
| Desktop horizontal overflow | Pass — none detected |
| Mobile horizontal overflow | Pass — none detected |
| JavaScript page errors | Pass — none detected |
| Portfolio filter: Renovation | Pass — 1 matching card visible |
| Portfolio filter: All | Pass — all 3 cards visible |
| Mobile navigation toggle | Pass — opens and sets `aria-expanded=true` |
| Enquiry form | Pass — valid fields compose a WhatsApp URL to the listed business number and include name, service and location |

These are functional smoke tests, not a full accessibility, performance, browser-compatibility or real-user test.

## 6. Self-critique and improvement loop

### Pass 1 — initial direction
A conventional contractor template would have been easy to build, but generic project claims, generic testimonials and fake statistics would make the site untrustworthy.

### Reflection
The public evidence is unusually thin and contains conflicting identity/address signals. A polished site that simply fills empty sections with invented proof would damage the credibility the site is supposed to create.

### Pass 2 — revised implementation
- Replaced fabricated portfolio entries with clearly labelled portfolio templates and illustrative imagery.
- Kept the Google and Cybo rating snapshots separate and displayed their review counts.
- Removed sentiment charts because no accessible written review corpus was available.
- Added an evidence-gap panel to show what the business can strengthen next.
- Marked services as provisional and credentials as requiring owner verification.
- Used Pretoria as the broad location and avoided publishing a street address in the primary contact block.
- Used a WhatsApp-first form that does not store personal data in the browser demo.
- Added `noindex, nofollow` to reduce the risk of accidentally indexing the unapproved concept.

### Remaining limitations
- No usability sessions with homeowners or commercial procurement users have been conducted.
- No actual company projects or original customer reviews were supplied.
- Remote stock photography and web fonts need internet connectivity.
- The WhatsApp action depends on the listed phone number remaining valid. The first automated submit-test was corrected to stub `window.open` after page creation; the final form test passed.
- No Core Web Vitals, Lighthouse, real-device, browser matrix or screen-reader test was run in this environment.

## 7. Next evaluation after owner discovery

After a 15–20 minute owner conversation and receipt of materials, run these checks:

- **Factuality eval:** every public claim traces to owner-confirmed information or a current certificate.
- **Portfolio completeness eval:** each published project has at least one approved image, project type, location, scope, date/status and permission to publish.
- **Reputation eval:** each displayed rating links to the matching live platform profile; quote excerpts are verbatim and approved.
- **Conversion usability eval:** ask 5 prospective customers to find a relevant service, understand the proof and submit a test enquiry on mobile.
- **Accessibility eval:** keyboard-only navigation, labels, contrast, screen-reader reading order and error messages.
- **Performance eval:** Lighthouse mobile run and real-device checks after deployment; optimise images and verify Core Web Vitals.
- **Lead-quality eval:** measure calls, WhatsApp clicks, form starts, completed enquiries and qualified leads after launch. Baseline first; do not claim uplift without a comparison period.

## Sources reviewed

- Google surfaced business result: Coastal Heritage, Pretoria, phone and Google rating snapshot.
- Cybo listing: Coastal Heritage Plumbing and Electricals, rating snapshot, phone, legacy `business.site` reference and alternate address.
- Barrow Construction project page: https://www.barrow.co.za/construction
- Tronkon project portfolio: https://tronkon.co.za/projects/
- SANJO company website: https://www.sanjo.co.za/
- South African construction website guidance: https://glimpsedma.co.za/construction-website-design
- Google Business Profile website retirement notice: https://support.google.com/business/thread/252453292/websites-made-with-google-business-profiles-will-be-turned-off-soon?hl=en
