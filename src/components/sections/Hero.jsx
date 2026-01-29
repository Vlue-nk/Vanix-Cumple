import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import VerticalCard from '../VerticalCard';

/**
 * Hero Section - "COMMITTED"
 * Editorial Split Design
 * 
 * Layout: 40% Text (left) | 60% Image (right)
 * Background: Blurred image overlay
 * Animation: Floating image with GSAP
 */
const Hero = ({ data }) => {
    const imageRef = useRef(null);
    const cookyRef = useRef(null);

    useEffect(() => {
        // Floating animation for the image
        gsap.to(imageRef.current, {
            y: -20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });

        // Subtle bounce for Cooky
        gsap.to(cookyRef.current, {
            y: -10,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut',
        });
    }, []);

    return (
        <section
            id={data?.id || 'hero'}
            className="relative min-h-screen w-full overflow-hidden flex items-center"
        >
            {/* Blurred Background Image */}
            <div
                className="absolute inset-0 -z-10"
                style={{
                    backgroundImage: `url(${data?.bgMedia || '/assets/yan_foto.jpeg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(60px)',
                    opacity: 0.3,
                }}
            />

            {/* Grid Layout: 40% Text | 60% Image */}
            <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-10 gap-12 items-center h-full">

                {/* Left Column - Text (40%) */}
                <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
                    <div className="relative">
                        {/* Title */}
                        <h1 className="font-serif text-7xl md:text-8xl lg:text-9xl font-bold text-white-off leading-none">
                            {data?.title || 'COMMITTED'}
                        </h1>

                        {/* Cooky Decoration */}
                        <img
                            ref={cookyRef}
                            src="/assets/cooky_stand.png"
                            alt="Cooky"
                            className="absolute -top-8 -right-4 md:-right-12 w-20 h-20 md:w-24 md:h-24 object-contain"
                            style={{
                                filter: 'drop-shadow(0 0 20px rgba(255, 61, 0, 0.6))',
                            }}
                        />
                    </div>

                    {/* Subtitle */}
                    <p className="font-sans text-xl md:text-2xl text-white-off/80 tracking-widest">
                        {data?.subtitle || 'EST. 17.03.2025'}
                    </p>

                    {/* Music Credit */}
                    {data?.music && (
                        <p className="font-sans text-sm md:text-base text-neon-orange italic">
                            ♪ {data.music}
                        </p>
                    )}
                </div>

                {/* Right Column - Image (60%) */}
                <div ref={imageRef} className="lg:col-span-6 flex items-center justify-center">
                    <VerticalCard
                        src={data?.media || '/assets/yan_foto.jpeg'}
                        isVideo={false}
                        alt={data?.title || 'Hero Image'}
                    />
                </div>
            </div>
        </section>
    );
};

export default Hero;
