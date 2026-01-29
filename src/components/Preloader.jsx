import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const snoopyRef = useRef(null);
  const cookyRef = useRef(null);
  const textRef = useRef(null);
  const curtainTopRef = useRef(null);
  const curtainBottomRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Count up to 19
    tl.to({ val: 0 }, {
      val: 19,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: function () {
        setCount(Math.floor(this.targets()[0].val));
      }
    });

    // 2. Snoopy walking
    tl.fromTo(snoopyRef.current,
      { x: '-100vw', opacity: 0 },
      { x: '0%', opacity: 1, duration: 1.8, ease: "power2.out" },
      "-=2.0"
    );

    // 3. Cooky entering and pushing
    tl.fromTo(cookyRef.current,
      { x: '100vw', opacity: 0 },
      { x: '10%', opacity: 1, duration: 0.9, ease: "power3.out" }
    );

    // 4. "Push" interaction - Snoopy moves forward as if pushed
    tl.to(snoopyRef.current, {
      x: '90px',
      rotation: 6,
      duration: 0.25,
      ease: "power2.out"
    });
    tl.to(cookyRef.current, {
      x: '0px',
      duration: 0.22,
      ease: "power2.out"
    }, "<");

    // 5. Text reveal
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 }
    );

    // 6. Hold for a moment
    tl.to({}, { duration: 1 });

    // 7. Curtain split (up/down)
    tl.to([curtainTopRef.current, curtainBottomRef.current], {
      yPercent: (i) => (i === 0 ? -110 : 110),
      duration: 0.85,
      ease: "power4.inOut",
    })
      .to(containerRef.current, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => onComplete?.()
      });

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-black-main flex flex-col items-center justify-center font-editorial"
    >
      {/* Curtains */}
      <div ref={curtainTopRef} className="absolute top-0 left-0 right-0 h-1/2 bg-black-main z-[101]" />
      <div ref={curtainBottomRef} className="absolute bottom-0 left-0 right-0 h-1/2 bg-black-main z-[101]" />

      <div className="relative w-full max-w-4xl h-64 flex items-center justify-center">

        {/* Number */}
        <h1 className="text-[15vw] leading-none font-thin text-white-off opacity-80 z-10 tracking-tight">
          {String(count).padStart(2, '0')}
        </h1>

        {/* Snoopy */}
        <img
          ref={snoopyRef}
          src="/assets/snoopy_perfil.webp"
          alt="Snoopy"
          className="absolute bottom-0 left-[35%] w-24 md:w-32 z-20"
        />

        {/* Cooky */}
        <img
          ref={cookyRef}
          src="/assets/cooky_run.webp" // Using run for dynamic feel, or stand
          alt="Cooky"
          className="absolute bottom-0 right-[35%] w-28 md:w-36 z-20"
        />

      </div>

      <p ref={textRef} className="mt-8 text-xl md:text-2xl font-chaos tracking-widest text-white/70">
        ¿Lista para celebrar, Vania?
      </p>

    </div>
  );
};

export default Preloader;
