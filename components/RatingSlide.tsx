import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';

const RatingSlide: React.FC<SlideProps> = ({ onNext }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-blue-600 overflow-hidden" onClick={onNext}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>

      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-6 md:p-12 border-4 border-black shadow-[15px_15px_0px_rgba(0,0,0,0.5)] max-w-2xl w-full text-center relative z-10"
      >
        <div className="font-chunky text-lg md:text-xl text-gray-400 mb-4 tracking-widest">CUSTOMER REVIEW</div>
        
        {/* Stars */}
        <div className="flex justify-center gap-1 md:gap-4 mb-6 md:mb-8">
            {[1, 2, 3, 4, 5].map((star, i) => (
                <motion.div
                    key={star}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                        type: "spring", 
                        stiffness: 260, 
                        damping: 20, 
                        delay: i * 0.2 
                    }}
                    className="text-4xl md:text-7xl text-yellow-400 drop-shadow-md filter"
                >
                    ⭐
                </motion.div>
            ))}
        </div>

        <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="font-messy text-2xl md:text-5xl font-bold mb-4 leading-tight"
        >
            "Best person I've ever known! Highly recommend to everyone looking for unconditional love and endless support."
        </motion.h2>

        <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 1.8, type: "spring" }}
             className="inline-block bg-green-500 text-white font-chunky text-lg md:text-xl px-6 py-2 rounded-full border-2 border-black shadow-brutal-sm transform rotate-2"
        >
            10/10 SERVICE
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RatingSlide;