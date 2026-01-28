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

    // Function to try playing
    const tryPlay = () => {
        audio.play()
            .then(() => {
                setIsPlaying(true);
                // Remove listeners if successful
                document.removeEventListener('click', tryPlay);
                document.removeEventListener('touchstart', tryPlay);
                document.removeEventListener('keydown', tryPlay);
            })
            .catch((e) => {
                console.log("Autoplay blocked, waiting for interaction...");
                setIsPlaying(false);
            });
    };

    // Try immediately on mount
    tryPlay();

    // Add listeners for ANY interaction to start music (Preloader clicks, swipes, keys)
    document.addEventListener('click', tryPlay);
    document.addEventListener('touchstart', tryPlay);
    document.addEventListener('keydown', tryPlay);

    return () => {
      document.removeEventListener('click', tryPlay);
      document.removeEventListener('touchstart', tryPlay);
      document.removeEventListener('keydown', tryPlay);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering slide navigation
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
      {/* 
        IMPORTANT: Ensure your file is named 'song.mp3' and placed in the 'public' folder 
        autoPlay attribute helps browsers that allow it
      */}
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