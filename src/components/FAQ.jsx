import React from 'react';
import { faqs } from '../data.js';
import { SectionHeading } from './SectionHeading.jsx';

export function FAQ({ compact = false }) {
  const [active, setActive] = React.useState(0);
  const list = compact ? faqs.slice(0, 4) : faqs;
  return <section className={`faq-section section-wrap ${compact ? 'faq-compact' : ''}`}><SectionHeading kicker="FAQ" title={<>A few things you<br/><em>might be wondering.</em></>} copy="Still have a question? Send it our way and we’ll get back to you."/><div className="faq-list">{list.map(([question, answer], index) => <div className={`faq-item ${active === index ? 'active' : ''}`} key={question}><button aria-expanded={active === index} onClick={() => setActive(active === index ? -1 : index)}><span>{question}</span><span className="faq-plus" aria-hidden="true">{active === index ? '−' : '+'}</span></button>{active === index && <p>{answer}</p>}</div>)}</div></section>;
}
