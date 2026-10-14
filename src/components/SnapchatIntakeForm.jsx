import React from 'react';
import { ArrowRight } from 'lucide-react';

const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export function SnapchatIntakeForm() {
  const [state, setState] = React.useState({ status: 'idle', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    data.set('service', 'Snap Star & Snapchat Creator Support');
    setState({ status: 'sending', message: 'Preparing your readiness request…' });

    if (endpoint) {
      try {
        const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error('Form submission failed.');
        form.reset();
        setState({ status: 'success', message: 'Thanks. Your Snapchat readiness request has been sent to TellaMind.' });
      } catch {
        setState({ status: 'error', message: 'We could not send this form. Please email tellamindwork@gmail.com instead.' });
      }
      return;
    }

    const fields = [
      ['Name', data.get('name')], ['Email', data.get('email')], ['Snapchat username', data.get('snapchatUsername')],
      ['Public Profile URL', data.get('profileUrl')], ['Country', data.get('country')],
      ['Snap Star status', data.get('snapStarStatus')], ['Followers', data.get('followers')],
      ['Total view time, last 28 days (hours)', data.get('totalViewHours')],
      ['Spotlight view time, last 28 days (hours)', data.get('spotlightViewHours')],
      ['Public Stories frequency', data.get('storyFrequency')], ['Age 18 or older', data.get('age18Plus') ? 'Yes' : 'No / not confirmed'],
      ['Requested support', data.get('supportType')],
      ['Additional context', data.get('notes')],
    ];
    const body = encodeURIComponent(fields.map(([label, value]) => `${label}: ${value || 'Not provided'}`).join('\n'));
    window.location.href = `mailto:tellamindwork@gmail.com?subject=${encodeURIComponent('Snapchat creator readiness request')}&body=${body}`;
    setState({ status: 'fallback', message: 'Your email app should open with your readiness request. Review it and press Send; nothing is submitted to Snapchat.' });
  }

  return <form className="snap-intake-form" id="snapchat-intake" onSubmit={handleSubmit}>
    <div className="snap-intake-heading">
      <div><span className="snap-readiness-kicker">PRIVATE READINESS INQUIRY</span><h3>Tell us where your creator profile stands.</h3></div>
      <p>Share the numbers shown in Snapchat Insights for the last 28 days. We’ll use them to understand what kind of preparation may help.</p>
    </div>
    <div className="snap-intake-grid">
      <label>Your name<input required name="name" autoComplete="name" placeholder="Your name"/></label>
      <label>Email address<input required name="email" type="email" autoComplete="email" placeholder="you@example.com"/></label>
      <label>Snapchat username<input required name="snapchatUsername" autoComplete="off" placeholder="@username"/></label>
      <label>Public Profile link <span className="optional">If available</span><input name="profileUrl" type="url" placeholder="https://www.snapchat.com/add/…"/></label>
      <label>Country of residence<input required name="country" autoComplete="country-name" placeholder="Country"/></label>
      <label>Snap Star status<select required name="snapStarStatus" defaultValue=""><option value="" disabled>Select one</option><option>Already a Snap Star</option><option>Application submitted</option><option>Not applied yet</option><option>Not sure</option></select></label>
      <label>Current followers<input name="followers" type="number" min="0" inputMode="numeric" placeholder="e.g. 52000"/></label>
      <label>Total view time · last 28 days (hours)<input name="totalViewHours" type="number" min="0" step="0.1" inputMode="decimal" placeholder="e.g. 15000"/></label>
      <label>Spotlight view time · last 28 days (hours)<input name="spotlightViewHours" type="number" min="0" step="0.1" inputMode="decimal" placeholder="e.g. 3000"/></label>
      <label>How often do you post public Stories?<select name="storyFrequency" defaultValue=""><option value="" disabled>Select frequency</option><option>Most days</option><option>Several times a week</option><option>About once a week</option><option>Less often / not yet</option></select></label>
      <label className="snap-intake-wide">What help are you looking for?<select required name="supportType" defaultValue=""><option value="" disabled>Select support</option><option>Snap Star profile and application readiness</option><option>Monetization eligibility and Insights review</option><option>Both Snap Star and monetization readiness</option><option>Creator content planning</option></select></label>
      <label className="snap-intake-wide">Anything else we should know? <span className="optional">Optional</span><textarea name="notes" rows="3" placeholder="Share your goals or questions. Please do not include passwords, login codes, or private account credentials."/></label>
    </div>
    <label className="snap-intake-check"><input type="checkbox" name="age18Plus" value="Yes"/><span>I am 18 or older. <small>This helps us assess monetization readiness; it is not a Snap Star verification rule.</small></span></label>
    <label className="snap-intake-check"><input type="checkbox" name="privacyConsent" value="Yes" required/><span>I agree TellaMind may use these details to respond to this request. Read our <a href="/privacy">Privacy Policy</a>.</span></label>
    <div className="snap-intake-submit"><button className="button button-dark" type="submit" disabled={state.status === 'sending'}>{state.status === 'sending' ? 'Preparing…' : 'Request my readiness review'} <ArrowRight size={15}/></button><p className={`snap-intake-status ${state.status}`} role="status" aria-live="polite">{state.message || (endpoint ? 'Your details will be sent through our configured contact form.' : 'This form opens your email app so you can review and send your request.')}</p></div>
    <p className="snap-intake-disclaimer">This is a request for TellaMind’s preparation support, not an application submitted to Snapchat. We do not need your password or login codes, and we cannot guarantee verification, an invitation, or earnings.</p>
  </form>;
}
