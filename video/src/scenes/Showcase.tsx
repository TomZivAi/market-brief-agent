import React from 'react';
import {AbsoluteFill, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {Project, projects} from '../data/projects';
import {findMedia} from '../lib/assets';
import {clamp, rise} from '../lib/anim';
import {SHOWCASE_INTRO, SHOWCASE_PER_PROJECT} from '../timeline';
import {Desktop, Phone} from '../components/Devices';
import {Sfx} from '../components/Sfx';
import {LowerThird, SceneTitle} from '../components/ui';
import {WebsiteMock} from '../mockups/WebsiteMock';
import {NewsletterPhone, WeeklyInfographic} from '../mockups/WeeklyMock';
import {ReportMock} from '../mockups/ReportMock';
import {YoutubeMock} from '../mockups/YoutubeMock';

const urls: Record<Project['kind'], string> = {
  website: 'ziv-finance.co.il',
  weekly: 'ziv-finance.co.il/weekly-review',
  reports: 'reports.local / demo',
  youtube: 'youtube.com/@WallStreetBreak',
};

const Screen: React.FC<{p: Project}> = ({p}) => {
  const shot = findMedia(p.screenshot);
  if (shot?.type === 'image') return <Img src={shot.src} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top'}} />;
  switch (p.kind) {
    case 'website':
      return <WebsiteMock />;
    case 'weekly':
      return <WeeklyInfographic />;
    case 'reports':
      return <ReportMock />;
    case 'youtube':
      return <YoutubeMock />;
  }
};

const ProjectSlide: React.FC<{p: Project; index: number}> = ({p, index}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const dur = SHOWCASE_PER_PROJECT;
  const inP = rise(frame, fps, 0, 18);
  const outP = interpolate(frame, [dur - 14, dur], [0, 1], clamp);
  const tilt = interpolate(frame, [0, dur], [6, -3]);
  const withPhone = p.kind === 'weekly' || p.kind === 'website';
  const phoneP = rise(frame, fps, 25, 16);

  return (
    <AbsoluteFill style={{opacity: Math.min(inP, 1 - outP)}}>
      <div style={{position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', justifyContent: 'center', perspective: 2200}}>
        <div style={{transform: `translateX(${withPhone ? 150 : 0}px) translateY(${(1 - inP) * 120 - outP * 60}px) rotateY(${tilt}deg) scale(${withPhone ? 0.86 : 0.92})`, transformOrigin: 'center top'}}>
          <Desktop url={urls[p.kind]} width={1240} height={640}>
            <Screen p={p} />
          </Desktop>
        </div>
      </div>
      {withPhone ? (
        <div style={{position: 'absolute', left: 70, top: 180, transform: `translateY(${(1 - phoneP) * 500}px) rotate(-4deg)`}}>
          <Phone scale={0.8}>{p.kind === 'weekly' ? <NewsletterPhone /> : <div style={{transform: 'scale(0.3)', transformOrigin: 'top right', width: 1100, height: 2300, position: 'absolute', right: 0, top: 40}}><WebsiteMock /></div>}</Phone>
        </div>
      ) : null}
      <LowerThird title={p.title} subtitle={p.subtitle} tags={p.tags} team={p.team} index={index} total={projects.length} />
      <Sfx name="whoosh" at={0} volume={0.5} />
      <Sfx name="click" at={14} volume={0.45} />
      {withPhone ? <Sfx name="whoosh" at={25} volume={0.25} /> : null}
    </AbsoluteFill>
  );
};

export const Showcase: React.FC<{dur: number}> = () => (
  <AbsoluteFill>
    <Sequence durationInFrames={SHOWCASE_INTRO}>
      <SceneTitle code="04_SHOWCASE" title="מה בנינו לאחרונה" sub="פרויקטים פעילים" dur={SHOWCASE_INTRO} />
      <Sfx name="impact" at={0} volume={0.5} />
    </Sequence>
    {projects.map((p, i) => (
      <Sequence key={p.kind} from={SHOWCASE_INTRO + i * SHOWCASE_PER_PROJECT} durationInFrames={SHOWCASE_PER_PROJECT}>
        <ProjectSlide p={p} index={i} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
