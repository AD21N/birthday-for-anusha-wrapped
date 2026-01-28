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
      {/* Title centered and above floaters */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-50 pointer-events-none mix-blend-multiply w-full px-4">
        <h1 className="font-chunky text-4xl md:text-6xl text-black opacity-10 leading-tight break-words">MOST USED<br/>PHRASES</h1>
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
  // Use a safer range for mobile. 
  // Desktop can handle ~600px spread, Mobile needs ~200px.
  // We'll use a conservative estimate.
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const spread = isMobile ? 150 : 600;
  
  const xOffset = (Math.random() - 0.5) * spread; 
  const yOffset = (Math.random() - 0.5) * spread;
  
  return (
    <motion.div
      className={`absolute font-chunky ${phrase.color} ${phrase.size} whitespace-nowrap drop-shadow-md`}
      style={{
        top: '50%',
        left: '50%',
        zIndex: index + 1
      }}
      initial={{ x: xOffset, y: yOffset, opacity: 0, scale: 0 }}
      animate={{ 
        x: [xOffset, xOffset + (Math.random() * 60 - 30), xOffset],
        y: [yOffset, yOffset + (Math.random() * 60 - 30), yOffset],
        opacity: 1,
        scale: 1,
        rotate: [0, 5, -5, 0]
      }}
      transition={{ 
        duration: 5 + index, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay: index * 0.2
      }}
    >
      {phrase.text}
    </motion.div>
  );
};

export default WordCloudSlide;