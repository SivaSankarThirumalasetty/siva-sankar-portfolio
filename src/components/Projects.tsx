import { ArrowUpRight, BookOpen, ExternalLink, FlaskConical } from 'lucide-react';
import { useRef, useState, type PointerEvent, type ReactNode } from 'react';
import { analyticsProjects, links, moreProjects, projects, type Project } from '../data/content';
import { useMediaQuery } from '../lib/hooks';
import Modal from './Modal';
import { ExtLink, GithubIcon, Reveal, SectionHeading, StatusPill } from './ui';

/* ---------- Illustrative previews (drawn UI, not screenshots or real results) ---------- */

function DocShieldPreview() {
  const rows: [string, 'ok' | 'flag' | 'warn'][] = [['MRZ check digits', 'ok'], ['Field consistency', 'ok'], ['ELA compression signal', 'flag'], ['Face match quality', 'warn']];
  return (
    <div className="h-full bg-jet p-4 sm:p-5 font-mono text-[11px] text-white/80">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <span className="text-brandteal">DOCSHIELD // SCREENING CONSOLE</span><span className="text-white/40">advisory</span>
      </div>
      <div className="mt-4 grid grid-cols-5 gap-3">
        <div className="col-span-2 aspect-[3/4] border border-white/15 grid-bg relative">
          <div className="absolute left-2 top-2 h-6 w-5 border border-brandteal/60" />
          <div className="absolute inset-x-2 bottom-2 space-y-1">{[0, 1].map((i) => <div key={i} className="h-1 bg-white/20" />)}</div>
          <div className="absolute right-3 top-8 h-6 w-6 rounded-full bg-brandindigo/40 blur-[6px]" />
        </div>
        <ul className="col-span-3 space-y-2">
          {rows.map(([l, s]) => (
            <li key={l} className="flex items-center justify-between gap-2 border border-white/10 px-2 py-1.5">
              <span className="truncate">{l}</span>
              <span className={s === 'ok' ? 'text-brandteal' : s === 'flag' ? 'text-brandindigo' : 'text-white/50'}>{s === 'ok' ? 'PASS' : s === 'flag' ? 'REVIEW' : 'LOW-Q'}</span>
            </li>
          ))}
          <li className="pt-1 text-white/50">→ manual review recommended</li>
        </ul>
      </div>
    </div>
  );
}

function SentimentPreview() {
  // Real class split after cleaning, as reported in the project README (n = 14,427 per README; shares as printed).
  const d = [{ l: 'Negative', v: 62.7, c: '#A78BFA' }, { l: 'Neutral', v: 21.2, c: '#4B5563' }, { l: 'Positive', v: 16.1, c: '#E8C872' }];
  return (
    <div className="h-full bg-jet p-4 sm:p-5 font-mono text-[11px] text-white/80">
      <div className="flex justify-between border-b border-white/10 pb-3"><span className="text-brandteal">SENTIMENT // CLASS SPLIT</span><span className="text-white/40">real · README</span></div>
      <ul className="mt-5 space-y-4">
        {d.map((x) => (
          <li key={x.l}>
            <div className="flex justify-between"><span>{x.l}</span><span className="text-white">{x.v}%</span></div>
            <div className="mt-1.5 h-3 bg-white/10"><div className="h-full" style={{ width: `${x.v}%`, background: x.c }} /></div>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-white/50">Twitter US Airline Sentiment · 14,427 tweets after cleaning</p>
    </div>
  );
}

function AnalyticsPreview() {
  return (
    <div className="h-full bg-jet p-4 sm:p-5 font-mono text-[11px] text-white/80">
      <div className="flex justify-between border-b border-white/10 pb-3"><span className="text-brandteal">ANALYTICS // CODEALPHA</span><span className="text-white/40">3 repos</span></div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {['clean()', 'explore()', 'report()'].map((t, i) => (
          <div key={t} className={`border px-2 py-3 ${i === 1 ? 'border-brandindigo/60' : 'border-white/15'}`}>
            <span className={i === 1 ? 'text-brandindigo' : 'text-brandteal'}>{t}</span>
            <div className="mt-2 space-y-1">{[70, 45, 85].map((w, j) => <div key={j} className="h-1 bg-white/15" style={{ width: `${w - i * 8}%` }} />)}</div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 240 50" className="mt-4 w-full"><polyline fill="none" stroke="#E8C872" strokeWidth="1.5" points="0,40 30,34 60,38 90,22 120,26 150,14 180,18 210,8 240,12" /></svg>
    </div>
  );
}

const previews: Record<string, () => JSX.Element> = { docshield: DocShieldPreview, sentiment: SentimentPreview, analytics: AnalyticsPreview };

/* ---------- Tilt wrapper (fine pointers only, disabled for reduced motion) ---------- */

function Tilt({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)');
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = fine && !reduce;
  const move = (e: PointerEvent) => {
    if (!enabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  return <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`transition-transform duration-300 ease-out will-change-transform ${className}`}>{children}</div>;
}

const statusTone = (s: Project['status']) => (s === 'Live prototype' || s === 'Completed' ? 'lime' : s === 'In progress' ? 'pink' : 'gray');

function ProjectCard({ p, onOpen, flip }: { p: Project; onOpen: () => void; flip: boolean }) {
  const Preview = previews[p.id];
  return (
    <Tilt>
      <article className="group card grid overflow-hidden lg:grid-cols-12 hover:border-lime/60 transition-colors" aria-labelledby={`${p.id}-title`}>
        <div className={`relative lg:col-span-6 min-h-[240px] border-b lg:border-b-0 hairline ${flip ? 'lg:order-2 lg:border-l' : 'lg:border-r'}`}>
          <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.02]"><Preview /></div>
          {p.id !== 'sentiment' && <span className="absolute right-3 bottom-3 font-mono text-[10px] text-white/40">illustration</span>}
        </div>
        <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-5xl sm:text-6xl font-bold text-fg/10 leading-none">{p.index}</span>
            <StatusPill tone={statusTone(p.status)}>{p.status}</StatusPill>
          </div>
          <p className="label mt-6 text-lime-ink">{p.category}</p>
          <h3 id={`${p.id}-title`} className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight group-hover:text-lime-ink transition-colors">{p.title}</h3>
          <p className="mt-1 text-fg/80 font-display">{p.short}</p>
          <p className="mt-4 text-muted leading-relaxed">{p.description}</p>
          {p.facts && (
            <dl className="mt-5 grid gap-2">
              {p.facts.map((f) => (
                <div key={f.k} className="flex flex-wrap gap-x-3 border-l-2 border-lime pl-3 text-sm">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-lime-ink pt-0.5">{f.k}</dt>
                  <dd className="text-fg/90">{f.v}</dd>
                </div>
              ))}
            </dl>
          )}

          {p.features && (
            <ul className="mt-5 grid gap-1.5 text-sm sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f.label} className="flex items-start gap-2">
                  <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 ${f.state === 'implemented' ? 'bg-lime' : f.state === 'experimental' ? 'bg-pink' : 'border border-muted'}`} aria-hidden />
                  <span>{f.label}<span className="sr-only"> ({f.state})</span></span>
                </li>
              ))}
              <li className="sm:col-span-2 mt-1 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
                <span><span className="inline-block h-1.5 w-1.5 bg-lime mr-1.5" aria-hidden />implemented in prototype</span>
                <span><span className="inline-block h-1.5 w-1.5 bg-pink mr-1.5" aria-hidden />experimental / mock-data signal</span>
              </li>
            </ul>
          )}

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technology stack">
            {p.stack.map((s) => <li key={s} className="chip">{s}</li>)}
          </ul>

          <div className="mt-auto pt-8 flex flex-wrap gap-3">
            {p.liveUrl && <ExtLink href={p.liveUrl} className="btn-lime">View Live Project <ArrowUpRight className="h-4 w-4" aria-hidden /></ExtLink>}
            {p.id === 'sentiment' && <a href="#lab" className="btn-pink"><FlaskConical className="h-4 w-4" aria-hidden /> Explore Analysis</a>}
            <button type="button" onClick={onOpen} className="btn-ghost">
              <BookOpen className="h-4 w-4" aria-hidden /> {p.id === 'docshield' ? 'Read Case Study' : 'View Project Details'}
            </button>
            {p.repoUrl && <ExtLink href={p.repoUrl} className="btn-ghost"><GithubIcon /> View Source Code</ExtLink>}
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export default function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const current = projects.find((p) => p.id === openId);

  return (
    <section id="projects" className="section border-t hairline">
      <div className="container-x">
        <SectionHeading index="03" kicker="Featured projects" title={<>Built to solve <span className="text-pink-ink">real</span><br />problems.</>}
          intro="Each project lists its true status and links to its source. Numbers are quoted from each repository README; drawn previews are labelled as illustrations." />
        <div className="space-y-10">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={0.05}><ProjectCard p={p} flip={i % 2 === 1} onOpen={() => setOpenId(p.id)} /></Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b hairline pb-4">
            <h3 className="font-display text-2xl sm:text-3xl font-bold">More on <span className="text-lime-ink">GitHub</span></h3>
            <ExtLink href={links.github} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] text-muted hover:text-lime-ink"><GithubIcon /> All repositories <ArrowUpRight className="h-3.5 w-3.5" aria-hidden /></ExtLink>
          </div>
          <ul className="mt-6 grid gap-5 md:grid-cols-3">
            {moreProjects.map((m) => (
              <li key={m.title} className="card group flex flex-col p-6 hover:border-lime/60 transition-colors">
                <GithubIcon className="h-5 w-5 text-lime-ink" />
                <h4 className="mt-4 font-display text-xl font-bold group-hover:text-lime-ink transition-colors">{m.title}</h4>
                <p className="mt-3 text-sm text-muted leading-relaxed">{m.blurb}</p>
                {m.note && <p className="mt-3 text-xs text-fg/80 border-l-2 border-pink pl-3">{m.note}</p>}
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">{m.tags.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
                <ExtLink href={m.repoUrl} className="btn-ghost mt-auto !mt-6 self-start"><GithubIcon /> View Source Code</ExtLink>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Modal open={!!current} onClose={() => setOpenId(null)} title={current ? `${current.title} — ${current.id === 'docshield' ? 'Case study' : 'Project details'}` : ''}>
        {current && (
          <div>
            <div className="flex flex-wrap gap-2"><StatusPill tone={statusTone(current.status)}>{current.status}</StatusPill><span className="chip">{current.category}</span></div>
            {current.caseStudy.map((s) => (
              <section key={s.heading} className="mt-8">
                <h3 className="label text-lime-ink">{s.heading}</h3>
                {s.body.map((b, i) => <p key={i} className="mt-3 leading-relaxed text-fg/90">{b}</p>)}
              </section>
            ))}
            {current.id === 'analytics' && analyticsProjects.length > 0 && (
              <section className="mt-8 space-y-6">
                {analyticsProjects.map((a) => (
                  <article key={a.title} className="card p-5">
                    <h3 className="text-xl font-bold">{a.title}</h3>
                    <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tools">{a.tools.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
                    <dl className="mt-4 grid gap-2 text-sm">
                      <div><dt className="label text-lime-ink inline">Problem </dt><dd className="inline text-muted">{a.problem}</dd></div>
                      <div><dt className="label text-lime-ink inline">Dataset </dt><dd className="inline text-muted">{a.dataset}</dd></div>
                      <div><dt className="label text-lime-ink inline">Cleaning </dt><dd className="inline text-muted">{a.cleaning}</dd></div>
                      <div><dt className="label text-lime-ink inline">Methods </dt><dd className="inline text-muted">{a.methods}</dd></div>
                      <div><dt className="label text-lime-ink inline">Limitations </dt><dd className="inline text-muted">{a.limitations}</dd></div>
                    </dl>
                    <p className="label mt-4 text-pink-ink">Key findings (as reported)</p>
                    <ul className="mt-2 list-disc pl-5 text-sm space-y-1">{a.findings.map((f) => <li key={f}>{f}</li>)}</ul>
                    {a.repoUrl && <ExtLink href={a.repoUrl} className="btn-ghost mt-4"><GithubIcon /> View Source Code</ExtLink>}
                  </article>
                ))}
              </section>
            )}
            {current.disclaimer && <p className="mt-8 border-l-2 border-pink pl-4 text-sm text-muted">{current.disclaimer}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              {current.liveUrl && <ExtLink href={current.liveUrl} className="btn-lime">View Live Project <ExternalLink className="h-4 w-4" aria-hidden /></ExtLink>}
              {current.repoUrl && <ExtLink href={current.repoUrl} className="btn-ghost"><GithubIcon /> View Source Code</ExtLink>}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
