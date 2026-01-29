import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import VerticalCard from '../VerticalCard';

/**
 * Climax Section - "ETERNAL"
 * 
 * Features:
 * - Pure black background
 * - Parallax teleprompter text (two columns, opposite directions)
 * - Centered photo with premium double border
 * - Elegant typography
 */
const Climax = ({ data }) => {
    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);

    useEffect(() => {
        // Parallax animation for left column (moving up)
        gsap.to(leftTextRef.current, {
            y: '-50%',
            duration: 30,
            repeat: -1,
            ease: 'linear',
        });

        // Parallax animation for right column (moving down)
        gsap.to(rightTextRef.current, {
            y: '50%',
            duration: 30,
            repeat: -1,
            ease: 'linear',
        });
    }, []);

    const bgTexts = data?.bgText || ['TE AMO', 'SIEMPRE', '19 AÑOS', 'NOSOTROS'];

    return (
        <section
            id={data?.id || 'climax'}
            className="relative min-h-screen w-full bg-black overflow-hidden flex items-center justify-center"
        >
            {/* Teleprompter Background Text - Left Column (Moving Up) */}
            <div className="absolute left-0 top-0 h-[200vh] flex flex-col justify-start opacity-10 pointer-events-none">
                <div ref={leftTextRef} className="flex flex-col space-y-12">
                    {Array(20).fill(null).map((_, i) => (
                        <div key={i} className="font-serif text-8xl md:text-9xl text-white-off whitespace-nowrap px-8">
                            {bgTexts[i % bgTexts.length]}
                        </div>
                    ))}
                </div>
            </div>

            {/* Teleprompter Background Text - Right Column (Moving Down) */}
            <div className="absolute right-0 top-0 h-[200vh] flex flex-col justify-start opacity-10 pointer-events-none">
                <div ref={rightTextRef} className="flex flex-col space-y-12">
                    {Array(20).fill(null).map((_, i) => (
                        <div key={i} className="font-serif text-8xl md:text-9xl text-white-off whitespace-nowrap px-8">
                            {bgTexts[(i + 2) % bgTexts.length]}
                        </div>
                    ))}
                </div>
            </div>

            {/* Center Content */}
            <div className="relative z-10 flex flex-col items-center justify-center px-8">
                {/* Photo with Premium Double Border */}
                <div className="relative">
                    {/* Outer gray border (offset) */}
                    <div
                        className="absolute inset-0 border-2 border-gray-500"
                        style={{
                            transform: 'translate(10px, 10px)',
                        }}
                    />

                    {/* Inner white border */}
                    <div className="relative border border-white-off p-4 bg-black">
                        <VerticalCard
                            src={data?.media || '/assets/LAFOTO.jpeg'}
                            isVideo={false}
                            alt={data?.title || 'Eternal'}
                        />
                    </div>
                </div>

                {/* Typography Below Photo */}
                <div className="mt-12 text-center">
                    <h2 className="font-serif text-4xl md:text-6xl text-white-off mb-4">
                        {data?.title || 'ETERNAL'}
                    </h2>
                    <p className="font-sans text-xs md:text-sm text-white-off/70 tracking-widest uppercase">
                        {data?.subtitle || 'Time Shifts, We Stay'}
                    </p>
                </div>
            </div>

            {/* Vignette Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-radial from-transparent via-transparent to-black/60" />
        </section>
    );
};

export default Climax;
