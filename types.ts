export enum SlideType {
  HERO = 'HERO',
  PHOTO = 'PHOTO',
  SARCASM = 'SARCASM',
  FLIP_GRID = 'FLIP_GRID',
  SCRATCH = 'SCRATCH',
  TRAP = 'TRAP',
  COLLAGE = 'COLLAGE',
  OUTRO = 'OUTRO',
  // New Data Story Types
  TIME_STATS = 'TIME_STATS',
  PIE_CHART = 'PIE_CHART',
  WORD_CLOUD = 'WORD_CLOUD',
  CRIME_PROFILE = 'CRIME_PROFILE',
  MOOD_SLIDER = 'MOOD_SLIDER',
  RATING = 'RATING',
  WARNING = 'WARNING',
  // Final Serious Slide
  SENTIMENTAL = 'SENTIMENTAL',
  // Finale
  MAGICAL_REVEAL = 'MAGICAL_REVEAL'
}

export interface SlideData {
  id: number;
  type: SlideType;
  content: string; 
  subContent?: string;
  image?: string; 
  background: string; // Tailwind classes
  
  // Specific to Sarcasm Reveal
  revealContent?: string;
  revealBackground?: string;

  // Specific to Trap
  trapOptions?: {
    safe: string;
    trap: string;
  };
  
  // Specific to Magical Reveal
  ticketData?: {
    passenger: string;
    destination: string;
    date: string;
  }
}

export interface SlideProps {
  data: SlideData;
  onNext: () => void;
}