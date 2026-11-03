import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function Reveal({ children, delay = 0, className = '', as = 'div' }: { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' }) {
  const M = as === 'li' ? motion.li : motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

export function SectionHeading({ index, kicker, title, intro }: { index: string; kicker: string; title: ReactNode; intro?: ReactNode }) {
  return (
    <Reveal className="mb-12 sm:mb-16 grid gap-6 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <p className="label text-lime-ink flex items-center gap-3">
          <span className="text-muted">{index}</span>
          <span className="h-px w-10 bg-fg/20" aria-hidden />
          {kicker}
        </p>
        <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[0.95] tracking-tight">{title}</h2>
      </div>
      {intro && <p className="lg:col-span-5 text-muted leading-relaxed max-w-prose">{intro}</p>}
    </Reveal>
  );
}

export function StatusPill({ tone, children }: { tone: 'lime' | 'pink' | 'gray'; children: ReactNode }) {
  const dot = tone === 'lime' ? 'bg-lime' : tone === 'pink' ? 'bg-pink' : 'bg-muted';
  const txt = tone === 'lime' ? 'text-lime-ink' : tone === 'pink' ? 'text-pink-ink' : 'text-muted';
  return (
    <span className={`chip ${txt}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} aria-hidden />
      {children}
    </span>
  );
}

export function ExtLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/* Brand icons (Lucide no longer ships brand marks) */
export const GithubIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
export const LinkedinIcon = ({ className = 'h-4 w-4' }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);
