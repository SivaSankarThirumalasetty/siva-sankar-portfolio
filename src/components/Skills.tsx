import { AnimatePresence, motion } from 'framer-motion';
import { BarChart3, Brain, ChevronDown, Cloud, Code2 } from 'lucide-react';
import { useState } from 'react';
import { skillGroups, type SkillLevel } from '../data/content';
import { Reveal, SectionHeading } from './ui';

const icons = { prog: Code2, data: BarChart3, ai: Brain, cloud: Cloud } as const;
type Filter = 'all' | SkillLevel;

export default function Skills() {
  const [filter, setFilter] = useState<Filter>('all');
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <section id="skills" className="section border-t hairline">
      <div className="container-x">
        <SectionHeading index="02" kicker="Technical skills" title={<>Tools I <span className="text-lime-ink">use</span>,<br />tools I'm <span className="text-pink-ink">learning</span>.</>}
          intro="No made-up percentages. Each skill is tagged honestly: practised in projects or coursework, or currently being learned. Select a skill to see where it comes from." />

        <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter skills">
          {([['all', 'All skills'], ['practised', 'Practised'], ['learning', 'Currently learning']] as [Filter, string][]).map(([k, l]) => (
            <button key={k} type="button" onClick={() => setFilter(k)} aria-pressed={filter === k}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] border transition-colors ${filter === k ? 'bg-pink text-black border-pink' : 'hairline text-muted hover:text-fg hover:border-pink'}`}>
              {k === 'practised' && <span className="mr-2 inline-block h-2 w-2 bg-lime align-middle" aria-hidden />}
              {k === 'learning' && <span className="mr-2 inline-block h-2 w-2 border border-pink align-middle" aria-hidden />}
              {l}
            </button>
          ))}
        </div>

        <div className="grid gap-px bg-fg/10 md:grid-cols-2 border hairline">
          {skillGroups.map((g, gi) => {
            const Icon = icons[g.id as keyof typeof icons];
            const shown = g.skills.filter((s) => filter === 'all' || s.level === filter);
            return (
              <Reveal key={g.id} delay={gi * 0.05} className="bg-bg/75 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="label text-lime-ink">{g.code} / {g.title}</p>
                  <Icon className="h-5 w-5 text-muted" aria-hidden />
                </div>
                <ul className="mt-6 divide-y divide-fg/10">
                  {shown.length === 0 && <li className="py-3 text-sm text-muted">No skills in this filter.</li>}
                  {shown.map((s) => {
                    const key = g.id + s.name;
                    const open = openKey === key;
                    return (
                      <li key={s.name}>
                        <button type="button" onClick={() => setOpenKey(open ? null : key)} aria-expanded={open}
                          className="group flex w-full items-center gap-3 py-3 text-left">
                          <span className={`h-2 w-2 shrink-0 ${s.level === 'practised' ? 'bg-lime' : 'border border-pink'}`} aria-hidden />
                          <span className="flex-1 font-medium group-hover:text-pink-ink transition-colors">{s.name}</span>
                          <span className={`font-mono text-[10px] uppercase tracking-[0.12em] ${s.level === 'practised' ? 'text-lime-ink' : 'text-pink-ink'}`}>
                            {s.level === 'practised' ? 'practised' : 'learning'}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-muted transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
                        </button>
                        <AnimatePresence initial={false}>
                          {open && (
                            <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-5 text-sm text-muted">
                              <span className="block pb-4"><span className="font-mono text-lime-ink">// </span>{s.note}</span>
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
