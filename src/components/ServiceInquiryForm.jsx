import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { services } from '../data.js';
import { inquiryEndpoint as endpoint, submitInquiry } from '../lib/submitInquiry.js';


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
  'mobile-app-development': {
    kicker: 'MOBILE APP PROJECT INQUIRY',
    title: 'Tell us about the app you have in mind.',
    intro: 'Share the app idea, who will use it, and which mobile platforms you are considering.',
    fields: [
      { name: 'platform', label: 'Which mobile platform do you need?', type: 'select', required: true, options: ['iOS (iPhone)', 'Android', 'iOS and Android', 'Not sure yet'] },
      { name: 'productIdea', label: 'What should the app help people do?', type: 'textarea', required: true, placeholder: 'Describe the problem and the main task app users need to complete.' },
      { name: 'primaryUsers', label: 'Who will use it?', type: 'text', required: true, placeholder: 'For example: customers, staff, members' },
      { name: 'mustHaveFeatures', label: 'Which features are essential for the first release?', type: 'textarea', placeholder: 'For example: accounts, bookings, payments, messaging, or maps.' },
      { name: 'integrations', label: 'Does the app need to connect to other services?', type: 'text', placeholder: 'For example: payments, maps, calendar, or an existing website' },
    ],
  },
  'cloud-devops': {
    kicker: 'CLOUD & DEVOPS PROJECT INQUIRY',
    title: 'What would you like to improve in your cloud setup?',
    intro: 'Tell us where the application runs today and what you want to make easier, more reliable, or more manageable.',
    fields: [
      { name: 'cloudProvider', label: 'Which cloud platform are you using or considering?', type: 'select', required: true, options: ['Amazon Web Services (AWS)', 'Microsoft Azure', 'Both AWS and Azure', 'Another platform', 'Not sure yet'] },
      { name: 'cloudWork', label: 'What kind of cloud or DevOps help do you need?', type: 'select', required: true, options: ['Plan a cloud migration', 'Set up cloud hosting', 'Create or improve a CI/CD pipeline', 'Review reliability or cloud costs', 'Configure monitoring and alerts', 'Not sure yet'] },
      { name: 'currentSetup', label: 'Describe your current hosting or deployment setup', type: 'textarea', required: true, placeholder: 'Where does the app run now, and how do you deploy updates?' },
      { name: 'cloudGoals', label: 'What would a good outcome look like?', type: 'textarea', placeholder: 'For example: fewer manual release steps, a migration plan, or clearer cloud costs.' },
    ],
  },
  'qa-software-testing': {
    kicker: 'QA & SOFTWARE TESTING INQUIRY',
    title: 'What product or release needs checking?',
    intro: 'Share what you are building and the types of issues or release risks you want us to look for.',
    fields: [
      { name: 'productType', label: 'What needs testing?', type: 'select', required: true, options: ['Website or online store', 'iOS or Android app', 'Web application or portal', 'API or integration', 'Other software', 'Not sure yet'] },
      { name: 'testingNeeds', label: 'Which QA work are you looking for?', type: 'select', required: true, options: ['Functional testing', 'Regression testing after changes', 'Browser or device compatibility', 'Performance checks', 'Code review', 'Test automation', 'Not sure yet'] },
      { name: 'productUrl', label: 'Website or test environment URL', type: 'url', placeholder: 'https://example.com' },
      { name: 'releaseStage', label: 'What stage is the product at?', type: 'select', required: true, options: ['Preparing for first launch', 'Already live and needs a review', 'Recently updated', 'Investigating reported issues', 'Planning stage'] },
      { name: 'testingFocus', label: 'Which user journeys or problems should we focus on?', type: 'textarea', required: true, placeholder: 'Describe the key tasks users need to complete, or the issues you have observed.' },
    ],
  },
  'custom-business-software': {
    kicker: 'CUSTOM BUSINESS SOFTWARE INQUIRY',
    title: 'Which business process should the software improve?',
    intro: 'Tell us how the work happens today and who needs to use the new tool.',
    fields: [
      { name: 'softwareType', label: 'What kind of business software do you need?', type: 'select', required: true, options: ['Operations dashboard', 'Customer or client portal', 'Internal team tool', 'Booking or request system', 'Inventory or reporting tool', 'Not sure yet'] },
      { name: 'currentProcess', label: 'How is this work handled today?', type: 'textarea', required: true, placeholder: 'For example: spreadsheets, email, paper forms, or several separate tools.' },
      { name: 'primaryUsers', label: 'Who will use the software?', type: 'text', required: true, placeholder: 'For example: staff, managers, customers, or partners' },
      { name: 'mustHaveFeatures', label: 'What should users be able to do?', type: 'textarea', placeholder: 'List the most important tasks, views, or reports.' },
      { name: 'integrations', label: 'Which systems should it connect with?', type: 'text', placeholder: 'For example: CRM, payments, calendar, inventory, or accounting' },
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
  'social-creator-growth': {
    kicker: 'SOCIAL MEDIA & CREATOR GROWTH INQUIRY',
    title: 'Which channels would you like to grow?',
    intro: 'Tell us which platforms matter to your audience, what you want to achieve, and the support you need.',
    fields: [
      { name: 'socialPlatforms', label: 'Which channels need support?', type: 'select', required: true, options: ['Facebook and Instagram', 'YouTube', 'Snapchat', 'Facebook, Instagram, and YouTube', 'Multiple platforms / not sure yet'] },
      { name: 'socialSupport', label: 'What kind of support are you looking for?', type: 'select', required: true, options: ['Content strategy and calendar', 'Content creation and publishing', 'Social account management', 'YouTube channel and Shorts planning', 'Snapchat creator and Public Profile support', 'A combination of these', 'Not sure yet'] },
      { name: 'socialProfile', label: 'Social profile or channel link', type: 'url', placeholder: 'https://...' },
      { name: 'socialGoal', label: 'What would you like social media to help you achieve?', type: 'select', required: true, options: ['Increase brand awareness', 'Get more qualified inquiries or sales', 'Post consistently', 'Grow a YouTube channel', 'Improve engagement', 'Prepare creator content or Snapchat profile', 'Not sure yet'] },
      { name: 'socialDetails', label: 'Tell us about your audience, content, or current challenges', type: 'textarea', placeholder: 'What do you offer, who do you want to reach, and what would you like to improve?' },
    ],
  },
  'meta-ads': {
    kicker: 'META ADS PROJECT INQUIRY',
    title: 'What should your Facebook and Instagram ads achieve?',
    intro: 'Share your offer, audience, and campaign goal. We’ll use these details to understand the right starting scope. Your advertising budget is separate from our service fee.',
    fields: [
      { name: 'campaignGoal', label: 'What is the main campaign goal?', type: 'select', required: true, options: ['Generate qualified leads or inquiries', 'Sell products online', 'Promote a service or location', 'Build awareness for a new offer', 'Bring interested visitors back', 'Not sure yet'] },
      { name: 'websiteUrl', label: 'Website or landing page', type: 'url', placeholder: 'https://example.com' },
      { name: 'campaignOffer', label: 'What are you promoting, and who do you want to reach?', type: 'textarea', required: true, placeholder: 'Describe your product or service, target area or audience, and the action you want people to take.' },
      { name: 'metaSetup', label: 'Which best describes your Meta Ads setup?', type: 'select', required: true, options: ['Facebook Page and Instagram account only', 'Business Portfolio and ad account are ready', 'Ads are already running', 'Setup is partly complete', 'I need help checking this', 'Not sure yet'] },
      { name: 'monthlyAdSpend', label: 'Estimated monthly ad spend paid to Meta (USD)', type: 'select', options: ['Under $1,000', '$1,000–$3,000', '$3,000–$5,000', '$5,000–$10,000', '$10,000+', 'Not decided yet'] },
      { name: 'trackingSetup', label: 'How is website activity tracked?', type: 'select', options: ['Meta Pixel is installed', 'Pixel and Conversions API are set up', 'Tracking needs to be reviewed', 'No tracking setup yet', 'Not sure'] },
      { name: 'campaignContext', label: 'What have you tried so far?', type: 'textarea', placeholder: 'Optional: past campaigns, results you want to improve, creative assets you have, or questions.' },
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
    data.set('subject', `New project inquiry: ${service.title}`);
    setState({ status: 'sending', message: 'Preparing your inquiry…' });

    if (endpoint) {
      try {
        await submitInquiry(data);
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
    window.location.href = `mailto:tellamindwork@gmail.com?subject=${encodeURIComponent(`TellaMind inquiry: ${service.title}`)}&body=${body}`;
    setState({ status: 'fallback', message: 'Your email app should open with the inquiry. Review it and press Send to contact TellaMind.' });
  }

  return <section className="service-inquiry-wrap section-wrap" id="service-inquiry">
    <form className="service-inquiry-form" onSubmit={handleSubmit}>
      <input type="text" name="_gotcha" hidden tabIndex={-1} autoComplete="off" />
      <div className="service-inquiry-header"><div><span>{config.kicker}</span><h2>{config.title}</h2><p>{config.intro}</p></div></div>
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
      <label className="service-inquiry-consent"><input type="checkbox" name="privacyConsent" value="Yes" required/><span>TellaMind may use these details to respond to my inquiry. Read the <Link to="/privacy">Privacy Policy</Link>.</span></label>
      <p className={`service-inquiry-status ${state.status}`} role="status" aria-live="polite">{state.message || (endpoint ? 'Submitted securely through our configured contact form.' : 'Your email app opens so you can review and send this inquiry.')}</p>
    </form>
  </section>;
}
