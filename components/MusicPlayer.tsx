import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5;

    const playMusic = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        // If it works, remove ALL listeners immediately
        removeListeners();
      } catch (err) {
        console.log("Browser blocked autoplay. Waiting for user interaction...");
        setIsPlaying(false);
      }
    };

    // 1. Try to play immediately on load
    playMusic();

    // 2. List of every possible interaction that counts as "user activity"
    const events = [
      'click', 
      'touchstart', 
      'keydown', 
      'mousemove', 
      'scroll', 
      'focus'
    ];

    const removeListeners = () => {
      events.forEach(event => {
        document.removeEventListener(event, playMusic);
      });
    };

    // Add listeners for everything
    events.forEach(event => {
      document.addEventListener(event, playMusic, { once: true });
    });

    return () => {
      removeListeners();
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* Added 'muted={false}' explicitly */}
      <audio ref={audioRef} src="/song.mp3" loop autoPlay />

      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute bottom-8 right-8 z-50 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white shadow-lg hover:bg-white/20 transition-colors"
        onClick={togglePlay}
        whileTap={{ scale: 0.9 }}
      >
        {isPlaying ? (
          <div className="flex gap-1 items-end h-6">
            <motion.div 
              animate={{ height: [10, 24, 10] }} 
              transition={{ repeat: Infinity, duration: 0.5 }} 
              className="w-1 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ height: [16, 8, 16] }} 
              transition={{ repeat: Infinity, duration: 0.4, delay: 0.1 }} 
              className="w-1 bg-white rounded-full" 
            />
            <motion.div 
              animate={{ height: [8, 20, 8] }} 
              transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} 
              className="w-1 bg-white rounded-full" 
            />
            <Music size={16} className="ml-1" />
          </div>
        ) : (
          <VolumeX size={24} />
        )}
      </motion.button>
    </>
  );
};

export default MusicPlayer;