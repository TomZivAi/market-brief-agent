// ============================================================
// The team. Edit names, roles, looks and "moments" here.
// Drop a generated character clip at public/<media> and the
// placeholder is replaced automatically (mp4/webm/png/jpg).
// ============================================================

export type LogLine = {t: string; kind?: 'cmd' | 'ok' | 'warn' | 'err' | 'out'};

export type Agent = {
  cam: string;
  name: string; // Hebrew display name
  nameEn: string;
  role: string;
  look: string; // character design brief (also shown on the placeholder)
  moment: string; // something important this agent did
  momentDate?: string;
  color: string; // monster body color (placeholder + accents)
  eyes: 1 | 2 | 3;
  media: string; // path inside public/, without extension
  log: LogLine[];
};

export const agents: Agent[] = [
  {
    cam: 'CAM 01',
    name: 'אדם',
    nameEn: 'ADAM',
    role: 'מנהל תפעול (COO) · מנתב כל משימה לצוות',
    look: 'מפלצת זהב עגולה עם עין אחת גדולה, חליפה ועניבה, אוזניות ולוח כתיבה ביד',
    moment: 'עצר לפני שהכין מייל ללקוח עם נתוני דמו, ביקש נתונים אמיתיים, והפך את זה לכלל קבוע במערכת',
    momentDate: '29.07',
    color: '#dfd04a',
    eyes: 1,
    media: 'agents/agent-01',
    log: [
      {t: '$ adam route --task "client-email"', kind: 'cmd'},
      {t: '> track: CREATE'},
      {t: '> recipient: placeholder'},
      {t: '! HOLD: no real data, no Gmail', kind: 'warn'},
      {t: '> rule saved -> feedback-system.md'},
      {t: '✓ standing rule: ACTIVE', kind: 'ok'},
    ],
  },
  {
    cam: 'CAM 02',
    name: 'לונה',
    nameEn: 'LUNA',
    role: 'אנליסטית שווקים · משמרת לילה',
    look: 'מפלצת סגולה פרוותית בפיג׳מה וכובע שינה, פנס ראש, כוס קפה ענקית ומשקפיים עם טיקרים רצים',
    moment: 'סקירת בוקר כל יום ב־06:30: שווקים, מקרו וגיאופוליטיקה, וכל מספר עם מקור',
    momentDate: 'מאז 30.07',
    color: '#a78bfa',
    eyes: 2,
    media: 'agents/agent-02',
    log: [
      {t: '$ brief --window 24h', kind: 'cmd'},
      {t: '> TA-35 · TA-125 · USD/ILS'},
      {t: '> S&P 500 · Nasdaq · Fed'},
      {t: '> sources: 2 per fact'},
      {t: '> length: < 450 words'},
      {t: '✓ delivered 06:30', kind: 'ok'},
    ],
  },
  {
    cam: 'CAM 03',
    name: 'אוסקר',
    nameEn: 'OSCAR',
    role: 'קופירייטר · כותב בקול של תום',
    look: 'מפלצת מנטה גבוהה ושעירה עם ברט וצעיף, נוצת כתיבה מאחורי האוזן ומכונת כתיבה',
    moment: 'כתב את טיוטת הניוזלטר של הסקירה השבועית, בשפה פשוטה ובלי ז׳רגון',
    color: '#7ec87a',
    eyes: 2,
    media: 'agents/agent-03',
    log: [
      {t: '$ write --voice voice-dna.md', kind: 'cmd'},
      {t: '> opener: "היי [שם לקוח],"'},
      {t: '> jargon -> translated'},
      {t: '> numbers first, then meaning'},
      {t: '> sign-off: "בברכה,"'},
      {t: '-> handoff: GRETA (QA)', kind: 'ok'},
    ],
  },
  {
    cam: 'CAM 04',
    name: 'גרטה',
    nameEn: 'GRETA',
    role: 'בקרת איכות · שום דבר לא יוצא בלי בדיקה',
    look: 'מפלצת כתומה מרובעת במדי מאבטחת עם כובע, זכוכית מגדלת ענקית וחותמת "מאושר"',
    moment: 'בדקה את טיוטת הניוזלטר ואישרה את הטון: "בגובה העיניים"',
    color: '#fb923c',
    eyes: 3,
    media: 'agents/agent-04',
    log: [
      {t: '$ gate --check draft.md', kind: 'cmd'},
      {t: '✓ every number vs source', kind: 'ok'},
      {t: '✓ zero advice language', kind: 'ok'},
      {t: '✗ line 14: no source -> cut', kind: 'err'},
      {t: '✓ tone: "בגובה העיניים"', kind: 'ok'},
      {t: '✓ APPROVED', kind: 'ok'},
    ],
  },
  {
    cam: 'CAM 05',
    name: 'מטילדה',
    nameEn: 'MATILDA',
    role: 'זיכרון ולמידה · זוכרת כל תיקון',
    look: 'מפלצת־פיל תכלכלה בקרדיגן, משקפיים על שרשרת ומגירות כרטיסייה בבטן',
    moment: 'זיהתה שם לקוח אמיתי בדוגמת טקסט והחליפה אותו ב־[שם לקוח]. פרטיות קודם',
    momentDate: '29.07',
    color: '#67e8f9',
    eyes: 2,
    media: 'agents/agent-05',
    log: [
      {t: '$ learn --scan samples/', kind: 'cmd'},
      {t: '! PII found: sample-02.md', kind: 'warn'},
      {t: '> replaced -> [שם לקוח]'},
      {t: '> snapshot.md rebuilt'},
      {t: '> corrections: synced'},
      {t: '✓ memory up to date', kind: 'ok'},
    ],
  },
  {
    cam: 'CAM 06',
    name: 'ריקו',
    nameEn: 'RICO',
    role: 'שליח · מביא את הסקירה עד לטלפון',
    look: 'מפלצת כחולה קטנה עם כובע דוור, תיק שליחים ומטוס נייר ביד',
    moment: 'מעביר את סקירת הבוקר בטלגרם, ובודק שכל הודעה באמת הגיעה',
    momentDate: 'מאז 31.08',
    color: '#60a5fa',
    eyes: 2,
    media: 'agents/agent-06',
    log: [
      {t: '$ telegram sendMessage', kind: 'cmd'},
      {t: '> chat_id: ••••••'},
      {t: '> size: < 4,096 chars'},
      {t: '> POST api.telegram.org'},
      {t: '< {"ok": true}', kind: 'ok'},
      {t: '✓ brief delivered', kind: 'ok'},
    ],
  },
];
