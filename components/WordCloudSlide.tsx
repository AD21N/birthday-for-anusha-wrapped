import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';

const PHRASES = [
  { text: "I'm cold 🥶", color: "text-blue-600", size: "text-2xl md:text-4xl", speed: 2 },
  { text: "Feed me 🍟", color: "text-red-600", size: "text-4xl md:text-6xl", speed: 3 },
  { text: "Did you see that Meme? 📱", color: "text-purple-600", size: "text-xl md:text-3xl", speed: 2.5 },
  { text: "5 more minutes 😴", color: "text-gray-600", size: "text-3xl md:text-5xl", speed: 1.5 },
  { text: "What are we doing? 🤔", color: "text-green-600", size: "text-xl md:text-3xl", speed: 1.8 },
  { text: "Can we go home? 🏠", color: "text-pink-600", size: "text-2xl md:text-4xl", speed: 2.2 },
  { text: "Look at my hairs! ", color: "text-orange-500", size: "text-xl md:text-3xl", speed: 2.8 },
  { text: "Pararipurura pupararura ", color: "text-orange-500", size: "text-xl md:text-3xl", speed: 2.8 },
];

const WordCloudSlide: React.FC<SlideProps> = ({ onNext }) => {
  return (
    <div className="w-full h-full relative overflow-hidden bg-[#FFF3E0] cursor-pointer" onClick={onNext}>
      {/* Title centered - Adjusted z-index to stay behind words */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 px-4">
        <h1 className="font-chunky text-4xl md:text-6xl text-black opacity-10 leading-tight text-center break-words select-none">
          MOST USED<br/>PHRASES
        </h1>
      </div>

      {PHRASES.map((phrase, i) => (
        <FloatingWord key={i} phrase={phrase} index={i} />
      ))}

      <div className="absolute bottom-8 left-0 right-0 text-center font-messy text-lg md:text-xl text-black bg-white/50 backdrop-blur-md py-2 z-50">
        Sound familiar? 👀
      </div>
    </div>
  );
};

const FloatingWord = ({ phrase, index }: { phrase: typeof PHRASES[0], index: number }) => {
  // 1. Responsive Spread Calculation
  // We use a safe default if window isn't defined (SSR safety), then check width
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  // Reduced spread slightly for mobile so text doesn't get cut off
  const spreadX = isMobile ? 100 : 400; 
  const spreadY = isMobile ? 180 : 300; // More vertical space usually available on mobile
  
  // 2. Calculate random offset relative to CENTER (0,0)
  const xOffset = (Math.random() - 0.5) * spreadX * 2; 
  const yOffset = (Math.random() - 0.5) * spreadY * 2;
  
  return (
    // WRAPPER: This is the fix.
    // We position a 0x0 div at the exact center (top-1/2 left-1/2).
    // Flexbox ensures the content inside stays centered on this anchor point.
    <div 
      className="absolute top-1/2 left-1/2 w-0 h-0 flex items-center justify-center pointer-events-none" 
      style={{ zIndex: index + 10 }}
    >
      <motion.div
        className={`font-chunky ${phrase.color} ${phrase.size} whitespace-nowrap drop-shadow-md text-center`}
        initial={{ x: xOffset, y: yOffset, opacity: 0, scale: 0 }}
        animate={{ 
          // Floating animation
          x: [xOffset, xOffset + (Math.random() * 30 - 15), xOffset],
          y: [yOffset, yOffset + (Math.random() * 30 - 15), yOffset],
          opacity: 1,
          scale: 1,
          rotate: [0, Math.random() * 10 - 5, 0]
        }}
        transition={{ 
          duration: 4 + Math.random() * 2, // Varied speeds
          repeat: Infinity, 
          repeatType: "reverse",
          ease: "easeInOut",
          delay: index * 0.1
        }}
      >
        {phrase.text}
      </motion.div>
    </div>
  );
};

export default WordCloudSlide;