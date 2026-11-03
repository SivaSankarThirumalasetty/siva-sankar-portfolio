import { ArrowUp } from 'lucide-react';
import { links, nav, profile } from '../data/content';
import { ExtLink, GithubIcon, LinkedinIcon } from './ui';

export default function Footer() {
  return (
    <footer className="glass !rounded-none !border-x-0 !border-b-0">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-display text-2xl font-bold tracking-[0.12em]">{profile.wordmark}<span className="text-lime-ink">.</span></p>
            <p className="mt-3 max-w-sm text-muted">Turning data into insights. Building intelligence with AI.</p>
            <a href={`mailto:${links.email}`} className="mt-5 inline-block font-mono text-sm text-lime-ink hover:text-lime-ink break-all">{links.email}</a>
          </div>
          <nav className="md:col-span-4" aria-label="Footer">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {nav.map((n) => <li key={n.id}><a href={`#${n.id}`} className="text-muted hover:text-lime-ink">{n.label}</a></li>)}
              <li><a href="#resume" className="text-muted hover:text-lime-ink">Resume</a></li>
            </ul>
          </nav>
          <div className="md:col-span-3 flex md:justify-end items-start gap-3">
            <ExtLink href={links.github} className="grid h-11 w-11 place-items-center rounded-full glass hover:text-lime-ink"><GithubIcon className="h-5 w-5" /><span className="sr-only">GitHub</span></ExtLink>
            <ExtLink href={links.linkedin} className="grid h-11 w-11 place-items-center rounded-full glass hover:text-lime-ink"><LinkedinIcon className="h-5 w-5" /><span className="sr-only">LinkedIn</span></ExtLink>
            <a href="#home" className="grid h-11 w-11 place-items-center btn-gold !p-0 !rounded-full" aria-label="Back to top"><ArrowUp className="h-5 w-5" aria-hidden /></a>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t hairline pt-6 font-mono text-[11px] text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Built with React · TypeScript · Tailwind · Recharts</p>
        </div>
      </div>
    </footer>
  );
}
