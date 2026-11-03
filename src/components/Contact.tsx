import { ArrowUpRight, Globe, Mail, Phone, Send, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { links } from '../data/content';
import { ExtLink, GithubIcon, LinkedinIcon, Reveal } from './ui';

type Fields = { name: string; email: string; subject: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address, e.g. name@example.com.';
  if (f.subject.trim().length < 3) e.subject = 'Please add a short subject.';
  if (f.message.trim().length < 20) e.message = 'Please write a message of at least 20 characters.';
  if (f.message.length > 4000) e.message = 'Message is too long (max 4000 characters).';
  return e;
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="label text-muted">{label} <span className="text-pink-ink" aria-hidden>*</span></label>
      <div className="mt-2">{children}</div>
      {error && <p id={`${id}-err`} className="mt-1.5 text-sm text-pink-ink" role="alert">{error}</p>}
    </div>
  );
}

const inputCls = (bad?: string) =>
  `w-full border bg-transparent px-4 py-3 text-fg placeholder:text-muted/70 focus:outline-none transition-colors ${bad ? 'border-pink' : 'hairline focus:border-lime'}`;

export default function Contact() {
  const [f, setF] = useState<Fields>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error' | 'mailto'>('idle');
  const [honey, setHoney] = useState('');

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF({ ...f, [k]: e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: undefined });
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`cf-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (honey) return; // bot trap
    if (!FORMSPREE_ID) {
      // No backend configured: hand off to the visitor's email app — never pretend it was sent.
      const body = `${f.message}\n\n— ${f.name} (${f.email})`;
      window.location.href = `mailto:${links.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(body)}`;
      setState('mailto');
      return;
    }
    setState('sending');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, _subject: `[Portfolio] ${f.subject}`, _replyto: f.email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setState('sent');
      setF({ name: '', email: '', subject: '', message: '' });
    } catch {
      setState('error');
    }
  };

  const contacts = [
    { icon: Mail, label: 'Email', value: links.email, href: `mailto:${links.email}` },
    { icon: Phone, label: 'Phone', value: links.phone, href: links.phoneHref },
  ];
  const ext = [
    { icon: GithubIcon, label: 'GitHub', value: 'SivaSankarThirumalasetty', href: links.github },
    { icon: LinkedinIcon, label: 'LinkedIn', value: 'siva-sankar-thirumalasetty', href: links.linkedin },
    { icon: ShieldCheck, label: 'DocShield', value: 'Live prototype', href: links.docshield },
    { icon: Globe, label: 'Website', value: 'technaga.com', href: links.technaga },
  ];

  return (
    <section id="contact" className="section border-t hairline overflow-hidden">
      <svg className="pointer-events-none absolute inset-x-0 top-0 h-full w-full opacity-40" aria-hidden preserveAspectRatio="none" viewBox="0 0 1200 600">
        <path d="M0 420 C 200 380, 300 200, 520 260 S 900 120, 1200 160" fill="none" stroke="#FF1493" strokeWidth="1" strokeDasharray="4 8">
          <animate attributeName="stroke-dashoffset" from="0" to="-120" dur="6s" repeatCount="indefinite" />
        </path>
        <path d="M0 500 C 260 460, 420 330, 640 360 S 1000 260, 1200 300" fill="none" stroke="#7FFF00" strokeOpacity=".5" strokeWidth="1" />
      </svg>
      <div className="container-x relative">
        <Reveal>
          <p className="label text-lime-ink flex items-center gap-3"><span className="text-pink-ink">10</span><span className="h-px w-10 bg-pink" aria-hidden />Contact</p>
          <h2 className="mt-4 font-display font-bold uppercase leading-[0.9] tracking-tight text-[clamp(2.4rem,7vw,6rem)]">
            Let's turn ideas<br />into something <span className="text-pink-ink">real.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-muted">I'm open to internship opportunities, data analytics projects, AI experiments, and collaborations that help turn ideas into practical solutions.</p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 space-y-8">
            <ul className="space-y-3">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a href={c.href} className="group flex items-center gap-4 border hairline p-4 hover:border-pink transition-colors">
                    <c.icon className="h-5 w-5 text-lime-ink" aria-hidden />
                    <span><span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{c.label}</span><span className="text-lg font-medium break-all group-hover:text-pink-ink">{c.value}</span></span>
                  </a>
                </li>
              ))}
            </ul>
            <ul className="grid grid-cols-2 gap-3">
              {ext.map((c) => (
                <li key={c.label}>
                  <ExtLink href={c.href} className="group flex h-full flex-col gap-2 border hairline p-4 hover:border-pink transition-colors">
                    <span className="flex items-center justify-between"><c.icon className="h-4 w-4 text-lime-ink" /><ArrowUpRight className="h-4 w-4 text-muted group-hover:text-pink-ink" aria-hidden /></span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{c.label}</span>
                    <span className="text-sm font-medium break-all">{c.value}</span>
                  </ExtLink>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={0.05}>
            <form noValidate onSubmit={submit} className="card p-6 sm:p-8 space-y-5" aria-describedby="form-note">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="cf-name" label="Name" error={errors.name}>
                  <input id="cf-name" name="name" autoComplete="name" value={f.name} onChange={set('name')} className={inputCls(errors.name)} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'cf-name-err' : undefined} />
                </Field>
                <Field id="cf-email" label="Email" error={errors.email}>
                  <input id="cf-email" name="email" type="email" autoComplete="email" value={f.email} onChange={set('email')} className={inputCls(errors.email)} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'cf-email-err' : undefined} />
                </Field>
              </div>
              <Field id="cf-subject" label="Subject" error={errors.subject}>
                <input id="cf-subject" name="subject" value={f.subject} onChange={set('subject')} className={inputCls(errors.subject)} aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'cf-subject-err' : undefined} />
              </Field>
              <Field id="cf-message" label="Message" error={errors.message}>
                <textarea id="cf-message" name="message" rows={5} value={f.message} onChange={set('message')} className={inputCls(errors.message)} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'cf-message-err' : undefined} />
              </Field>
              <div className="hidden" aria-hidden><label>Leave empty<input tabIndex={-1} autoComplete="off" value={honey} onChange={(e) => setHoney(e.target.value)} /></label></div>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button type="submit" disabled={state === 'sending'} className="btn-lime !px-7 !py-4 disabled:opacity-60">
                  <Send className="h-4 w-4" aria-hidden /> {state === 'sending' ? 'Sending…' : FORMSPREE_ID ? 'Send message' : 'Compose email'}
                </button>
                <div aria-live="polite" className="text-sm">
                  {state === 'sent' && <p className="text-lime-ink">Thanks — your message was delivered. I'll reply by email.</p>}
                  {state === 'error' && <p className="text-pink-ink">Sending failed. Please email <a className="underline" href={`mailto:${links.email}`}>{links.email}</a> directly.</p>}
                  {state === 'mailto' && <p className="text-muted">Your email app should open with the message filled in. If it didn't, email <a className="underline" href={`mailto:${links.email}`}>{links.email}</a>.</p>}
                </div>
              </div>
              <p id="form-note" className="font-mono text-[11px] text-muted">
                {FORMSPREE_ID ? 'Submitted securely via Formspree. Your details are only used to reply.' : 'This form opens your email app with the message pre-filled — nothing is sent from this website.'}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
