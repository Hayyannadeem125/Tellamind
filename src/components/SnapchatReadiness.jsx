import React from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SnapchatIntakeForm } from './SnapchatIntakeForm.jsx';

export function SnapchatReadiness() {
  return <section className="snap-readiness" aria-labelledby="snap-readiness-title">
    <div className="snap-readiness-heading">
      <span className="snap-readiness-kicker">SNAPCHAT ELIGIBILITY · OFFICIAL GUIDANCE</span>
      <h2 id="snap-readiness-title">Know what Snapchat looks for.<br/><em>Prepare before you apply.</em></h2>
      <p>Snap Star verification and Snapchat monetization are separate decisions. We can help you review your profile, content, and application materials; Snapchat makes every approval and invitation decision.</p>
    </div>

    <div className="snap-readiness-grid">
      <article className="snap-readiness-panel">
        <div className="snap-readiness-panel-title"><span><ShieldCheck size={18}/></span><div><small>TRACK 01</small><h3>Snap Star verification</h3></div></div>
        <p>Snap evaluates the overall public presence and authenticity of an account. There is no published follower-count guarantee.</p>
        <ul>
          <li><CheckCircle2 size={15}/> An authentic account representing a real person or people</li>
          <li><CheckCircle2 size={15}/> Regular Stories intended for a public audience</li>
          <li><CheckCircle2 size={15}/> Strong audience engagement and public notability or cultural relevance</li>
          <li><CheckCircle2 size={15}/> Original, high-quality content that follows Snap’s rules</li>
        </ul>
        <a className="snap-policy-link" href="https://help.snapchat.com/hc/en-us/articles/7012407611412-How-do-I-become-a-Snap-Star" target="_blank" rel="noreferrer">Read Snap Star criteria <ArrowUpRight size={14}/></a>
      </article>

      <article className="snap-readiness-panel">
        <div className="snap-readiness-panel-title"><span><CheckCircle2 size={18}/></span><div><small>TRACK 02</small><h3>Monetization invitation signals</h3></div></div>
        <p>Snap’s published criteria say creators may be eligible for an invitation when they meet <b>all</b> applicable requirements:</p>
        <ul>
          <li><CheckCircle2 size={15}/> At least 50,000 followers</li>
          <li><CheckCircle2 size={15}/> 15,000 view-time hours in the last 28 days, including at least 3,000 Spotlight hours</li>
          <li><CheckCircle2 size={15}/> Age 18+ (or legal majority), and residence in an eligible country</li>
          <li><CheckCircle2 size={15}/> Snap Star status, original advertiser-friendly content, and policy compliance</li>
        </ul>
        <p className="snap-small-print">The 100-hour Spotlight view-time condition effective May 7, 2026 relates to maximum Creator Rewards; it is not a substitute for the invitation criteria above. Snap invites creators directly by email and does not sell invitations.</p>
        <a className="snap-policy-link" href="https://help.snapchat.com/hc/en-us/articles/14669003687444-About-Snapchat-s-Monetization-Program" target="_blank" rel="noreferrer">Read monetization rules <ArrowUpRight size={14}/></a>
      </article>
    </div>

    <div className="snap-readiness-bottom">
      <p><b>How TellaMind helps:</b> profile and content review → eligibility gap checklist → application-material preparation. We never ask for your Snapchat password, charge for Snapchat approval, or promise verification, invitations, or earnings. Country availability and requirements can change; confirm details with Snapchat before you apply.</p>
      <a className="button button-dark" href="#snapchat-intake">Check my readiness <ArrowRight size={15}/></a>
    </div>
    <SnapchatIntakeForm/>
  </section>;
}
