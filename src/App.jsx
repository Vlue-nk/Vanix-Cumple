import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { AnimatePresence } from "framer-motion";

// --- COMPONENTS ---
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import SoundManager from "./components/SoundManager";
import GlobalBackground from "./components/GlobalBackground";
import AudioControl from "./components/AudioControl";

// --- SECTIONS ---
import Hero from "./components/sections/Hero";           // Escena 1: Committed
import GazeSection from "./components/sections/GazeSection";      // Escena 2: The Gaze
import CanvasSection from "./components/sections/CanvasSection";  // Escena 3: Art
import DualitySection from "./components/sections/DualitySection"; // Escena 4: HIM/Deftones
import EnergySection from "./components/sections/EnergySection";   // Escena 5: Conciertos
import SpookySection from "./components/sections/SpookySection";   // Escena 6: Halloween
import MultiverseSection from "./components/sections/MultiverseSection"; // Escena 7: Glitch
import Climax from "./components/sections/Climax";                 // Escena 8: Editorial
import OutroSection from "./components/sections/OutroSection";     // Escena 9 y 10: Final

import { useStore } from "./store/useStore";

function App() {
    const { isLoading } = useStore();

    useEffect(() => {
        // Manual Lenis implementation for React 19 / @studio-freight/lenis compatibility
        const lenis = new Lenis({
            duration: 1.8, // Slower for cinematic feel
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <div className="relative font-sans bg-vania-black text-white selection:bg-neon-orange selection:text-white cursor-none">
            <CustomCursor />
            <GlobalBackground />
            <SoundManager />
            <AudioControl />

            <AnimatePresence mode="wait">
                {isLoading && <Preloader key="preloader" />}
            </AnimatePresence>

            {!isLoading && (
                <main className="w-full relative z-0">
                    {/* 1. HERO (Committed) */}
                    <Hero />

                    {/* 2. THE GAZE */}
                    <GazeSection />

                    {/* 3. CANVAS (Art) */}
                    <CanvasSection />

                    {/* 4. DUALITY (HIM vs Deftones) */}
                    <DualitySection />

                    {/* 5. ENERGY (Zen & Libido) */}
                    <EnergySection />

                    {/* 6. SPOOKY SEASON (Halloween) */}
                    <SpookySection />

                    {/* 7. MULTIVERSE (Cute -> Horror) */}
                    <MultiverseSection />

                    {/* 8. CLIMAX (The Photo) */}
                    <Climax />

                    {/* 9 & 10. OUTRO (Memories + End) */}
                    <OutroSection />
                </main>
            )}
        </div>
    );
}

export default App;
