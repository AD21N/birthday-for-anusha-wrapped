import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Trash2, CheckCircle } from 'lucide-react';

interface RoomDecoratorProps {
  onComplete: () => void;
}

interface PlacedItem {
  uniqueId: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
}

// Sticker Inventory
const STICKERS = [
  { category: 'Decor', items: ['🎈', '🎉', '🪩', '🎁', '🎀', '🎊'] },
  { category: 'Vibe', items: ['✨', '🎵', '🧸', '💖', '👑', '🌈'] },
  { category: 'Food', items: ['🍰', '🥂', '🍕', '🍩', '🍪', '🥤'] },
];

const RoomDecorator: React.FC<RoomDecoratorProps> = ({ onComplete }) => {
  const roomRef = useRef<HTMLDivElement>(null);
  
  // Pre-placed Banner using individual letters for a "bunting" look, 
  // but for the sake of the "Sticker" request, let's use a big text sticker.
  const [placedItems, setPlacedItems] = useState<PlacedItem[]>([
    {
      uniqueId: 1,
      emoji: 'HAPPY BIRTHDAY AYLA',
      x: 50,
      y: 20,
      scale: 1
    }
  ]);

  const [activeTab, setActiveTab] = useState('Decor');

  const handleSpawnItem = (emoji: string) => {
    const newItem: PlacedItem = {
      uniqueId: Date.now() + Math.random(),
      emoji,
      x: 50 + (Math.random() * 20 - 10),
      y: 60 + (Math.random() * 20 - 10),
      scale: 1
    };
    setPlacedItems((prev) => [...prev, newItem]);
  };

  const handleRemoveItem = (uniqueId: number) => {
    setPlacedItems((prev) => prev.filter(i => i.uniqueId !== uniqueId));
  };

  const handleFinish = () => {
    const end = Date.now() + 1000;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF69B4', '#FFD700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF69B4', '#FFD700']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
      else onComplete();
    }());
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100 select-none">
      
      {/* 1. The Room Container */}
      <div 
        ref={roomRef}
        className="relative flex-1 overflow-hidden cursor-crosshair"
      >
        {/* Pastel Wall */}
        <div className="absolute top-0 left-0 right-0 h-[65%] bg-gradient-to-b from-blue-100 to-pink-100"></div>
        {/* Pastel Floor */}
        <div className="absolute bottom-0 left-0 right-0 h-[35%] bg-[#F0E6D2] border-t-4 border-white shadow-inner"></div>

        {/* Placed Items */}
        {placedItems.map((item) => (
          <DraggableSticker 
            key={item.uniqueId} 
            item={item} 
            roomRef={roomRef}
            onRemove={() => handleRemoveItem(item.uniqueId)}
          />
        ))}
        
        {/* Instruction */}
        <div className="absolute top-4 left-4 font-messy text-pink-400 opacity-50 pointer-events-none">
          Drag the stickers around!
        </div>
      </div>

      {/* 2. The Inventory Toolbar */}
      <div className="h-40 bg-white border-t-4 border-pink-200 flex flex-col shadow-2xl z-50">
        
        {/* Tabs */}
        <div className="flex gap-4 px-4 py-2 bg-pink-50 border-b border-pink-100 overflow-x-auto">
           {STICKERS.map(cat => (
             <button
               key={cat.category}
               onClick={() => setActiveTab(cat.category)}
               className={`px-4 py-1 rounded-full font-chunky text-sm transition-all ${
                 activeTab === cat.category
                 ? 'bg-pink-400 text-white shadow-md' 
                 : 'bg-white text-pink-300 border border-pink-200'
               }`}
             >
               {cat.category}
             </button>
           ))}
           <div className="flex-1" />
           <button 
             onClick={handleFinish}
             className="bg-green-400 text-white font-chunky px-6 py-1 rounded-full shadow-brutal-sm hover:translate-y-1 hover:shadow-none transition-all flex items-center gap-2"
           >
             DONE
           </button>
        </div>

        {/* Scrollable Items */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-4 flex gap-6 items-center">
          {STICKERS.find(c => c.category === activeTab)?.items.map((emoji) => (
            <motion.button
              key={emoji}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="sticker-text text-5xl md:text-6xl flex-shrink-0 focus:outline-none"
              onClick={() => handleSpawnItem(emoji)}
            >
              {emoji}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Draggable Sticker Component ---

interface DraggableStickerProps {
  item: PlacedItem;
  roomRef: React.RefObject<HTMLDivElement>;
  onRemove: () => void;
}

const DraggableSticker: React.FC<DraggableStickerProps> = ({ item, roomRef, onRemove }) => {
  const isBanner = item.uniqueId === 1;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={roomRef}
      whileHover={{ scale: 1.1, cursor: 'grab', zIndex: 50 }}
      whileDrag={{ scale: 1.2, cursor: 'grabbing', zIndex: 60 }}
      className={`absolute flex flex-col items-center group touch-none select-none ${isBanner ? 'z-10' : 'z-20'}`}
      style={{
        left: `${item.x}%`,
        top: `${item.y}%`,
        x: '-50%',
        y: '-50%'
      }}
      onDoubleClick={onRemove}
    >
        {!isBanner && (
             <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white p-1 rounded-full pointer-events-none shadow-md z-50">
                <Trash2 size={12} />
            </div>
        )}

        {isBanner ? (
            <div className="font-chunky text-4xl md:text-6xl text-pink-500 text-center tracking-widest sticker-text leading-tight bg-white/20 backdrop-blur-sm p-4 rounded-xl border-4 border-white/40 rotate-[-2deg]">
                HAPPY<br/>BIRTHDAY<br/><span className="text-yellow-400">AYLA</span>
            </div>
        ) : (
            <div className="sticker-text text-6xl md:text-8xl filter drop-shadow-xl">
                {item.emoji}
            </div>
        )}
    </motion.div>
  );
};

export default RoomDecorator;