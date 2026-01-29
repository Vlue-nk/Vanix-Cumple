import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [cursorType, setCursorType] = useState('default'); // default | snoopy | cooky | eye
    const eyeVideoRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const onMouseMove = (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        };

        const pickType = (target) => {
            const el = target?.closest?.('[data-cursor]');
            const t = el?.dataset?.cursor;
            return t || 'default';
        };

        const onMouseOver = (e) => setCursorType(pickType(e.target));
        const onMouseOut = (e) => {
            // If leaving a cursorable element into another cursorable element, mouseover will handle it.
            if (!e.relatedTarget || !e.relatedTarget.closest?.('[data-cursor]')) {
                setCursorType('default');
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
        };
    }, []);

    useEffect(() => {
        if (cursorType !== 'eye') return;
        eyeVideoRef.current?.play?.().catch(() => { });
    }, [cursorType]);

    const getCursorContent = () => {
        switch (cursorType) {
            case 'snoopy':
                return <img src="/assets/snoopy_perfil.webp" alt="Snoopy" className="custom-cursor-icon p-2" />;
            case 'cooky':
                return <img src="/assets/cooky_stand.webp" alt="Cooky" className="custom-cursor-icon p-2" />;
            case 'eye':
                return (
                    <div className="w-full h-full rounded-full overflow-hidden">
                        <video
                            ref={eyeVideoRef}
                            src="/assets/trend_ojos.mp4"
                            muted
                            playsInline
                            loop
                            className="custom-cursor-icon w-full h-full object-cover"
                        />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${cursorType !== 'default' ? 'hovered' : ''} ${cursorType}`}
        >
            <div className="custom-cursor-dot" />
            {getCursorContent()}
        </div>
    );
};

export default CustomCursor;
