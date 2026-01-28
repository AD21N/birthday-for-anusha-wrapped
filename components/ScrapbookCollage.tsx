import React from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';

// Placeholder images for the collage
const MEMORIES = [
 { src: "/eyes.jpg", caption: "eyes worth dying" },
  { src: "/WhatsApp Image 2026-01-11 at 7.32.10 PM.jpeg", caption: "Pretty" },
  { src: "/f5a60d52-9979-412b-ba8e-59aaaff12c6f.jpg", caption: "Cute!" },
  { src: "/WhatsApp Image 2026-01-28 at 11.32.29 PM.jpeg", caption: "Oops..." },
  { src: "/4958da8e-ccf2-4866-9c7b-12ade9d30fa8.jpg", caption: "Our Adventours Date Evening" },
  { src: "/talented.jpg", caption: "Talented" },
];

// Messy positions to make it look "thrown" on the table
// Using percentages to be responsive-ish
const POSITIONS = [
  { top: "15%", left: "5%", rotate: -6, zIndex: 1 },
  { top: "10%", right: "5%", rotate: 8, zIndex: 2 },
  { top: "45%", left: "15%", rotate: 5, zIndex: 3 },
  { top: "40%", right: "15%", rotate: -12, zIndex: 4 },
  { bottom: "15%", left: "8%", rotate: -8, zIndex: 5 },
  { bottom: "10%", right: "8%", rotate: 4, zIndex: 6 },
];

const ScrapbookCollage: React.FC<SlideProps> = ({ data, onNext }) => {
  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-center">
      {/* Title Section */}
      <div className="relative z-50 mt-8 md:mt-12 bg-white border-4 border-black p-4 shadow-brutal rotate-[-2deg]">
        <h1 className="font-chunky text-2xl md:text-5xl text-black uppercase">{data.content}</h1>
        <div className="absolute -right-4 -top-4 text-3xl">📌</div>
      </div>

      {/* Collage Area */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Decorations - absolute positioned but draggable */}
        <DraggableSticker top="25%" left="45%" rotate={15} text="XOXO" color="text-pink-500" />
        <DraggableSticker top="65%" right="40%" rotate={-10} text="LOL" color="text-yellow-500" />
        <DraggableSticker bottom="25%" left="40%" rotate={5} text="memories" color="text-blue-500" />
        
        {/* Photos */}
        {MEMORIES.map((item, index) => (
          <DraggablePhoto
            key={index}
            src={item.src}
            caption={item.caption}
            initialPos={POSITIONS[index] || POSITIONS[0]}
            index={index}
          />
        ))}
      </div>

      {/* Next Button */}
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-8 z-[100] bg-black text-white font-chunky text-lg px-8 py-3 rounded-full border-4 border-white shadow-brutal hover:bg-gray-900 pointer-events-auto"
      >
        NEXT {'->'}
      </motion.button>
    </div>
  );
};

// Helper for the photos
const DraggablePhoto = ({ src, caption, initialPos, index }: { src: string, caption: string, initialPos: any, index: number }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 50, transition: { duration: 0.2 } }}
      whileDrag={{ scale: 1.15, zIndex: 60, cursor: "grabbing" }}
      initial={{ 
        opacity: 0, 
        scale: 0.5, 
        y: 100,
        rotate: initialPos.rotate 
      }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: initialPos.rotate 
      }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: index * 0.1 
      }}
      className="absolute pointer-events-auto cursor-grab touch-none p-3 pb-8 bg-white shadow-xl max-w-[140px] md:max-w-[240px]"
      style={{
        top: initialPos.top,
        bottom: initialPos.bottom,
        left: initialPos.left,
        right: initialPos.right,
      }}
    >
      {/* The Tape Effect */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/40 backdrop-blur-[2px] shadow-sm rotate-[-2deg] z-20 pointer-events-none border-l border-r border-white/20" />

      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-gray-100 border border-gray-200">
        <img
          src={src}
          alt={caption}
          draggable={false}
          className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <span className="font-messy text-black text-sm md:text-xl transform -rotate-1 inline-block">
          {caption}
        </span>
      </div>
    </motion.div>
  );
};

// Helper for stickers
const DraggableSticker = ({ top, left, right, bottom, rotate, text, color }: any) => (
  <motion.div
    drag
    className={`absolute pointer-events-auto cursor-move font-messy text-3xl md:text-5xl ${color} z-40`}
    style={{ top, left, right, bottom, rotate }}
    whileHover={{ scale: 1.2 }}
  >
    {text}
  </motion.div>
);

export default ScrapbookCollage;