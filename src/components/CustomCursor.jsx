import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const { cursorType } = useStore();

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Movimiento básico (ratón)
        const moveCursor = (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
            gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.15 }); // Lag suave
        };

        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    // Reacciones visuales basadas en el estado
    useEffect(() => {
        const follower = followerRef.current;

        if (cursorType === 'hover') {
            gsap.to(follower, { scale: 3, backgroundColor: 'rgba(255, 255, 255, 0.1)', mixBlendMode: 'difference' });
        } else if (cursorType === 'eye') {
            // Aquí podrías cargar un SVG de ojo o cambiar forma
            gsap.to(follower, { scale: 1, backgroundColor: '#2E5CFF' }); // Neon Blue
        } else if (cursorType === 'balloon') {
            gsap.to(follower, { scale: 0.5, backgroundColor: '#FF0000' }); // Red
        } else {
            gsap.to(follower, { scale: 1, backgroundColor: 'white', mixBlendMode: 'normal' });
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
                className="fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-colors duration-300"
            />
        </>
    );
};

export default CustomCursor;
