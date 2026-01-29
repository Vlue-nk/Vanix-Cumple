import { create } from 'zustand';

// Premium Color Palette
export const COLORS = {
    charcoal: '#121212',
    darkBlueGrey: '#0a0f14',
    offWhite: '#f0f0f0',
    cream: '#f5f5dc',
    burntOrange: '#cc5500',
    steelBlue: '#4682b4',
    driedBlood: '#8a0303',
    lilacPastel: '#e6e6fa',
};

// Audio zone configuration - ONLY zones with actual tracks
// Zones without tracks will be silent
export const AUDIO_ZONES = {
    hero: { track: '/assets/committed.mp3', fadeIn: 3, fadeOut: 2 },
    gaze: { track: null, fadeIn: 2, fadeOut: 2 },
    canvas: { track: null, fadeIn: 2, fadeOut: 2 },
    rain: { track: null, fadeIn: 2, fadeOut: 2 },
    party: { track: null, fadeIn: 2, fadeOut: 2 },
    halloween: { track: null, fadeIn: 2, fadeOut: 1.5 },
    multiverse: { track: null, fadeIn: 2, fadeOut: 1 },
    climax: { track: '/assets/rosemary.mp3', fadeIn: 4, fadeOut: 2 },
    sunset: { track: null, fadeIn: 3, fadeOut: 3 },
};

export const useStore = create((set, get) => ({
    // Preloader
    isLoading: true,
    setIsLoading: (status) => set({ isLoading: status }),

    // Cursor
    cursorType: 'default',
    setCursorType: (type) => set({ cursorType: type }),

    // === AUDIO ZONE SYSTEM ===
    currentZone: null,
    previousZone: null,
    setCurrentZone: (zone) => {
        const prev = get().currentZone;
        if (zone !== prev) {
            set({ previousZone: prev, currentZone: zone });
        }
    },

    // Current playing track
    currentTrack: null,
    setCurrentTrack: (track) => set({ currentTrack: track }),

    // Mute
    isMuted: false,
    setIsMuted: (muted) => set({ isMuted: muted }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    // Theme for GlobalBackground
    currentTheme: 'hero',
    setCurrentTheme: (theme) => set({ currentTheme: theme }),

    // Volume for ducking
    globalVolume: 1.0,
    setGlobalVolume: (vol) => set({ globalVolume: vol }),

    // === JUMPSCARE SYSTEM ===
    isScareActive: false,
    setIsScareActive: (active) => {
        set({ isScareActive: active });
        if (active) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    },

    // === BLOOD CURTAIN SYSTEM ===
    bloodPhase: 0,
    setBloodPhase: (phase) => set({ bloodPhase: phase }),

    // Lenis reference for programmatic scrolling
    lenisRef: null,
    setLenisRef: (ref) => set({ lenisRef: ref }),

    // Glitch effect
    isGlitchActive: false,
    triggerGlitch: () => {
        set({ isGlitchActive: true });
        setTimeout(() => set({ isGlitchActive: false }), 2000);
    }
}));
