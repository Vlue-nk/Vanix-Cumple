import { useEffect, useRef, useCallback } from 'react';
import { useStore, AUDIO_ZONES } from '../store/useStore';
import gsap from 'gsap';

/**
 * SoundManager - Handles zone-based audio with proper crossfade
 * - Only plays in zones that have tracks defined
 * - Fades out when entering silent zones
 * - No more infinite loop issues
 */
const SoundManager = () => {
  const { currentZone, previousZone, isMuted, globalVolume } = useStore();

  const audioRef = useRef(null);
  const isPlaying = useRef(false);
  const currentTrackRef = useRef(null);

  const BASE_VOLUME = 0.6;

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.volume = 0;
    audioRef.current.loop = false; // No auto-loop

    // Manual loop with gap
    audioRef.current.onended = () => {
      if (isPlaying.current && currentTrackRef.current) {
        // Add a small gap before restarting
        setTimeout(() => {
          if (isPlaying.current && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(() => { });
          }
        }, 1000); // 1 second gap
      }
    };

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Handle zone changes
  const handleZoneChange = useCallback((newZone) => {
    const audio = audioRef.current;
    if (!audio) return;

    const zoneConfig = AUDIO_ZONES[newZone];
    const hasTrack = zoneConfig?.track;

    // If new zone has no track, fade out and stop
    if (!hasTrack) {
      if (isPlaying.current) {
        gsap.to(audio, {
          volume: 0,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            audio.pause();
            audio.src = '';
            isPlaying.current = false;
            currentTrackRef.current = null;
          }
        });
      }
      return;
    }

    // If same track, keep playing
    if (currentTrackRef.current === zoneConfig.track) {
      return;
    }

    // New track - fade out old, fade in new
    const fadeInNew = () => {
      audio.src = zoneConfig.track;
      audio.volume = 0;
      currentTrackRef.current = zoneConfig.track;
      isPlaying.current = true;

      audio.play().catch(() => { });

      gsap.to(audio, {
        volume: isMuted ? 0 : globalVolume * BASE_VOLUME,
        duration: zoneConfig.fadeIn || 3,
        ease: "power2.out"
      });
    };

    if (isPlaying.current && audio.src) {
      gsap.to(audio, {
        volume: 0,
        duration: AUDIO_ZONES[previousZone]?.fadeOut || 2,
        ease: "power2.inOut",
        onComplete: () => {
          audio.pause();
          fadeInNew();
        }
      });
    } else {
      fadeInNew();
    }

  }, [previousZone, isMuted, globalVolume]);

  // React to zone changes
  useEffect(() => {
    if (currentZone) {
      handleZoneChange(currentZone);
    }
  }, [currentZone, handleZoneChange]);

  // Handle mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !isPlaying.current) return;

    gsap.to(audio, {
      volume: isMuted ? 0 : globalVolume * BASE_VOLUME,
      duration: 0.5,
      ease: "power2.out"
    });
  }, [isMuted, globalVolume]);

  return null;
};

export default SoundManager;
