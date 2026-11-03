import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail, User } from 'lucide-react';
import { asset, links, profile } from '../data/content';
import NodeField from './NodeField';
import { ExtLink, GithubIcon, LinkedinIcon } from './ui';

const line = {
  hidden: { opacity: 0, y: '0.4em' },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

/** Small animated chart: an insight trend line drawing itself. Purely decorative. */
function MiniChart() {
  const bars = [28, 42, 35, 56, 48, 70, 62, 84];
  return (
    <div className="card bg-bg/80 backdrop-blur-sm p-4 w-[210px]" aria-hidden>
      <div className="flex items-center justify-between">
        <span className="label text-lime-ink">signal.stream</span>
        <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
      </div>
      <svg viewBox="0 0 180 70" className="mt-3 w-full">
        {bars.map((b, i) => (
          <motion.rect key={i} x={i * 22 + 2} width="12" y={70 - b * 0.7} height={b * 0.7}
            className={i === bars.length - 1 ? 'fill-pink' : 'fill-fg/15'}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} style={{ originY: 1 }}
            transition={{ delay: 0.8 + i * 0.06, duration: 0.5 }} />
        ))}
        <motion.polyline fill="none" strokeWidth="2" className="stroke-lime"
          points={bars.map((b, i) => `${i * 22 + 8},${70 - b * 0.7 - 6}`).join(' ')}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1.2 }} />
      </svg>
      <p className="mt-2 font-mono text-[10px] text-muted">decorative · not real data</p>
    </div>
  );
}

function Portrait() {
  return (
    <div className="relative mx-auto w-[min(80vw,420px)] aspect-square">
      {/* technical frame around the owner's circular neon-ring portrait */}
      <div className="absolute inset-0 border border-fg/10" aria-hidden />
      <span className="absolute -left-2 -top-2 h-5 w-5 border-l-2 border-t-2 border-pink" aria-hidden />
      <span className="absolute -right-2 -bottom-2 h-5 w-5 border-r-2 border-b-2 border-lime" aria-hidden />
      <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted" aria-hidden>ID · SS-2029</span>
      <span className="absolute right-3 bottom-3 font-mono text-[10px] uppercase tracking-[0.16em] text-lime-ink" aria-hidden>● online</span>
      <div className="absolute inset-[6%] rounded-full overflow-hidden bg-jet">
        {profile.photo ? (
          <picture>
            <source srcSet={asset(profile.photoWebp)} type="image/webp" />
            <img src={asset(profile.photo)} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover" width={800} height={800} fetchPriority="high" decoding="async" />
          </picture>
        ) : (
          <div className="grid h-full w-full place-items-center grid-bg text-center px-6" role="img" aria-label="Profile photo placeholder">
            <User className="mx-auto h-16 w-16 text-lime/60" strokeWidth={1} aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden pt-24 pb-16 sm:pt-28 grid-bg">
      <div className="pointer-events-none absolute left-0 top-1/3 h-px w-1/3 bg-gradient-to-r from-pink to-transparent" aria-hidden />

      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center gap-3">
            <span className="label text-lime-ink">{profile.meta}</span>
            {profile.openToInternships && (
              <span className="chip !text-fg !border-lime/50">
                <span className="relative flex h-2 w-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                </span>
                OPEN TO INTERNSHIP OPPORTUNITIES
              </span>
            )}
          </motion.div>

          <h1 className="mt-6 font-display font-bold uppercase leading-[0.9] tracking-tight text-[clamp(2.5rem,5.4vw,5rem)]">
            {[
              <>Turning <span className="text-pink-ink">data</span></>,
              <>into insights.</>,
              <>Building <span className="text-lime-ink">intelligence</span></>,
              <>with AI.</>,
            ].map((l, i) => (
              <span key={i} className="block overflow-hidden pb-[0.04em]">
                <motion.span className="block" custom={i} variants={line} initial="hidden" animate="show">{l}</motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-7 max-w-xl text-lg text-muted leading-relaxed">
            I'm <strong className="text-fg font-semibold">Siva Sankar</strong>, a Computer Science and Data Science student focused on data analytics, Python development, and AI-powered solutions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-pink">Explore My Projects <ArrowDownRight className="h-4 w-4" aria-hidden /></a>
            <a href={asset(profile.resumePdf)} download className="btn-ghost"><Download className="h-4 w-4" aria-hidden /> Download Resume</a>
            <a href="#contact" className="btn !px-3 text-fg hover:text-pink-ink underline decoration-pink underline-offset-4"><Mail className="h-4 w-4" aria-hidden /> Contact Me</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 flex items-center gap-5 text-muted">
            <ExtLink href={links.github} className="inline-flex items-center gap-2 text-sm hover:text-pink-ink transition-colors"><GithubIcon /> GitHub</ExtLink>
            <ExtLink href={links.linkedin} className="inline-flex items-center gap-2 text-sm hover:text-pink-ink transition-colors"><LinkedinIcon /> LinkedIn</ExtLink>
          </motion.div>
        </div>

        <motion.div className="relative lg:col-span-5" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <NodeField className="absolute -inset-12 h-[calc(100%+6rem)] w-[calc(100%+6rem)] opacity-70" />
          <Portrait />
          <div className="absolute -bottom-10 -left-4 hidden md:block"><MiniChart /></div>
        </motion.div>
      </div>

      <div className="container-x relative mt-16 hidden md:flex items-center gap-4 font-mono text-[11px] uppercase tracking-label text-muted" aria-hidden>
        <span className="h-px flex-1 bg-fg/15" /> scroll to explore <span className="h-px w-16 bg-pink" />
      </div>
    </section>
  );
}
