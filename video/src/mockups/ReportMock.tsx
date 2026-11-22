import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ease} from '../lib/anim';
import {C, MONO} from '../theme';

// FULLY ANONYMOUS demo report: fictional client, fictional numbers.
const Donut: React.FC<{pct: number; label: string; color: string; p: number}> = ({pct, label, color, p}) => {
  const r = 52;
  const circ = 2 * Math.PI * r;
  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
      <svg width={140} height={140} viewBox="0 0 140 140">
        <circle cx={70} cy={70} r={r} stroke="#e5e7eb" strokeWidth={18} fill="none" />
        <circle cx={70} cy={70} r={r} stroke={color} strokeWidth={18} fill="none" strokeDasharray={`${circ * pct * p} ${circ}`} transform="rotate(-90 70 70)" strokeLinecap="round" />
        <text x={70} y={78} textAnchor="middle" fontSize={24} fontWeight={800} fill="#1e293b" fontFamily="monospace">
          {Math.round(pct * 100 * p)}%
        </text>
      </svg>
      <div style={{fontSize: 18, color: '#475569', fontWeight: 600}}>{label}</div>
    </div>
  );
};

export const ReportMock: React.FC = () => {
  const f = useCurrentFrame();
  const p = ease(f, 20, 80);
  const tracks = [
    {n: 'קרן פנסיה · מסלול מניות', a: '₪212,400', r: '+6.1%'},
    {n: 'קרן השתלמות · מסלול כללי', a: '₪148,900', r: '+4.8%'},
    {n: 'קופת גמל להשקעה', a: '₪86,300', r: '+5.4%'},
  ];
  return (
    <div style={{position: 'absolute', inset: 0, background: '#eef1f6', display: 'flex'}}>
      {/* sidebar */}
      <div style={{width: 230, background: '#0f172a', color: C.text, padding: '26px 20px', display: 'flex', flexDirection: 'column', gap: 16}}>
        <div style={{fontWeight: 800, fontSize: 22}}>מערכת דוחות</div>
        {['לקוחות', 'דוח תקופתי', 'תכנון פנסיוני', 'ייצוא PDF'].map((t, i) => (
          <div key={t} style={{fontSize: 17, padding: '10px 12px', borderRadius: 10, background: i === 1 ? `${C.mint}22` : 'transparent', color: i === 1 ? C.mint : C.muted}}>
            {t}
          </div>
        ))}
        <div style={{marginTop: 'auto', fontSize: 13, color: C.gold, border: `1px dashed ${C.gold}88`, borderRadius: 8, padding: 8, textAlign: 'center'}}>DEMO · נתונים בדויים</div>
      </div>
      {/* page */}
      <div style={{flex: 1, padding: 30}}>
        <div style={{background: '#fff', borderRadius: 18, padding: 28, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', height: '100%'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
            <div>
              <div style={{fontSize: 15, color: '#64748b'}}>דוח תקופתי · רבעון 3</div>
              <div style={{fontSize: 34, fontWeight: 800, color: '#0f172a'}}>לקוח לדוגמה</div>
            </div>
            <div style={{textAlign: 'left'}}>
              <div style={{fontSize: 15, color: '#64748b'}}>סך חיסכון</div>
              <div style={{fontSize: 36, fontWeight: 800, color: '#3f7d3b', fontFamily: MONO, direction: 'ltr'}}>₪{Math.round(447600 * p).toLocaleString('en-US')}</div>
            </div>
          </div>
          <div style={{display: 'flex', justifyContent: 'space-around', margin: '22px 0'}}>
            <Donut pct={0.36} label="חשיפה למניות" color="#3f7d3b" p={p} />
            <Donut pct={0.28} label='חשיפה לחו"ל' color="#c2a90b" p={p} />
            <Donut pct={0.18} label="חשיפה למט״ח" color="#2563eb" p={p} />
          </div>
          <div style={{borderTop: '1px solid #e5e7eb'}}>
            {tracks.map((t, i) => (
              <div key={t.n} style={{display: 'flex', justifyContent: 'space-between', padding: '13px 4px', borderBottom: '1px solid #f1f5f9', fontSize: 19, color: '#1e293b', opacity: ease(f, 70 + i * 10, 90 + i * 10)}}>
                <span>{t.n}</span>
                <span style={{display: 'flex', gap: 40, fontFamily: MONO, direction: 'ltr'}}>
                  <span style={{color: '#3f7d3b'}}>{t.r}</span>
                  <span>{t.a}</span>
                </span>
              </div>
            ))}
          </div>
          <div style={{marginTop: 18, display: 'flex', gap: 12, opacity: ease(f, 120, 140)}}>
            {['✓ התאמה מול דוח המוסד', '✓ בדיקת בקרת איכות', '✓ מוכן לשליחה'].map((t) => (
              <div key={t} style={{fontSize: 16, color: '#047857', background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '7px 14px', borderRadius: 999}}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
