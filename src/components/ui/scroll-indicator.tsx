'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  containerRef: React.RefObject<HTMLElement>;
  loading?: boolean;
}

export function ScrollIndicator({ containerRef, loading }: ScrollIndicatorProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (loading) return;
    
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isVisible) {
        setIsVisible(false);
      }
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isVisible, containerRef, loading]);

  if (!isVisible) return null;

  return (
    <div
      data-scroll-indicator="true"
      className="fixed bottom-12 right-12 z-50 text-gray-400 transition-opacity duration-300 ease-in-out hover:text-gray-600"
    >
      <ChevronDown className="h-8 w-8 animate-bounce" />
    </div>
  );
}
