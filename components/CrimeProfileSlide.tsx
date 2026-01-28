import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';

const CrimeProfileSlide: React.FC<SlideProps> = ({ data, onNext }) => {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-[url('')] bg-amber-100" onClick={onNext}>
      
      <motion.div 
        initial={{ y: -1000, rotate: -20 }}
        animate={{ y: 0, rotate: -2 }}
        transition={{ type: "spring", damping: 15 }}
        className="bg-[#F4E4BC] p-4 md:p-6 max-w-md w-full shadow-[10px_10px_20px_rgba(0,0,0,0.3)] border border-gray-400 relative"
      >
        {/* Tape */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 bg-white/40 backdrop-blur-sm border-l border-r border-white/50 rotate-[-2deg] shadow-sm"></div>

        <div className="border-4 border-black p-4 flex flex-col items-center">
            <motion.h1 
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="font-chunky text-4xl md:text-6xl text-red-700 tracking-widest mb-4 mt-2"
            >
                WANTED
            </motion.h1>

            {/* Photo Area */}
            {/* The grayscale and contrast classes here make it look like a newspaper! */}
            <div className="w-full aspect-square bg-gray-200 border-2 border-black mb-6 relative overflow-hidden grayscale contrast-125">
                
                {/* 👇 UPDATE THIS LINE 👇 */}
                <img 
                    src="/7b6dc49b-e984-44c5-9c6d-10cb4f9aa32f.jpg" 
                    className="w-full h-full object-cover" 
                    alt="Suspect" 
                />
                
                <div className="absolute bottom-0 inset-x-0 h-1/4 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            <div className="w-full font-mono text-left text-xs md:text-base space-y-2 mb-4">
                <div className="border-b border-black border-dashed flex justify-between">
                    <span>NAME:</span>
                    <span className="font-bold">Anusha (also goes with Ayla)</span>
                </div>
                <div className="border-b border-black border-dashed flex justify-between">
                    <span>STATUS:</span>
                    <span className="font-bold text-red-600">AT LARGE</span>
                </div>
            </div>

            <div className="w-full text-left">
                <h3 className="font-chunky text-lg md:text-xl mb-2 underline decoration-wavy decoration-red-500">KNOWN OFFENSES:</h3>
                <ul className="font-messy text-base md:text-lg list-disc pl-5 space-y-1">
                    <li>Grand Theft Heart</li>
                    <li>First Degree Heart Stealing</li>
                    <li>Aggressive Cuteness</li>
                    <li>Premeditated Snack Theft</li>
                </ul>
            </div>
            
            <div className="mt-6 border-2 border-black px-4 py-1 rotate-3 font-chunky text-red-600 text-xs md:text-sm text-center">
                REWARD: INFINITE CUDDLES
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CrimeProfileSlide;