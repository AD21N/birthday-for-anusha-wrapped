import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface EasterEggTriggerProps {
  children: React.ReactNode;
  onUnlock: () => void;
}

const EasterEggTrigger: React.FC<EasterEggTriggerProps> = ({ children, onUnlock }) => {
  const [clicks, setClicks] = useState<number[]>([]);

  const handleClick = (e: React.MouseEvent) => {
    // Pass the click through if there are children with click handlers
    // We capture it here for the logic
    const now = Date.now();
    
    // Clean up old clicks (> 3 seconds ago) - Increased time window for easier activation
    const validClicks = [...clicks, now].filter(time => now - time < 3000);
    setClicks(validClicks);

    // Check for trigger condition (3 rapid clicks) - Reduced count for easier activation
    if (validClicks.length >= 3) {
      setClicks([]); // Reset
      onUnlock();
    }
  };

  return (
    <motion.div 
      onClickCapture={handleClick}
      whileTap={{ scale: 0.9, rotate: Math.random() * 10 - 5 }}
    >
      {children}
    </motion.div>
  );
};

export default EasterEggTrigger;