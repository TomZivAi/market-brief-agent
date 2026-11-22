import React from 'react';
import {C, FONT, MONO} from '../theme';

/** Desktop monitor with browser chrome. Children render at width x height (the screen). */
export const Desktop: React.FC<{url: string; width?: number; height?: number; children: React.ReactNode}> = ({url, width = 1180, height = 660, children}) => (
  <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <div style={{padding: 16, background: 'linear-gradient(180deg, #2b3548, #161d2c)', borderRadius: 22, boxShadow: `0 40px 100px rgba(0,0,0,0.6), 0 0 80px ${C.mint}18`, border: '1px solid #3a465c'}}>
      <div style={{width, background: '#0b1222', borderRadius: 10, overflow: 'hidden'}}>
        <div style={{height: 44, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', background: '#1a2335', direction: 'ltr'}}>
          {['#f87171', '#fbbf24', C.mint].map((c) => (
            <span key={c} style={{width: 12, height: 12, borderRadius: '50%', background: c}} />
          ))}
          <div style={{flex: 1, marginLeft: 16, height: 28, borderRadius: 8, background: '#0f172a', display: 'flex', alignItems: 'center', padding: '0 14px', fontFamily: MONO, fontSize: 15, color: C.muted}}>
            <span style={{color: C.mint, marginRight: 2}}>https://</span>
            {url}
          </div>
        </div>
        <div style={{width, height, position: 'relative', overflow: 'hidden', direction: 'rtl', fontFamily: FONT}}>{children}</div>
      </div>
    </div>
    <div style={{width: 160, height: 60, background: 'linear-gradient(180deg, #232c3d, #121826)'}} />
    <div style={{width: 380, height: 16, borderRadius: 8, background: '#1f2737'}} />
  </div>
);

/** Phone frame. Children render at 330 x 690. */
export const Phone: React.FC<{children: React.ReactNode; scale?: number}> = ({children, scale = 1}) => (
  <div style={{transform: `scale(${scale})`, transformOrigin: 'bottom center', padding: 14, borderRadius: 54, background: 'linear-gradient(160deg, #3a465c, #141a27)', boxShadow: `0 40px 90px rgba(0,0,0,0.6), 0 0 60px ${C.gold}14`}}>
    <div style={{position: 'relative', width: 330, height: 690, borderRadius: 42, overflow: 'hidden', background: '#f8fafc', direction: 'rtl', fontFamily: FONT}}>
      {children}
      <div style={{position: 'absolute', top: 10, left: '50%', marginLeft: -55, width: 110, height: 30, borderRadius: 20, background: '#0b0f18'}} />
    </div>
  </div>
);
