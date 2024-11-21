'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  containerRef: React.RefObject<HTMLElement>;
  loading?: boolean;
}

export function ScrollIndicator({ containerRef, loading }: ScrollIndicatorProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (loading || !show) return;
    
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTop = container.scrollTop;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;
      if (currentScrollTop !== lastScrollTop) {
        const element = document.querySelector('[data-scroll-indicator="true"]');
        if (element) {
          element.classList.add('opacity-0');
          setTimeout(() => setShow(false), 300);
        }
      }
      lastScrollTop = currentScrollTop;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [show, containerRef, loading]);

  if (!show) return null;

  return (
    <div
      data-scroll-indicator="true"
      className="fixed bottom-8 right-16 text-gray-400 opacity-50 transition-opacity duration-300 ease-in-out"
    >
      <ChevronDown className="h-6 w-6 animate-bounce" />
    </div>
  );
}
