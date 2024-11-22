/**
 * Preloads an image for faster rendering
 * @param url The URL of the image to preload
 * @param priority Whether to set high priority for the image fetch
 */
export const preloadImage = (url: string, priority: boolean = false) => {
  if (typeof window === 'undefined') return; // Skip during SSR
  const img = new window.Image();
  img.src = url;
  if (priority) {
    img.fetchPriority = 'high';
  }
};
