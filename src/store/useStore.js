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

    // Trigger de efectos globales
    isGlitchActive: false,
    triggerGlitch: () => {
        set({ isGlitchActive: true });
        setTimeout(() => set({ isGlitchActive: false }), 2000); // Duración del glitch
    }
}));
