import { BarChart3, Bot, Database, FileSpreadsheet, LineChart, Sparkles, Terminal } from 'lucide-react';
import { services } from '../data/content';
import { Reveal, SectionHeading } from './ui';

const icons = [LineChart, FileSpreadsheet, Terminal, Database, BarChart3, Sparkles, Bot];

export default function Services() {
  return (
    <section id="services" className="section border-t hairline">
      <div className="container-x">
        <SectionHeading index="07" kicker="Services & technical interests" title={<>Where I can <span className="text-lime-ink">help</span>.</>}
          intro="Developing capabilities I'm practising through projects and coursework — suited to internships, student collaborations and small analysis tasks, not presented as commercial experience." />
        <ul className="grid gap-px bg-fg/10 border hairline sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal as="li" key={s.title} delay={(i % 3) * 0.05} className="group h-full bg-bg/75 p-6 sm:p-7 transition-colors hover:bg-surface/90">
                  <div className="flex items-center justify-between">
                    <Icon className="h-6 w-6 text-lime-ink" strokeWidth={1.5} aria-hidden />
                    <span className="font-mono text-[11px] text-muted">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold group-hover:text-pink-ink transition-colors">{s.title}</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Problem</dt><dd className="mt-0.5 text-fg/90">{s.problem}</dd></div>
                    <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Approach</dt><dd className="mt-0.5 text-fg/90">{s.approach}</dd></div>
                    <div><dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Deliverable</dt><dd className="mt-0.5 text-fg/90">{s.deliverable}</dd></div>
                  </dl>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">{s.tech.map((t) => <li key={t} className="chip">{t}</li>)}</ul>
              </Reveal>
            );
          })}
          <Reveal as="li" className="relative bg-jet p-6 sm:p-8 lg:col-span-2 flex flex-col justify-between gap-6 overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
            <p className="relative label text-lime">Have a dataset or an idea?</p>
            <p className="relative font-display text-3xl sm:text-4xl font-bold leading-tight text-white">Let's explore it <span className="text-pink">together.</span></p>
            <a href="#contact" className="relative btn-pink self-start">Start a conversation</a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
