import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CakeMaker from './CakeMaker';
import RoomDecorator from './RoomDecorator';

interface BirthdaySimulatorProps {
  onClose: () => void;
}

type Stage = 'INTRO' | 'CAKE' | 'ROOM' | 'FINALE';

const BirthdaySimulator: React.FC<BirthdaySimulatorProps> = ({ onClose }) => {
  const [stage, setStage] = useState<Stage>('INTRO');

  return (
    <div className="fixed inset-0 z-[9999] bg-yellow-300 flex items-center justify-center overflow-hidden h-[100dvh]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>

      <div className="relative w-full h-full md:max-w-6xl md:h-[90vh] md:border-8 md:border-black md:bg-white md:shadow-[20px_20px_0px_#000] overflow-hidden flex flex-col">
        
        {/* Close Button - Moved slightly for better mobile touch area */}
        <button 
            onClick={onClose}
            className="absolute top-2 right-2 md:top-4 md:right-4 z-50 bg-red-500 text-white font-chunky text-xs md:text-base px-3 py-1 md:px-4 md:py-2 border-2 md:border-4 border-black hover:bg-red-600 shadow-sm"
        >
            EXIT GAME
        </button>

        <AnimatePresence mode="wait">
          {stage === 'INTRO' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -100 }}
              className="flex-1 flex flex-col items-center justify-center text-center p-4 md:p-8"
            >
              <h1 className="font-chunky text-4xl md:text-8xl text-purple-600 mb-4 md:mb-6 drop-shadow-[3px_3px_0px_#000] md:drop-shadow-[5px_5px_0px_#000]">
                SECRET UNLOCKED!
              </h1>
              <p className="font-messy text-lg md:text-2xl mb-8 md:mb-12 max-w-lg px-4">
                Welcome to the Birthday Party Simulator 3000. 
                Your mission: Bake a cake and decorate the venue.
              </p>
              <button 
                onClick={() => setStage('CAKE')}
                className="bg-green-400 text-black font-chunky text-xl md:text-3xl px-8 py-4 md:px-12 md:py-6 border-4 border-black shadow-brutal hover:scale-105 transition-transform"
              >
                START MISSION
              </button>
            </motion.div>
          )}

          {stage === 'CAKE' && (
            <motion.div 
                key="cake"
                className="w-full h-full"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
            >
                <CakeMaker onComplete={() => setStage('ROOM')} />
            </motion.div>
          )}

          {stage === 'ROOM' && (
            <motion.div 
                key="room"
                className="w-full h-full"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
            >
                <RoomDecorator onComplete={() => setStage('FINALE')} />
            </motion.div>
          )}

          {stage === 'FINALE' && (
            <motion.div 
                key="finale"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center bg-pink-400 text-center p-4 md:p-8 h-full"
            >
                <motion.div 
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="text-7xl md:text-9xl mb-4 md:mb-8"
                >
                    🍰🎈🎁
                </motion.div>
                <h1 className="font-chunky text-4xl md:text-6xl text-white border-4 border-black bg-black p-2 md:p-4 rotate-2 shadow-brutal">
                    PARTY TIME!
                </h1>
                <p className="font-messy text-xl md:text-3xl mt-6 md:mt-8 text-black bg-white p-3 md:p-4 border-2 border-black -rotate-1 max-w-[90%]">
                    Great job! Now let's eat real cake.
                </p>
                
                <button 
                    onClick={onClose}
                    className="mt-8 md:mt-12 bg-white text-black font-chunky text-lg md:text-xl px-6 py-3 md:px-8 md:py-4 border-4 border-black shadow-brutal hover:bg-gray-100"
                >
                    RETURN TO SCRAPBOOK
                </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default BirthdaySimulator;