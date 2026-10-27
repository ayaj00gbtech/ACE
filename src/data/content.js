// All copy and illustration data, taken verbatim from "ACE AI Story v3.html".

export const CAM_IDLE = 'THE ACE METHOD';
export const CAM_DONE = 'FROM UNDERSTANDING TO ACTION';

export const HERO = {
  kicker: 'ACE AI · BY ECOVIS RKCA',
  lines: [
    { initial: 'A', rest: 'ssess' },
    { initial: 'C', rest: 'o-create' },
    { initial: 'E', rest: 'xecute' },
  ],
  lead: 'A performance system built around your business.',
  body: ' We understand how you operate, shape the framework to fit, and make it part of every decision.',
  hint: 'SCROLL TO SEE HOW IT WORKS',
};

export const STATEMENT = {
  words: "Every business runs differently. So we don't start with a template. We start with".split(' '),
  emphasis: 'you.',
};

/* Story progress boundaries: Assess 0–.36, Co-create .36–.70, Execute .70–1. */
export const BOUNDS = [0, 0.36, 0.7, 1];

export const PHASES = [
  {
    num: '01 / 03 · ASSESSMENT',
    title: 'Assess',
    tag: 'Understand before you build. Three layers, each one closer to how your business really runs.',
    cam: 'CAM · PUSH IN · ASSESS',
    items: [
      { k: 'LAYER 1', n: 'Dipstick', d: 'A conversation with your leadership' },
      { k: 'LAYER 2', n: 'Detailed', d: 'A data-driven read of the business' },
      { k: 'LAYER 3', n: 'Deep-dive', d: 'Hands-on, in person, with our domain experts' },
    ],
  },
  {
    num: '02 / 03 · CO-CREATE',
    title: 'Co-create',
    tag: 'Built around you, not off a shelf. The framework adapts to your business.',
    cam: 'CAM · BUILD · CO-CREATE',
    items: [
      { k: 'STEP 1', n: 'We listen', d: 'Your objectives, priorities, processes and gaps' },
      { k: 'STEP 2', n: 'We tailor', d: 'The ACE KPI framework, shaped to you' },
      { k: 'STEP 3', n: 'We integrate', d: 'Into the systems you already run' },
    ],
  },
  {
    num: '03 / 03 · EXECUTE',
    title: 'Execute',
    tag: 'Scattered signals fall into structure, and the system keeps running in your day-to-day decisions.',
    cam: 'CAM · LOCKED · LIVE · EXECUTE',
    chips: ['Implementation', 'Testing', 'Training', 'Adoption'],
  },
];

/* Assess: nested frames in stage coordinates. */
export const FRAMES = [
  { tag: 'ASSESSMENT · LAYER 1', name: 'DIPSTICK', box: { left: 110, top: 10, width: 460, height: 440 }, nameSize: 22 },
  { tag: 'LAYER 2', name: 'DETAILED', box: { left: 200, top: 110, width: 280, height: 250 }, nameSize: 16 },
  { tag: 'LAYER 3', name: 'DEEP-DIVE', box: { left: 268, top: 190, width: 144, height: 104 }, nameSize: 10, tagSize: 7, labelPos: { left: 8, top: 6 } },
];

/* Co-create */
export const INPUTS = ['Your objectives', 'Your priorities', 'Your processes', 'Your value drivers', 'Your gaps', 'Your leadership'];
export const WHO = 'YOUR BUSINESS';
export const KPI_ROWS = [
  { name: 'Revenue', tailored: 'Revenue · by your regions', keep: true },
  { name: 'Gross margin', tailored: 'Margin · by your product lines', keep: true },
  { name: 'Headcount', keep: false },
  { name: 'Utilisation', keep: false },
  { name: 'Cash flow', tailored: 'Cash flow · vs your targets', keep: true },
  { name: 'Inventory days', keep: false },
  { name: 'Attrition', keep: false },
  { name: 'Collections', tailored: 'Collections · your key accounts', keep: true },
];
export const SYSTEMS = [['YOUR', 'ERP'], ['YOUR', 'Finance stack'], ['YOUR', 'HR system'], ['YOUR', 'CRM']];
export const DASHBOARD_BARS = [38, 52, 46, 64, 58, 72, 68, 84];

/* Execute: 144 squares, stacked into 12 columns of these heights. */
export const COLUMN_HEIGHTS = [6, 9, 9, 12, 9, 12, 12, 15, 15, 15, 12, 18];

export const FINALE = {
  words: ['ASSESS', 'CO-CREATE', 'EXECUTE'],
  line: 'From understanding to action.',
  sub: 'Assess to understand, co-create to design, execute to transform.',
  cta: 'See the products',
};

export const DETAILS = [
  {
    label: '01 · ASSESSMENT',
    title: 'Understand before you build',
    body: 'A conversation with leadership, then your operational and financial data, then a deep-dive with domain experts. Together they give a 360° view of where the business stands and where it needs intervention.',
    points: ['Dipstick · conversational', 'Detailed · data-driven', 'Deep-dive · hands-on, in person'],
  },
  {
    label: '02 · CO-CREATE',
    title: 'Build what the business needs',
    body: 'The ACE KPI framework, personalised to your objectives, strategic priorities, critical processes and value drivers, and extended into dashboards, reviews and tools where needed.',
    points: ['Listen to your priorities', 'Tailor the KPI framework', 'Integrate with your systems'],
  },
  {
    label: '03 · EXECUTE',
    title: 'Turn it into everyday practice',
    body: 'The personalised KPI platform is deployed, tested in your real operating environment, and adopted by your teams as part of their regular decision-making.',
    points: ['Implementation & testing', 'Training & onboarding', 'Adoption & refinement'],
  },
];

export const CONTACT = {
  email: 'info@ecovisrkca.com',
  address: '1902, Kailas Business Park, Vikhroli West, Mumbai 400079',
  signature: 'ACE AI · AI STUDIO · ECOVIS RKCA',
};
