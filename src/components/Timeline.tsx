import { timeline } from '../data/content';
import { Reveal, SectionHeading } from './ui';

export default function Timeline() {
  const dated = timeline.filter((m) => m.date);
  const undated = timeline.filter((m) => !m.date);
  return (
    <section id="journey" className="section border-t hairline">
      <div className="container-x">
        <SectionHeading index="08" kicker="Learning journey" title={<>Milestones, <span className="text-pink-ink">honestly</span> dated.</>}
          intro="Only confirmed dates appear on the timeline. Achievements without a confirmed date are listed beside it so no order is implied." />
        <div className="grid gap-12 lg:grid-cols-12">
          <ol className="lg:col-span-7 relative border-l border-fg/15 ml-2">
            {dated.map((m, i) => (
              <Reveal as="li" key={m.title} delay={i * 0.04} className="relative pl-8 pb-10 last:pb-0">
                  <span className={`absolute -left-[6px] top-1.5 h-3 w-3 ${m.current ? 'bg-pink ring-4 ring-pink/20' : 'bg-lime'}`} aria-hidden />
                  <p className={`font-mono text-xs uppercase tracking-[0.12em] ${m.current ? 'text-pink-ink' : 'text-lime-ink'}`}>{m.date} · {m.kind}</p>
                  <h3 className="mt-2 text-xl font-bold">{m.title}</h3>
                  <p className="mt-1 text-sm text-muted">{m.detail}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="lg:col-span-5">
            <div className="card p-6">
              <p className="label text-lime-ink">Also completed · dates to be confirmed</p>
              <ul className="mt-4 divide-y divide-fg/10">
                {undated.map((m) => (
                  <li key={m.title} className="py-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{m.kind}</p>
                    <p className="mt-1 font-semibold">{m.title}</p>
                    <p className="mt-1 text-sm text-muted">{m.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
