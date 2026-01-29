import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '../store/useStore';
import gsap from 'gsap';

// Audio zones with scroll percentage ranges
const AUDIO_ZONES = [
  { start: 0, end: 0.12, track: '/assets/committed.mp3', name: 'hero' },
  { start: 0.12, end: 0.24, track: null, name: 'gaze' },      // No audio file
  { start: 0.24, end: 0.36, track: null, name: 'canvas' },
  { start: 0.36, end: 0.48, track: null, name: 'rain' },
  { start: 0.48, end: 0.60, track: null, name: 'party' },
  { start: 0.60, end: 0.72, track: null, name: 'halloween' },
  { start: 0.72, end: 0.88, track: null, name: 'climax' },
  { start: 0.88, end: 1.0, track: null, name: 'sunset' },
];

const SoundManager = () => {
  const { isMuted, globalVolume, setCurrentTheme } = useStore();

  // Dual audio elements for true crossfade (no silence)
  const audioARef = useRef(null);
  const audioBRef = useRef(null);
  const activeAudioRef = useRef('A'); // Which audio is currently playing

  const currentZoneRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const scrollStartTimeRef = useRef(0);
  const lastScrollPosRef = useRef(0);
  const isScrollingFastRef = useRef(false);

  const targetVolume = 0.7;
  const crossfadeDuration = 2.5; // seconds

  // Initialize dual audio elements
  useEffect(() => {
    audioARef.current = new Audio();
    audioBRef.current = new Audio();

    audioARef.current.volume = 0;
    audioBRef.current.volume = 0;

    return () => {
      audioARef.current?.pause();
      audioBRef.current?.pause();
    };
  }, []);

  // Smart loop handler with random delay
  const setupSmartLoop = useCallback((audio) => {
    if (!audio) return;

    audio.loop = false; // Disable native loop

    audio.onended = () => {
      // Random delay between 500ms and 2000ms before replay
      const delay = 500 + Math.random() * 1500;

      // Add reverb-like fadeout feeling by waiting
      setTimeout(() => {
        if (!isMuted && audio.src) {
          audio.currentTime = 0;
          audio.play().catch(() => { });

          // Fade in smoothly after delay
          gsap.fromTo(audio,
            { volume: 0 },
            { volume: globalVolume * targetVolume, duration: 1 }
          );
        }
      }, delay);
    };
  }, [isMuted, globalVolume]);

  // Crossfade function - true overlap, no silence
  const crossfadeTo = useCallback((newTrack) => {
    if (!newTrack) return;

    const activeAudio = activeAudioRef.current === 'A' ? audioARef.current : audioBRef.current;
    const inactiveAudio = activeAudioRef.current === 'A' ? audioBRef.current : audioARef.current;

    // Prepare inactive audio with new track
    inactiveAudio.src = newTrack;
    inactiveAudio.volume = 0;
    setupSmartLoop(inactiveAudio);

    // Start playing new track immediately (but silent)
    inactiveAudio.play().catch(() => { });

    // Crossfade: fade out active, fade in inactive SIMULTANEOUSLY
    gsap.to(activeAudio, {
      volume: 0,
      duration: crossfadeDuration,
      ease: "power2.inOut",
      onComplete: () => {
        activeAudio.pause();
        activeAudio.src = '';
      }
    });

    gsap.to(inactiveAudio, {
      volume: globalVolume * targetVolume,
      duration: crossfadeDuration,
      ease: "power2.inOut"
    });

    // Swap active reference
    activeAudioRef.current = activeAudioRef.current === 'A' ? 'B' : 'A';

  }, [globalVolume, setupSmartLoop]);

  // Detect scroll velocity for debouncing
  const detectScrollVelocity = useCallback(() => {
    const now = Date.now();
    const scrollPos = window.scrollY;
    const timeDelta = now - scrollStartTimeRef.current;
    const scrollDelta = Math.abs(scrollPos - lastScrollPosRef.current);

    // Calculate velocity (pixels per ms)
    const velocity = scrollDelta / Math.max(timeDelta, 1);

    // If velocity > 2 px/ms, consider it fast scrolling
    isScrollingFastRef.current = velocity > 2;

    lastScrollPosRef.current = scrollPos;
    scrollStartTimeRef.current = now;
  }, []);

  // Zone detection with debounce
  const detectZone = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollProgress = window.scrollY / scrollHeight;

    const zone = AUDIO_ZONES.find(
      z => scrollProgress >= z.start && scrollProgress < z.end
    );

    if (zone && zone.name !== currentZoneRef.current) {
      currentZoneRef.current = zone.name;
      setCurrentTheme(zone.name);

      // Only change audio if we have a track AND scroll has stopped
      if (zone.track) {
        crossfadeTo(zone.track);
      }
    }
  }, [setCurrentTheme, crossfadeTo]);

  // Scroll handler with smart debouncing
  useEffect(() => {
    const handleScroll = () => {
      detectScrollVelocity();

      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // If scrolling fast, wait longer before triggering audio change
      const debounceTime = isScrollingFastRef.current ? 800 : 300;

      scrollTimeoutRef.current = setTimeout(() => {
        detectZone();
      }, debounceTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial detection
    setTimeout(detectZone, 200);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [detectZone, detectScrollVelocity]);

  // Handle globalVolume changes (ducking)
  useEffect(() => {
    const activeAudio = activeAudioRef.current === 'A' ? audioARef.current : audioBRef.current;
    if (activeAudio && !activeAudio.paused && !isMuted) {
      gsap.to(activeAudio, {
        volume: globalVolume * targetVolume,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [globalVolume, isMuted]);

  // Handle mute toggle
  useEffect(() => {
    const activeAudio = activeAudioRef.current === 'A' ? audioARef.current : audioBRef.current;
    if (!activeAudio) return;

    if (isMuted) {
      gsap.to(activeAudio, { volume: 0, duration: 0.5 });
    } else {
      gsap.to(activeAudio, { volume: globalVolume * targetVolume, duration: 0.5 });
    }
  }, [isMuted, globalVolume]);

  return null;
};

export default SoundManager;
