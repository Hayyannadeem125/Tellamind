import React from 'react';
import { ArrowRight, Check, Circle, RotateCcw } from 'lucide-react';

const workflowSteps = [
  'Receive a new application',
  'Parse resume into candidate profile',
  'Match experience to the role',
  'Draft interview invitation for review',
];

function AutomationDemo() {
  const [activeStep, setActiveStep] = React.useState(-1);
  const [running, setRunning] = React.useState(false);
  const [complete, setComplete] = React.useState(false);
  const timers = React.useRef([]);

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function runWorkflow() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setActiveStep(-1);
    setComplete(false);
    setRunning(true);
    workflowSteps.forEach((_, index) => {
      timers.current.push(setTimeout(() => {
        setActiveStep(index);
        if (index === workflowSteps.length - 1) {
          setRunning(false);
          setComplete(true);
        }
      }, (index + 1) * 550));
    });
  }

  return <section className="project-demo-panel" aria-labelledby="automation-demo-title">
    <div className="project-demo-heading"><div><span className="project-demo-kicker">RECRUITMENT WORKFLOW</span><h2 id="automation-demo-title">Run an application through hiring</h2><p>Follow an illustrative applicant profile through common ATS stages. A recruiter reviews decisions before contacting anyone.</p></div><button className="project-demo-button" onClick={runWorkflow} disabled={running}>{complete ? <RotateCcw size={15}/> : <ArrowRight size={15}/>} {running ? 'Processing…' : complete ? 'Run it again' : 'Run hiring workflow'}</button></div>
    <ol className="workflow-demo-steps">{workflowSteps.map((step, index) => <li className={index <= activeStep ? 'is-complete' : ''} key={step}><span>{index < activeStep ? <Check size={15}/> : index === activeStep ? <span className="workflow-active-dot"/> : <Circle size={14}/>}</span><div><b>{step}</b><small>{['Applicant profile received', 'Resume details extracted', 'Role criteria reviewed', 'Human approval required'][index]}</small></div></li>)}</ol>
    {complete && <div className="workflow-demo-result" role="status"><Check size={16}/> Workflow preview complete. The interview draft is waiting for recruiter review.</div>}
  </section>;
}

const listings = [
  { name: 'Oak & Field House', area: 'Oakland County', type: 'House', beds: 3, price: '$425,000', style: 'listing-oak', image: 'https://images.unsplash.com/photo-1781269986378-a2f366df4d0f?fit=crop&fm=webp&w=680&q=64', imageAlt: 'Modern suburban home with a green lawn and mature trees' },
  { name: 'Maple Courtyard', area: 'Ann Arbor', type: 'Townhome', beds: 2, price: '$318,000', style: 'listing-maple', image: 'https://images.unsplash.com/photo-1769494244517-7aabbef35b28?fit=crop&fm=webp&w=680&q=64', imageAlt: 'Brick and blue-sided townhomes on a residential street' },
  { name: 'Pineview Cottage', area: 'Grand Rapids', type: 'House', beds: 2, price: '$289,000', style: 'listing-pine', image: 'https://images.unsplash.com/photo-1773427621086-1f8511c78e39?fit=crop&fm=webp&w=680&q=64', imageAlt: 'Large detached suburban home with a green lawn' },
];

function WebsiteDemo() {
  const [filter, setFilter] = React.useState('All homes');
  const [selected, setSelected] = React.useState(null);
  const [requestReady, setRequestReady] = React.useState(false);
  const visibleListings = filter === 'All homes' ? listings : listings.filter(home => home.type === filter);

  return <section className="project-demo-panel" aria-labelledby="website-demo-title">
    <div className="project-demo-heading"><div><span className="project-demo-kicker">PROPERTY WEBSITE PROJECT</span><h2 id="website-demo-title">Explore the property experience</h2><p>Browse the TellaMind-built listing experience, preview property details, and try its tour-request flow. Property information is illustrative.</p></div><label className="listing-filter">Show<select value={filter} onChange={event => { setFilter(event.target.value); setSelected(null); setRequestReady(false); }}><option>All homes</option><option>House</option><option>Townhome</option></select></label></div>
    <div className="listing-demo-grid">{visibleListings.map(home => <article className="listing-demo-card" key={home.name}><div className={`listing-demo-image ${home.style}`}><img src={home.image} alt={home.imageAlt} loading="lazy" decoding="async" fetchPriority="low"/></div><div className="listing-demo-info"><small>{home.area}</small><b>{home.name}</b><span>{home.beds} beds · {home.type}</span><strong>{home.price}</strong><button onClick={() => { setSelected(home); setRequestReady(false); }}>View details <ArrowRight size={14}/></button></div></article>)}</div>
    {selected && <div className="listing-demo-selection" role="status"><div><b>{selected.name}</b><span>Property preview · {selected.area} · {selected.price}</span></div><button onClick={() => setRequestReady(true)}>Preview tour request</button>{requestReady && <p>Tour request preview ready. No information was sent.</p>}</div>}
  </section>;
}

const creatorChecklist = ['50K+ Followers', 'Fulfil views condition', 'Watch hours completed', 'Snapchat Profile details'];

function CreatorDemo() {
  const [checked, setChecked] = React.useState([true, false, false, false]);
  const complete = checked.filter(Boolean).length;
  function toggle(index) {
    setChecked(current => current.map((value, item) => item === index ? !value : value));
  }

  return <section className="project-demo-panel" aria-labelledby="creator-demo-title">
    <div className="project-demo-heading"><div><span className="project-demo-kicker">CREATOR READINESS PROJECT</span><h2 id="creator-demo-title">Prepare a Snapchat Profile</h2><p>Use this planning checklist to organize creator information. It does not confirm official eligibility.</p></div><span className="creator-progress-count">{complete} / {creatorChecklist.length} ready</span></div>
    <div className="creator-demo-checklist">{creatorChecklist.map((item, index) => <label key={item}><input type="checkbox" checked={checked[index]} onChange={() => toggle(index)}/><span>{item}</span><small>{checked[index] ? 'Added' : 'To review'}</small></label>)}</div>
    <p className="creator-demo-disclaimer">Checklist progress is for planning only; these labels are not a statement of Snapchat’s current eligibility rules. Snapchat alone decides Snap Star verification and monetisation access.</p>
  </section>;
}

export function ProjectDemo({ project }) {
  if (project.demoType === 'automation') return <AutomationDemo/>;
  if (project.demoType === 'website') return <WebsiteDemo/>;
  return <CreatorDemo/>;
}
