
import { useState, useEffect } from 'react';

/**
 * A hook that returns true if the current viewport matches the given media query.
 * @param query The media query to match against
 * @returns A boolean indicating whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with null to avoid hydration mismatch
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Set up initial match
    const media = window.matchMedia(query);
    // Set initial value
    setMatches(media.matches);

    // Define callback for media query change
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener for changes
    media.addEventListener('change', listener);

    // Clean up
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
}
