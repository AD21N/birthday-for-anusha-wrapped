import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LOADING_TEXTS = [
  "Loading Ayla's Birthday...",
  "Gathering embarrassing photos...",
  "Generating sarcasm...",
  "Calculating emotional damage...",
  "Applying glitter..."
];

const Preloader: React.FC = () => {
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % LOADING_TEXTS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[99999] bg-black flex flex-col items-center justify-center overflow-hidden">
      
      {/* Vinyl Record */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-12">
        <motion.div 
            className="w-full h-full rounded-full bg-black border-4 border-gray-800 shadow-2xl relative flex items-center justify-center overflow-hidden"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
            {/* Grooves */}
            <div className="absolute inset-0 rounded-full" 
                 style={{ 
                     background: 'repeating-radial-gradient(#111 0, #111 2px, #222 3px, #222 4px)' 
                 }} 
            />
            
            {/* Record Label */}
            <div className="absolute w-24 h-24 bg-pink-500 rounded-full border-4 border-white flex items-center justify-center text-center">
                <span className="font-chunky text-[8px] text-white">EST. 2024</span>
            </div>
            
            {/* Center Hole */}
            <div className="absolute w-3 h-3 bg-white rounded-full z-10" />
            
            {/* Shine/Reflection */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Loading Text */}
      <div className="h-12 relative w-full text-center">
        <AnimatePresence mode="wait">
            <motion.p
                key={textIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="font-chunky text-white text-lg md:text-xl tracking-wider absolute left-0 right-0"
            >
                {LOADING_TEXTS[textIndex]}
            </motion.p>
        </AnimatePresence>
      </div>

      {/* Progress Bar (Visual only) */}
      <div className="w-64 h-1 bg-gray-800 rounded-full mt-8 overflow-hidden">
        <motion.div 
            className="h-full bg-pink-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};

export default Preloader;