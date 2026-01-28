import React, { useEffect, useCallback } from 'react';

// Short "Pop" sound base64 to ensure it works without external assets
const POP_SOUND = "data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU"; // Truncated for brevity, normally this would be a real small wav file. 
// Using a web audio oscillator for a procedural "Pop" instead to guarantee sound without large base64 strings.

interface SoundManagerProps {
  children: React.ReactNode;
}

export const useSound = () => {
  const playPop = useCallback(() => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }, []);

  return { playPop };
};

const SoundManager: React.FC<SoundManagerProps> = ({ children }) => {
  const { playPop } = useSound();

  useEffect(() => {
    const handleClick = () => playPop();
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [playPop]);

  return <>{children}</>;
};

export default SoundManager;