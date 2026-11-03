import { Award, Download, ExternalLink, FileWarning, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { asset, certificates, type CertCategory, type Certificate } from '../data/content';
import Modal from './Modal';
import { ExtLink, Reveal, SectionHeading } from './ui';

const cats: ('All' | CertCategory)[] = ['All', 'AI & Generative AI', 'Python & Programming', 'Data Analytics', 'Cloud Computing', 'Hackathons & Competitions', 'Other'];

function Thumb({ c }: { c: Certificate }) {
  if (c.image) {
    return <img src={asset(c.image.replace("previews/", "previews/thumbs/"))} alt={`Certificate: ${c.title}, issued by ${c.issuer}`} loading="lazy" decoding="async"
      className="h-full w-full object-contain bg-black p-2 transition-transform duration-500 group-hover:scale-[1.04]" width={640} height={480} />;
  }
  return (
    <div className="h-full w-full grid-bg bg-jet grid place-items-center p-4 text-center">
      <div>
        <Award className="mx-auto h-8 w-8 text-lime/70" strokeWidth={1.25} aria-hidden />
        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Original file<br />not uploaded yet</p>
      </div>
    </div>
  );
}

export default function Certificates() {
  const [cat, setCat] = useState<(typeof cats)[number]>('All');
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const on = (e: Event) => setOpenId((e as CustomEvent<string>).detail);
    window.addEventListener('open-cert', on);
    return () => window.removeEventListener('open-cert', on);
  }, []);

  const visibleCats = cats.filter((c) => c === 'All' || certificates.some((x) => x.category === c));
  const list = useMemo(() => certificates.filter((c) =>
    (cat === 'All' || c.category === cat) &&
    (c.title + ' ' + c.issuer).toLowerCase().includes(q.trim().toLowerCase())), [cat, q]);
  const current = certificates.find((c) => c.id === openId);

  return (
    <section id="certificates" className="section border-t hairline">
      <div className="container-x">
        <SectionHeading index="05" kicker="Certifications & achievements" title={<>Proof of <span className="text-pink-ink">learning</span>.</>}
          intro={`${certificates.length} original certificates and badges, each read from the source file. Participation is labelled as participation; dates appear only where the document prints one.`} />

        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter certificates by category">
            {visibleCats.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} aria-pressed={cat === c}
                className={`px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] border transition-colors ${cat === c ? 'bg-pink text-black border-pink' : 'hairline text-muted hover:text-fg hover:border-pink'}`}>{c}</button>
            ))}
          </div>
          <label className="relative block lg:w-72">
            <span className="sr-only">Search certificates by title</span>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden />
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by title…"
              className="w-full border hairline bg-transparent py-2.5 pl-9 pr-3 text-sm placeholder:text-muted focus:border-lime focus:outline-none" />
          </label>
        </div>

        <p className="sr-only" aria-live="polite">{list.length} certificates shown</p>
        {list.length === 0 && <p className="text-muted">No certificates match “{q}”.</p>}
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal as="li" key={c.id} delay={(i % 3) * 0.05} className="h-full">
                <button type="button" onClick={() => setOpenId(c.id)}
                  className="group card flex h-full w-full flex-col text-left !border-lime/30 hover:!border-pink transition-colors">
                  <div className="relative aspect-[4/3] overflow-hidden border-b hairline">
                    <Thumb c={c} />
                    <span className="absolute left-0 top-0 h-0.5 w-0 bg-pink transition-all duration-300 group-hover:w-full" aria-hidden />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="label text-lime-ink">{c.kind}</p>
                    <h3 className="mt-2 font-display text-lg font-semibold leading-snug group-hover:text-pink-ink transition-colors">{c.title}</h3>
                    {c.note && <p className="mt-2 text-sm text-muted">{c.note}</p>}
                    <p className="mt-auto pt-4 font-mono text-xs text-muted">{c.issuer}{c.date ? ` · ${c.date}` : ''}</p>
                  </div>
                </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <Modal open={!!current} onClose={() => setOpenId(null)} title={current?.title ?? ''} wide>
        {current && (
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3 border border-lime/30 bg-black">
              {current.image ? (
                <img src={asset(current.image)} alt={`Full certificate: ${current.title}, issued by ${current.issuer}`} className="w-full h-auto object-contain" decoding="async" />
              ) : (
                <div className="grid aspect-[4/3] place-items-center p-8 text-center grid-bg">
                  <div>
                    <FileWarning className="mx-auto h-10 w-10 text-pink" aria-hidden />
                    <p className="mt-3 text-white/80">The original certificate file hasn't been added yet.</p>
                    <p className="mt-1 font-mono text-xs text-white/50">Add it to public/certificates/ and set its path in src/data/content.ts</p>
                  </div>
                </div>
              )}
            </div>
            <div className="lg:col-span-2">
              <dl className="space-y-4 text-sm">
                <div><dt className="label text-lime-ink">Type</dt><dd className="mt-1">{current.kind}</dd></div>
                <div><dt className="label text-lime-ink">Issuer</dt><dd className="mt-1">{current.issuer}</dd></div>
                <div><dt className="label text-lime-ink">Issue date</dt><dd className="mt-1">{current.date ?? 'Not printed on the badge image'}</dd></div>
                <div><dt className="label text-lime-ink">Category</dt><dd className="mt-1">{current.category}</dd></div>
                {current.note && <div><dt className="label text-lime-ink">Note</dt><dd className="mt-1">{current.note}</dd></div>}
                {current.credentialId && <div><dt className="label text-lime-ink">Certificate ID</dt><dd className="mt-1 font-mono text-xs break-all">{current.credentialId}</dd></div>}
              </dl>
              <div className="mt-8 flex flex-col gap-3">
                {current.file || current.image ? (
                  <a href={asset((current.file || current.image)!)} download className="btn-lime"><Download className="h-4 w-4" aria-hidden /> Download Certificate</a>
                ) : (
                  <button type="button" disabled className="btn border hairline text-muted cursor-not-allowed" aria-disabled="true">
                    <Download className="h-4 w-4" aria-hidden /> Download unavailable — file pending
                  </button>
                )}
                {current.verifyUrl && <ExtLink href={current.verifyUrl} className="btn-ghost"><ExternalLink className="h-4 w-4" aria-hidden /> Verify credential</ExtLink>}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
