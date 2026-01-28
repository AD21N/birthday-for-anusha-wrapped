import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SlideProps } from '../types';

const TrapSlide: React.FC<SlideProps> = ({ data, onNext }) => {
  const [trapPos, setTrapPos] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const moveTrap = () => {
    // Reduce movement range on mobile so it doesn't fly off screen easily
    const range = window.innerWidth < 768 ? 100 : 300;
    const randomX = (Math.random() - 0.5) * range; 
    const randomY = (Math.random() - 0.5) * range;
    setTrapPos({ x: randomX, y: randomY });
    setAttempts(prev => prev + 1);
  };

  const handleWin = () => {
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF0000', '#00FF00', '#0000FF']
    });
    // Delay next slide slightly to enjoy confetti
    setTimeout(onNext, 1500);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <div className="bg-white border-4 border-black p-4 md:p-8 shadow-brutal mb-8 md:mb-12 max-w-2xl text-center rotate-[-1deg] w-full">
        <h1 className="font-chunky text-3xl md:text-6xl text-black leading-tight">
            {data.content}
        </h1>
        {attempts > 3 && (
            <p className="font-messy text-red-500 text-xl md:text-2xl mt-4 rotate-2">
                Giving up yet? 😈
            </p>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-24 items-center justify-center h-auto md:h-48 w-full relative">
        {/* The Safe Button (You) */}
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleWin}
            className="bg-green-400 text-black font-chunky text-xl md:text-2xl px-8 py-4 md:py-6 border-4 border-black shadow-brutal hover:shadow-brutal-sm transition-all z-10 w-full md:w-auto"
        >
            {data.trapOptions?.safe || "Me"}
        </motion.button>

        {/* The Trap Button (Her - Runs away) */}
        <motion.button
            animate={{ x: trapPos.x, y: trapPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={moveTrap}
            onClick={moveTrap} // Fallback for mobile
            className="bg-pink-400 text-black font-chunky text-xl md:text-2xl px-8 py-4 md:py-6 border-4 border-black shadow-brutal cursor-not-allowed z-20 w-full md:w-auto"
        >
             {data.trapOptions?.trap || "You"}
        </motion.button>
      </div>
    </div>
  );
};

export default TrapSlide;