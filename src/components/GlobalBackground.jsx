import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useStore } from '../store/useStore';

const GlobalBackground = () => {
    const bgRef = useRef(null);
    const { currentTheme } = useStore();

    // Paleta de colores Premium (Desaturados y Elegantes)
    const themes = {
        hero: {
            bg: '#f5f0eb',       // Beige Arena
            blob1: '#e6dfd7',    // Crema
            blob2: '#d4cdc4',    // Arena Claro
            blob3: '#c7bfb5',    // Piedra
        },
        gaze: {
            bg: '#1a1d23',       // Pizarra Oscura
            blob1: '#2c3e50',    // Azul Petróleo
            blob2: '#34495e',    // Gris Azulado
            blob3: '#1a252f',    // Noche
        },
        canvas: {
            bg: '#fdfbf7',       // Papel
            blob1: '#f5efe6',    // Marfil
            blob2: '#ebe4d8',    // Lienzo
            blob3: '#e0d8ca',    // Pergamino
        },
        rain: {
            bg: '#0f1419',       // Medianoche
            blob1: '#1c3a4f',    // Azul Lluvia
            blob2: '#2d5a7b',    // Océano Profundo
            blob3: '#15242f',    // Tormenta
        },
        party: {
            bg: '#0d1117',       // Negro Terciopelo
            blob1: '#1a1f2e',    // Azul Noche
            blob2: '#252a3d',    // Índigo Oscuro
            blob3: '#161a26',    // Carbón
        },
        halloween: {
            bg: '#0a0505',       // Negro Sangre
            blob1: '#2a0a0a',    // Vino Tinto Profundo
            blob2: '#3d0f0f',    // Carmesí Oscuro
            blob3: '#1a0505',    // Borgoña Negro
        },
        climax: {
            bg: '#000000',       // Negro Total
            blob1: '#0a0a0a',    // Ébano
            blob2: '#050505',    // Vacío
            blob3: '#0f0f0f',    // Sombra
        },
        sunset: {
            bg: '#1a1410',       // Café Oscuro
            blob1: '#8b4513',    // Siena Tostada
            blob2: '#a0522d',    // Terracota
            blob3: '#6b3510',    // Caoba
        },
    };

    useEffect(() => {
        const theme = themes[currentTheme] || themes.hero;

        gsap.to(bgRef.current, {
            '--bg-color': theme.bg,
            '--blob1-color': theme.blob1,
            '--blob2-color': theme.blob2,
            '--blob3-color': theme.blob3,
            duration: 2,
            ease: "power2.inOut"
        });
    }, [currentTheme]);

    return (
        <div
            ref={bgRef}
            className="fixed inset-0 z-[-1] overflow-hidden"
            style={{
                '--bg-color': themes.hero.bg,
                '--blob1-color': themes.hero.blob1,
                '--blob2-color': themes.hero.blob2,
                '--blob3-color': themes.hero.blob3,
                backgroundColor: 'var(--bg-color)',
                transition: 'background-color 2s ease'
            }}
        >
            {/* Mesh Gradient Blobs */}
            <div
                className="absolute w-[150vw] h-[150vh] top-[-25vh] left-[-25vw] animate-mesh-rotate opacity-60"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 60% at 30% 20%, var(--blob1-color) 0%, transparent 60%),
                        radial-gradient(ellipse 60% 80% at 70% 60%, var(--blob2-color) 0%, transparent 50%),
                        radial-gradient(ellipse 70% 50% at 50% 80%, var(--blob3-color) 0%, transparent 55%)
                    `,
                    transition: 'all 2s ease'
                }}
            />

            {/* Secondary Layer - Opposite Rotation */}
            <div
                className="absolute w-[120vw] h-[120vh] top-[-10vh] left-[-10vw] animate-mesh-rotate-reverse opacity-40"
                style={{
                    background: `
                        radial-gradient(ellipse 50% 70% at 60% 30%, var(--blob2-color) 0%, transparent 50%),
                        radial-gradient(ellipse 70% 50% at 25% 70%, var(--blob1-color) 0%, transparent 45%)
                    `,
                    transition: 'all 2s ease'
                }}
            />

            {/* Grain Overlay for Premium Feel */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
                }}
            />
        </div>
    );
};

export default GlobalBackground;
