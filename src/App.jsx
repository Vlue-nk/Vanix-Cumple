import { useEffect, useState, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";

// --- COMPONENTS ---
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import SoundManager from "./components/SoundManager";
import GlobalBackground from "./components/GlobalBackground";
import AudioControl from "./components/AudioControl";
import BloodOverlay from "./components/BloodOverlay";
import ProgressBar from "./components/ProgressBar";

// --- SECTIONS ---
import Hero from "./components/sections/Hero";
import GazeSection from "./components/sections/GazeSection";
import CanvasSection from "./components/sections/CanvasSection";
import DualitySection from "./components/sections/DualitySection";
import EnergySection from "./components/sections/EnergySection";
import SpookySection from "./components/sections/SpookySection";
import Multiverse from "./components/sections/Multiverse";
import Climax from "./components/sections/Climax";
import OutroSection from "./components/sections/OutroSection";

import { useStore } from "./store/useStore";

function App() {
    const { isLoading, setLenisRef } = useStore();
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        setLenisRef(lenis);

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Track scroll progress
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / scrollHeight) * 100;
            setScrollProgress(Math.min(100, Math.max(0, progress)));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            lenis.destroy();
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setLenisRef]);

    return (
        <div className="relative font-sans bg-vania-black text-white selection:bg-neon-orange selection:text-white cursor-none overflow-x-hidden">

            {/* Z-INDEX LAYERS:
                -10: GlobalBackground (fixed)
                0: Main content / sections
                50: AudioControl, ProgressBar (fixed)
                100: CustomCursor
                9999: BloodOverlay
            */}

            {/* Fixed background - z-[-10] */}
            <GlobalBackground />

            {/* Audio system (invisible) */}
            <SoundManager />

            {/* Custom cursor - z-[100] */}
            <CustomCursor />

            {/* UI Controls - z-[50] */}
            <AudioControl />
            <ProgressBar scrollProgress={scrollProgress} />

            {/* Blood curtain overlay - z-[9999] */}
            <BloodOverlay />

            {/* Preloader */}
            <AnimatePresence mode="wait">
                {isLoading && <Preloader key="preloader" />}
            </AnimatePresence>

            {/* Main scrollable content - z-[0] */}
            {!isLoading && (
                <main className="relative z-0">
                    <Hero />
                    <GazeSection />
                    <CanvasSection />
                    <DualitySection />
                    <EnergySection />
                    <SpookySection />
                    <Multiverse />
                    <Climax />
                    <OutroSection />
                </main>
            )}
        </div>
    );
}

export default App;
