import { ArrowUp } from 'lucide-react';
import { asset, links, nav, profile } from '../data/content';
import { ExtLink, GithubIcon, LinkedinIcon } from './ui';

export default function Footer() {
  return (
    <footer className="border-t hairline bg-bg">
      <div className="container-x pt-14">
        <ul className="grid gap-4 md:grid-cols-2" aria-label="Brand images">
          {profile.banners.map((b) => (
            <li key={b.src} className="group relative overflow-hidden border hairline bg-jet aspect-[16/9]">
              <picture>
                <source srcSet={asset(b.src + '.webp')} type="image/webp" />
                <img src={asset(b.src + '.jpg')} alt={b.alt} loading="lazy" decoding="async" width={1600} height={901}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              </picture>
              <span className="absolute left-0 top-0 h-0.5 w-0 bg-pink transition-all duration-500 group-hover:w-full" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={asset(profile.wordmarkImage)} alt={profile.wordmark} width={900} height={300} loading="lazy" className="h-16 sm:h-20 w-auto rounded-sm bg-jet" />
            <p className="mt-3 max-w-sm text-muted">Turning data into insights. Building intelligence with AI.</p>
            <a href={`mailto:${links.email}`} className="mt-5 inline-block font-mono text-sm text-lime-ink hover:text-pink-ink break-all">{links.email}</a>
          </div>
          <nav className="md:col-span-4" aria-label="Footer">
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {nav.map((n) => <li key={n.id}><a href={`#${n.id}`} className="text-muted hover:text-pink-ink">{n.label}</a></li>)}
              <li><a href="#resume" className="text-muted hover:text-pink-ink">Resume</a></li>
            </ul>
          </nav>
          <div className="md:col-span-3 flex md:justify-end items-start gap-3">
            <ExtLink href={links.github} className="grid h-11 w-11 place-items-center border hairline hover:border-pink hover:text-pink-ink"><GithubIcon className="h-5 w-5" /><span className="sr-only">GitHub</span></ExtLink>
            <ExtLink href={links.linkedin} className="grid h-11 w-11 place-items-center border hairline hover:border-pink hover:text-pink-ink"><LinkedinIcon className="h-5 w-5" /><span className="sr-only">LinkedIn</span></ExtLink>
            <a href="#home" className="grid h-11 w-11 place-items-center bg-lime text-black hover:bg-pink" aria-label="Back to top"><ArrowUp className="h-5 w-5" aria-hidden /></a>
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
