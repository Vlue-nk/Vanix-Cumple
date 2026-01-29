import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * Multiverse Section - "VANIAVERSE"
 * BT21 x Pennywise Interactive Experience
 * 
 * Features:
 * - Pastel background with animated Cooky
 * - Floating balloon interaction
 * - Click trigger: background flash, Pennywise reveal, shocked Cooky
 */
const Multiverse = ({ data }) => {
    const [isTriggered, setIsTriggered] = useState(false);
    const [showPennywise, setShowPennywise] = useState(false);
    const [bgColor, setBgColor] = useState('#e6e6fa');

    const cookyRef = useRef(null);
    const balloonRef = useRef(null);
    const pennywiseRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        // Preload laugh sound
        audioRef.current = new Audio('/assets/pennywise_laugh.mp3');

        // Cooky running animation (left to right loop)
        if (cookyRef.current && !isTriggered) {
            gsap.to(cookyRef.current, {
                x: '100vw',
                duration: 8,
                repeat: -1,
                ease: 'linear',
                modifiers: {
                    x: (x) => {
                        return parseFloat(x) % window.innerWidth + 'px';
                    }
                }
            });
        }

        // Balloon floating animation (bottom to top)
        if (balloonRef.current && !isTriggered) {
            gsap.fromTo(
                balloonRef.current,
                { y: '100vh' },
                {
                    y: '-20vh',
                    duration: 12,
                    repeat: -1,
                    ease: 'linear',
                }
            );
        }
    }, [isTriggered]);

    const handleBalloonClick = () => {
        if (isTriggered) return;

        setIsTriggered(true);

        // 1. Hide balloon with pop effect
        gsap.to(balloonRef.current, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'back.in',
        });

        // 2. Change background to blood red instantly
        setBgColor('#8a0303');

        // 3. Play laugh sound
        if (audioRef.current) {
            audioRef.current.play().catch(err => console.log('Audio failed:', err));
        }

        // 4. Show Pennywise with violent shake
        setShowPennywise(true);

        setTimeout(() => {
            if (pennywiseRef.current) {
                gsap.fromTo(
                    pennywiseRef.current,
                    { scale: 0.5, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.1,
                        ease: 'power4.out',
                    }
                );

                // Violent shake animation
                gsap.to(pennywiseRef.current, {
                    x: '+=15',
                    duration: 0.05,
                    repeat: 10,
                    yoyo: true,
                    ease: 'power1.inOut',
                });
            }
        }, 100);

        // 5. Hide Pennywise after shake
        setTimeout(() => {
            setShowPennywise(false);
            // Reset background to pastel after a moment
            setTimeout(() => setBgColor('#e6e6fa'), 500);
        }, 600);
    };

    return (
        <section
            id={data?.id || 'multiverse'}
            className="relative min-h-screen w-full overflow-hidden flex items-center justify-center transition-colors duration-200"
            style={{ backgroundColor: bgColor }}
        >
            {/* Title */}
            <div className="absolute top-20 left-0 right-0 text-center z-10">
                <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-blood-red">
                    {data?.title || 'VANIAVERSE'}
                </h2>
                {data?.subtitle && (
                    <p className="font-sans text-xl md:text-2xl text-black-main/70 mt-4">
                        {data.subtitle}
                    </p>
                )}
            </div>

            {/* Cooky Character - Running or Shocked */}
            <div
                ref={cookyRef}
                className="absolute bottom-32 -left-32 z-20"
                style={{
                    width: '120px',
                    height: '120px',
                }}
            >
                <img
                    src={isTriggered ? data?.assets?.reactionChar || '/assets/cooky_shocked.png' : data?.assets?.mainChar || '/assets/cooky_run.png'}
                    alt="Cooky"
                    className="w-full h-full object-contain"
                    style={{
                        filter: isTriggered
                            ? 'drop-shadow(0 0 20px rgba(255, 61, 0, 0.8))'
                            : 'drop-shadow(0 0 15px rgba(255, 61, 0, 0.4))',
                    }}
                />
            </div>

            {/* Floating Balloon - Clickable */}
            {!isTriggered && (
                <div
                    ref={balloonRef}
                    onClick={handleBalloonClick}
                    className="absolute left-1/2 -translate-x-1/2 cursor-pointer hover:scale-110 transition-transform z-30"
                    style={{
                        width: '100px',
                        height: '140px',
                    }}
                >
                    <img
                        src={data?.assets?.trigger || '/assets/pennywise_balloon.png'}
                        alt="Red Balloon"
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>
            )}

            {/* Pennywise Face - Jump Scare */}
            {showPennywise && (
                <div
                    ref={pennywiseRef}
                    className="absolute inset-0 flex items-center justify-center z-50"
                >
                    <img
                        src={data?.assets?.villain || '/assets/pennywise_face.png'}
                        alt="Pennywise"
                        className="w-96 h-96 object-contain"
                        style={{
                            filter: 'drop-shadow(0 0 60px rgba(138, 3, 3, 0.9))',
                        }}
                    />
                </div>
            )}

            {/* CSS Keyframes for smooth animations */}
            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-30px);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
      `}</style>
        </section>
    );
};

export default Multiverse;
