import React from 'react';

const teamFiles = import.meta.glob('../content/team-members/*.json', {
  eager: true,
  import: 'default',
});

const pagesCmsMembers = Object.entries(teamFiles)
  .map(([filePath, member]) => ({
    ...member,
    id: filePath.split('/').pop().replace(/\.json$/, ''),
  }))
  .filter((member) => member.is_published && member.name && member.role)
  .sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0) || a.name.localeCompare(b.name));

export function TeamMembers() {
  if (!pagesCmsMembers.length) return null;
  return <section className="team-members section-wrap">
    <header><span>MEET THE PEOPLE</span><h2>The people behind <em>the work.</em></h2></header>
    <div className="team-member-grid">{pagesCmsMembers.map((member) => <article className="team-member-card" key={member.id}>
      {member.photo_url ? <img src={member.photo_url} alt={member.name} loading="lazy"/> : <div className="team-member-placeholder" aria-hidden="true">{member.name.slice(0, 1)}</div>}
      <div><h3>{member.name}</h3><span>{member.role}</span><p>{member.bio}</p>{member.experience && <p className="team-member-experience"><b>Experience</b> {member.experience}</p>}</div>
    </article>)}</div>
  </section>;
}
