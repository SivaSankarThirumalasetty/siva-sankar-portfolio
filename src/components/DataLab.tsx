import { ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { Theme } from '../lib/hooks';

/* REAL VALUES quoted from each repository README (checked 3 Nov 2026).
   Values marked "≈" are printed as approximate in the README. */
const GH = 'https://github.com/SivaSankarThirumalasetty/';
const SENT = GH + 'CodeAlpha_Project-3_sentiment-analysis';
const CHURN = GH + 'CodeAlpha_Project2-Exploratory-Data-Analysis-EDA-';
const BOOKS = GH + 'code-alpha-Project1-web-scraping';

const sentimentClasses = [
  { label: 'Negative', tweets: 9178, share: 62.7 },
  { label: 'Neutral', tweets: 3099, share: 21.2 },
  { label: 'Positive', tweets: 2363, share: 16.1 },
];
const sentimentEval = [
  { metric: 'Accuracy', vader: 0.4877, model: 0.7706 },
  { metric: 'Precision (w)', vader: null, model: 0.784 },
  { metric: 'Recall (w)', vader: null, model: 0.7706 },
  { metric: 'F1 (w)', vader: null, model: 0.7754 },
];
const churnDrivers = [
  { label: 'Month-to-month', group: 'Contract', rate: 43 },
  { label: 'One year', group: 'Contract', rate: 11 },
  { label: 'Two year', group: 'Contract', rate: 3 },
  { label: 'Fiber optic', group: 'Internet', rate: 42 },
  { label: 'DSL', group: 'Internet', rate: 19 },
  { label: 'No internet', group: 'Internet', rate: 7 },
];
const churnModels = [
  { model: 'Logistic Reg.', auc: 0.84, recall: 0.866 },
  { model: 'Random Forest', auc: 0.837, recall: 0.866 },
  { model: 'XGBoost', auc: 0.824, recall: 0.834 },
  { model: 'LightGBM', auc: 0.82, recall: 0.836 },
];
const cleaning = [
  { project: 'Airline tweets', before: 14640, after: 14427, removed: 213, why: 'duplicates' },
  { project: 'Telco customers', before: 7043, after: 7032, removed: 11, why: 'blank TotalCharges (tenure 0)' },
  { project: 'Scraped books', before: 1000, after: 999, removed: 1, why: 'duplicate title' },
];

const tabs = [
  { id: 'dist', label: 'Sentiment classes' },
  { id: 'eval', label: 'Baseline vs model' },
  { id: 'churn', label: 'Churn drivers' },
  { id: 'models', label: 'Churn models' },
  { id: 'clean', label: 'Data cleaning' },
] as const;
type TabId = (typeof tabs)[number]['id'];

const info: Record<TabId, { what: string; why: string; src: string; srcLabel: string; approx?: boolean }> = {
  dist: { what: 'Tweets per sentiment class after cleaning (Twitter US Airline Sentiment, February 2015).', why: 'A 62.7% negative majority means plain accuracy can mislead — it motivated class-balanced training and weighted metrics.', src: SENT, srcLabel: 'Sentiment analysis repo' },
  eval: { what: 'VADER (rule-based, no training) vs TF-IDF + Logistic Regression on the same data. The README reports only accuracy for VADER.', why: 'A baseline gives context: the trained model adds about 28 accuracy points, which justifies the extra complexity.', src: SENT, srcLabel: 'Sentiment analysis repo' },
  churn: { what: 'Churn rate by contract type and by internet service in the IBM Telco dataset.', why: 'Short commitments and fiber-without-add-ons concentrate churn — pointing to contract-upgrade and bundle offers rather than blanket discounts.', src: CHURN, srcLabel: 'Telecom churn repo', approx: true },
  models: { what: 'ROC-AUC and churner recall for four classifiers (recall at the README\'s chosen thresholds).', why: 'The simplest model matched or beat the boosted ones — so the interpretable Logistic Regression was preferred.', src: CHURN, srcLabel: 'Telecom churn repo' },
  clean: { what: 'Rows removed during cleaning in each CodeAlpha project, with the reason.', why: 'Logging every removed row keeps analysis reproducible and shows cleaning did not silently discard data.', src: BOOKS, srcLabel: 'Web-scraping repo (and the two above)' },
};

export default function DataLab({ theme }: { theme: Theme }) {
  const [tab, setTab] = useState<TabId>('dist');
  const dark = theme === 'dark';
  const LIME = dark ? '#E8C872' : '#8A6A1F'; // champagne gold (primary series)
  const PINK = dark ? '#A78BFA' : '#6D28D9'; // violet (comparison series)
  const GRAY = dark ? '#475069' : '#A8A29E';
  const GRID = dark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  const LABEL = dark ? '#E5E5E5' : '#222';
  const tip = {
    contentStyle: { background: dark ? 'rgba(17,22,36,.92)' : 'rgba(255,255,255,.95)', border: `1px solid ${dark ? 'rgba(255,255,255,.12)' : 'rgba(0,0,0,.12)'}`, borderRadius: 8, fontFamily: 'JetBrains Mono, monospace', fontSize: 12 },
    labelStyle: { color: dark ? '#fff' : '#000', fontWeight: 600 },
    itemStyle: { color: dark ? '#ddd' : '#222' },
    cursor: { fill: dark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.04)' },
  };
  const anim = { animationDuration: 700 };
  const lbl = { fill: LABEL, fontSize: 11, fontFamily: 'JetBrains Mono, monospace' };
  const cur = info[tab];

  return (
    <div className="card overflow-hidden">
      <div role="tablist" aria-label="Visualizations" className="flex overflow-x-auto border-b hairline">
        {tabs.map((t) => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} type="button"
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => {
              const i = tabs.findIndex((x) => x.id === tab);
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                const n = tabs[(i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length].id;
                setTab(n); document.getElementById(`tab-${n}`)?.focus();
              }
            }}
            tabIndex={tab === t.id ? 0 : -1}
            className={`relative shrink-0 px-5 py-4 font-mono text-xs uppercase tracking-[0.08em] transition-colors ${tab === t.id ? 'text-fg' : 'text-muted hover:text-fg'}`}>
            {t.label}
            {tab === t.id && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-lime" aria-hidden />}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`} className="p-4 sm:p-8">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <span className="chip !text-lime-ink !border-lime/50">● Real project data · as reported in the README{cur.approx ? ' (≈ approximate values)' : ''}</span>
          <a href={cur.src} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[11px] text-muted hover:text-lime-ink">
            Source: {cur.srcLabel} <ExternalLink className="h-3 w-3" aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>

        <div className="h-[320px] sm:h-[380px] w-full" role="img" aria-label={`${tabs.find((t) => t.id === tab)!.label} chart. ${cur.what}`}>
          <ResponsiveContainer width="100%" height="100%">
            {tab === 'dist' ? (
              <BarChart data={sentimentClasses} margin={{ top: 24, left: 8, right: 8 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="label" stroke={GRID} />
                <YAxis stroke={GRID} tickFormatter={(v) => `${v / 1000}k`} />
                <Tooltip {...tip} formatter={(v: number, _n, p) => [`${v.toLocaleString('en-IN')} tweets (${p.payload.share}%)`, 'Count']} />
                <Bar dataKey="tweets" name="Tweets" {...anim}>
                  {sentimentClasses.map((d) => <Cell key={d.label} fill={d.label === 'Negative' ? PINK : d.label === 'Positive' ? LIME : GRAY} />)}
                  <LabelList dataKey="share" position="top" formatter={(v: number) => `${v}%`} style={lbl} />
                </Bar>
              </BarChart>
            ) : tab === 'eval' ? (
              <BarChart data={sentimentEval} margin={{ top: 24, left: 8, right: 8 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="metric" stroke={GRID} />
                <YAxis domain={[0, 1]} stroke={GRID} tickFormatter={(v) => v.toFixed(1)} />
                <Tooltip {...tip} formatter={(v) => (typeof v === "number" ? v.toFixed(4) : "not reported")} />
                <Legend />
                <Bar dataKey="vader" name="VADER baseline" fill={GRAY} {...anim}><LabelList dataKey="vader" position="top" formatter={(v: number | null) => (v == null ? '' : v.toFixed(3))} style={lbl} /></Bar>
                <Bar dataKey="model" name="TF-IDF + Logistic Regression" fill={PINK} {...anim}><LabelList dataKey="model" position="top" formatter={(v: number) => v.toFixed(3)} style={lbl} /></Bar>
              </BarChart>
            ) : tab === 'churn' ? (
              <BarChart data={churnDrivers} layout="vertical" margin={{ left: 8, right: 40 }}>
                <CartesianGrid stroke={GRID} horizontal={false} />
                <XAxis type="number" domain={[0, 50]} stroke={GRID} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="label" width={112} stroke={GRID} />
                <Tooltip {...tip} formatter={(v: number, _n, p) => [`≈ ${v}% churn`, p.payload.group]} />
                <Bar dataKey="rate" name="Churn rate" {...anim}>
                  {churnDrivers.map((d) => <Cell key={d.label} fill={d.group === 'Contract' ? LIME : PINK} />)}
                  <LabelList dataKey="rate" position="right" formatter={(v: number) => `≈${v}%`} style={lbl} />
                </Bar>
              </BarChart>
            ) : tab === 'models' ? (
              <BarChart data={churnModels} margin={{ top: 24, left: 8, right: 8 }}>
                <CartesianGrid stroke={GRID} vertical={false} />
                <XAxis dataKey="model" stroke={GRID} interval={0} tick={{ fontSize: 10 }} />
                <YAxis domain={[0.6, 1]} stroke={GRID} tickFormatter={(v) => v.toFixed(2)} />
                <Tooltip {...tip} formatter={(v: number) => v.toFixed(3)} />
                <Legend />
                <Bar dataKey="auc" name="ROC-AUC" fill={LIME} {...anim}><LabelList dataKey="auc" position="top" formatter={(v: number) => v.toFixed(3)} style={lbl} /></Bar>
                <Bar dataKey="recall" name="Churner recall" fill={PINK} {...anim} />
              </BarChart>
            ) : (
              <BarChart data={cleaning} layout="vertical" margin={{ left: 8, right: 48 }}>
                <CartesianGrid stroke={GRID} horizontal={false} />
                <XAxis type="number" stroke={GRID} />
                <YAxis type="category" dataKey="project" width={112} stroke={GRID} />
                <Tooltip {...tip} formatter={(v: number, _n, p) => [`${v} removed (${p.payload.before.toLocaleString('en-IN')} → ${p.payload.after.toLocaleString('en-IN')}) · ${p.payload.why}`, 'Rows']} />
                <Bar dataKey="removed" name="Rows removed" fill={PINK} {...anim}>
                  <LabelList dataKey="removed" position="right" style={lbl} />
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {tab === 'churn' && (
          <p className="mt-2 flex flex-wrap gap-4 font-mono text-[11px] text-muted">
            <span><span className="inline-block h-2 w-2 mr-1.5" style={{ background: LIME }} aria-hidden />Contract type</span>
            <span><span className="inline-block h-2 w-2 mr-1.5" style={{ background: PINK }} aria-hidden />Internet service</span>
          </p>
        )}

        <div className="mt-6 grid gap-6 border-t hairline pt-6 md:grid-cols-2">
          <div><p className="label text-lime-ink">What it shows</p><p className="mt-2 text-sm text-fg/90 leading-relaxed">{cur.what}</p></div>
          <div><p className="label text-lime-ink">Why it matters</p><p className="mt-2 text-sm text-fg/90 leading-relaxed">{cur.why}</p></div>
        </div>
        <p className="mt-6 text-xs text-muted">
          Colour key: gold and violet only separate series and carry no emotional meaning (grey marks neutral or baseline values). Every series is named in the legend, labels or tooltip.
        </p>
      </div>
    </div>
  );
}
