// ============================================================
// Showcase projects. To use a real screenshot instead of the
// animated mock, drop it at public/<screenshot>.png (or .jpg).
// Client report mock uses DEMO data only, never real clients.
// ============================================================

export type ProjectKind = 'website' | 'weekly' | 'reports' | 'youtube';

export type Project = {
  kind: ProjectKind;
  title: string;
  subtitle: string;
  tags: string[];
  screenshot: string; // path inside public/, without extension
  team: string[]; // agent names involved
};

export const projects: Project[] = [
  {
    kind: 'website',
    title: 'שדרוג האתר ziv-finance.co.il',
    subtitle: 'עיצוב חדש, חוויית משתמש, אבטחה ועדכונים, והסקירות בתוך האתר',
    tags: ['עיצוב', 'UX', 'אבטחה', 'ביצועים'],
    screenshot: 'screens/project-01-website',
    team: ['אדם', 'יואב', 'רינה'],
  },
  {
    kind: 'weekly',
    title: 'סקירת שוק שבועית אוטומטית',
    subtitle: 'ניתוח מדדים, אינפוגרפיקה והפצה ללקוחות בכל סוף שבוע',
    tags: ['מדדים', 'אינפוגרפיקה', 'ניוזלטר'],
    screenshot: 'screens/project-02-weekly',
    team: ['נועה', 'יואב', 'רינה'],
  },
  {
    kind: 'reports',
    title: 'פלטפורמה להכנת דוח לקוח',
    subtitle: 'דוחות תכנון פיננסי ופנסיוני, מדויקים ואישיים (בתצוגה: נתוני דמו)',
    tags: ['פנסיה', 'תיק השקעות', 'PDF'],
    screenshot: 'screens/project-03-reports',
    team: ['אדם', 'רינה', 'מיכל'],
  },
  {
    kind: 'youtube',
    title: 'ערוץ יוטיוב Wall Street Break',
    subtitle: 'מערכת הפקה: תסריט, וידאו והעלאה, לשוק האמריקאי',
    tags: ['תסריט', 'וידאו', 'YouTube'],
    screenshot: 'screens/project-04-youtube',
    team: ['נועה', 'יואב', 'רינה'],
  },
];
