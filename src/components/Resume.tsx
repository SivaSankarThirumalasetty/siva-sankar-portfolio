import { Download, Eye } from 'lucide-react';
import { asset, certificates, experience, links, profile, projects, skillGroups } from '../data/content';
import { Reveal, SectionHeading } from './ui';

export default function Resume() {
  const pdf = asset(profile.resumePdf);
  return (
    <section id="resume" className="section border-t hairline">
      <div className="container-x">
        <SectionHeading index="09" kicker="Resume" title={<>One page.<br /><span className="text-lime-ink">All verified.</span></>}
          intro="A compact summary built only from verified information. The PDF is generated from the same content as this site." />
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-4 order-2 lg:order-1">
            <div className="flex flex-col gap-3 lg:sticky lg:top-24">
              <a href={pdf} download className="btn-lime !py-4 text-base"><Download className="h-5 w-5" aria-hidden /> Download Resume PDF</a>
              <a href={pdf} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-4"><Eye className="h-5 w-5" aria-hidden /> Preview Resume<span className="sr-only"> (PDF, opens in a new tab)</span></a>
              <p className="mt-2 font-mono text-[11px] text-muted">PDF · 1 page · A4</p>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8 order-1 lg:order-2" delay={0.05}>
            <article className="card p-6 sm:p-10 font-sans text-[15px]" aria-label="Resume preview">
              <span className="absolute right-0 top-0 h-1 w-32 bg-pink" aria-hidden />
              <header className="border-b hairline pb-6">
                <h3 className="text-3xl font-bold">{profile.name}</h3>
                <p className="mt-1 text-pink-ink font-medium">{profile.title}</p>
                <p className="mt-3 font-mono text-xs text-muted break-words">{links.email} · {links.phone} · github.com/SivaSankarThirumalasetty</p>
              </header>
              <div className="grid gap-8 pt-6 md:grid-cols-5">
                <div className="md:col-span-3 space-y-6">
                  <section><h4 className="label text-lime-ink">Summary</h4><p className="mt-2 text-fg/90 leading-relaxed">Second-year B.Tech CSD student focused on data analytics, Python and AI. Completed the CodeAlpha Data Analytics virtual internship with three published projects, and builds AI prototypes such as DocShield (SIH 2026 problem statement).</p></section>
                  <section>
                    <h4 className="label text-lime-ink">Experience</h4>
                    {experience.map((e) => (<div key={e.org} className="mt-2"><p className="font-semibold">{e.org} — {e.role}</p><p className="font-mono text-xs text-muted">{e.start} – {e.end}</p></div>))}
                  </section>
                  <section>
                    <h4 className="label text-lime-ink">Selected projects</h4>
                    <ul className="mt-2 space-y-2">{projects.map((p) => <li key={p.id}><span className="font-semibold">{p.title}</span> <span className="text-muted">— {p.short} ({p.status.toLowerCase()})</span></li>)}</ul>
                  </section>
                </div>
                <div className="md:col-span-2 space-y-6">
                  <section><h4 className="label text-lime-ink">Education</h4><p className="mt-2 font-semibold">B.Tech CSD</p><p className="text-sm text-muted">{profile.institution} · Expected {profile.graduation}</p></section>
                  <section>
                    <h4 className="label text-lime-ink">Skills</h4>
                    <p className="mt-2 text-sm text-fg/90">{skillGroups.flatMap((g) => g.skills.filter((s) => s.level === 'practised').map((s) => s.name)).slice(0, 10).join(' · ')}</p>
                  </section>
                  <section><h4 className="label text-lime-ink">Certifications</h4><p className="mt-2 text-sm text-fg/90">Young Turks 2026 — 96.35 percentile · HackerRank Orchestrate — rank #1327 / 3,062 · {certificates.length} certificates & badges in total.</p></section>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
