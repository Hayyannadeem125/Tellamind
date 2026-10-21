import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data.js';

const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export function ContactForm() {
  const [state, setState] = React.useState({ status: 'idle', message: '' });
  const requestedSlug = typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('service');
  const initialService = services.find((service) => service.slug === requestedSlug)?.title || '';
  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('subject', `New project inquiry: ${data.get('service')}`);
    setState({ status: 'sending', message: 'Sending your inquiry…' });
    if (endpoint) {
      try {
        const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('The form service did not accept this submission.');
        form.reset();
        setState({ status: 'success', message: 'Thanks. Your inquiry has been sent to TellaMind.' });
      } catch {
        setState({ status: 'error', message: 'We could not send this form. Please email tellamindwork@gmail.com instead.' });
      }
      return;
    }
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness: ${data.get('company') || 'Not provided'}\nService: ${data.get('service')}\nBudget: ${data.get('budget') || 'Not provided'}\nTimeframe: ${data.get('timeframe') || 'Not provided'}\n\nProject details:\n${data.get('message')}`);
    window.location.href = `mailto:tellamindwork@gmail.com?subject=${encodeURIComponent(`TellaMind project inquiry: ${data.get('service')}`)}&body=${body}`;
    setState({ status: 'fallback', message: 'Your email app should open with the inquiry ready to review and send. If it does not, email tellamindwork@gmail.com.' });
  }
  return <form className="contact-form" onSubmit={handleSubmit}>
    <div className="form-heading"><b>Share a few project details</b><span>About 2 minutes</span></div>
    <label>Your name<input required name="name" autoComplete="name" placeholder="Your name" /></label>
    <label>Work email<input required name="email" type="email" autoComplete="email" placeholder="Your Email" /></label>
    <label>Business or company <span className="optional">Optional</span><input name="company" autoComplete="organization" placeholder="Your business name" /></label>
    <label>What can we help with?<select defaultValue={initialService} required name="service"><option value="" disabled>Select a service</option>{services.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}<option value="Something else">Something else</option></select></label>
    <div className="form-row"><label>Approximate budget <span className="optional">Optional</span><select name="budget" defaultValue=""><option value="">Not sure yet</option><option>Under $2,500</option><option>$2,500–$5,000</option><option>$5,000–$10,000</option><option>$10,000+</option></select></label><label>Desired timeframe <span className="optional">Optional</span><select name="timeframe" defaultValue=""><option value="">Not sure yet</option><option>As soon as possible</option><option>Within 1–3 months</option><option>In 3+ months</option></select></label></div>
    <label>A little about the project<textarea required name="message" rows="4" placeholder="What do you want to build or improve?" /></label>
    <label className="privacy-consent"><input type="checkbox" name="privacyConsent" required /><span>I agree that TellaMind may use these details to respond to my inquiry. Read the <Link to="/privacy">Privacy Policy</Link>.</span></label>
    <button className="button button-dark" type="submit" disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Sending…' : 'Send project inquiry'} <ArrowRight size={15} /></button>
    <p className={`form-status ${state.status}`} role="status" aria-live="polite">{state.message || (endpoint ? 'Your details are sent securely through our configured contact form.' : 'This form uses your email app until a form service is configured.')}</p>
  </form>;
}
