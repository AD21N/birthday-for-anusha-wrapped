import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps, SlideType } from '../types';

const StandardSlide: React.FC<SlideProps> = ({ data, onNext }) => {
  const isPhoto = data.type === SlideType.PHOTO;

  return (
    <motion.div
      className={`w-full h-full flex flex-col items-center justify-center text-center p-4 md:p-6 cursor-pointer relative z-10`}
      onClick={onNext}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, x: -100, rotate: -10 }}
    >
      {/* Background shape */}
      <div className={`absolute inset-4 md:inset-12 border-4 border-black bg-white/10 backdrop-blur-sm -z-10 rotate-1 shadow-brutal-lg`} />

      {isPhoto && data.image && (
        <motion.div
          initial={{ rotate: -5, scale: 0.8 }}
          animate={{ rotate: 3, scale: 1 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
          className="relative mb-6 md:mb-8 p-3 bg-white border-4 border-black shadow-brutal max-w-[90%]"
        >
            <div className="absolute -top-4 -left-4 w-12 h-12 bg-yellow-400 rounded-full border-4 border-black z-20" />
            <img 
                src={data.image} 
                alt="Slide content" 
                className="w-56 h-56 md:w-80 md:h-80 object-cover border-2 border-black"
            />
            <div className="absolute -bottom-6 -right-6 font-messy text-xl md:text-2xl bg-pink-400 border-4 border-black px-4 py-1 rotate-[-10deg] shadow-brutal-sm text-black">
                Look at this!
            </div>
        </motion.div>
      )}

      <div className="bg-white border-4 border-black p-4 md:p-10 shadow-brutal rotate-[-2deg] w-full max-w-xs md:max-w-3xl mx-4">
        {/* Responsive Text: text-3xl mobile, text-7xl desktop */}
        <h1 className="font-chunky text-3xl md:text-7xl text-black leading-tight uppercase tracking-tighter mb-4 break-words">
            {data.content}
        </h1>

        {data.subContent && (
            <p className="font-messy text-lg md:text-3xl text-pink-600 rotate-1 mt-4">
                {data.subContent}
            </p>
        )}
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="absolute bottom-8 md:bottom-12 font-chunky text-xs md:text-sm bg-black text-white px-6 py-2 rounded-full border-2 border-white shadow-brutal-sm"
      >
        CLICK TO CONTINUE {'->'}
      </motion.div>
    </motion.div>
  );
};

export default StandardSlide;