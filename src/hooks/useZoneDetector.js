import { useEffect, useRef } from 'react';
import { useStore, AUDIO_ZONES } from '../store/useStore';

/**
 * Hook to detect when a section is 50% visible and register it as the current zone
 * @param {string} zoneName - The name of the zone (matches AUDIO_ZONES keys)
 * @returns {React.RefObject} - Ref to attach to the section element
 */
export const useZoneDetector = (zoneName) => {
    const sectionRef = useRef(null);
    const { setCurrentZone, setCurrentTheme } = useStore();

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // When 50% of section is visible, set it as current zone
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                        setCurrentZone(zoneName);
                        setCurrentTheme(zoneName);
                    }
                });
            },
            {
                threshold: [0.5], // Trigger at 50% visibility
                rootMargin: '0px'
            }
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, [zoneName, setCurrentZone, setCurrentTheme]);

    return sectionRef;
};

export default useZoneDetector;
