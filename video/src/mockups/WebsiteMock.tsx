import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {clamp, ease} from '../lib/anim';
import {C} from '../theme';

// Animated mock of the upgraded ziv-finance.co.il homepage (illustrative layout, not a screenshot).
export const WebsiteMock: React.FC = () => {
  const f = useCurrentFrame();
  const scroll = interpolate(f, [70, 190], [0, -360], {...clamp, easing: (t) => t * t * (3 - 2 * t)});
  const cream = '#f7f4ec';
  const ink = '#1d2b3a';
  return (
    <div style={{position: 'absolute', inset: 0, background: cream, color: ink}}>
      <div style={{height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 48px', background: '#fff', borderBottom: '1px solid #e7e2d6', position: 'relative', zIndex: 2}}>
        <div style={{fontWeight: 800, fontSize: 26}}>
          תום זיו <span style={{fontWeight: 400, color: '#5d7a5a'}}>| תכנון פיננסי</span>
        </div>
        <div style={{display: 'flex', gap: 30, fontSize: 18, color: '#4b5563'}}>
          {['ראשי', 'אודות', 'שירותים', 'סקירות שוק', 'צור קשר'].map((t, i) => (
            <span key={t} style={{color: i === 3 ? '#3f7d3b' : undefined, fontWeight: i === 3 ? 700 : 400, borderBottom: i === 3 ? '3px solid #7ec87a' : 'none', paddingBottom: 4}}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div style={{transform: `translateY(${scroll}px)`}}>
        {/* hero */}
        <div style={{height: 360, display: 'flex', alignItems: 'center', padding: '0 70px', gap: 50, background: 'linear-gradient(135deg, #eef5ea 0%, #f7f4ec 60%)'}}>
          <div style={{flex: 1, opacity: ease(f, 5, 30), transform: `translateY(${(1 - ease(f, 5, 30)) * 30}px)`}}>
            <div style={{fontSize: 58, fontWeight: 900, lineHeight: 1.15}}>
              תכנון פיננסי.
              <br />
              <span style={{color: '#3f7d3b'}}>בגובה העיניים.</span>
            </div>
            <div style={{fontSize: 22, color: '#4b5563', marginTop: 16}}>פנסיה, השתלמות ותיק השקעות. ליווי אישי ושוטף.</div>
            <div style={{display: 'flex', gap: 14, marginTop: 26}}>
              <div style={{background: '#3f7d3b', color: '#fff', padding: '14px 28px', borderRadius: 12, fontSize: 20, fontWeight: 700}}>לתיאום שיחה</div>
              <div style={{border: '2px solid #3f7d3b', color: '#3f7d3b', padding: '12px 26px', borderRadius: 12, fontSize: 20, fontWeight: 700}}>להרשמה לסקירה</div>
            </div>
          </div>
          <div style={{width: 340, height: 260, borderRadius: 24, background: 'linear-gradient(160deg, #c9e3c2, #e9dfa6)', boxShadow: '0 20px 50px rgba(0,0,0,0.12)', opacity: ease(f, 15, 40), display: 'flex', alignItems: 'flex-end', padding: 22, gap: 12}}>
            {[0.4, 0.55, 0.5, 0.7, 0.65, 0.85].map((h, i) => (
              <div key={i} style={{flex: 1, height: `${h * 100 * ease(f, 20 + i * 4, 50 + i * 4)}%`, background: i % 2 ? '#3f7d3b' : '#7ec87a', borderRadius: 6}} />
            ))}
          </div>
        </div>
        {/* reviews section */}
        <div style={{padding: '40px 70px'}}>
          <div style={{fontSize: 34, fontWeight: 800}}>הסקירה השבועית</div>
          <div style={{fontSize: 18, color: '#6b7280', marginTop: 6}}>כל סוף שבוע: מה זז בשווקים, ומה זה אומר על החיסכון שלכם</div>
          <div style={{display: 'flex', gap: 22, marginTop: 24}}>
            {['סקירה #19', 'סקירה #18', 'סקירה #17'].map((t, i) => (
              <div key={t} style={{flex: 1, background: '#fff', borderRadius: 16, padding: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.06)', border: i === 0 ? '2px solid #7ec87a' : '1px solid #eee'}}>
                <div style={{height: 110, borderRadius: 10, background: i === 0 ? 'linear-gradient(135deg, #0f172a, #1e3a5f)' : '#eef2f7', marginBottom: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dfd04a', fontWeight: 800, fontSize: 22}}>
                  {i === 0 ? 'חדש' : ''}
                </div>
                <div style={{fontWeight: 700, fontSize: 20}}>{t}</div>
                <div style={{fontSize: 15, color: '#6b7280', marginTop: 4}}>מדדים · ריבית · שקל</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{margin: '10px 70px', padding: 26, borderRadius: 18, background: '#1d2b3a', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{fontSize: 24, fontWeight: 700}}>רוצים לקבל את הסקירה למייל?</div>
          <div style={{background: C.gold, color: '#1d2b3a', padding: '10px 24px', borderRadius: 10, fontWeight: 800, fontSize: 18}}>הרשמה</div>
        </div>
      </div>
      {/* status chips */}
      <div style={{position: 'absolute', left: 24, bottom: 24, display: 'flex', flexDirection: 'column', gap: 10, direction: 'ltr', zIndex: 3}}>
        {['WordPress updated ✓', 'Security hardened ✓', 'Backup ✓'].map((t, i) => (
          <div key={t} style={{background: 'rgba(15,23,42,0.92)', color: C.mint, fontSize: 16, padding: '8px 14px', borderRadius: 10, fontFamily: 'monospace', opacity: ease(f, 110 + i * 14, 125 + i * 14), transform: `translateX(${(1 - ease(f, 110 + i * 14, 125 + i * 14)) * -40}px)`}}>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
};
