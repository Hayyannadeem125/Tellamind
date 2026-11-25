import React from 'react';
import { ArrowRight, Check, LayoutDashboard, Sparkles } from 'lucide-react';

const steps = [
  { icon: LayoutDashboard, label: 'Clear digital experience', detail: 'Website · app · product' },
  { icon: Sparkles, label: 'Useful automation', detail: 'AI · integrations · workflows' },
  { icon: Check, label: 'Ready to move forward', detail: 'Built around the business goal' },
];

// Kept as a component name to avoid changing the page route structure.
export function WorkHeroOrbit() {
  return <div className="work-hero-orbit work-hero-brief" role="img" aria-label="A practical project workflow">
    <div className="brief-window">
      <div className="brief-window-top"><span /><span /><span /><b>THE PROJECT, MADE PRACTICAL</b></div>
      <div className="brief-window-body">
        <p className="brief-kicker">FROM FIRST IDEA TO USEFUL WORK</p>
        {steps.map(({ icon: Icon, label, detail }, index) => <div className="brief-step" key={label}>
          <span className="brief-step-number">0{index + 1}</span>
          <span className="brief-step-icon"><Icon size={17} strokeWidth={1.7} /></span>
          <span className="brief-step-copy"><b>{label}</b><small>{detail}</small></span>
          {index < steps.length - 1 && <ArrowRight className="brief-step-arrow" size={15} />}
        </div>)}
        <div className="brief-status"><span /> ONE CLEAR NEXT STEP</div>
      </div>
    </div>
  </div>;
}
