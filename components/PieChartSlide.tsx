import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';

const PieChartSlide: React.FC<SlideProps> = ({ onNext }) => {
  // Pie chart calculation
  // Circle circumference = 2 * PI * 40 ≈ 251.2
  // 10% slice = 25.12
  // 90% slice = 226.08
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-[#F3E5F5]" onClick={onNext}>
      <h1 className="font-chunky text-2xl md:text-5xl mb-8 text-center bg-white border-4 border-black px-4 py-2 shadow-brutal rotate-[-2deg] z-10 text-black max-w-full">
        DECISIONS OF WHAT TO WEAR 🍽️
      </h1>

      {/* Scaled Container: w-64 on mobile, w-96 on desktop */}
      <div className="relative w-64 h-64 md:w-96 md:h-96 flex-shrink-0">
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full -rotate-90 drop-shadow-xl"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: -90, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Slice B (90%) - The "I don't know" part */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#FF6B6B" // Red/Pink
            strokeWidth="20" // Thick donut
            strokeDasharray="226.08 251.2" 
            strokeDashoffset="0"
            whileHover={{ scale: 1.05, strokeWidth: 22 }}
          />
          
          {/* Slice A (10%) - The Actual Decision */}
          <motion.circle
            cx="50"
            cy="50"
            r="40"
            fill="transparent"
            stroke="#4ECDC4" // Teal
            strokeWidth="22" // Slightly thicker to pop
            strokeDasharray="25.12 251.2"
            strokeDashoffset="-226.08" // Start where the other ends
            whileHover={{ scale: 1.1, strokeWidth: 24 }}
          />
        </motion.svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="font-chunky text-2xl md:text-4xl text-black">TRUTH</span>
        </div>
      </div>

      {/* Legend */}
      <motion.div 
        className="mt-8 md:mt-12 space-y-4 w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-4 bg-white p-4 border-4 border-black shadow-brutal hover:scale-105 transition-transform">
            <div className="w-8 h-8 flex-shrink-0 bg-[#4ECDC4] border-2 border-black rounded-full" />
            <div className="font-messy font-bold text-sm md:text-lg leading-tight text-black">
                Going with my choice (10%)
            </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-4 border-4 border-black shadow-brutal hover:scale-105 transition-transform">
            <div className="w-8 h-8 flex-shrink-0 bg-[#FF6B6B] border-2 border-black rounded-full" />
            <div className="font-messy font-bold text-sm md:text-lg leading-tight text-black">
                Going with yours (90%)
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PieChartSlide;