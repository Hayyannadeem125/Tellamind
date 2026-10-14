import React from 'react';
import { ArrowRight } from 'lucide-react';
import { services } from '../data.js';

const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const inquiryConfig = {
  'ai-automation': {
    kicker: 'AI & AUTOMATION PROJECT INQUIRY',
    title: 'Where is repetitive work slowing you down?',
    intro: 'A few details help us understand the workflow and suggest a sensible first step.',
    fields: [
      { name: 'manualProcess', label: 'What task or process would you like to improve?', type: 'textarea', required: true, placeholder: 'Describe what happens today and who handles it.' },
      { name: 'tools', label: 'Which tools or platforms are involved?', type: 'text', placeholder: 'For example: email, CRM, calendar, forms' },
      { name: 'taskVolume', label: 'How often does this work happen?', type: 'select', required: true, options: ['Several times a day', 'Daily', 'Weekly', 'A few times a month', 'Not sure'] },
      { name: 'desiredResult', label: 'What would a useful improvement look like?', type: 'select', required: true, options: ['Faster response to inquiries', 'Less manual data entry', 'Fewer missed follow-ups', 'Easier internal information access', 'Other / not sure'] },
    ],
  },
  'websites-ecommerce': {
    kicker: 'WEBSITE PROJECT INQUIRY',
    title: 'What do you want your website to do?',
    intro: 'Tell us what you’re launching or improving. We’ll use this to shape a practical website scope.',
    fields: [
      { name: 'websiteType', label: 'What kind of website work do you need?', type: 'select', required: true, options: ['New business website', 'Redesign an existing website', 'Online store / e-commerce', 'Landing page', 'Website maintenance or updates', 'Not sure yet'] },
      { name: 'currentWebsite', label: 'Current website URL', type: 'url', placeholder: 'https://example.com' },
      { name: 'websiteNeeds', label: 'What should visitors be able to do?', type: 'textarea', required: true, placeholder: 'For example: request a quote, book, browse services, or purchase products.' },
      { name: 'contentStatus', label: 'How ready are your website text and images?', type: 'select', required: true, options: ['Ready to use', 'Some content is ready', 'Need help creating it', 'Not sure yet'] },
    ],
  },
  'apps-software': {
    kicker: 'APP & SOFTWARE PROJECT INQUIRY',
    title: 'Tell us about the product you have in mind.',
    intro: 'Share the core idea and who it is for. We can help turn that into an initial product scope.',
    fields: [
      { name: 'platform', label: 'Which platform are you considering?', type: 'select', required: true, options: ['Web application', 'iOS app', 'Android app', 'Web and mobile', 'Not sure yet'] },
      { name: 'productIdea', label: 'What should the product help people do?', type: 'textarea', required: true, placeholder: 'Describe the problem and the main task users need to complete.' },
      { name: 'primaryUsers', label: 'Who will use it?', type: 'text', required: true, placeholder: 'For example: customers, staff, members' },
      { name: 'mustHaveFeatures', label: 'Which features are essential for the first version?', type: 'textarea', placeholder: 'List the most important features; we can prioritize together.' },
      { name: 'integrations', label: 'Any systems it needs to connect with?', type: 'text', placeholder: 'For example: payments, CRM, calendar, inventory' },
    ],
  },
  'seo-digital-marketing': {
    kicker: 'SEO & DIGITAL GROWTH INQUIRY',
    title: 'Help us understand your growth goals.',
    intro: 'Your website, market, and main goal help us identify useful SEO and marketing priorities.',
    fields: [
      { name: 'websiteUrl', label: 'Website URL', type: 'url', placeholder: 'https://example.com' },
      { name: 'businessType', label: 'What does your business offer?', type: 'text', required: true, placeholder: 'Your service, product, or industry' },
      { name: 'targetMarket', label: 'Where do you want to reach customers?', type: 'text', required: true, placeholder: 'City, region, or countries' },
      { name: 'growthGoal', label: 'What is your main goal right now?', type: 'select', required: true, options: ['More qualified website inquiries', 'Improve local search visibility', 'Grow online sales', 'Improve search rankings', 'Understand current SEO performance', 'Not sure yet'] },
      { name: 'currentMarketing', label: 'What have you tried so far?', type: 'textarea', placeholder: 'Optional: SEO, paid ads, Google Business Profile, analytics, or other work.' },
    ],
  },
};

function FormField({ field }) {
  const common = { id: field.name, name: field.name, required: field.required || false, placeholder: field.placeholder };
  return <label className={field.type === 'textarea' ? 'service-inquiry-field service-inquiry-field--wide' : 'service-inquiry-field'} htmlFor={field.name}>
    {field.label}
    {field.type === 'textarea'
      ? <textarea {...common} rows="3" />
      : field.type === 'select'
        ? <select {...common} defaultValue=""><option value="" disabled>Select an option</option>{field.options.map(option => <option key={option}>{option}</option>)}</select>
        : <input {...common} type={field.type} />}
  </label>;
}

export function ServiceInquiryForm({ serviceSlug }) {
  const config = inquiryConfig[serviceSlug];
  const service = services.find(item => item.slug === serviceSlug);
  const [state, setState] = React.useState({ status: 'idle', message: '' });
  if (!config || !service) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('service', service.title);
    setState({ status: 'sending', message: 'Preparing your inquiry…' });

    if (endpoint) {
      try {
        const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Form submission failed.');
        form.reset();
        setState({ status: 'success', message: 'Thanks. Your project inquiry has been sent to TellaMind.' });
      } catch {
        setState({ status: 'error', message: 'We could not send this form. Please email tellamindwork@gmail.com instead.' });
      }
      return;
    }

    const labels = Object.fromEntries(config.fields.map(field => [field.name, field.label]));
    const entries = [['Service', service.title], ['Name', data.get('name')], ['Email', data.get('email')], ['Business', data.get('company') || 'Not provided'], ...Array.from(data.entries()).filter(([key]) => labels[key]).map(([key, value]) => [labels[key], value]), ['Timeframe', data.get('timeframe') || 'Not provided']];
    const body = encodeURIComponent(entries.map(([label, value]) => `${label}: ${value || 'Not provided'}`).join('\n'));
    window.location.href = `mailto:tellamindwork@gmail.com?subject=${encodeURIComponent(`TellaMind inquiry — ${service.title}`)}&body=${body}`;
    setState({ status: 'fallback', message: 'Your email app should open with the inquiry. Review it and press Send to contact TellaMind.' });
  }

  return <section className="service-inquiry-wrap section-wrap" id="service-inquiry">
    <form className="service-inquiry-form" onSubmit={handleSubmit}>
      <div className="service-inquiry-header"><div><span>{config.kicker}</span><h2>{config.title}</h2><p>{config.intro}</p></div><b>{service.number}</b></div>
      <div className="service-inquiry-section-label">YOUR CONTACT DETAILS</div>
      <div className="service-inquiry-grid service-inquiry-contact">
        <label className="service-inquiry-field">Your name<input required name="name" autoComplete="name" placeholder="Your name"/></label>
        <label className="service-inquiry-field">Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com"/></label>
        <label className="service-inquiry-field service-inquiry-field--wide">Business or company <span className="optional">Optional</span><input name="company" autoComplete="organization" placeholder="Business name"/></label>
      </div>
      <div className="service-inquiry-section-label">PROJECT DETAILS</div>
      <div className="service-inquiry-grid">{config.fields.map(field => <FormField key={field.name} field={field}/>)}</div>
      <div className="service-inquiry-footer">
        <label className="service-inquiry-field service-inquiry-timeline">Desired timeframe <select name="timeframe" defaultValue=""><option value="">Not sure yet</option><option>As soon as possible</option><option>Within 1–3 months</option><option>In 3+ months</option></select></label>
        <button className="button button-dark" type="submit" disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Preparing…' : 'Send project inquiry'} <ArrowRight size={15}/></button>
      </div>
      <label className="service-inquiry-consent"><input type="checkbox" name="privacyConsent" value="Yes" required/><span>TellaMind may use these details to respond to my inquiry. Read the <a href="/privacy">Privacy Policy</a>.</span></label>
      <p className={`service-inquiry-status ${state.status}`} role="status" aria-live="polite">{state.message || (endpoint ? 'Submitted securely through our configured contact form.' : 'Your email app opens so you can review and send this inquiry.')}</p>
    </form>
  </section>;
}
