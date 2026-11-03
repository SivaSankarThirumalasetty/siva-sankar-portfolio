import { GraduationCap, MapPin } from 'lucide-react';
import { profile } from '../data/content';
import { Reveal, SectionHeading } from './ui';

const interests = [
  { k: 'EDU', t: 'Computer Science & Data Science', d: 'B.Tech foundation in programming, statistics and data systems.' },
  { k: 'PY', t: 'Python programming', d: 'The language behind most of my analysis and prototypes.' },
  { k: 'DATA', t: 'Analysis & interpretation', d: 'Cleaning, exploring and explaining what data actually says.' },
  { k: 'AI', t: 'AI-powered applications', d: 'Prototypes like DocShield that combine several AI signals.' },
  { k: 'FIX', t: 'Practical problem-solving', d: 'Projects that start from a real problem, not a tool.' },
  { k: 'LRN', t: 'Continuous learning', d: 'Google Cloud badges, AI Studio and Python certifications.' },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container-x">
        <SectionHeading index="01" kicker="About me" title={<>Curious about data.<br /><span className="text-pink-ink">Serious</span> about building.</>} />
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-xl sm:text-2xl leading-relaxed font-display">
              {profile.bio.split('. ')[0]}.
            </p>
            <p className="mt-6 text-muted leading-relaxed">{profile.bio.split('. ').slice(1).join('. ')}</p>

            <div id="education" className="card mt-10 p-6 sm:p-7 scroll-mt-24">
              <span className="absolute left-0 top-0 h-full w-1 bg-lime" aria-hidden />
              <p className="label text-lime-ink flex items-center gap-2"><GraduationCap className="h-4 w-4" aria-hidden /> Education</p>
              <h3 className="mt-3 text-2xl font-bold">B.Tech — Computer Science and Data Science</h3>
              <p className="mt-2 text-fg/90">{profile.institution}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><MapPin className="h-3.5 w-3.5" aria-hidden /> {profile.location}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <span className="chip">{profile.year}</span>
                <span className="chip !text-pink-ink !border-pink/40">Expected graduation · {profile.graduation}</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:col-span-6" delay={0.1}>
            <ul className="grid sm:grid-cols-2 border-t border-l hairline">
              {interests.map((i) => (
                <li key={i.k} className="group border-b border-r hairline p-5 sm:p-6 transition-colors hover:bg-surface">
                  <span className="font-mono text-[11px] text-lime-ink">[{i.k}]</span>
                  <h3 className="mt-3 font-display text-lg font-semibold group-hover:text-pink-ink transition-colors">{i.t}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{i.d}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
