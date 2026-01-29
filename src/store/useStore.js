import { create } from 'zustand';

export const useStore = create((set) => ({
    // Estado del Preloader
    isLoading: true,
    setIsLoading: (status) => set({ isLoading: status }),

    // Estado del Cursor
    cursorType: 'default', // 'default', 'hover', 'eye', 'balloon'
    setCursorType: (type) => set({ cursorType: type }),

    // Estado de Audio Actual
    currentTrack: null,
    setCurrentTrack: (track) => set({ currentTrack: track }),

    // Mute global
    isMuted: false,
    setIsMuted: (muted) => set({ isMuted: muted }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

    // Current Theme for GlobalBackground
    currentTheme: 'hero',
    setCurrentTheme: (theme) => set({ currentTheme: theme }),

    // Global Volume for Audio Ducking
    globalVolume: 1.0,
    setGlobalVolume: (vol) => set({ globalVolume: vol }),

    // Trigger de efectos globales
    isGlitchActive: false,
    triggerGlitch: () => {
        set({ isGlitchActive: true });
        setTimeout(() => set({ isGlitchActive: false }), 2000); // Duración del glitch
    }
}));
