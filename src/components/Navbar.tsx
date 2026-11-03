import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { asset, nav, profile } from '../data/content';
import { useActiveSection, type Theme } from '../lib/hooks';

const ids = nav.map((n) => n.id);

export function ThemeToggle({ theme, toggle }: { theme: Theme; toggle: () => void }) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-10 w-10 place-items-center border hairline text-fg hover:text-pink-ink hover:border-pink transition-colors"
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
    >
      {dark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
    </button>
  );
}

export default function Navbar({ theme, toggle }: { theme: Theme; toggle: () => void }) {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', esc);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', esc); document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled ? 'bg-bg/85 backdrop-blur-md hairline' : 'border-transparent bg-transparent'}`}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-lime focus:px-3 focus:py-2 focus:text-black">Skip to content</a>
      <nav className="container-x flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <a href="#home" className="group flex items-center gap-2 font-display text-[15px] font-bold tracking-[0.14em]">
          <span className="h-2 w-2 bg-lime group-hover:bg-pink transition-colors" aria-hidden />
          {profile.wordmark}
        </a>

        <ul className="hidden lg:flex items-center gap-1">
          {nav.map((n) => {
            const isActive = active === n.id;
            return (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-3 py-2 font-mono text-[12px] uppercase tracking-[0.12em] transition-colors ${isActive ? 'text-pink-ink' : 'text-muted hover:text-fg'}`}
                >
                  {n.label}
                  {isActive && <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-px bg-pink" />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} toggle={toggle} />
          <a href={asset(profile.resumePdf)} download className="hidden sm:inline-flex btn-lime !py-2.5 !px-4">
            <Download className="h-4 w-4" aria-hidden /> Resume
          </a>
          <button
            type="button"
            className="lg:hidden grid h-10 w-10 place-items-center border hairline"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-x-0 top-16 bottom-0 bg-bg border-t hairline overflow-y-auto"
          >
            <ul className="container-x py-6">
              {nav.map((n, i) => (
                <li key={n.id} className="border-b hairline">
                  <a
                    href={`#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-4 py-4 font-display text-3xl font-bold ${active === n.id ? 'text-pink-ink' : ''}`}
                  >
                    <span className="font-mono text-xs text-lime-ink">0{i + 1}</span>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="container-x pb-10">
              <a href={asset(profile.resumePdf)} download className="btn-lime w-full">
                <Download className="h-4 w-4" aria-hidden /> Download Resume PDF
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
