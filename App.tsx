import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SlideData, SlideType } from './types';
import ProgressBar from './components/ProgressBar';
import MusicPlayer from './components/MusicPlayer';
import StandardSlide from './components/StandardSlide';
import SarcasmSlide from './components/SarcasmSlide';
import FlipGrid from './components/FlipGrid';
import ScratchSlide from './components/ScratchSlide';
import TrapSlide from './components/TrapSlide';
import ScrapbookCollage from './components/ScrapbookCollage';
import NoiseOverlay from './components/NoiseOverlay';
import FloatingMess from './components/BackgroundParticles'; 
import CustomCursor from './components/CustomCursor';
import SoundManager from './components/SoundManager';
import BirthdaySimulator from './components/BirthdayGame/BirthdaySimulator';
import Preloader from './components/Preloader';

// Import New Data Story Slides
import TimeStatsSlide from './components/TimeStatsSlide';
import PieChartSlide from './components/PieChartSlide';
import WordCloudSlide from './components/WordCloudSlide';
import CrimeProfileSlide from './components/CrimeProfileSlide';
import MoodSliderSlide from './components/MoodSliderSlide';
import RatingSlide from './components/RatingSlide';
import WarningSlide from './components/WarningSlide';
import SentimentalLetter from './components/SentimentalLetter';
import MagicalReveal from './components/MagicalReveal';

// --- DATA CONFIGURATION ---
const SLIDES: SlideData[] = [
  {
    id: 1,
    type: SlideType.HERO,
    content: "WARNING: EMOTIONAL DAMAGE AHEAD",
    subContent: "Happy Birthday! Buckle up.",
    background: "bg-pink-300"
  },
  {
   id: 2,
    type: SlideType.PHOTO,
    content: "Our little children",
    subContent: "Look at themmm.",
    // 👇 UPDATE THIS: Your photo from the public folder
    image: "/4958da8e-ccf2-4866-9c7b-12ade9d30fa8.jpg", 
    background: "bg-yellow-300"
  },
  {
    id: 3,
    type: SlideType.COLLAGE,
    content: "The Messy Archives 📸",
    background: "bg-teal-300"
  },
  {
    id: 4,
    type: SlideType.SCRATCH,
    content: "Top Secret 📁",
    image: "/ss.jpg",
    background: "bg-blue-300"
  },
  {
    id: 5,
    type: SlideType.FLIP_GRID,
    content: "Why I Love You",
    background: "bg-green-300"
  },
  // --- NEW DATA STORY SECTION ---
  {
    id: 501,
    type: SlideType.TIME_STATS,
    content: "Time Analysis",
    background: "bg-black"
  },
  {
    id: 502,
    type: SlideType.PIE_CHART,
    content: "Decision Making",
    background: "bg-white"
  },
  {
    id: 503,
    type: SlideType.WORD_CLOUD,
    content: "Vocabulary",
    background: "bg-orange-100"
  },
  {
    id: 504,
    type: SlideType.CRIME_PROFILE,
    content: "Criminal Record",
    image: "https://picsum.photos/400/400?random=100", // Placeholder for her photo
    background: "bg-amber-100"
  },
  {
    id: 505,
    type: SlideType.MOOD_SLIDER,
    content: "Vibe Check",
    background: "bg-purple-200"
  },
  {
    id: 506,
    type: SlideType.RATING,
    content: "Official Rating",
    background: "bg-blue-600"
  },
  {
    id: 507,
    type: SlideType.WARNING,
    content: "System Warning",
    background: "bg-black"
  },
  // --- END DATA STORY ---
  {
    id: 6,
    type: SlideType.TRAP,
    content: "Who has the better jokes?",
    trapOptions: {
        safe: "Asaad",
        trap: "Anusha"
    },
    background: "bg-orange-300"
  },
  // --- SENTIMENTAL SLIDE ---
  {
    id: 600,
    type: SlideType.SENTIMENTAL,
    content: "For Real Now",
    background: "bg-[#0a0a2a]"
  },
  {
    id: 7,
    type: SlideType.OUTRO,
    content: "Jokes aside...",
    subContent: "You are my favorite chaotic mess. I love you! ❤️",
    background: "bg-purple-300"
  },
  // --- FINAL MAGICAL REVEAL ---
  {
    id: 800,
    type: SlideType.MAGICAL_REVEAL,
    content: "The Grand Finale",
    background: "bg-[#1a1a2e]",
    ticketData: {
        passenger: "Ayla",
        destination: "To the hogwarts",
        date: "Januray 29th, 2026"
    }
  }
];

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGame, setShowGame] = useState(false);

  const currentSlide = SLIDES[currentIndex];

  // Preload Logic
  useEffect(() => {
    const loadAssets = async () => {
      // 1. Minimum loading time for the vibe (2.5s)
      const waitPromise = new Promise(resolve => setTimeout(resolve, 2500));
      
      // 2. Preload images
      const imagesToLoad = SLIDES.map(s => s.image).filter(Boolean) as string[];
      // Add other critical static assets if needed
      
      const imagePromises = imagesToLoad.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Don't block on error
        });
      });

      await Promise.all([waitPromise, ...imagePromises]);
      setLoading(false);
    };

    loadAssets();
  }, []);

  // Safety check to reset index if out of bounds (can happen during hot-reload)
  useEffect(() => {
    if (!currentSlide && SLIDES.length > 0) {
      setCurrentIndex(0);
    }
  }, [currentIndex, currentSlide]);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const renderSlide = () => {
    if (!currentSlide) return null;

    switch (currentSlide.type) {
        case SlideType.SARCASM:
            return <SarcasmSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.FLIP_GRID:
            return <FlipGrid key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.SCRATCH:
            return <ScratchSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.TRAP:
            return <TrapSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.COLLAGE:
            return <ScrapbookCollage key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        
        // New Data Story Components
        case SlideType.TIME_STATS:
            return <TimeStatsSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.PIE_CHART:
            return <PieChartSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.WORD_CLOUD:
            return <WordCloudSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.CRIME_PROFILE:
            return <CrimeProfileSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.MOOD_SLIDER:
            return <MoodSliderSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.RATING:
            return <RatingSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        case SlideType.WARNING:
            return <WarningSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
        
        // Sentimental
        case SlideType.SENTIMENTAL:
            return <SentimentalLetter key={currentSlide.id} data={currentSlide} onNext={handleNext} />;

        // Magical Reveal
        case SlideType.MAGICAL_REVEAL:
            return <MagicalReveal key={currentSlide.id} data={currentSlide} onNext={handleNext} />;

        default:
            return <StandardSlide key={currentSlide.id} data={currentSlide} onNext={handleNext} />;
    }
  };

  // While loading, show Preloader (on top of everything)
  if (loading) {
    return <Preloader />;
  }

  if (!currentSlide) return null;

  return (
    <SoundManager>
        {/* CHANGED: h-screen to h-[100dvh] and added overflow-x-hidden */}
        <div className="relative w-full h-[100dvh] overflow-hidden bg-[#FFDEE9]">
        <NoiseOverlay />
        
        {/* Only show chaotic background if NOT sentimental or magical slide */}
        {currentSlide.type !== SlideType.SENTIMENTAL && currentSlide.type !== SlideType.MAGICAL_REVEAL && <FloatingMess />}
        
        <CustomCursor />
        
        {/* Persistent UI Elements */}
        <ProgressBar 
            total={SLIDES.length} 
            current={currentIndex} 
            onUnlockGame={() => setShowGame(true)}
        />
        <MusicPlayer />

        {/* Slide Container */}
        <AnimatePresence mode="wait">
            {!showGame && renderSlide()}
        </AnimatePresence>

        {/* Hidden Mini Game Overlay */}
        <AnimatePresence>
            {showGame && (
                <BirthdaySimulator onClose={() => setShowGame(false)} />
            )}
        </AnimatePresence>
        </div>
    </SoundManager>
  );
};

export default App;