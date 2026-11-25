import React from 'react';
import { ArrowDown, Check, Compass, Hammer, MessageCircle, Send } from 'lucide-react';

const stages = [
  { icon: MessageCircle, title: 'Listen & learn', detail: 'Understand the goal' },
  { icon: Compass, title: 'Plan the right thing', detail: 'Agree on scope' },
  { icon: Hammer, title: 'Build together', detail: 'Review as we go' },
  { icon: Send, title: 'Launch & support', detail: 'Hand off with clarity' },
];

export function ProcessJourney() {
  return <div className="process-journey process-timeline" role="img" aria-label="Four steps from idea to launch">
    <div className="process-timeline-heading"><span>THE WAY WE WORK</span><b>Clear at every step.</b></div>
    <div className="process-timeline-list">
      {stages.map(({ icon: Icon, title, detail }, index) => <div className="process-timeline-step" key={title}>
        <span className="process-timeline-icon"><Icon size={16} strokeWidth={1.8}/></span>
        <span className="process-timeline-copy"><b>{title}</b><small>{detail}</small></span>
        {index === stages.length - 1 ? <Check className="process-timeline-end" size={16}/> : <ArrowDown className="process-timeline-end" size={15}/>}
      </div>)}
    </div>
    <p className="process-timeline-note">A shared plan. No mystery handoffs.</p>
  </div>;
}
