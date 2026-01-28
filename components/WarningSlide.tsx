import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';

const WarningSlide: React.FC<SlideProps> = ({ onNext }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden relative cursor-pointer" onClick={onNext}>
      
      {/* Flashing Background */}
      <motion.div 
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-red-600 z-0"
      />

      {/* Marquee Tapes */}
      <div className="absolute top-10 left-0 right-0 -rotate-3 bg-yellow-400 text-black py-2 font-chunky text-sm md:text-xl overflow-hidden border-y-4 border-black z-10">
        <div className="whitespace-nowrap animate-marquee">
             WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING WARNING
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 rotate-2 bg-yellow-400 text-black py-2 font-chunky text-sm md:text-xl overflow-hidden border-y-4 border-black z-10">
        <div className="whitespace-nowrap animate-marquee">
             CAUTION CAUTION CAUTION CAUTION CAUTION CAUTION CAUTION CAUTION CAUTION
        </div>
      </div>

      <div className="relative z-20 text-center p-4 w-full">
        <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1.1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 0.3 }}
            className="text-6xl md:text-8xl mb-6"
        >
            ⚠️
        </motion.div>

        <h1 className="font-chunky text-3xl md:text-6xl text-white mb-6 uppercase border-4 border-white p-4 inline-block bg-black max-w-full break-words leading-tight">
            High Levels of<br/><span className="text-red-500">Obsession</span><br/>Detected
        </h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="font-messy text-lg md:text-2xl text-gray-300 max-w-lg mx-auto"
        >
            "I think I like you a normal amount..." <span className="text-red-500 font-bold">(Lie)</span>
        </motion.p>
      </div>

      <style>{`
        .animate-marquee {
          animation: marquee 10s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default WarningSlide;