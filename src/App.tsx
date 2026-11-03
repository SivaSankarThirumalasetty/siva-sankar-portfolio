import { lazy, Suspense } from 'react';
import About from './components/About';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import Projects from './components/Projects';
import Resume from './components/Resume';
import Services from './components/Services';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import { SectionHeading } from './components/ui';
import { useTheme } from './lib/hooks';

// Recharts is the heaviest dependency — load it only when needed.
const DataLab = lazy(() => import('./components/DataLab'));

export default function App() {
  const { theme, toggle } = useTheme();
  return (
    <div className="grain">
      <Navbar theme={theme} toggle={toggle} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certificates />
        <section id="lab" className="section border-t hairline">
          <div className="container-x">
            <SectionHeading index="06" kicker="Data visualization lab" title={<>How I <span className="text-lime-ink">reason</span><br />with charts.</>}
              intro="Real results from the CodeAlpha analytics projects, charted interactively. Every number is quoted from the project's README, with a link to the source." />
            <Suspense fallback={<div className="card grid h-[480px] place-items-center font-mono text-sm text-muted" role="status">Loading charts…</div>}>
              <DataLab theme={theme} />
            </Suspense>
          </div>
        </section>
        <Services />
        <Timeline />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
