import { useState } from 'react';
import { whatsappUrl } from '../data/site';
import { Icon } from './Icons';

export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const message = [
      'Hello Coastal Heritage, I would like to request a quote.',
      '',
      `Name: ${values.get('name')}`,
      `Contact number: ${values.get('phone')}`,
      `Service needed: ${values.get('project')}`,
      `Project area: ${values.get('area')}`,
      `Details: ${values.get('message') || 'To be discussed'}`,
    ].join('\n');
    setSent(true);
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer');
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3 className="form-title">Request a free quote</h3>
      <p className="form-sub">
        Fill this in and we will open WhatsApp with everything ready to send — no accounts,
        no callbacks you did not ask for.
      </p>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="fullName">Your name</label>
          <input id="fullName" name="name" autoComplete="name" placeholder="Name and surname" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Contact number</label>
          <input id="phone" name="phone" autoComplete="tel" type="tel" placeholder="e.g. 082 000 0000" required />
        </div>
        <div className="field">
          <label htmlFor="projectType">Service needed</label>
          <select id="projectType" name="project" required defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            <option>Building / structural work</option>
            <option>Renovation / improvements</option>
            <option>Plumbing</option>
            <option>Electrical work</option>
            <option>General maintenance</option>
            <option>Other / not sure yet</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="area">Project location</label>
          <input id="area" name="area" placeholder="Suburb, e.g. Brooklyn" required />
        </div>
        <div className="field full">
          <label htmlFor="message">Tell us about the job</label>
          <textarea
            id="message"
            name="message"
            placeholder="What needs doing? Include rough sizes, timing or anything useful."
          />
        </div>
      </div>
      <button className="btn btn-whatsapp form-submit" type="submit">
        <Icon name="whatsapp" /> Send via WhatsApp
      </button>
      <p className="form-privacy">
        Your details go straight into a WhatsApp message to the team — this website does not
        store or share your information. POPIA-friendly by design.
      </p>
      <div className={`form-status ${sent ? 'visible' : ''}`} role="status" aria-live="polite">
        Your enquiry is ready in WhatsApp — press send there to reach the team.
      </div>
    </form>
  );
}
