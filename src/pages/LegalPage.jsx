import React from 'react';
import { Link } from 'react-router-dom';
import { Eyebrow } from '../components/SectionHeading.jsx';

const formspreeConfigured = Boolean(import.meta.env.VITE_FORMSPREE_ENDPOINT);
const trackerConfigured = Boolean(import.meta.env.VITE_INQUIRY_WEBHOOK_URL);

function PrivacyPolicy() {
  return <>
    <h2>Who we are</h2>
    <p>TellaMind is a Michigan-based technology company serving businesses and creators. For questions about this notice or a privacy request, email <a href="mailto:tellamindwork@gmail.com">tellamindwork@gmail.com</a>.</p>

    <h2>Information you provide</h2>
    <p>If you contact us about a project, you may provide your name, email address, business name, service interest, budget range, timeframe, and project description. A service inquiry may also ask for details such as your website, tools, intended users, app or software requirements, and project goals. A Meta Ads inquiry may ask about your campaign objective, Meta account setup, estimated monthly advertising spend, and tracking readiness. Never send ad account passwords or login codes.</p>
    <p>The Snapchat creator readiness form can ask for your Snapchat username, public profile link, country, Snap Star status, follower count, public posting frequency, and view-time figures you choose to share. Please do not send passwords, login codes, private account credentials, government ID numbers, or unrelated sensitive information.</p>

    <h2>How we use information</h2>
    <p>We use inquiry information to respond to you, understand the work you are asking about, prepare a proposal, communicate about an active project, and protect or administer our business. We do not use inquiry information for automated decisions, and we do not add people to a marketing list through these forms.</p>

    <h2>How forms and email work</h2>
    {trackerConfigured
      ? <p>When you submit a website form, the information is sent to TellaMind through a Google Apps Script endpoint and saved in our private Google Sheets client tracker. A notification is sent to tellamindwork@gmail.com. Google processes this information as the provider of these services. Your email address is used to reply to your inquiry. See <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">Google’s Privacy Policy</a>.</p>
      : formspreeConfigured
      ? <p>When you submit a website form, the information is sent to TellaMind through Formspree, which processes the submission and can send a notification to tellamindwork@gmail.com. Formspree may process or retain submission data under its own terms and privacy practices. TellaMind also receives and handles the inquiry through Google-hosted email. Your email address is used to reply to you. See <a href="https://formspree.io/legal/privacy-policy/" target="_blank" rel="noreferrer">Formspree’s Privacy Policy</a>.</p>
      : <p>Website forms are not yet connected to a direct submission service. Submitting one opens your email application with a message for you to review and send; the website does not send or store that message. TellaMind receives inquiries at tellamindwork@gmail.com, which is hosted by Google. Your own email provider will also process any message you choose to send.</p>}

    <h2>Hosting, public team profiles, and device preferences</h2>
    <p>The website is hosted on GitHub Pages. GitHub may process routine connection and technical information to deliver and secure the site under its <a href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement" target="_blank" rel="noreferrer">Privacy Statement</a>. We do not currently use website analytics, advertising pixels, or tracking cookies.</p>
    <p>The site stores your light or dark theme choice in your browser’s local storage. That preference stays on your device and is not sent to TellaMind. Team names, roles, biographies, and photos published on the Team page are public website content. They are maintained in the website repository through Pages CMS and can be viewed or copied by others.</p>

    <h2>When information is shared</h2>
    <p>We share information only as needed to respond to your request, operate the website and our email, work with providers you ask us to use, or comply with law. Those providers process information under their own terms and privacy notices. We do not sell personal information or share it for cross-context targeted advertising.</p>

    <h2>Retention</h2>
    <p>We keep inquiry information while we are discussing or delivering a project and for up to 24 months after our last meaningful contact. We may keep relevant records longer when required by law, needed for an active contract or dispute, or necessary to protect the business. After that, we delete the information or remove details that identify you when reasonably possible.</p>

    <h2>International processing</h2>
    <p>TellaMind is based in the United States. If you contact us from another country, your information may be processed in the United States or another country where a service provider operates. Where required, we use the transfer protections required by applicable law.</p>

    <h2>Your choices and privacy requests</h2>
    <p>You can ask us to access, correct, or delete inquiry information by emailing <a href="mailto:tellamindwork@gmail.com">tellamindwork@gmail.com</a>. Depending on where you live and which laws apply, you may have additional rights, including the right to object to or restrict certain processing, receive a portable copy, or complain to a privacy regulator. We will review and respond to requests as required by applicable law. We may need to verify your identity before acting.</p>

    <h2>Security and changes</h2>
    <p>We use reasonable measures to protect information we handle, but no online service or email transmission can be guaranteed completely secure. We may update this notice when our data practices change.</p>
  </>;
}

function TermsOfService() {
  return <>
    <h2>About these Terms</h2>
    <p>These Terms apply to your use of the TellaMind website. TellaMind is a Michigan-based technology company. By using this site, you agree to these Terms. If you do not agree, please do not use the site.</p>
    <p>These website Terms do not replace a project proposal, statement of work, or service agreement. A separate written agreement accepted by both sides will set the scope, fees, payment schedule, deliverables, revisions, timeline, responsibilities, support, cancellation terms, and project-specific intellectual property rights.</p>

    <h2>Website content and project examples</h2>
    <p>The site describes technology and digital services, including websites, mobile apps, custom business software, AI automation, social media support, and search marketing. Site content is general information and is not a promise that a particular service, feature, result, or schedule will be available for every project.</p>
    <p>Project pages showcase work built by TellaMind. Applicant profiles, property listings, creator details, and other personal or business information in interactive previews are illustrative. They are not client testimonials, verified case studies, or claims of measured business results.</p>

    <h2>Project inquiries and service outcomes</h2>
    <p>Sending an inquiry does not create a client relationship or require TellaMind to accept a project. Work begins only after both sides agree in writing to the project scope and commercial terms.</p>
    <p>Search rankings, sales, audience growth, software performance, and other business results depend on many factors. We do not guarantee specific results unless a written project agreement expressly says otherwise. Snapchat alone controls Snap Star verification, monetization eligibility, invitations, and earnings. TellaMind cannot guarantee or influence those decisions.</p>

    <h2>Third-party services</h2>
    <p>Websites, app stores, social platforms, payment providers, and other third-party services have their own terms, availability, and privacy practices. TellaMind does not control them. Any third-party subscriptions, account approvals, or usage charges will be handled as stated in the applicable project agreement.</p>

    <h2>Acceptable use and ownership</h2>
    <p>Do not use the site to break the law, interfere with the site, attempt unauthorized access, or submit information you are not authorized to share. Do not send passwords, login codes, or private account credentials through website forms.</p>
    <p>Unless a page says otherwise, TellaMind owns or has permission to use the website’s text, design, branding, and code. You may view the site and share links for personal or business reference. You may not copy, republish, sell, or modify its materials without written permission. Ownership and licensing for materials created in a client project are set out in that project’s written agreement.</p>

    <h2>Website availability and liability</h2>
    <p>We work to keep the website accurate and available, but we do not promise uninterrupted access or that every page will always be error-free. To the extent allowed by law, TellaMind is not responsible for indirect loss arising solely from your use of this informational website. Nothing in these Terms excludes liability or consumer rights that cannot legally be excluded.</p>

    <h2>Governing law and updates</h2>
    <p>These website Terms are governed by the laws of Michigan, United States, except where applicable law requires otherwise. Any project agreement may set additional dispute terms. We may update these Terms by posting a revised version here; the date above will change when we do.</p>

    <h2>Contact</h2>
    <p>Questions about these Terms can be sent to <a href="mailto:tellamindwork@gmail.com">tellamindwork@gmail.com</a>.</p>
  </>;
}

export function LegalPage({ kind }) {
  const privacy = kind === 'privacy';
  return <article className="legal-page section-wrap">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>{privacy ? 'Privacy' : 'Terms'}</span></div>
    <Eyebrow>WE VALUE CLARITY</Eyebrow>
    <h1>{privacy ? 'Privacy Policy' : 'Terms of Service'}</h1>
    {privacy ? <PrivacyPolicy/> : <TermsOfService/>}
  </article>;
}
