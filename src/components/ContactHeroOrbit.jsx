import React from 'react';
import { ArrowRight, Check, MessageSquareText } from 'lucide-react';

export function ContactHeroOrbit() {
  return <aside className="contact-hero-orbit contact-start-card" aria-label="What happens after you contact TellaMind">
    <div className="contact-start-top"><span className="contact-start-icon"><MessageSquareText size={19}/></span><span>YOUR PROJECT, STARTING CLEARLY</span></div>
    <h2>A good first step<br/><em>starts with a conversation.</em></h2>
    <div className="contact-start-points">
      <p><Check size={15}/> Tell us what you want to improve</p>
      <p><Check size={15}/> Get a practical recommendation</p>
      <p><Check size={15}/> Agree on scope and next steps</p>
    </div>
    <div className="contact-start-foot"><span>NO PRESSURE. JUST A CLEAR START.</span><ArrowRight size={17}/></div>
  </aside>;
}
