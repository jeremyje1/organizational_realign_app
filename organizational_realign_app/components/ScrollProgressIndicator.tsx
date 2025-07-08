'use client';

import { useScrollProgress } from '@/hooks/useScrollAnimation';

export default function ScrollProgressIndicator() {
  const scrollProgress = useScrollProgress();

  return (
    <div 
      className="scroll-progress"
      style={{ 
        transform: `scaleX(${scrollProgress / 100})`,
        transformOrigin: 'left'
      }}
      aria-hidden="true"
    />
  );
}
