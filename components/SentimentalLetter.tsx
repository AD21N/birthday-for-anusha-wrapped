import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideProps } from '../types';

const SentimentalLetter: React.FC<SlideProps> = ({ onNext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      setIsOpen(true);
      // Delay showing the full reading mode slightly to match animation
      setTimeout(() => setShowFullContent(true), 800);
    }
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#0a0a2a] flex items-center justify-center p-4">
      
      {/* Dust Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Main Container - Transitions from center to full screen modal-ish */}
      <AnimatePresence mode="wait">
        {!showFullContent ? (
          <motion.div 
            key="envelope-container"
            onClick={handleOpen}
            className="relative cursor-pointer group"
            exit={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 0.5 }}
          >
            {/* The Envelope */}
            <div className="relative w-72 h-48 md:w-80 md:h-52 bg-[#e0e0e0] shadow-2xl flex items-end justify-center perspective-1000">
              
              {/* Back of Envelope */}
              <div className="absolute inset-0 bg-[#d1d1d1] z-0 rounded-b-md"></div>

              {/* The Letter (Inside) */}
              <motion.div 
                className="absolute w-[90%] h-[90%] bg-white shadow-md z-10 flex flex-col p-4 items-center justify-center text-center"
                initial={{ y: 0 }}
                animate={{ y: isOpen ? -100 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                 <p className="font-messy text-xs text-gray-400">Read me...</p>
                 <div className="mt-2 w-8 h-1 bg-gray-200 rounded"></div>
                 <div className="mt-1 w-6 h-1 bg-gray-200 rounded"></div>
              </motion.div>

              {/* Front Pockets (The folds) */}
              {/* Note: Fixed widths here might be tricky, better to use percentages or SVG, but keeping existing CSS style with scale for simplicity */}
              <div 
                className="absolute bottom-0 left-0 w-0 h-0 border-l-[140px] md:border-l-[160px] border-l-transparent border-b-[96px] md:border-b-[104px] border-b-[#f5f5f5] border-r-[140px] md:border-r-[160px] border-r-transparent z-20 rounded-b-md pointer-events-none"
              ></div>
              <div 
                className="absolute bottom-0 left-0 w-0 h-0 border-l-[140px] md:border-l-[160px] border-l-[#e6e6e6] border-b-[96px] md:border-b-[104px] border-b-transparent border-t-[96px] md:border-t-[104px] border-t-transparent z-20 rounded-bl-md pointer-events-none"
              ></div>
              <div 
                className="absolute bottom-0 right-0 w-0 h-0 border-r-[140px] md:border-r-[160px] border-r-[#e6e6e6] border-b-[96px] md:border-b-[104px] border-b-transparent border-t-[96px] md:border-t-[104px] border-t-transparent z-20 rounded-br-md pointer-events-none"
              ></div>

              {/* Top Flap */}
              <motion.div 
                className="absolute top-0 w-0 h-0 border-l-[140px] md:border-l-[160px] border-l-transparent border-t-[96px] md:border-t-[104px] border-t-[#dcdcdc] border-r-[140px] md:border-r-[160px] border-r-transparent origin-top z-30 drop-shadow-md"
                animate={{ rotateX: isOpen ? 180 : 0, zIndex: isOpen ? 0 : 30 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              ></motion.div>

              {/* Wax Seal */}
              <motion.div 
                className="absolute top-[40%] bg-red-800 w-12 h-12 rounded-full border-4 border-red-900 z-40 flex items-center justify-center text-red-950 font-serif text-xl shadow-md"
                animate={{ opacity: isOpen ? 0 : 1 }}
              >
                A
              </motion.div>

              {/* Hover hint */}
              {!isOpen && (
                <div className="absolute -bottom-12 font-chunky text-white text-sm opacity-50 group-hover:opacity-100 transition-opacity">
                    CLICK TO OPEN
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="letter-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-50 max-w-2xl w-[95%] md:w-full bg-[#fafafa] p-6 md:p-12 shadow-2xl relative rotate-1 max-h-[90dvh]"
          >
            {/* Paper texture feel */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}></div>

            <div className="relative font-serif text-gray-800 leading-relaxed space-y-4 md:space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar pr-2 md:pr-4">
               <h1 className="font-messy text-2xl md:text-5xl text-[#0a0a2a] mb-4 md:mb-6 border-b-2 border-[#0a0a2a] pb-4 inline-block">
                 My Dearest Ayla,
               </h1>

               <p className="text-lg md:text-2xl font-bold">
                 Okay, jokes aside... You are the best thing that ever happened to me.
               </p>

               <p className="text-base md:text-lg">
                 I know I make alot of mistakes got angry to you yelled at you multiple time, I deserves life sentences I annoy you I roast you but I wouldn't trade any of it for the world.
               </p>

               <p className="text-base md:text-lg">
                 You make the mundane moments feel like adventures. Thank you for being my partner in crime, my favorite person to annoy, and the love of my life.
               </p>

               <p className="text-base md:text-lg">
                 Here is to another year of chaos, laughter, and me waiting for you to make me chai (Mene tmhary haath ki chai peeniii).
               </p>

               <p className="font-messy text-xl md:text-2xl mt-8 text-right">
                 Love always,<br/>
                 [Asaad]
               </p>
            </div>

            <div className="mt-6 md:mt-8 text-center">
                <button 
                  onClick={onNext}
                  className="bg-[#0a0a2a] text-white font-chunky text-sm md:text-base px-8 py-3 rounded-full hover:bg-opacity-90 transition-all"
                >
                    CONTINUE
                </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SentimentalLetter;