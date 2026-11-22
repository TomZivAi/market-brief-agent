// Numbers for 05_METRICS. VERIFY before publishing:
// - morning briefs: estimated from go-live 30.07.2026 to 22.11.2026 (~115 days)
// - weekly reviews: 15 confirmed in O-output as of 24.10.2026
import {agents} from './agents';
import {projects} from './projects';

export type Metric = {value: number; suffix?: string; label: string; color: 'mint' | 'gold'};

export const metrics: Metric[] = [
  {value: agents.length, label: 'סוכני AI בצוות', color: 'mint'},
  {value: projects.length, label: 'פרויקטים פעילים', color: 'gold'},
  {value: 115, suffix: '+', label: 'סקירות בוקר', color: 'mint'},
  {value: 15, suffix: '+', label: 'סקירות שבועיות', color: 'gold'},
];
