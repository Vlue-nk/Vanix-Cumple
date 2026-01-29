import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Eyes Section - "THE GAZE"
 * 
 * Features:
 * - Black background
 * - Centered vertical video
 * - ScrollTrigger: scales video from 1x to 3x while maintaining aspect ratio
 */
const Eyes = ({ data }) => {
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
                scale: 3,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
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
            id={data?.id || 'eyes'}
            className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden"
        >
            {/* Video Container - Maintains vertical aspect ratio */}
            <div className="relative flex items-center justify-center">
                <video
                    ref={videoRef}
                    src={data?.media || '/assets/trend_ojos.mp4'}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="rounded-lg shadow-2xl"
                    style={{
                        width: 'auto',
                        height: '60vh',
                        maxWidth: '90vw',
                        filter: 'drop-shadow(0 0 40px rgba(41, 36, 255, 0.5))',
                    }}
                />
            </div>

            {/* Title Overlay */}
            <div className="absolute bottom-20 left-0 right-0 text-center pointer-events-none">
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white-off mb-4">
                    {data?.title || 'THE GAZE'}
                </h2>
                {data?.subtitle && (
                    <p className="font-sans text-lg md:text-xl text-white-off/70 tracking-wide">
                        {data.subtitle}
                    </p>
                )}
            </div>

            {/* Ambient Glow Effect */}
            <div
                className="absolute inset-0 pointer-events-none -z-10"
                style={{
                    background: 'radial-gradient(circle at center, rgba(41, 36, 255, 0.2) 0%, transparent 70%)',
                }}
            />
        </section>
    );
};

export default Eyes;
