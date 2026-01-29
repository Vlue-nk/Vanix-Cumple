import { createContext, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const AudioContext = createContext();

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
    const [currentTrack, setCurrentTrack] = useState(null);
    const audioRefs = useRef({});

    const registerAudio = (id, src) => {
        if (!audioRefs.current[id]) {
            const audio = new Audio(src);
            audio.loop = true;
            audio.volume = 0;
            audioRefs.current[id] = audio;
        }
    };

    const playTrack = (id) => {
        if (currentTrack === id) return;

        // Fade out current
        if (currentTrack && audioRefs.current[currentTrack]) {
            gsap.to(audioRefs.current[currentTrack], {
                volume: 0,
                duration: 1.5,
                onComplete: () => {
                    audioRefs.current[currentTrack].pause();
                }
            });
        }

        // Fade in new
        if (id && audioRefs.current[id]) {
            const nextAudio = audioRefs.current[id];
            nextAudio.play().catch(e => console.log("Autoplay blocked:", e));
            gsap.to(nextAudio, {
                volume: 0.8, // Max volume for background items
                duration: 1.5
            });
            setCurrentTrack(id);
        } else {
            setCurrentTrack(null);
        }
    };

    return (
        <AudioContext.Provider value={{ registerAudio, playTrack }}>
            {children}
        </AudioContext.Provider>
    );
};
