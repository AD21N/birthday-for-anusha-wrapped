import React from 'react';
import EasterEggTrigger from './EasterEggTrigger';

interface ProgressBarProps {
  total: number;
  current: number;
  onUnlockGame: () => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ total, current, onUnlockGame }) => {
  return (
    <div className="absolute top-4 left-0 right-0 z-50 px-4 w-full">
      <EasterEggTrigger onUnlock={onUnlockGame}>
        <div className="flex gap-2 cursor-pointer py-4 hover:scale-[1.02] transition-transform">
          {Array.from({ length: total }).map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden shadow-sm">
              <div
                className={`h-full bg-white transition-all duration-300 ease-out ${
                  index <= current ? 'w-full' : 'w-0'
                }`}
              />
            </div>
          ))}
        </div>
      </EasterEggTrigger>
    </div>
  );
};

export default ProgressBar;