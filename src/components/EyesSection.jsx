import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * EyesSection - "THE GAZE"
 * 
 * Features:
 * - Fullscreen with dark background
 * - Video scales from small to large on scroll
 * - ScrollTrigger animation
 */
const EyesSection = ({ data }) => {
    const sectionRef = useRef(null);
    const videoRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const video = videoRef.current;

        if (!section || !video) return;

        // ScrollTrigger animation: Scale video on scroll
        gsap.fromTo(
            video,
            {
                scale: 1,
            },
            {
                scale: 2.5,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1, // Smooth scrubbing effect
                    pin: false,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: '#111' }}
        >
            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center">
                {/* Video */}
                <div className="relative">
                    <video
                        ref={videoRef}
                        src={data?.media || '/assets/trend_ojos.mp4'}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="rounded-lg shadow-2xl"
                        style={{
                            width: '30vw',
                            minWidth: '250px',
                            filter: 'drop-shadow(0 0 40px rgba(41, 36, 255, 0.4))',
                        }}
                    />
                </div>

                {/* Title */}
                <div className="absolute bottom-20 text-center">
                    <h2 className="font-serif text-5xl md:text-7xl text-white-off mb-4">
                        {data?.title || 'THE GAZE'}
                    </h2>
                    {data?.subtitle && (
                        <p className="font-sans text-lg md:text-xl text-white-off/70 tracking-wide">
                            {data.subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Ambient Glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at center, rgba(41, 36, 255, 0.15) 0%, transparent 70%)',
                }}
            />
        </section>
    );
};

export default EyesSection;
