import React from 'react';
import {useCurrentFrame} from 'remotion';
import {ease} from '../lib/anim';
import {C, MONO} from '../theme';

// DEMO numbers only, for illustration. Not real market data.
const rows = [
  {k: 'ת"א 35', v: 1.8},
  {k: 'S&P 500', v: 0.9},
  {k: 'Nasdaq', v: 1.4},
  {k: 'דולר/שקל', v: -0.6},
  {k: 'אג"ח ממשלתי', v: 0.3},
];

export const WeeklyInfographic: React.FC = () => {
  const f = useCurrentFrame();
  const max = 2;
  return (
    <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(160deg, #0f172a, #13233f)', padding: 44, color: C.text}}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div>
          <div style={{fontSize: 18, color: C.gold, fontFamily: MONO, direction: 'ltr', textAlign: 'right'}}>WEEKLY · #19</div>
          <div style={{fontSize: 44, fontWeight: 800}}>סיכום שבוע בשווקים</div>
        </div>
        <div style={{fontSize: 16, color: C.muted, border: `1px dashed ${C.muted}`, padding: '6px 12px', borderRadius: 8}}>נתוני דמו להמחשה</div>
      </div>
      <div style={{marginTop: 30, display: 'flex', flexDirection: 'column', gap: 22}}>
        {rows.map((r, i) => {
          const p = ease(f, 15 + i * 10, 55 + i * 10);
          const pos = r.v >= 0;
          return (
            <div key={r.k} style={{display: 'flex', alignItems: 'center', gap: 20}}>
              <div style={{width: 170, fontSize: 24, fontWeight: 700}}>{r.k}</div>
              <div style={{flex: 1, height: 34, background: 'rgba(255,255,255,0.05)', borderRadius: 8, position: 'relative'}}>
                <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: `${(Math.abs(r.v) / max) * 100 * p}%`, background: pos ? C.mint : C.red, borderRadius: 8, boxShadow: `0 0 20px ${pos ? C.mint : C.red}55`}} />
              </div>
              <div style={{width: 100, fontFamily: MONO, fontSize: 24, color: pos ? C.mint : C.red, direction: 'ltr', textAlign: 'left'}}>
                {pos ? '+' : ''}
                {(r.v * p).toFixed(1)}%
              </div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', bottom: 34, right: 44, left: 44, display: 'flex', gap: 16}}>
        {['ריבית בנק ישראל', 'אינפלציה', 'הפד'].map((t, i) => (
          <div key={t} style={{flex: 1, background: 'rgba(126,200,122,0.08)', border: `1px solid ${C.mint}33`, borderRadius: 12, padding: '14px 18px', fontSize: 20, opacity: ease(f, 80 + i * 10, 100 + i * 10)}}>
            <span style={{color: C.gold}}>● </span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};

export const NewsletterPhone: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', inset: 0, background: '#f8fafc', paddingTop: 56, color: '#1e293b'}}>
      <div style={{padding: '0 18px', fontSize: 14, color: '#64748b'}}>תיבת דואר</div>
      <div style={{margin: 14, background: '#fff', borderRadius: 16, boxShadow: '0 6px 20px rgba(0,0,0,0.08)', overflow: 'hidden', transform: `translateY(${(1 - ease(f, 30, 55)) * 600}px)`}}>
        <div style={{background: '#0f172a', color: '#fff', padding: 18}}>
          <div style={{fontSize: 13, color: C.gold}}>הסקירה השבועית</div>
          <div style={{fontSize: 21, fontWeight: 800, marginTop: 4}}>מה זז השבוע בשווקים</div>
        </div>
        <div style={{padding: 18, fontSize: 15, lineHeight: 1.6}}>
          <div>היי [שם לקוח],</div>
          <div style={{color: '#475569', marginTop: 6}}>הנה סיכום קצר של השבוע: המדדים, הריבית והשקל, ומה זה אומר בפשטות.</div>
          <div style={{display: 'flex', gap: 6, alignItems: 'flex-end', height: 90, marginTop: 14}}>
            {[0.5, 0.7, 0.4, 0.8, 0.6, 0.9].map((h, i) => (
              <div key={i} style={{flex: 1, height: `${h * 100 * ease(f, 60 + i * 4, 80 + i * 4)}%`, background: i % 2 ? '#3f7d3b' : C.mint, borderRadius: 4}} />
            ))}
          </div>
          <div style={{marginTop: 14}}>בברכה,</div>
          <div style={{fontWeight: 700}}>תום</div>
        </div>
      </div>
      <div style={{margin: '0 14px', background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 12, padding: '10px 14px', fontSize: 14, color: '#047857', opacity: ease(f, 110, 130)}}>
        ✓ נשלח לרשימת התפוצה
      </div>
    </div>
  );
};
