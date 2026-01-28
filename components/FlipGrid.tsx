import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { SlideProps } from '../types';

const cards = [
  { id: 1, title: "Your Patience", compliment: "You have the patience of a saint...", roast: "You talk too much (Love your yapping)", icon: "🧘‍♀️" },
  { id: 2, title: "Your Cooking", compliment: "You make the best food...", roast: "You Smell like going through garden of flowers on a windy day", icon: "🍳" },
  { id: 3, title: "Your Intelligence", compliment: "You are a genius...", roast: "Love it when you try to push a 'Pull' door.", icon: "🧠" },
  { id: 4, title: "Your Fashion Sense", compliment: "You have impeccable style...", roast: "Can I talk about your choices cause GOD DAMN", icon: "🧥" },
  { id: 5, title: "Decision Making", compliment: "I love our dinner dates...", roast: "Asking out of the space question (Like wdym ppl dont sell the organs of dead)", icon: "🍔" },
  { id: 6, title: "Your Photography", compliment: "You capture the best moments...", roast: "You is me me is you", icon: "📸" },
  { id: 7, title: "Movie Nights", compliment: "I love watching movies with you...", roast: "Falling asleep 5 min later , after I started my BORING Barbie ki story.", icon: "🎬" },
  { id: 8, title: "Financial Wisdom", compliment: "You are so money savvy...", roast: "Your IQ level is at 100 but when it comes to math idk where it goes", icon: "💸" },
  { id: 9, title: "Temperature Control", compliment: "You bring the heat...", roast: "And why are your feet always blocks of ice?", icon: "❄️" },
  { id: 10, title: "Communication", compliment: "You're a great listener...", roast: "Miss tiktoker", icon: "📱" },
  { id: 11, title: "Navigation Skills", compliment: "You always find a way...", roast: "Watching Game of thrones I mean HELL YEAH", icon: "🗺️" }
];

const FlipGrid: React.FC<SlideProps> = ({ onNext }) => {
  return (
    <div className="w-full h-full flex flex-col items-center relative z-10">
      {/* Header Section */}
      <div className="pt-8 pb-4 text-center z-20 flex-shrink-0">
        <h1 className="font-chunky text-3xl md:text-5xl text-black bg-white inline-block px-6 py-2 border-4 border-black shadow-brutal rotate-[-2deg]">
          WHY I LOVE YOU
        </h1>
        <p className="font-messy text-xl mt-3 text-pink-600 font-bold bg-white/80 inline-block px-2 rotate-1">
          (Hover & Click to reveal the truth)
        </p>
      </div>

      {/* Scrollable Grid Container */}
      <div className="flex-1 w-full overflow-y-auto p-4 md:p-8 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto pb-32 perspective-[2000px]">
          {cards.map((card) => (
            <FlipCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-50">
         <motion.button 
           onClick={onNext}
           whileHover={{ scale: 1.05 }}
           whileTap={{ scale: 0.95 }}
           className="bg-black text-white font-chunky text-xl px-10 py-4 rounded-full border-4 border-white shadow-brutal hover:bg-gray-900 pointer-events-auto transition-all"
         >
           OKAY, ENOUGH {'->'}
         </motion.button>
      </div>
    </div>
  );
};

// 3D Flip Card Component
const FlipCard = ({ card }: { card: typeof cards[0] }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Motion values for 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring physics for smooth movement
  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  // Convert mouse position to rotation degrees
  // When mouse moves right (positive x), card rotates Y positive (right side goes back) or negative (right side comes forward)?
  // Standard tilt: Mouse right -> Rotate Y positive. Mouse up -> Rotate X negative.
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Dynamic Glare
  const glareX = useTransform(mouseX, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseY, [-0.5, 0.5], [0, 100]);
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Normalize mouse position from -0.5 to 0.5
    const width = rect.width;
    const height = rect.height;
    
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;
    
    const xPct = (mouseXPos / width) - 0.5;
    const yPct = (mouseYPos / height) - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div className="h-80 w-full" style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        style={{ 
            rotateX, 
            rotateY, 
            transformStyle: "preserve-3d" 
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full h-full relative cursor-pointer"
        whileHover={{ scale: 1.02 }}
      >
        <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: "preserve-3d" }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
            {/* FRONT FACE: ANGELIC */}
            <div className="absolute inset-0 backface-hidden bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] rounded-2xl p-6 flex flex-col items-center justify-center text-center overflow-hidden">
                {/* Glare Effect */}
                <motion.div 
                    style={{ background: glareBackground }}
                    className="absolute inset-0 opacity-40 pointer-events-none z-10"
                />
                
                {/* Sticker Icon */}
                <motion.div
                    key="sticker"
                    animate={{ scale: isFlipped ? 0 : [0.8, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                    className="text-7xl mb-4 sticker-text z-20"
                >
                    {card.icon}
                </motion.div>

                <h3 className="font-chunky text-xl text-gray-800 tracking-wider mb-2 z-20 drop-shadow-sm">
                    {card.title}
                </h3>
                <p className="font-sans font-medium text-gray-700 text-sm leading-tight z-20">
                    {card.compliment}
                </p>

                <div className="absolute bottom-3 text-[10px] uppercase tracking-widest text-gray-400 font-bold z-20">
                    Flip for truth
                </div>
            </div>

            {/* BACK FACE: CHAOTIC */}
            <div 
                className="absolute inset-0 backface-hidden bg-[#FF4757] border-4 border-black rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-brutal overflow-hidden"
                style={{ transform: "rotateY(180deg)" }}
            >
                {/* Noise/Texture Overlay */}
                <div className="absolute inset-0 opacity-30 mix-blend-multiply" 
                     style={{ 
                         backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
                         backgroundSize: '10px 10px'
                     }}>
                </div>
                
                {/* Warning Tape */}
                <div className="absolute top-4 -right-8 w-32 h-8 bg-yellow-400 border-2 border-black rotate-45 flex items-center justify-center shadow-sm z-10">
                    <span className="font-chunky text-[10px] text-black">WARNING</span>
                </div>

                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: isFlipped ? 1 : 0.5, opacity: isFlipped ? 1 : 0 }}
                    transition={{ delay: 0.1, type: "spring" }}
                    className="z-20"
                >
                    <div className="font-messy text-3xl md:text-4xl text-white font-bold leading-none -rotate-2 drop-shadow-md">
                        {card.roast}
                    </div>
                </motion.div>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 sticker-text text-3xl opacity-50 z-10">
                    💀
                </div>
            </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FlipGrid;