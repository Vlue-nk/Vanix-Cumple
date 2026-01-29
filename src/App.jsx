import { useState, useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Hooks & Globals
import { AudioProvider } from './hooks/useAudio.jsx';
import CustomCursor from './components/CustomCursor';
import ProgressBar from './components/ProgressBar';

// Scenes (to be created)
import Preloader from './components/Preloader';
import HeroSection from './components/HeroSection'; // Scene 1
import GazeSection from './components/GazeSection'; // Scene 2
import CanvasSection from './components/CanvasSection'; // Scene 3
import DualitySection from './components/DualitySection'; // Scene 4
import EnergySection from './components/EnergySection'; // Scene 5
import SpookySection from './components/SpookySection'; // Scene 6
import MultiverseSection from './components/MultiverseSection'; // Scene 7
import ClimaxSection from './components/ClimaxSection'; // Scene 8
import OutroSection from './components/OutroSection'; // Scene 9
import EndSection from './components/EndSection'; // Scene 10

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Only init Lenis if not loading
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smoothWheel: true,
      smoothTouch: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ({ scroll }) => {
      ScrollTrigger.update();
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? (scroll / h) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, p)));
    });

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [loading]);

  const handlePreloaderComplete = () => {
    // Small delay to ensure exit animation finishes visually if needed
    setTimeout(() => {
      setLoading(false);
      // Force refresh ScrollTrigger after DOM change
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, 100);
  };

  return (
    <AudioProvider>
      <div className="antialiased min-h-screen bg-[var(--black)] text-[var(--white)] selection:bg-white selection:text-black">

        <CustomCursor />

        {loading ? (
          <Preloader onComplete={handlePreloaderComplete} />
        ) : (
          <>
            <div className="grain-overlay" />

            <main className="relative w-full">
              <HeroSection />
              <GazeSection />
              <CanvasSection />
              <DualitySection />
              <EnergySection />
              <SpookySection />
              <MultiverseSection />
              <ClimaxSection />
              <OutroSection />
              <EndSection />
            </main>

            <ProgressBar scrollProgress={scrollProgress} />
          </>
        )}
      </div>
    </AudioProvider>
  );
}

export default App;
