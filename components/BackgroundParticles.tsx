import React from 'react';
import { motion } from 'framer-motion';

const STICKERS = ['⚡️', '💋', '⭐', '💀', '🌈', '🔥', '👀', '💿', '🎱'];

const FloatingMess: React.FC = () => {
  // Generate random positions
  const items = React.useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      emoji: STICKERS[i % STICKERS.length],
      x: Math.random() * 90,
      y: Math.random() * 90,
      rotate: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.8,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-5xl md:text-7xl cursor-crosshair pointer-events-auto opacity-40 hover:opacity-100 transition-opacity"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
          }}
          initial={{ rotate: item.rotate, scale: item.scale }}
          animate={{
            y: [0, -20, 0],
            rotate: [item.rotate, item.rotate + 10, item.rotate],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{
            scale: 1.5,
            rotate: item.rotate + 90,
            transition: { type: "spring", stiffness: 300 }
          }}
        >
          {item.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingMess;