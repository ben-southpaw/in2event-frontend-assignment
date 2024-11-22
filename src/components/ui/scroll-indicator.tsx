'use client';

import { useEffect, useState, memo } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
	containerRef: React.RefObject<HTMLElement>;
	loading?: boolean;
	totalItems?: number;
}

export const ScrollIndicator = memo(function ScrollIndicator({
	containerRef,
	loading,
	totalItems = 0,
}: ScrollIndicatorProps) {
	const [isVisible, setIsVisible] = useState(true);
	const [isMounted, setIsMounted] = useState(true);

	useEffect(() => {
		const container = containerRef.current;
		if (!container || loading) return;

		const handleScroll = () => {
			if (isVisible) {
				setIsVisible(false);
				// Remove afterany scrollng
				setTimeout(() => setIsMounted(false), 300);
			}
		};

		container.addEventListener('scroll', handleScroll, { passive: true });
		return () => container.removeEventListener('scroll', handleScroll);
	}, [isVisible, containerRef, loading]);

	if (!isMounted || totalItems < 6) return null;

	return (
		<div
			role="presentation"
			aria-label="Scroll indicator"
			data-scroll-indicator="true"
			className={`fixed bottom-12 right-12 z-50 text-gray-400 transition-all duration-300 ease-in-out hover:text-gray-600 ${
				!isVisible ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
			}`}
		>
			<ChevronDown className="h-8 w-8 animate-bounce" />
		</div>
	);
});
