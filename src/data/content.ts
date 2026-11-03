/**
 * ALL portfolio content lives here. Edit this file to update the site.
 *
 * Integrity rule: only publish what is verified. Certificate facts were read from the
 * original files; project facts and numbers come from each repository README
 * (checked 3 Nov 2026) and are labelled "as reported in the README".
 */

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const profile = {
  name: 'Thirumalasetty Siva Sankar',
  shortName: 'Siva Sankar',
  wordmark: 'SIVA SANKAR',
  title: 'Aspiring Data Analyst | Python Developer | AI Enthusiast',
  degree: 'B.Tech — Computer Science and Data Science (CSD)',
  institution: 'KKR & KSR Institute of Technology and Science',
  location: 'Guntur, Andhra Pradesh, India',
  year: 'Second year',
  graduation: 2029,
  meta: 'B.TECH CSD · CLASS OF 2029',
  /** Set to false the moment this stops being true — the hero badge hides automatically. */
  openToInternships: true,
  /** Owner-supplied portrait (circular artwork with neon ring). null = placeholder. */
  photo: 'images/profile.jpg' as string | null,
  photoWebp: 'images/profile.webp',
  wordmarkImage: 'images/wordmark.webp',
  banners: [
    { src: 'images/banner-poster', alt: 'Siva Sankar personal brand poster with the words Student, Developer, Data Analyst (aim), Problem Solver, Creator' },
    { src: 'images/banner-studio', alt: 'Siva Sankar in a black suit in a hot-pink and chartreuse studio scene' },
  ],
  bio: 'I am a Computer Science and Data Science student passionate about data analytics, Python programming, and artificial intelligence. I enjoy building practical projects that solve real-world problems, transforming data into meaningful insights, and exploring AI-powered solutions. My goal is to become a skilled Data Analyst while developing strong technical expertise in Python, data visualization, and intelligent applications.',
  resumePdf: 'resume/Siva-Sankar-Resume.pdf',
};

export const links = {
  email: 'sivasankar.t1606@gmail.com',
  phone: '+91 6302880826',
  phoneHref: 'tel:+916302880826',
  github: 'https://github.com/SivaSankarThirumalasetty',
  linkedin: 'https://www.linkedin.com/in/siva-sankar-thirumalasetty-2152413a3/',
  docshield: 'https://docshield.sivasankar-t1606.workers.dev/',
  technaga: 'https://technaga.com/',
};

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' },
];

/* ------------------------------------------------------------------ SKILLS */

export type SkillLevel = 'practised' | 'learning';
export interface Skill { name: string; level: SkillLevel; note: string }
export interface SkillGroup { id: string; code: string; title: string; skills: Skill[] }

export const skillGroups: SkillGroup[] = [
  {
    id: 'prog', code: '01', title: 'Programming & Development',
    skills: [
      { name: 'Python', level: 'practised', note: 'Used across every public repository: analysis pipelines, APIs and dashboards.' },
      { name: 'SQL', level: 'practised', note: 'DuckDB queries in the web-scraping price analysis and the telecom churn project.' },
      { name: 'Data Structures & Algorithms (Python)', level: 'practised', note: 'Log2Base2 "Data Structure (Python)" course completed 12 Jan 2026.' },
      { name: 'FastAPI & Streamlit', level: 'practised', note: 'FastAPI back-ends in DocShield and the fraud-detection API; Streamlit dashboards in the sentiment and fraud projects.' },
      { name: 'Web scraping', level: 'practised', note: 'requests + BeautifulSoup4 to collect 1,000 book records (CodeAlpha Project 1).' },
    ],
  },
  {
    id: 'data', code: '02', title: 'Data Analytics',
    skills: [
      { name: 'Pandas & NumPy', level: 'practised', note: 'Loading, cleaning, reshaping and aggregating data in all analytics repos.' },
      { name: 'Data cleaning & preprocessing', level: 'practised', note: 'Duplicate removal, type coercion, blank-value handling and text normalisation — documented in each README.' },
      { name: 'Exploratory data analysis', level: 'practised', note: 'Telecom churn EDA with 16 EDA charts; book-price distribution analysis.' },
      { name: 'Statistical testing', level: 'practised', note: 'Spearman, Kruskal-Wallis, Chi-Square and Mann-Whitney U with effect sizes (Cramér\'s V, Cohen\'s d).' },
      { name: 'Data visualization', level: 'practised', note: 'matplotlib / seaborn charts, word clouds, ROC curves and confusion matrices.' },
      { name: 'Reporting & interpretation', level: 'practised', note: 'Business findings and stated limitations written up in every analytics README.' },
      { name: 'Microsoft Excel', level: 'practised', note: 'Formulas, pivot tables and quick summaries.' },
      { name: 'Power BI', level: 'learning', note: 'Building report pages and visuals from cleaned data models.' },
    ],
  },
  {
    id: 'ai', code: '03', title: 'AI & Machine Learning',
    skills: [
      { name: 'Machine learning (scikit-learn, XGBoost, LightGBM)', level: 'practised', note: 'Classification models compared on AUC / PR-AUC in the churn and fraud-detection projects.' },
      { name: 'Model calibration & explainability', level: 'practised', note: 'Isotonic calibration and TreeSHAP in the credit-card fraud project.' },
      { name: 'Sentiment analysis & NLP', level: 'practised', note: 'NLTK preprocessing, VADER, TF-IDF + Logistic Regression and NRC emotion lexicon (CodeAlpha Project 3).' },
      { name: 'OCR & document analysis', level: 'practised', note: 'OCR, field parsing, Verhoeff checksum and ELA tamper analysis in DocShield.' },
      { name: 'Computer vision (OpenCV)', level: 'practised', note: 'OpenCV DNN SSD face detection and embedding-based face matching in DocShield.' },
      { name: 'Google AI Studio & Gemini', level: 'practised', note: 'Google Cloud skill badges: AI Studio prototypes (22 Oct 2026) and first Gemini Enterprise application.' },
      { name: 'LLM-assisted applications', level: 'learning', note: 'OpenRouter-generated narrative insights over locally computed analytics (Aivara repository).' },
    ],
  },
  {
    id: 'cloud', code: '04', title: 'Cloud & Developer Tools',
    skills: [
      { name: 'Git & GitHub', level: 'practised', note: 'Seven public repositories with READMEs and MIT licences.' },
      { name: 'Docker & deployment', level: 'practised', note: 'Dockerfiles plus Render / Railway configs; DocShield prototype live on Cloudflare Workers.' },
      { name: 'Testing (pytest)', level: 'practised', note: 'pytest suites in the Buy-or-Wait and fraud-detection projects.' },
      { name: 'Google Cloud fundamentals', level: 'learning', note: 'Skill badges: Build a Website on Google Cloud, The Basics of Google Cloud Compute.' },
      { name: 'Cloud IAM & service accounts', level: 'learning', note: 'Skill badge: Configure Service Accounts and IAM roles for Google Cloud.' },
      { name: 'Speech & language APIs', level: 'learning', note: 'Skill badges earned 28 Oct 2026: Speech & Language pre-trained APIs; Google Cloud Speech API.' },
    ],
  },
];

/* ---------------------------------------------------------------- PROJECTS */

export type Status = 'Live prototype' | 'Completed' | 'In progress' | 'Details pending';
export interface Feature { label: string; state: 'implemented' | 'experimental' | 'proposed' }
export interface Project {
  id: string;
  index: string;
  title: string;
  short: string;
  category: string;
  status: Status;
  description: string;
  stack: string[];
  features?: Feature[];
  /** Small verified facts shown on the card, e.g. dataset size. */
  facts?: { k: string; v: string }[];
  liveUrl?: string;
  repoUrl?: string;
  caseStudy: { heading: string; body: string[] }[];
  disclaimer?: string;
}

export const projects: Project[] = [
  {
    id: 'docshield',
    index: '01',
    title: 'DocShield',
    short: 'AI-Based Fake Identity and Document Screening System',
    category: 'AI · Computer Vision · Document Forensics',
    status: 'Live prototype',
    description:
      'DocShield is an AI-assisted document-screening project designed to help identify suspicious identity documents by combining multiple verification signals, including OCR, document-field extraction, image analysis, face verification, and risk assessment.',
    stack: ['Python', 'FastAPI', 'Pydantic', 'OpenCV DNN', 'OCR', 'React + Vite', 'Docker'],
    features: [
      { label: 'OCR with word / character bounding boxes', state: 'implemented' },
      { label: 'Classification: Aadhaar, Passport, PAN, Voter ID', state: 'implemented' },
      { label: 'Field parsing incl. MRZ; Verhoeff checksum for Aadhaar', state: 'implemented' },
      { label: 'Error Level Analysis tamper heatmap', state: 'experimental' },
      { label: 'Face detection + 1:1 embedding match', state: 'experimental' },
      { label: '0–100 risk score with readable reasons', state: 'implemented' },
      { label: 'Registry / watchlist lookups (mock data)', state: 'experimental' },
      { label: 'Officer dashboard, cases & audit history', state: 'implemented' },
    ],
    facts: [{ k: 'Context', v: 'Smart India Hackathon 2026 · problem statement SIH26188' }],
    liveUrl: links.docshield,
    repoUrl: 'https://github.com/SivaSankarThirumalasetty/DocShield',
    caseStudy: [
      { heading: 'Problem', body: ['Smart India Hackathon 2026 problem statement SIH26188 (Ministry of Home Affairs · Sashastra Seema Bal) concerns screening identity and travel documents at border and immigration checkpoints. Manual checks are slow and inconsistent; officers benefit from several independent signals in one place, each explained, rather than one opaque score.'] },
      { heading: 'Pipeline', body: [
        'Preprocessing (deskew, binarisation, contrast) → document classification → OCR → field parsing → validation and checksums (Verhoeff for 12-digit Aadhaar, format regex, date checks) → registry check against mock data → in-memory Error Level Analysis → OpenCV DNN SSD face detection with 128-d embedding match → multi-factor risk score (0–100, LOW / MEDIUM / HIGH) → explainable reasons → officer dashboard.',
      ] },
      { heading: 'Architecture', body: ['FastAPI back-end with Pydantic schemas exposing /api/analyze-document, /api/verify-face and case endpoints; React + Vite officer dashboard; Docker, Render and Railway configs. The public demo runs on Cloudflare Workers.'] },
      { heading: 'Limitations', body: [
        'An advisory prototype for learning and demonstration. It does not definitively identify fraudulent documents and must not replace trained human verification.',
        'Registry, stolen-ID and watchlist lookups use simulated JSON data, not real government records. ELA and face-matching signals are sensitive to image quality and compression. The README reports no accuracy metrics, so none are claimed here.',
      ] },
      { heading: 'Credits', body: ['The README credits open-source references: document-forger (MIT), idcard-face-match (MIT) and FakeImageDetector / AWS document-tampering references (MIT-0 / MIT).'] },
    ],
    disclaimer: 'Advisory prototype built around SIH 2026 problem statement SIH26188 — the README does not state a submission or selection outcome, so none is claimed. Not a substitute for human verification.',
  },
  {
    id: 'sentiment',
    index: '02',
    title: 'Sentiment Intelligence',
    short: 'Twitter Airline Sentiment & Emotion Analysis',
    category: 'NLP · Classification · Visualization',
    status: 'Completed',
    description:
      'A sentiment analysis project exploring public opinion in airline tweets using natural language processing, sentiment classification, and emotion-analysis techniques — comparing a rule-based baseline with a trained classifier.',
    stack: ['Python', 'NLTK', 'VADER', 'TF-IDF', 'Logistic Regression', 'NRC Emotion Lexicon', 'Streamlit'],
    facts: [
      { k: 'Dataset', v: 'Twitter US Airline Sentiment · 14,427 tweets after cleaning' },
      { k: 'Best model', v: 'TF-IDF + LogReg · accuracy 0.7706 vs VADER 0.4877' },
    ],
    repoUrl: 'https://github.com/SivaSankarThirumalasetty/CodeAlpha_Project-3_sentiment-analysis',
    caseStudy: [
      { heading: 'Problem', body: ['Classify airline tweets as positive, neutral or negative, detect the emotions underneath, and turn the results into actions an airline brand team could take.'] },
      { heading: 'Dataset', body: ['Twitter US Airline Sentiment (Kaggle; Hugging Face mirror), February 2015. 14,640 raw tweets → 14,427 after removing 213 duplicates. Class split after cleaning: Negative 9,178 (62.7%), Neutral 3,099 (21.2%), Positive 2,363 (16.1%).'] },
      { heading: 'Method', body: [
        'Preprocessing: lower-casing; URL, HTML, punctuation and number removal; NLTK tokenisation, stop-word removal and WordNet lemmatisation.',
        'VADER compound score (±0.05 thresholds) as a no-training baseline → TF-IDF (20,000 features, 1–2-grams, fit on training data only) + class-balanced Logistic Regression on an 80/20 stratified split (11,541 / 2,886) → NRC Emotion Lexicon for Joy, Anger, Sadness, Fear, Surprise and Trust.',
      ] },
      { heading: 'Results (as reported in the README)', body: ['VADER accuracy 0.4877. TF-IDF + Logistic Regression: accuracy 0.7706, weighted precision 0.7840, weighted recall 0.7706, weighted F1 0.7754. Anger and Sadness dominate, linked to cancellations and delays; complaints centre on operational failures rather than pricing.'] },
      { heading: 'Limitations', body: ['No sarcasm detection; trained on airline tweets only; the NRC lexicon covers slang poorly; class imbalance weakens neutral / positive recall; data covers a single month.'] },
    ],
  },
  {
    id: 'analytics',
    index: '03',
    title: 'Data Analytics Portfolio',
    short: 'CodeAlpha internship projects — scraping, EDA and statistics',
    category: 'EDA · Cleaning · Hypothesis testing · Reporting',
    status: 'Completed',
    description:
      'A collection of analytics projects focused on data preparation, exploratory analysis, trend identification, visualization, and communicating meaningful findings.',
    stack: ['Python', 'Pandas', 'DuckDB SQL', 'SciPy', 'statsmodels', 'scikit-learn', 'seaborn'],
    facts: [
      { k: 'Project 1', v: 'Retail price intelligence · 999 books scraped & analysed' },
      { k: 'Project 2', v: 'Telecom churn · 7,032 customers · best AUC 0.840' },
    ],
    caseStudy: [
      { heading: 'Overview', body: ['Projects published under the CodeAlpha Data Analytics virtual internship (June 2026). Each entry below follows the same structure: problem, dataset, cleaning, methods, findings and limitations, with a link to the repository. Figures are quoted from each README.'] },
    ],
  },
];

/** Verified analytics case studies; each renders inside the Data Analytics Portfolio dialog. */
export const analyticsProjects: {
  title: string; problem: string; dataset: string; tools: string[]; cleaning: string;
  methods: string; findings: string[]; limitations: string; repoUrl?: string;
}[] = [
  {
    title: 'Project 1 — Retail Price Intelligence (web scraping)',
    problem: 'Does a book\'s star rating affect its price?',
    dataset: 'Scraped from books.toscrape.com (a public sandbox site): 1,000 rows → 999 after cleaning, 50 categories; title, category, rating, price (GBP).',
    tools: ['requests', 'BeautifulSoup4', 'pandas', 'SciPy', 'DuckDB', 'matplotlib', 'seaborn'],
    cleaning: 'Removed one duplicate title (exported for audit), mapped word ratings to integers with validation, added price buckets.',
    methods: 'Spearman rank correlation (price not normally distributed), Kruskal-Wallis across rating groups, category medians and price-tier breakdowns; SQL in DuckDB.',
    findings: [
      'Rating and price are essentially unrelated: Spearman ρ = 0.0296 (p = 0.3505); Kruskal-Wallis H = 1.5736 (p = 0.8135).',
      'Median price £36.00, mean £35.07; category — not rating — is the main price driver.',
      '52% of books fall in the high tier (> £35) and 20% in the low tier (< £20).',
    ],
    limitations: 'Prices on the sandbox site are synthetic and fixed; single scrape (no price drift); some categories have only 1–2 books.',
    repoUrl: 'https://github.com/SivaSankarThirumalasetty/code-alpha-Project1-web-scraping',
  },
  {
    title: 'Project 2 — Telecom Customer Churn Analysis (EDA)',
    problem: 'Which customers are at risk of churning, why, and what actions could reduce churn?',
    dataset: 'IBM Telco Customer Churn (Kaggle, CC0; synthetic regeneration of the public dataset): 7,043 rows, 21 features → 7,032 after cleaning.',
    tools: ['pandas', 'SciPy', 'statsmodels', 'scikit-learn', 'XGBoost', 'LightGBM', 'DuckDB', 'seaborn'],
    cleaning: 'Detected blank TotalCharges, coerced types, checked duplicates, removed 11 tenure-0 rows with blank charges.',
    methods: 'Chi-Square, Mann-Whitney U and Kruskal-Wallis tests with Cramér\'s V / Cohen\'s d; 8 engineered features; Logistic Regression, Random Forest, XGBoost and LightGBM compared on AUC and recall.',
    findings: [
      'Overall churn ≈ 35.6%. Month-to-month contracts churn ≈ 43% vs ≈ 11% (one-year) and ≈ 3% (two-year).',
      'Fiber-optic customers churn ≈ 42% vs ≈ 19% DSL; electronic-check payers ≈ 45% vs 15–17% on auto-pay.',
      'Best model: Logistic Regression, AUC 0.840, 87% churner recall at a 0.35 threshold.',
    ],
    limitations: 'Synthetic regeneration of a public dataset, so findings illustrate method rather than a real operator. Future work listed: SHAP, survival analysis, cost-sensitive thresholds.',
    repoUrl: 'https://github.com/SivaSankarThirumalasetty/CodeAlpha_Project2-Exploratory-Data-Analysis-EDA-',
  },
  {
    title: 'Project 3 — Twitter Airline Sentiment Analysis',
    problem: 'Classify airline tweets by sentiment and emotion — presented in full as Sentiment Intelligence above.',
    dataset: 'Twitter US Airline Sentiment: 14,640 → 14,427 tweets.',
    tools: ['NLTK', 'VADER', 'scikit-learn', 'Streamlit'],
    cleaning: 'Duplicate removal, text normalisation, tokenisation, stop-words, lemmatisation.',
    methods: 'VADER baseline vs TF-IDF + Logistic Regression; NRC emotion lexicon.',
    findings: ['TF-IDF + Logistic Regression accuracy 0.7706 vs VADER 0.4877.'],
    limitations: 'Sarcasm, single domain, single month.',
    repoUrl: 'https://github.com/SivaSankarThirumalasetty/CodeAlpha_Project-3_sentiment-analysis',
  },
];

/** Other public repositories — shown compactly under the featured projects. */
export const moreProjects: { title: string; blurb: string; tags: string[]; repoUrl: string; note?: string }[] = [
  {
    title: 'Credit Card Fraud Detection',
    blurb: 'Calibrated XGBoost fraud model with threshold optimisation, TreeSHAP explanations, a FastAPI service and a Streamlit dashboard. README reports PR-AUC 0.8749 and recall 83.67% at a 0.26 threshold on a 20% holdout (284,807 transactions, 0.173% fraud).',
    tags: ['XGBoost', 'Isotonic calibration', 'SHAP', 'FastAPI', 'Streamlit', 'Docker'],
    repoUrl: 'https://github.com/SivaSankarThirumalasetty/credit-card-fraud-detection',
    note: 'No live deployment claimed in the README.',
  },
  {
    title: 'Buy or Wait? — HackerRank Orchestrate',
    blurb: 'Affordability engine that simulates 90 days of cash flow and recommends how much is safe to pay, a payment plan and an explanation. Final arithmetic is deterministic (Decimal); README reports 250/250 evaluation requests passing validation.',
    tags: ['Python', 'Flask', 'Chart.js', 'pytest', 'Selenium'],
    repoUrl: 'https://github.com/SivaSankarThirumalasetty/HACKERRANK_Buy_or_Wait',
    note: 'Built for HackerRank Orchestrate, September 2026 (final rank #1327 of 3,062).',
  },
  {
    title: 'Aivara',
    blurb: 'Locally hosted Streamlit app: upload a CSV, auto-classify columns, compute KPIs, trends and anomaly flags with pandas, and generate short, budget-capped LLM narrative insights via OpenRouter. Exports the dashboard to PPTX.',
    tags: ['Streamlit', 'pandas', 'OpenRouter LLM', 'Docker', 'pytest'],
    repoUrl: 'https://github.com/SivaSankarThirumalasetty/Aivara-main-siva_sankar',
  },
];

/* -------------------------------------------------------------- EXPERIENCE */

export const experience = [
  {
    org: 'CodeAlpha',
    role: 'Virtual Internship Program — Data Analytics',
    start: '1 June 2026',
    end: '30 June 2026',
    type: 'Virtual internship program',
    description:
      'Participated in the CodeAlpha Virtual Internship Program in Data Analytics, gaining practical exposure to analytics workflows and project-based learning.',
    projects: [
      { title: 'Retail price intelligence (web scraping + SQL)', url: 'https://github.com/SivaSankarThirumalasetty/code-alpha-Project1-web-scraping' },
      { title: 'Telecom customer churn EDA', url: 'https://github.com/SivaSankarThirumalasetty/CodeAlpha_Project2-Exploratory-Data-Analysis-EDA-' },
      { title: 'Twitter airline sentiment analysis', url: 'https://github.com/SivaSankarThirumalasetty/CodeAlpha_Project-3_sentiment-analysis' },
    ],
    credential: 'Certificate of Completion · issued 1 July 2026 · Student ID CA/DF1/97673',
    certificateId: 'codealpha',
  },
];

/* ------------------------------------------------------------ CERTIFICATES */

export type CertCategory =
  | 'AI & Generative AI' | 'Python & Programming' | 'Data Analytics'
  | 'Cloud Computing' | 'Hackathons & Competitions' | 'Other';

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  /** Exact date as printed on the certificate, or null if the file shows none. */
  date: string | null;
  kind: 'Certificate' | 'Skill badge' | 'Participation' | 'Achievement' | 'Recognition';
  category: CertCategory;
  /** Display image (optimised copy under public/). */
  image: string | null;
  /** Original file for download. */
  file: string | null;
  verifyUrl: string | null;
  credentialId?: string;
  note?: string;
}

const C = 'certificates/';
const V = 'certificates/previews/';

export const certificates: Certificate[] = [
  { id: 'young-turks', title: 'Naukri Campus Young Turks 2026 — Certificate of Merit', issuer: 'Naukri Campus (presented by HCLTech)', date: '19 October 2026', kind: 'Recognition', category: 'Hackathons & Competitions', image: V + 'young-turks-2026.jpg', file: C + 'young-turks-2026.pdf', verifyUrl: null, credentialId: '6acf4a3f4e85f92659e63b5d', note: 'Scored in the 96.35 percentile in India\'s largest skill contest.' },
  { id: 'ai-studio', title: 'Develop AI-Powered Prototypes in Google AI Studio', issuer: 'Google Cloud', date: '22 October 2026', kind: 'Skill badge', category: 'AI & Generative AI', image: V + 'google-ai-studio-prototypes.jpg', file: C + 'google-ai-studio-prototypes.pdf', verifyUrl: 'https://www.credly.com/go/U1c3tmSj' },
  { id: 'hackerrank', title: 'HackerRank Orchestrate — September 2026', issuer: 'HackerRank', date: 'September 2026', kind: 'Achievement', category: 'Hackathons & Competitions', image: V + 'hackerrank-orchestrate-sep-2026.jpg', file: C + 'hackerrank-orchestrate-sep-2026.png', verifyUrl: null, note: 'Certificate of achievement for participating by building and deploying an AI agent. Final rank #1327 of 3,062.' },
  { id: 'codealpha', title: 'CodeAlpha Virtual Internship Program in Data Analytics', issuer: 'CodeAlpha', date: '1 July 2026', kind: 'Certificate', category: 'Data Analytics', image: V + 'codealpha-data-analytics.jpg', file: C + 'codealpha-data-analytics.pdf', verifyUrl: null, credentialId: 'CA/DF1/97673', note: 'Certificate of Completion · program 1 June – 30 June 2026.' },
  { id: 'adobe-hackathon', title: 'Adobe University Hackathon', issuer: 'Adobe (via Unstop)', date: '9 August 2026', kind: 'Participation', category: 'Hackathons & Competitions', image: V + 'adobe-university-hackathon.jpg', file: C + 'adobe-university-hackathon.pdf', verifyUrl: null, note: 'Certificate of Participation.' },
  { id: 'quizoff', title: 'QuizOff 2026 — India\'s Biggest AI Quiz', issuer: 'CampusCrew (hosted on Unstop)', date: '19 July 2026', kind: 'Participation', category: 'AI & Generative AI', image: V + 'quizoff-2026.jpg', file: C + 'quizoff-2026.png', verifyUrl: null, note: 'Recognises participation among the students who competed.' },
  { id: 'speech-lang', title: 'Implement Speech and Language Solutions with Pre-trained APIs', issuer: 'Google Cloud', date: '28 October 2026', kind: 'Skill badge', category: 'AI & Generative AI', image: V + 'speech-language-pretrained-apis.jpg', file: C + 'speech-language-pretrained-apis.jpg', verifyUrl: null, note: 'Artificial Intelligence · Introductory.' },
  { id: 'speech-api', title: 'Using the Google Cloud Speech API', issuer: 'Google Cloud', date: '28 October 2026', kind: 'Skill badge', category: 'AI & Generative AI', image: V + 'google-cloud-speech-api.jpg', file: C + 'google-cloud-speech-api.jpg', verifyUrl: null, note: 'Machine Learning & AI · Introductory.' },
  { id: 'gemini-ent', title: 'Create Your First Gemini Enterprise Application', issuer: 'Google Cloud', date: null, kind: 'Skill badge', category: 'AI & Generative AI', image: V + 'gemini-enterprise-application.jpg', file: C + 'gemini-enterprise-application.jpg', verifyUrl: null, note: 'Artificial Intelligence · Introductory.' },
  { id: 'gc-website', title: 'Build a Website on Google Cloud', issuer: 'Google Cloud', date: null, kind: 'Skill badge', category: 'Cloud Computing', image: V + 'build-website-google-cloud.jpg', file: C + 'build-website-google-cloud.jpg', verifyUrl: null, note: 'Infrastructure Modernization · Introductory.' },
  { id: 'gc-compute', title: 'The Basics of Google Cloud Compute', issuer: 'Google Cloud', date: null, kind: 'Skill badge', category: 'Cloud Computing', image: V + 'google-cloud-compute.jpg', file: C + 'google-cloud-compute.png', verifyUrl: null, note: 'Infrastructure Modernization · Introductory.' },
  { id: 'gc-iam', title: 'Configure Service Accounts and IAM roles for Google Cloud', issuer: 'Google Cloud', date: null, kind: 'Skill badge', category: 'Cloud Computing', image: V + 'service-accounts-iam.jpg', file: C + 'service-accounts-iam.jpg', verifyUrl: null, note: 'Security · Introductory.' },
  { id: 'python', title: 'Python — Certificate of Completion', issuer: 'Log2Base2', date: '2 March 2026', kind: 'Certificate', category: 'Python & Programming', image: V + 'python.jpg', file: C + 'python.png', verifyUrl: null, credentialId: 'LBPYN1772473158479' },
  { id: 'ds-python', title: 'Data Structure (Python) — Certificate of Completion', issuer: 'Log2Base2', date: '12 January 2026', kind: 'Certificate', category: 'Python & Programming', image: V + 'data-structure-python.jpg', file: C + 'data-structure-python.png', verifyUrl: null, credentialId: 'LBDSP1768194341478' },
];

/* -------------------------------------------------------------- SERVICES */

export const services = [
  { title: 'Exploratory Data Analysis', problem: 'A raw dataset with unclear patterns.', approach: 'Profile columns, check distributions, compare segments and surface trends.', deliverable: 'Annotated notebook with charts and a short findings summary.', tech: ['Python', 'Pandas', 'Matplotlib'] },
  { title: 'Data Cleaning & Reporting', problem: 'Messy spreadsheets with gaps, duplicates and inconsistent formats.', approach: 'Document every cleaning rule so the result is reproducible.', deliverable: 'Clean dataset + cleaning log + summary report.', tech: ['Pandas', 'Excel'] },
  { title: 'Python Scripting & Automation', problem: 'Repetitive file, text or data chores done by hand.', approach: 'Small, readable scripts with clear inputs and outputs.', deliverable: 'A script with usage notes.', tech: ['Python'] },
  { title: 'SQL Querying & Extraction', problem: 'Needing a specific slice of data from a database.', approach: 'Write and explain queries with joins, filters and aggregations.', deliverable: 'Commented SQL queries and result exports.', tech: ['SQL'] },
  { title: 'Excel & Power BI Dashboards', problem: 'Stakeholders need numbers they can scan quickly.', approach: 'Pick a few honest KPIs and the right visual for each.', deliverable: 'An Excel summary or Power BI report page.', tech: ['Excel', 'Power BI'] },
  { title: 'AI-Powered Prototypes', problem: 'An idea that needs a quick, testable demo.', approach: 'Prototype with Google AI Studio / Python, then state limits clearly.', deliverable: 'A working demo and a short write-up of what it can and cannot do.', tech: ['Google AI Studio', 'Python'] },
  { title: 'Basic ML & Sentiment Analysis', problem: 'Large amounts of text opinion to summarise.', approach: 'Baseline rule-based scores, then a simple trained classifier for comparison.', deliverable: 'Labelled data, comparison charts and caveats.', tech: ['VADER', 'TF-IDF', 'scikit-learn'] },
];

/* -------------------------------------------------------------- TIMELINE */

/** Dated milestones render in order; undated ones are listed separately so no order is implied. */
export interface Milestone { date: string | null; title: string; kind: string; detail: string; current?: boolean }

export const timeline: Milestone[] = [
  { date: '12 January 2026', title: 'Data Structure (Python)', kind: 'Course', detail: 'Log2Base2 certificate of completion.' },
  { date: '2 March 2026', title: 'Python', kind: 'Course', detail: 'Log2Base2 certificate of completion.' },
  { date: '1–30 June 2026', title: 'CodeAlpha Data Analytics virtual internship program', kind: 'Internship program', detail: 'Three projects: web-scraping price analysis, telecom churn EDA, airline sentiment analysis. Certificate issued 1 July 2026.' },
  { date: '19 July 2026', title: 'QuizOff 2026 — India\'s Biggest AI Quiz', kind: 'Participation', detail: 'Organised by CampusCrew on Unstop.' },
  { date: '9 August 2026', title: 'Adobe University Hackathon', kind: 'Participation', detail: 'Certificate of participation (via Unstop).' },
  { date: 'September 2026', title: 'HackerRank Orchestrate — rank #1327 of 3,062', kind: 'Competition', detail: 'Built and deployed an AI agent; repository: Buy or Wait?' },
  { date: '19 October 2026', title: 'Naukri Campus Young Turks 2026 — 96.35 percentile', kind: 'Recognition', detail: 'Certificate of Merit.' },
  { date: '22 October 2026', title: 'Develop AI-Powered Prototypes in Google AI Studio', kind: 'Skill badge', detail: 'Google Cloud · verifiable on Credly.' },
  { date: '28 October 2026', title: 'Google Cloud speech & language skill badges', kind: 'Skill badges', detail: 'Speech and Language Solutions with Pre-trained APIs · Using the Google Cloud Speech API.' },
  { date: 'Now', title: 'DocShield live prototype', kind: 'Project', detail: 'Built around SIH 2026 problem statement SIH26188; deployed on Cloudflare Workers.', current: true },
  { date: 'Expected 2029', title: 'B.Tech CSD graduation', kind: 'Education', detail: 'KKR & KSR Institute of Technology and Science · currently in second year.' },
  { date: null, title: 'Google Cloud skill badges', kind: 'Skill badges', detail: 'Build a Website on Google Cloud · The Basics of Google Cloud Compute · Configure Service Accounts and IAM roles · Create Your First Gemini Enterprise Application.' },
];
