import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SlideProps } from '../types';

const ScratchSlide: React.FC<SlideProps> = ({ data, onNext }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match visual size
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Fill with "Foil"
    ctx.fillStyle = '#C0C0C0'; // Silver
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add noise texture to foil
    for (let i = 0; i < 5000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? '#A0A0A0' : '#E0E0E0';
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    
    // Add text on top of foil
    ctx.font = "bold 30px 'Rubik Mono One'";
    ctx.fillStyle = "#555";
    ctx.textAlign = "center";
    ctx.fillText("SCRATCH ME!", canvas.width / 2, canvas.height / 2);

    ctx.globalCompositeOperation = 'destination-out';
  }, []);

  const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x, y;

    if ('touches' in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = (e as React.MouseEvent).clientX - rect.left;
        y = (e as React.MouseEvent).clientY - rect.top;
    }

    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    // Calculate scratch percentage (simplified)
    // In a production app, we'd count pixels, but let's just use number of events for performance
    setScratchPercent(prev => {
        const newPercent = prev + 0.5;
        if (newPercent > 30 && !isScratched) { // Threshold to reveal button
            setIsScratched(true);
        }
        return newPercent;
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      <h1 className="font-chunky text-3xl md:text-5xl text-black mb-8 text-center bg-white border-4 border-black p-4 shadow-brutal rotate-[-2deg]">
        {data.content}
      </h1>

      <div className="relative w-full max-w-md aspect-[4/5] border-4 border-black bg-white p-2 shadow-brutal-lg rotate-1">
        {/* Hidden Image */}
        <img 
          src={data.image} 
          alt="Hidden" 
          className="absolute inset-0 w-full h-full object-cover p-2 pointer-events-none" 
        />
        
        {/* Scratch Canvas */}
        <div ref={containerRef} className="absolute inset-2 z-10">
            <canvas
            ref={canvasRef}
            className="w-full h-full cursor-crosshair touch-none"
            onMouseMove={(e) => {
                if (e.buttons === 1) handleScratch(e);
            }}
            onTouchMove={handleScratch}
            />
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isScratched ? 1 : 0, scale: isScratched ? 1 : 0 }}
        onClick={onNext}
        className="mt-8 bg-green-400 text-black font-chunky text-xl px-8 py-4 border-4 border-black shadow-brutal hover:translate-y-1 hover:shadow-none transition-all"
      >
        OKAY, MOVE ON 😬
      </motion.button>
    </div>
  );
};

export default ScratchSlide;