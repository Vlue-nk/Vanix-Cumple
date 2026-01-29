import { useEffect, useRef, useCallback } from 'react';
import { useStore } from '../store/useStore';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Audio zones configuration - using only existing files
// For missing tracks, we use null and the system will skip them gracefully
const AUDIO_ZONES = [
  { start: 0, end: 0.15, track: '/assets/committed.mp3', theme: 'hero' },
  { start: 0.15, end: 0.30, track: null, theme: 'gaze' },  // party_anthem.mp3 missing
  { start: 0.30, end: 0.45, track: null, theme: 'canvas' }, // lovers_rock.mp3 missing
  { start: 0.45, end: 0.60, track: null, theme: 'rain' },
  { start: 0.60, end: 0.75, track: null, theme: 'party' },
  { start: 0.75, end: 0.85, track: null, theme: 'halloween' },
  { start: 0.85, end: 0.95, track: null, theme: 'climax' },
  { start: 0.95, end: 1.0, track: null, theme: 'sunset' },
];

const SoundManager = () => {
  const { currentTrack, setCurrentTrack, isMuted, globalVolume, setCurrentTheme } = useStore();
  const audioRef = useRef(null);
  const targetVolume = useRef(0.8);
  const scrollTimeoutRef = useRef(null);
  const lastZoneRef = useRef(null);

  // Initialize audio element safely
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Debounced zone detection - only updates theme, not audio
  const detectZone = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollProgress = window.scrollY / scrollHeight;

    const currentZone = AUDIO_ZONES.find(
      zone => scrollProgress >= zone.start && scrollProgress < zone.end
    );

    if (currentZone && currentZone.theme !== lastZoneRef.current) {
      lastZoneRef.current = currentZone.theme;
      setCurrentTheme(currentZone.theme);

      // Only set track if it exists
      if (currentZone.track) {
        setCurrentTrack(currentZone.track);
      }
    }
  }, [setCurrentTrack, setCurrentTheme]);

  // Scroll listener with debounce
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      scrollTimeoutRef.current = setTimeout(() => {
        detectZone();
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial detection after a small delay
    setTimeout(detectZone, 100);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [detectZone]);

  // Effect para globalVolume ducking
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && !audio.paused && !isMuted) {
      gsap.to(audio, {
        volume: globalVolume * targetVolume.current,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [globalVolume, isMuted]);

  // Main audio control effect
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Si no hay track o está muteado, fade out y pausa
    if (!currentTrack || isMuted) {
      gsap.to(audio, {
        volume: 0,
        duration: 1.5,
        onComplete: () => {
          audio.pause();
        }
      });
      return;
    }

    // Si la canción es la misma, restaurar volumen
    if (audio.src && audio.src.includes(currentTrack)) {
      if (audio.paused) {
        audio.play().catch(() => { }); // Silently fail
      }
      gsap.to(audio, { volume: globalVolume * targetVolume.current, duration: 1 });
      return;
    }

    // CROSSFADE - Fade out current, then play new
    const fadeVolume = audio.paused ? 0 : audio.volume;

    gsap.to({ vol: fadeVolume }, {
      vol: 0,
      duration: 1,
      onUpdate: function () {
        if (audio.volume > 0) audio.volume = this.targets()[0].vol;
      },
      onComplete: () => {
        audio.src = currentTrack;
        audio.volume = 0;

        audio.play()
          .then(() => {
            gsap.to(audio, {
              volume: globalVolume * targetVolume.current,
              duration: 2
            });
          })
          .catch(() => {
            // Audio autoplay blocked or file not found - fail silently
            console.log('Audio: Waiting for user interaction or file not found');
          });
      }
    });

  }, [currentTrack, isMuted, globalVolume]);

  return null;
};

export default SoundManager;
