import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';

const MoodSliderSlide: React.FC<SlideProps> = ({ onNext }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-br from-indigo-200 to-purple-200" onClick={onNext}>
      <h1 className="font-chunky text-3xl md:text-4xl text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] mb-12 md:mb-16 text-center">
        OFFICIAL VIBE CHECK
      </h1>

      <div className="w-full max-w-2xl bg-white border-4 border-black p-6 md:p-8 rounded-2xl shadow-brutal relative">
        {/* Labels */}
        <div className="flex justify-between items-center mb-8 relative z-10">
            <div className="text-center">
                <div className="text-4xl md:text-6xl mb-2">😇</div>
                <div className="font-chunky text-xs md:text-lg">LITERAL ANGEL</div>
            </div>
            <div className="text-center">
                <div className="text-4xl md:text-6xl mb-2">😈</div>
                <div className="font-chunky text-xs md:text-lg">SPICY GREMLIN</div>
            </div>
        </div>

        {/* Track */}
        <div className="relative h-6 md:h-8 bg-gray-200 rounded-full border-2 border-black overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 via-purple-300 to-red-400 opacity-50"></div>
            
            {/* The Thumb/Slider */}
            <motion.div
                className="absolute top-0 bottom-0 w-6 md:w-8 bg-black border-2 border-white rounded-full shadow-lg cursor-grab active:cursor-grabbing"
                initial={{ left: "10%" }}
                animate={{ 
                    left: ["10%", "90%", "10%", "90%", "50%"] 
                }}
                transition={{
                    duration: 3,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    ease: "easeInOut",
                    delay: 0.5
                }}
            >
                <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                    YOU
                </div>
            </motion.div>
        </div>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
            className="text-center mt-6 md:mt-8 font-messy text-lg md:text-xl text-gray-500"
        >
            (Perfectly balanced, as all things should be)
        </motion.p>
      </div>
    </div>
  );
};

export default MoodSliderSlide;