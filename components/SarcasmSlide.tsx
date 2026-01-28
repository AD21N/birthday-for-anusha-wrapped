import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SlideProps } from '../types';

const SarcasmSlide: React.FC<SlideProps> = ({ data, onNext }) => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (revealed) {
      confetti({
        origin: { y: 0.6 },
        particleCount: 150,
        spread: 100,
        colors: ['#000000', '#FFFFFF', '#FF00FF'] // Punk colors
      });
    }
  }, [revealed]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!revealed) {
      setRevealed(true);
    } else {
      onNext();
    }
  };

  return (
    <motion.div
      className="w-full h-full flex flex-col items-center justify-center text-center p-4 md:p-8 cursor-pointer relative overflow-hidden"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="sweet"
            initial={{ scale: 0.8, rotate: -2 }}
            animate={{ scale: 1, rotate: 2 }}
            exit={{ scale: 0.5, rotate: -10, opacity: 0 }}
            className="bg-white border-4 border-black p-6 md:p-12 shadow-brutal max-w-full mx-4"
          >
            <h2 className="font-messy text-xl md:text-3xl text-gray-500 mb-4">
              I really admire your...
            </h2>
            {/* Responsive Font */}
            <h1 className="font-chunky text-4xl md:text-8xl text-pink-500 uppercase leading-none break-words">
              {data.content}
            </h1>
          </motion.div>
        ) : (
          <motion.div
            key="sarcastic"
            initial={{ scale: 0.5, opacity: 0, rotate: 10 }}
            animate={{ scale: 1, opacity: 1, rotate: -3 }}
            className="relative w-full max-w-4xl px-4"
          >
            {/* Sticker background */}
            <div className="absolute -inset-4 md:-inset-20 bg-yellow-400 border-4 border-black rotate-3 -z-10 shadow-brutal-lg" />
            
             <motion.div 
               animate={{ x: [-5, 5, -5] }}
               transition={{ repeat: Infinity, duration: 0.2 }}
               className="bg-black text-white p-6 md:p-8 border-4 border-white shadow-brutal"
             >
               <div className="font-messy text-lg md:text-2xl text-yellow-300 absolute -top-4 md:-top-6 left-1/2 -translate-x-1/2 bg-black px-4 py-1 rotate-[-5deg]">
                 Actually...
               </div>
               {/* Responsive Font */}
               <h1 className="font-chunky text-4xl md:text-8xl leading-tight text-white uppercase break-words">
                 {data.revealContent}
               </h1>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

       <div className="absolute bottom-12 font-chunky text-xs bg-white text-black px-4 py-2 border-2 border-black z-20">
        {revealed ? "NEXT PLEASE" : "TAP TO REVEAL TRUTH"}
      </div>
    </motion.div>
  );
};

export default SarcasmSlide;