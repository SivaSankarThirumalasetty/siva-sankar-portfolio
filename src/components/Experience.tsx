import { ArrowUpRight, Award, Briefcase } from 'lucide-react';
import { experience } from '../data/content';
import { ExtLink, Reveal, SectionHeading } from './ui';

export default function Experience() {
  return (
    <section id="experience" className="section border-t hairline">
      <div className="container-x">
        <SectionHeading index="04" kicker="Experience" title={<>Hands-on <span className="text-lime-ink">exposure</span>.</>}
          intro="Verified programs only. Hackathons and competitions are listed separately under certificates and achievements." />
        <ol className="relative border-l border-fg/15 ml-2 sm:ml-4">
          {experience.map((e) => (
            <Reveal as="li" key={e.org} className="relative pl-8 sm:pl-12 pb-4">
                <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 bg-lime" aria-hidden />
                <p className="font-mono text-sm text-lime-ink">{e.start} — {e.end}</p>
                <div className="card mt-4 p-6 sm:p-8 max-w-3xl">

                  <div className="flex flex-wrap items-center gap-3">
                    <Briefcase className="h-5 w-5 text-pink-ink" aria-hidden />
                    <h3 className="text-2xl font-bold">{e.org}</h3>
                    <span className="chip">{e.type}</span>
                  </div>
                  <p className="mt-2 font-display text-lg text-fg/90">{e.role}</p>
                  <p className="mt-4 text-muted leading-relaxed">{e.description}</p>
                  <p className="label mt-6 text-lime-ink">Internship projects</p>
                  <ul className="mt-2 divide-y divide-fg/10 border-y hairline">
                    {e.projects.map((p) => (
                      <li key={p.url}>
                        <ExtLink href={p.url} className="group flex items-center justify-between gap-3 py-3 text-sm hover:text-lime-ink">
                          <span>{p.title}</span><ArrowUpRight className="h-4 w-4 shrink-0 text-muted group-hover:text-lime-ink" aria-hidden />
                        </ExtLink>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 font-mono text-[11px] text-muted">{e.credential}</p>
                  <a href="#certificates" onClick={() => window.dispatchEvent(new CustomEvent('open-cert', { detail: e.certificateId }))}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline decoration-pink underline-offset-4 hover:text-lime-ink">
                    <Award className="h-4 w-4" aria-hidden /> View internship certificate
                  </a>
                </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
