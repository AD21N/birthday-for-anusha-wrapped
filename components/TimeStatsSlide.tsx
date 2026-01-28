import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { SlideProps } from '../types';

const TimeStatsSlide: React.FC<SlideProps> = ({ onNext }) => {
  const [finished, setFinished] = useState(false);
  
  const count = useSpring(0, { duration: 2500, bounce: 0 });
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    count.set(1400);
    const timer = setTimeout(() => {
      setFinished(true);
    }, 2600);
    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-black text-white overflow-hidden relative" onClick={onNext}>
      {/* Background Matrix */}
      <div className="absolute inset-0 opacity-20 pointer-events-none font-mono text-xs overflow-hidden leading-3 text-green-500">
        {Array.from({ length: 400 }).map((_, i) => (
          <span key={i} className="inline-block m-1">{Math.random() > 0.5 ? '1' : '0'}</span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center w-full flex flex-col items-center" // Added flex-col & items-center
      >
        <h2 className="font-messy text-xl md:text-4xl text-green-400 mb-4 md:mb-8 px-4">
          Waiting to meet you everyday...
        </h2>

        {/* The Number */}
        <motion.h1 
            className="font-chunky text-6xl md:text-9xl tracking-tighter mb-6" // Added margin-bottom
            animate={finished ? { 
              x: [-2, 2, -2, 0],
              color: ['#ffffff', '#ff0000', '#ffffff']
            } : {}}
        >
            <motion.span>{rounded}</motion.span>
            <span className="text-gray-500 text-3xl md:text-4xl ml-2">hrs</span>
        </motion.h1>
          
        {/* The Yellow Box - NOW RESPONSIVE */}
        {finished && (
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              // 1. Removed 'absolute' -> Now it sits naturally below the number
              // 2. Added 'max-w-[85%]' -> Forces it to fit on mobile screens
              // 3. Added 'break-words' -> Wraps text if it's still too long
              className="bg-yellow-400 text-black font-messy text-lg md:text-2xl px-6 py-3 border-4 border-white shadow-[4px_4px_0px_#fff] text-center max-w-[85%] break-words leading-tight"
            >
              but when we meet worth every second though 💖
            </motion.div>
        )}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 font-chunky text-sm animate-pulse"
      >
        TAP TO CONTINUE
      </motion.div>
    </div>
  );
};

export default TimeStatsSlide;