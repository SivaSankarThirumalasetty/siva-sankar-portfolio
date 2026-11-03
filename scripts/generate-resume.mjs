// Generates public/resume/Siva-Sankar-Resume.pdf from verified information only.
// Run: npm run resume:pdf   (edit the DATA block below, keep it in sync with src/data/content.ts)
import fs from 'node:fs';
import path from 'node:path';
import PDFDocument from 'pdfkit';

const DATA = {
  name: 'THIRUMALASETTY SIVA SANKAR',
  title: 'Aspiring Data Analyst  |  Python Developer  |  AI Enthusiast',
  contact: [
    'sivasankar.t1606@gmail.com', '+91 6302880826', 'Guntur, Andhra Pradesh, India',
  ],
  links: [
    ['GitHub', 'https://github.com/SivaSankarThirumalasetty'],
    ['LinkedIn', 'https://www.linkedin.com/in/siva-sankar-thirumalasetty-2152413a3/'],
  ],
  summary:
    'Computer Science and Data Science student passionate about data analytics, Python programming and artificial intelligence. Completed the CodeAlpha Data Analytics virtual internship with three published projects, and builds practical AI prototypes that turn data into explainable, decision-ready insights.',
  education: {
    degree: 'B.Tech - Computer Science and Data Science (CSD)',
    school: 'KKR & KSR Institute of Technology and Science, Guntur, Andhra Pradesh',
    when: 'Second year  |  Expected graduation 2029',
  },
  experience: [
    {
      head: 'CodeAlpha - Virtual Internship Program in Data Analytics',
      when: '1 June 2026 - 30 June 2026',
      body: 'Completed three analytics projects: web-scraped book-price analysis with DuckDB SQL and non-parametric tests; telecom churn EDA with hypothesis testing and four ML models (best AUC 0.840); airline-tweet sentiment analysis (TF-IDF + Logistic Regression accuracy 0.7706 vs VADER 0.4877).',
    },
  ],
  projects: [
    {
      head: 'DocShield - AI-Based Fake Identity and Document Screening System',
      when: 'Live prototype',
      link: 'https://docshield.sivasankar-t1606.workers.dev/',
      body: 'Advisory screening prototype for SIH 2026 problem statement SIH26188: OCR and field parsing, Verhoeff checksum, ELA tamper heatmap, OpenCV face matching and an explainable 0-100 risk score with an officer dashboard. FastAPI, React, OpenCV, Docker.',
    },
    {
      head: 'Credit Card Fraud Detection',
      when: 'GitHub',
      link: 'https://github.com/SivaSankarThirumalasetty/credit-card-fraud-detection',
      body: 'Isotonic-calibrated XGBoost with threshold optimisation and TreeSHAP explanations, served via FastAPI and Streamlit (README: PR-AUC 0.8749 on a 20% holdout).',
    },
    {
      head: 'Buy or Wait? - HackerRank Orchestrate (Sep 2026)',
      when: 'Rank #1327 / 3,062',
      body: '90-day cash-flow simulation that recommends a safe payment amount and plan with explanations. Python, Flask, pytest, Selenium.',
    },
  ],
  skills: [
    ['Programming', 'Python, SQL (DuckDB), Data Structures in Python, FastAPI, Streamlit, web scraping'],
    ['Data analytics', 'Pandas, NumPy, data cleaning, EDA, statistical testing, matplotlib/seaborn, Excel; Power BI (learning)'],
    ['AI / ML', 'scikit-learn, XGBoost, LightGBM, calibration, SHAP, NLP (NLTK, VADER, TF-IDF), OCR, OpenCV, Google AI Studio'],
    ['Cloud & tools', 'Git & GitHub, Docker, pytest; Google Cloud compute, IAM and speech/language APIs (skill badges)'],
  ],
  certs: [
    'Naukri Campus Young Turks 2026 - Certificate of Merit, 96.35 percentile (19 Oct 2026)',
    'HackerRank Orchestrate, September 2026 - final rank #1327 of 3,062',
    'Develop AI-Powered Prototypes in Google AI Studio - Google Cloud skill badge (22 Oct 2026)',
    'Google Cloud skill badges: Speech & Language Solutions with Pre-trained APIs, Cloud Speech API (28 Oct 2026); Gemini Enterprise Application; Build a Website; Basics of Compute; Service Accounts & IAM',
    'CodeAlpha Virtual Internship in Data Analytics - Certificate of Completion (1 Jul 2026)',
    'Log2Base2: Python (2 Mar 2026); Data Structure (Python) (12 Jan 2026)',
    'Participation: Adobe University Hackathon (9 Aug 2026); QuizOff 2026 AI Quiz (19 Jul 2026)',
  ],
};

const PINK = '#C2006B';   // print-safe shade of Hot Pink
const LIME = '#4E9A06';   // print-safe shade of Chartreuse
const INK = '#111111';
const MUTED = '#555555';

const out = path.resolve('public/resume/Siva-Sankar-Resume.pdf');
fs.mkdirSync(path.dirname(out), { recursive: true });
const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 34, left: 46, right: 46 },
  info: { Title: 'Resume - Thirumalasetty Siva Sankar', Author: 'Thirumalasetty Siva Sankar', Subject: 'Data Analytics, Python & AI' } });
doc.pipe(fs.createWriteStream(out));
const W = doc.page.width - 92;
const X = 46;

// Header band
doc.rect(0, 0, doc.page.width, 6).fill('#000');
doc.rect(0, 6, 140, 3).fill('#FF1493');
doc.rect(140, 6, 50, 3).fill('#7FFF00');
doc.fillColor(INK).font('Helvetica-Bold').fontSize(21).text(DATA.name, X, 30);
doc.fillColor(PINK).font('Helvetica-Bold').fontSize(10.5).text(DATA.title, X, doc.y + 2);
doc.fillColor(MUTED).font('Helvetica').fontSize(9).text(DATA.contact.join('   |   '), X, doc.y + 5);
let y = doc.y + 2;
let lx = X;
for (const [label, url] of DATA.links) {
  const t = `${label}: ${url.replace('https://', '')}`;
  doc.fillColor(INK).fontSize(8.5);
  const tw = doc.widthOfString(t);
  doc.text(t, lx, y, { link: url, width: tw + 2, lineBreak: false });
  lx += tw + 16;
}
doc.y = y + 14;

function section(title) {
  doc.moveDown(0.55);
  const yy = doc.y;
  doc.rect(X, yy + 2, 6, 6).fill(LIME);
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(10).text(title.toUpperCase(), X + 12, yy, { characterSpacing: 1.2 });
  doc.moveTo(X, doc.y + 2).lineTo(X + W, doc.y + 2).lineWidth(0.5).strokeColor('#DDDDDD').stroke();
  doc.moveDown(0.45);
}
function entry(head, when, body, link) {
  const yy = doc.y;
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(9.6).text(head, X, yy, { width: W - 120 });
  const after = doc.y;
  doc.fillColor(PINK).font('Helvetica').fontSize(8.8).text(when, X + W - 118, yy, { width: 118, align: 'right' });
  doc.y = after;
  if (link) doc.fillColor(LIME).fontSize(8.5).text(link.replace('https://', ''), X, doc.y + 1, { link, width: W });
  doc.fillColor('#333').font('Helvetica').fontSize(9).text(body, X, doc.y + 2, { width: W, lineGap: 1.2 });
  doc.moveDown(0.45);
}

section('Professional summary');
doc.fillColor('#333').font('Helvetica').fontSize(9.2).text(DATA.summary, X, doc.y, { width: W, lineGap: 1.5 });

section('Education');
entry(DATA.education.degree, 'Class of 2029', `${DATA.education.school}\n${DATA.education.when}`);

section('Internship experience');
for (const e of DATA.experience) entry(e.head, e.when, e.body);

section('Selected projects');
for (const p of DATA.projects) entry(p.head, p.when, p.body, p.link);

section('Technical skills');
for (const [k, v] of DATA.skills) {
  const yy = doc.y;
  doc.fillColor(INK).font('Helvetica-Bold').fontSize(9).text(k, X, yy, { width: 90 });
  doc.fillColor('#333').font('Helvetica').fontSize(9).text(v, X + 95, yy, { width: W - 95, lineGap: 1 });
  doc.moveDown(0.25);
}

section('Certifications & achievements');
for (const c of DATA.certs) {
  const yy = doc.y;
  doc.rect(X + 1, yy + 3.5, 3, 3).fill(PINK);
  doc.fillColor('#333').font('Helvetica').fontSize(8.9).text(c, X + 10, yy, { width: W - 10, lineGap: 1 });
  doc.moveDown(0.15);
}

doc.end();

console.log(`Resume written to ${out}`);
