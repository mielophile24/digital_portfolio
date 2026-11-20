import profileImg from '../assets/profile.jpg';
import deped1 from '../assets/projects/deped-1.jpg';
import deped2 from '../assets/projects/deped-2.jpg';
import deped3 from '../assets/projects/deped-3.jpg';
import printingProjectImg from '../assets/projects/printing-project.jpg';
import fourAs1 from '../assets/projects/four-as-1.jpg';
import fourAs2 from '../assets/projects/four-as-2.jpg';
import fourAs3 from '../assets/projects/four-as-3.jpg';
import studyTimer1 from '../assets/projects/study-timer-1.png';
import studyTimer2 from '../assets/projects/study-timer-2.png';
import studyTimer3 from '../assets/projects/study-timer-3.jpg';

export const PROJECTS = [
  {
    name: 'DepEd Region V Basic Education Resources and Inputs Monitoring System',
    kind: 'Capstone project',
    role: 'Full-stack Developer',
    date: 'Sep. 2025 – Dec. 2026',
    link: '',
    images: [deped1, deped2, deped3],
    about: 'Tasked with replacing manual paper-based and spreadsheet inventories across 3,852 public schools and 13 division offices with a centralized monitoring system, I engineered a full-stack, role-aware web platform connecting multi-tier dashboards with database tracking for buildings, rooms, furniture, and ICT equipment. This streamlined data progression to 100% completion, enabling automated division reports and real-time visibility into resource allocations and school ratios.'
  },
  {
    name: 'STI College Legazpi Library Printing Request Management System',
    kind: 'Term project',
    role: 'Documentation',
    date: 'Dec. 2025',
    link: '',
    images: [printingProjectImg],
    about: 'Tasked with modernizing the campus library’s manual printing request queue, job tracking, and fee calculation process, I authored complete technical documentation, workflow diagrams, requirement specifications, and step-by-step user manuals for students and staff. This established standardized operating procedures and provided a clear blueprint that eliminated queuing bottlenecks.'
  },
  {
    name: '4As Gardening Supplies Website',
    kind: 'Website project',
    role: 'Frontend Developer',
    date: '',
    link: '',
    images: [fourAs1, fourAs2, fourAs3],
    about: 'Tasked with establishing an online presence and product catalog for a local natural turf grass, soil, and landscaping supplier in Daraga, Albay, I designed and developed a responsive web interface highlighting turf varieties, volcanic soil products, service logistics, and inquiry forms. This broadened customer outreach across the Bicol region, driving direct quote inquiries and orders for residential and contractor projects.'
  },
  {
    name: 'Study Timer Hub',
    kind: 'Personal project',
    role: 'Creator & Developer',
    date: '',
    link: 'https://study-timer-hub-kappa.vercel.app/',
    images: [studyTimer1, studyTimer2, studyTimer3],
    about: 'Tasked with creating a distraction-free productivity web application to help students sustain deep focus and build disciplined study habits, I developed a feature-rich web app supporting multiple focus modes (Pomodoro, 50/10, Deep Work, Active Recall) with custom timers, audio cues, and streak analytics. Deployed live on Vercel, it features daily activity heatmaps and subject focus metrics to actively support self-directed learners.'
  }
];

export const DEFAULT_IMAGES = {
  photo: profileImg,
  project0: [deped1, deped2, deped3],
  project1: printingProjectImg,
  project2: [fourAs1, fourAs2, fourAs3],
  project3: [studyTimer1, studyTimer2, studyTimer3]
};
