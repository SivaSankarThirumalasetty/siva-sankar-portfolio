import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { asset } from '../data/content';

/**
 * Fixed, full-viewport background made from the owner's three brand images.
 * The images all sit on black, so they melt into the Jet Black page; the active
 * image cross-fades as the visitor scrolls into a new group of sections.
 *
 *   wordmark → Home, About
 *   poster   → Skills, Projects, Experience
 *   studio   → Certificates … Contact, Footer
 */
type SceneId = 'wordmark' | 'poster' | 'studio';

const sceneFor: Record<string, SceneId> = {
  home: 'wordmark', about: 'wordmark',
  skills: 'poster', projects: 'poster', experience: 'poster',
  certificates: 'studio', lab: 'studio', services: 'studio', journey: 'studio', resume: 'studio', contact: 'studio',
};

export default function ScrollBackdrop() {
  const [scene, setScene] = useState<SceneId>('wordmark');
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  // gentle parallax drift across the whole page
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-3%', '3%']);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.08, 1.0]);

  useEffect(() => {
    const els = Object.keys(sceneFor).map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setScene(sceneFor[e.target.id])),
      { rootMargin: '-50% 0px -50% 0px' }, // the section crossing the vertical centre wins
    );
    els.forEach((el) => obs.observe(el));
    const footer = document.querySelector('footer');
    const fObs = new IntersectionObserver(([e]) => e.isIntersecting && setScene('studio'), { threshold: 0.3 });
    if (footer) fObs.observe(footer);
    return () => { obs.disconnect(); fObs.disconnect(); };
  }, []);

  const layer = (id: SceneId) =>
    `absolute inset-0 transition-opacity duration-[1100ms] ease-out ${scene === id ? 'opacity-100' : 'opacity-0'}`;

  return (
    <div className="backdrop pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        {/* 1 · typographic wordmark */}
        <div className={layer('wordmark')}>
          <picture>
            <source media="(max-width: 767px)" srcSet={asset('images/bg/wordmark-1000.webp')} />
            <img src={asset('images/bg/wordmark-1800.webp')} alt="" decoding="async" fetchPriority="low"
              className="backdrop-img backdrop-wordmark absolute left-1/2 top-[90%] w-[118vw] max-w-none -translate-x-1/2 -translate-y-1/2 md:top-1/2 md:w-[92vw]" />
          </picture>
        </div>
        {/* 2 · brand poster */}
        <div className={layer('poster')}>
          <picture>
            <source media="(max-width: 767px)" srcSet={asset('images/bg/poster-1080.webp')} />
            <img src={asset('images/bg/poster-1920.webp')} alt="" loading="lazy" decoding="async"
              className="backdrop-img h-full w-full object-cover object-[50%_30%]" />
          </picture>
        </div>
        {/* 3 · studio scene */}
        <div className={layer('studio')}>
          <picture>
            <source media="(max-width: 767px)" srcSet={asset('images/bg/studio-1080.webp')} />
            <img src={asset('images/bg/studio-1920.webp')} alt="" loading="lazy" decoding="async"
              className="backdrop-img h-full w-full object-cover object-[58%_35%]" />
          </picture>
        </div>
      </motion.div>
      {/* vignette: keeps edges black and text readable */}
      <div className="backdrop-vignette absolute inset-0" />
    </div>
  );
}
