import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const textRef = useRef(null);
    const { cursorType } = useStore();

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        const moveCursor = (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 });
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // Reactive cursor states
    useEffect(() => {
        const follower = followerRef.current;
        const text = textRef.current;

        switch (cursorType) {
            case 'hover':
                gsap.to(follower, {
                    scale: 3,
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,0.5)',
                    mixBlendMode: 'difference'
                });
                if (text) text.textContent = '';
                break;

            case 'play':
                gsap.to(follower, {
                    scale: 4,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    borderColor: 'transparent',
                    mixBlendMode: 'normal'
                });
                if (text) {
                    text.textContent = '▶ PLAY';
                    text.style.color = '#000';
                }
                break;

            case 'balloon':
                gsap.to(follower, {
                    scale: 3,
                    backgroundColor: 'rgba(255,0,0,0.8)',
                    borderColor: 'transparent',
                    mixBlendMode: 'normal'
                });
                if (text) {
                    text.textContent = '🏃 RUN';
                    text.style.color = '#fff';
                }
                break;

            case 'eye':
                gsap.to(follower, {
                    scale: 2,
                    backgroundColor: '#2E5CFF',
                    borderColor: 'transparent',
                    mixBlendMode: 'normal'
                });
                if (text) text.textContent = '';
                break;

            default:
                gsap.to(follower, {
                    scale: 1,
                    backgroundColor: 'transparent',
                    borderColor: 'white',
                    mixBlendMode: 'normal'
                });
                if (text) text.textContent = '';
                break;
        }
    }, [cursorType]);

    return (
        <>
            {/* Punto central exacto */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            {/* Seguidor fluido (anillo o forma) */}
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 flex items-center justify-center"
            >
                <span
                    ref={textRef}
                    className="text-[8px] font-mono font-bold uppercase tracking-tight whitespace-nowrap"
                />
            </div>
        </>
    );
};

export default CustomCursor;
