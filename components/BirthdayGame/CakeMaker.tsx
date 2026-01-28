import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CakeMakerProps {
  onComplete: () => void;
}

const FLAVORS = [
  { id: 'vanilla', color: 'bg-[#FDF5E6]', name: 'Vanilla', border: 'border-[#E6C9A8]' },
  { id: 'chocolate', color: 'bg-[#5D4037]', name: 'Choco', border: 'border-[#3E2723]' },
  { id: 'strawberry', color: 'bg-[#FFB7B2]', name: 'Berry', border: 'border-[#E57373]' },
  { id: 'matcha', color: 'bg-[#C5E1A5]', name: 'Matcha', border: 'border-[#AED581]' },
];

const TOPPINGS = [
  { id: 'straw', icon: '🍓' },
  { id: 'candle', icon: '🕯️' },
  { id: 'cherry', icon: '🍒' },
  { id: 'flower', icon: '🌸' },
  { id: 'lollipop', icon: '🍭' },
  { id: 'star', icon: '⭐' },
];

const CakeMaker: React.FC<CakeMakerProps> = ({ onComplete }) => {
  const [layers, setLayers] = useState<{ color: string, border: string }[]>([]);
  const [toppings, setToppings] = useState<{ id: number, icon: string, offset: number }[]>([]);

  const addLayer = (flavor: typeof FLAVORS[0]) => {
    if (layers.length < 5) {
      setLayers([{ color: flavor.color, border: flavor.border }, ...layers]);
    }
  };

  const addTopping = (icon: string) => {
    const randomOffset = (Math.random() * 40) - 20; 
    setToppings([...toppings, { 
      id: Date.now(), 
      icon,
      offset: randomOffset
     }]);
  };

  const removeTopping = (id: number) => {
    setToppings(prev => prev.filter(t => t.id !== id));
  };

  const handleFinish = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(onComplete, 1000);
  };

  // Adjusted layer height for better mobile fit
  const LAYER_HEIGHT_PX = 40; 

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-2 md:p-4 select-none touch-none overflow-hidden">
      {/* Header */}
      <div className="text-center mb-2 md:mb-8 shrink-0">
        <h2 className="sticker-text font-chunky text-2xl md:text-5xl text-pink-500 rotate-1">
          BAKE A CAKE 🎂
        </h2>
      </div>

      {/* Game Area */}
      <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-center overflow-hidden">
        
        {/* The Cake Stand Area */}
        <div className="relative w-full md:w-1/2 h-[45vh] md:h-[400px] flex flex-col items-center justify-end pb-12 shrink-0">
           
           {/* Toppings Container */}
           <div 
             className="absolute w-full flex justify-center pointer-events-none transition-all duration-300 ease-out z-20"
             style={{ 
               bottom: `${(layers.length * LAYER_HEIGHT_PX) + 30}px`, 
             }}
           >
             <AnimatePresence>
             {toppings.map((t) => (
               <motion.div
                 key={t.id}
                 drag
                 dragMomentum={false}
                 initial={{ y: -50, opacity: 0, scale: 0, x: "-50%" }}
                 animate={{ y: 0, opacity: 1, scale: 1, x: "-50%" }}
                 exit={{ scale: 0, opacity: 0 }}
                 whileHover={{ scale: 1.2, cursor: 'grab', zIndex: 50 }}
                 whileDrag={{ scale: 1.3, cursor: 'grabbing', zIndex: 60 }}
                 className="absolute sticker-text text-4xl md:text-5xl origin-bottom pointer-events-auto touch-none"
                 style={{ 
                   left: '50%',
                   marginLeft: t.offset, 
                 }}
                 onDoubleClick={() => removeTopping(t.id)}
               >
                 {t.icon}
               </motion.div>
             ))}
             </AnimatePresence>
           </div>

           {/* Stacked CSS Layers */}
           <div className="flex flex-col-reverse items-center z-10">
              <AnimatePresence>
                {layers.map((layer, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: -50, opacity: 0, scale: 0.8 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    // Height is h-10 (40px) to match LAYER_HEIGHT_PX
                    className={`w-40 md:w-56 h-10 ${layer.color} border-2 ${layer.border} rounded-lg shadow-sm relative`}
                  >
                      <div className="absolute top-1 left-2 right-2 h-1/3 bg-white/20 rounded-full blur-[1px]"></div>
                  </motion.div>
                ))}
              </AnimatePresence>
           </div>
           
           {/* Plate */}
           <div className="w-56 md:w-72 h-4 bg-white border-2 border-gray-300 rounded-[50%] shadow-lg z-0 mt-[-5px] relative">
             <div className="absolute inset-x-0 bottom-[-10px] h-4 bg-gray-200 rounded-[50%] -z-10"></div>
           </div>
           
           {/* Stand Base */}
           <div className="w-4 h-16 bg-gray-300 -mt-2 -z-20"></div>
           <div className="w-24 h-4 bg-gray-300 rounded-full -mt-0 -z-20"></div>

        </div>

        {/* Controls - Made scrollable on very small screens */}
        <div className="w-full md:w-1/3 bg-white/80 backdrop-blur-sm border-4 border-white rounded-2xl p-4 md:p-6 shadow-xl overflow-y-auto max-h-[35vh] md:max-h-none">
          <h3 className="font-chunky text-gray-400 text-sm md:text-lg mb-2 text-center">LAYERS</h3>
          <div className="flex justify-center gap-3 mb-4 md:mb-8">
            {FLAVORS.map(f => (
              <motion.button 
                key={f.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addLayer(f)}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white shadow-md ${f.color}`}
                title={f.name}
              />
            ))}
          </div>

          <h3 className="font-chunky text-gray-400 text-sm md:text-lg mb-2 text-center">TOPPINGS</h3>
          <div className="grid grid-cols-6 md:grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-8">
            {TOPPINGS.map(t => (
              <motion.button 
                key={t.id}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => addTopping(t.icon)}
                className="sticker-text text-3xl md:text-4xl flex justify-center focus:outline-none"
              >
                {t.icon}
              </motion.button>
            ))}
          </div>

          <button 
            onClick={handleFinish}
            disabled={layers.length === 0}
            className="w-full bg-green-400 text-white font-chunky text-lg md:text-xl py-2 md:py-3 rounded-xl shadow-brutal hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            SERVE IT!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CakeMaker;