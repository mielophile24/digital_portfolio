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
    about: 'A centralized web app built to replace paper inventory across 3,852 public schools. Features dashboards to track buildings, classrooms, furniture, and IT equipment in real time, making school reporting faster and more accurate.'
  },
  {
    name: 'STI College Legazpi Library Printing Request Management System',
    kind: 'Term project',
    role: 'Documentation',
    date: 'Dec. 2025',
    link: 'https://dreamy-pastelito-b5dfcb.netlify.app/',
    images: [printingProjectImg],
    about: 'A web-based system to organize student printing requests and track fees at the campus library. Created full technical documentation, workflow diagrams, and easy-to-follow user guides for staff and students.'
  },
  {
    name: '4As Gardening Supplies Website',
    kind: 'Website project',
    role: 'Frontend Developer',
    date: '',
    link: '',
    images: [fourAs1, fourAs2, fourAs3],
    about: 'A clean, responsive website and product catalog for a local garden and grass supplier in Albay. Helps customers browse turf varieties and soil products, check delivery options, and request quotes online.'
  },
  {
    name: 'Study Timer Hub',
    kind: 'Personal project',
    role: 'Creator & Developer',
    date: '',
    link: 'https://study-timer-hub-kappa.vercel.app/',
    images: [studyTimer1, studyTimer2, studyTimer3],
    about: 'A clean, distraction-free study timer web app for students. Features popular focus methods like Pomodoro, custom intervals, sound alerts, and streak tracking to help build consistent study habits.'
  }
];

export const DEFAULT_IMAGES = {
  photo: profileImg,
  project0: [deped1, deped2, deped3],
  project1: printingProjectImg,
  project2: [fourAs1, fourAs2, fourAs3],
  project3: [studyTimer1, studyTimer2, studyTimer3]
};
