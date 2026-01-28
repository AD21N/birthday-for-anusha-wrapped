import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SlideProps } from '../types';

// Audio helper for the magical chime
const playMagicalChime = () => {
  const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContext) return;
  const ctx = new AudioContext();

  const now = ctx.currentTime;
  
  // Play a chord: C5, E5, G5, C6 (Magical major chord)
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    // Envelope for a "ding"
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05 + (i * 0.05)); // Staggered attack
    gain.gain.exponentialRampToValueAtTime(0.001, now + 2); // Long tail
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 2.5);
  });
};

const MagicalReveal: React.FC<SlideProps> = ({ data }) => {
  const [caught, setCaught] = useState(false);
  const [snitchPos, setSnitchPos] = useState({ x: 50, y: 50 }); // Percentages

  // Stage 1: The Chase Loop
  useEffect(() => {
    if (caught) return;

    const moveSnitch = () => {
      // Keep within 10% - 90% of screen to avoid edge issues
      const newX = 10 + Math.random() * 80;
      const newY = 10 + Math.random() * 80;
      setSnitchPos({ x: newX, y: newY });
    };

    // Move every 600ms for erratic behavior
    const interval = setInterval(moveSnitch, 600);
    return () => clearInterval(interval);
  }, [caught]);

  const handleCatch = (e: React.MouseEvent) => {
    e.stopPropagation(); // Don't trigger standard slide nav
    if (caught) return;

    setCaught(true);
    playMagicalChime();

    // Stage 2: Confetti Explosion
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#C0C0C0', '#FFFFFF'] // Gold, Silver, White
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FFD700', '#C0C0C0', '#FFFFFF']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#1a1a2e] flex flex-col items-center justify-center cursor-default">
      
      {/* Background Magic Dust */}
      <div className="absolute inset-0 z-0">
         {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-yellow-200 rounded-full blur-[1px]"
              style={{
                width: Math.random() * 3,
                height: Math.random() * 3,
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
              }}
              animate={{
                opacity: [0, 0.8, 0],
                y: [0, -20],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
         ))}
      </div>

      <AnimatePresence>
        {!caught ? (
          <>
            {/* HINT TEXT */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-20 text-center z-10 w-full"
            >
                <h2 className="font-magic text-2xl md:text-4xl text-[#FFD700] tracking-widest drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">
                    CATCH THE SNITCH
                </h2>
                <p className="font-magic text-white/60 mt-2 text-sm">
                    to reveal your gift
                </p>
            </motion.div>

            {/* THE SNITCH */}
            <motion.div
                className="absolute z-50 cursor-pointer"
                animate={{ 
                    left: `${snitchPos.x}%`, 
                    top: `${snitchPos.y}%` 
                }}
                transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 10 
                }}
                onClick={handleCatch}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
                <div className="relative group p-8"> {/* Padding increases hit area */}
                    {/* Wings */}
                    <div className="wing-left absolute top-1/2 left-0 w-8 h-16 bg-white/40 rounded-[100%] origin-right border border-white/60"></div>
                    <div className="wing-right absolute top-1/2 right-0 w-8 h-16 bg-white/40 rounded-[100%] origin-left border border-white/60"></div>
                    
                    {/* Body */}
                    <div className="relative w-8 h-8 rounded-full bg-[radial-gradient(circle_at_30%_30%,#FFD700,#B8860B)] shadow-[0_0_20px_rgba(255,215,0,0.6)] border border-[#DAA520]"></div>
                </div>
            </motion.div>
          </>
        ) : (
          /* STAGE 3: THE GOLDEN TICKET */
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring" }}
            className="relative z-50 max-w-3xl w-[95%] md:w-auto mx-auto"
          >
            {/* Light Burst Behind Ticket */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,#FFD700,transparent_70%)] opacity-20 blur-3xl -z-10 animate-pulse"></div>

            <div className="bg-[#FDF5E6] relative rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row">
                
                {/* Gold Border Overlay */}
                <div className="absolute inset-2 border-4 border-double border-[#B8860B] rounded pointer-events-none z-20"></div>
                
                {/* Left Stub */}
                <div className="bg-[#1a1a2e] w-full md:w-24 p-2 md:p-4 flex md:flex-col items-center justify-center border-b-2 md:border-b-0 md:border-r-2 border-dashed border-[#B8860B] relative">
                    <div className="text-[#B8860B] font-magic font-bold text-center md:-rotate-90 whitespace-nowrap text-lg md:text-xl tracking-widest">
                        ADMIT ONE
                    </div>
                </div>

                {/* Main Content */}
                <div className="p-6 md:p-12 flex-1 text-center relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10" 
                         style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}>
                    </div>

                    <h1 className="font-magic text-xl md:text-4xl text-[#1a1a2e] border-b-2 border-[#B8860B] pb-4 mb-6 inline-block">
                        PLATFORM 9 ¾ - BIRTHDAY SPECIAL
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 text-left max-w-xl mx-auto">
                        <div>
                            <p className="font-magic text-[#B8860B] text-[10px] md:text-xs uppercase tracking-widest mb-1">Passenger</p>
                            <p className="font-hand text-2xl md:text-4xl text-black">
                                {data.ticketData?.passenger || "Ayla"}
                            </p>
                        </div>
                        <div>
                             <p className="font-magic text-[#B8860B] text-[10px] md:text-xs uppercase tracking-widest mb-1">Date</p>
                            <p className="font-hand text-2xl md:text-4xl text-black">
                                {data.ticketData?.date || "Today"}
                            </p>
                        </div>
                        <div className="col-span-1 md:col-span-2 mt-2">
                             <p className="font-magic text-[#B8860B] text-[10px] md:text-xs uppercase tracking-widest mb-2">Destination (Gift)</p>
                            <p className="font-hand text-3xl md:text-6xl text-[#740001] leading-tight break-words">
                                {data.ticketData?.destination || "A Surprise Gift"}
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-12 pt-4 border-t border-[#B8860B]/30 flex justify-between items-end">
                        <div className="text-left">
                            <p className="font-magic text-[8px] md:text-[10px] text-gray-500 uppercase">Issued By</p>
                            <p className="font-hand text-lg md:text-xl">The Ministry of Magic</p>
                        </div>
                        <div className="text-right">
                             <p className="font-magic text-[8px] md:text-[10px] text-gray-500 uppercase">Conditions</p>
                            <p className="font-magic text-[10px] md:text-xs text-[#1a1a2e] font-bold">Strictly Non-Refundable</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center">
                 <p className="text-white/50 font-magic text-xs">Screenshot this ticket to redeem.</p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .wing-left {
            animation: flutterLeft 0.1s infinite alternate;
        }
        .wing-right {
            animation: flutterRight 0.1s infinite alternate;
        }

        @keyframes flutterLeft {
            0% { transform: rotateY(0deg) rotateZ(0deg); }
            100% { transform: rotateY(60deg) rotateZ(-20deg); }
        }
        @keyframes flutterRight {
            0% { transform: rotateY(0deg) rotateZ(0deg); }
            100% { transform: rotateY(-60deg) rotateZ(20deg); }
        }
      `}</style>
    </div>
  );
};

export default MagicalReveal;