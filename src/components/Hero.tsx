import { motion } from 'framer-motion';
import { ArrowDownRight, Download, Mail, User } from 'lucide-react';
import { asset, links, profile } from '../data/content';
import { ExtLink, GithubIcon, LinkedinIcon } from './ui';

const line = {
  hidden: { opacity: 0, y: '0.4em' },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }),
};

function Portrait() {
  return (
    <div className="relative mx-auto w-[min(76vw,380px)] aspect-square">
      <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-lime via-lime/20 to-pink/60" aria-hidden><div className="h-full w-full rounded-full bg-bg/60 backdrop-blur" /></div>
      <div className="absolute inset-3 rounded-full overflow-hidden bg-jet shadow-2xl shadow-black/20">
        {profile.photo ? (
          <picture>
            <source srcSet={asset(profile.photoWebp)} type="image/webp" />
            <img src={asset(profile.photo)} alt={`Portrait of ${profile.name}`} className="h-full w-full object-cover" width={800} height={800} fetchPriority="high" decoding="async" />
          </picture>
        ) : (
          <div className="grid h-full w-full place-items-center" role="img" aria-label="Profile photo placeholder">
            <User className="h-16 w-16 text-muted" strokeWidth={1} aria-hidden />
          </div>
        )}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[100svh] overflow-hidden pt-24 pb-16 sm:pt-28">

      <div className="container-x relative grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} className="flex flex-wrap items-center gap-3">
            <span className="label text-lime-ink">{profile.meta}</span>
            {profile.openToInternships && (
              <span className="chip glass !text-fg !rounded-full">
                <span className="relative flex h-2 w-2" aria-hidden>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
                </span>
                Open to internship opportunities
              </span>
            )}
          </motion.div>

          <h1 className="mt-6 font-display font-bold leading-[1.02] tracking-tight text-[clamp(2.4rem,5vw,4.6rem)]">
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
            <a href="#contact" className="btn !px-3 text-fg hover:text-lime-ink underline decoration-lime underline-offset-4"><Mail className="h-4 w-4" aria-hidden /> Contact Me</a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 flex items-center gap-5 text-muted">
            <ExtLink href={links.github} className="inline-flex items-center gap-2 text-sm hover:text-lime-ink transition-colors"><GithubIcon /> GitHub</ExtLink>
            <ExtLink href={links.linkedin} className="inline-flex items-center gap-2 text-sm hover:text-lime-ink transition-colors"><LinkedinIcon /> LinkedIn</ExtLink>
          </motion.div>
        </div>

        <motion.div className="relative lg:col-span-5" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
          <Portrait />
        </motion.div>
      </div>

      <div className="container-x relative mt-16 hidden md:flex items-center gap-4 font-mono text-[11px] uppercase tracking-label text-muted" aria-hidden>
        <span className="h-px flex-1 bg-fg/15" /> scroll to explore <span className="h-px w-16 bg-lime" />
      </div>
    </section>
  );
}
