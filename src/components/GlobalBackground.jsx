import { useEffect, useRef } from 'react';
import { useStore, COLORS } from '../store/useStore';
import gsap from 'gsap';

// Theme to gradient mapping
const THEME_GRADIENTS = {
    hero: {
        color1: COLORS.charcoal,
        color2: '#0a0f14',
        color3: COLORS.burntOrange,
        position: '70% 50%',
    },
    gaze: {
        color1: '#0a0a0a',
        color2: '#1a1a2e',
        color3: COLORS.steelBlue,
        position: '50% 40%',
    },
    canvas: {
        color1: '#f5f5dc',
        color2: '#e8e4d9',
        color3: '#8B7355',
        position: '30% 60%',
    },
    rain: {
        color1: '#1a1a2e',
        color2: '#2d2d44',
        color3: COLORS.steelBlue,
        position: '50% 70%',
    },
    party: {
        color1: COLORS.charcoal,
        color2: '#1a0a1a',
        color3: '#ff1493',
        position: '60% 50%',
    },
    halloween: {
        color1: '#0a0a0a',
        color2: COLORS.driedBlood,
        color3: '#2a0a0a',
        position: '50% 50%',
    },
    multiverse: {
        color1: COLORS.lilacPastel,
        color2: '#dda0dd',
        color3: '#ffb6c1',
        position: '50% 50%',
    },
    climax: {
        color1: '#000000',
        color2: '#050505',
        color3: '#0a0a14',
        position: '50% 50%',
    },
    sunset: {
        color1: '#1a1410',
        color2: '#8b4513',
        color3: '#4a0080',
        position: '50% 80%',
    },
};

const GlobalBackground = () => {
    const { currentTheme } = useStore();
    const bgRef = useRef(null);
    const particleCanvasRef = useRef(null);
    const gradientRef = useRef({
        color1: COLORS.charcoal,
        color2: '#0a0f14',
        color3: COLORS.burntOrange,
        posX: 70,
        posY: 50,
    });

    // Particle system
    useEffect(() => {
        const canvas = particleCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        // Create floating dust particles
        for (let i = 0; i < 50; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3 - 0.1,
                opacity: Math.random() * 0.3 + 0.1,
            });
        }

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                p.x += p.speedX;
                p.y += p.speedY;

                // Wrap around
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Interpolate gradient when theme changes
    useEffect(() => {
        if (!bgRef.current || !currentTheme) return;

        const target = THEME_GRADIENTS[currentTheme] || THEME_GRADIENTS.hero;
        const [posX, posY] = target.position.split(' ').map(p => parseInt(p));

        gsap.to(gradientRef.current, {
            color1: target.color1,
            color2: target.color2,
            color3: target.color3,
            posX,
            posY,
            duration: 1.5,
            ease: "power2.inOut",
            onUpdate: () => {
                const { color1, color2, color3, posX, posY } = gradientRef.current;
                bgRef.current.style.background = `
                    radial-gradient(ellipse at ${posX}% ${posY}%, ${color3}40 0%, transparent 50%),
                    radial-gradient(ellipse at ${100 - posX}% ${100 - posY}%, ${color2}30 0%, transparent 60%),
                    linear-gradient(180deg, ${color1} 0%, ${color2} 100%)
                `;
            }
        });

    }, [currentTheme]);

    return (
        <>
            {/* Fixed background layer */}
            <div
                ref={bgRef}
                className="fixed inset-0 -z-10"
                style={{
                    background: `
                        radial-gradient(ellipse at 70% 50%, ${COLORS.burntOrange}40 0%, transparent 50%),
                        radial-gradient(ellipse at 30% 50%, #0a0f1430 0%, transparent 60%),
                        linear-gradient(180deg, ${COLORS.charcoal} 0%, #0a0f14 100%)
                    `
                }}
            />

            {/* Floating particles */}
            <canvas
                ref={particleCanvasRef}
                className="fixed inset-0 -z-[9] pointer-events-none"
            />

            {/* Noise texture overlay */}
            <div
                className="fixed inset-0 -z-[8] pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />

            {/* Vignette effect */}
            <div
                className="fixed inset-0 -z-[7] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
                }}
            />
        </>
    );
};

export default GlobalBackground;
