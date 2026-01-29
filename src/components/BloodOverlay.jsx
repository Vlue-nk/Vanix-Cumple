import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, COLORS } from '../store/useStore';

/**
 * Blood Overlay Component
 * Creates the "Blood Curtain" transition effect with z-index 9999
 * Handles the visual magic trick during Halloween -> Climax transition
 */
const BloodOverlay = () => {
    const { bloodPhase, setBloodPhase } = useStore();

    // Blood phases:
    // 0: Hidden
    // 1: Covering (top: -100% to 0%)
    // 2: Full (screen is red - this is when we scroll)
    // 3: Revealing (top: 0% to 100% - sliding down)

    return (
        <AnimatePresence>
            {bloodPhase > 0 && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* SVG Liquid Blood */}
                    <motion.svg
                        className="absolute w-full h-[120%]"
                        viewBox="0 0 100 120"
                        preserveAspectRatio="none"
                        initial={{ y: "-100%" }}
                        animate={{
                            y: bloodPhase === 1 ? "0%" :
                                bloodPhase === 2 ? "0%" :
                                    bloodPhase === 3 ? "100%" : "-100%"
                        }}
                        transition={{
                            duration: bloodPhase === 1 ? 1 :
                                bloodPhase === 3 ? 1.2 : 0,
                            ease: bloodPhase === 1 ? [0.76, 0, 0.24, 1] : [0.25, 1, 0.5, 1]
                        }}
                    >
                        {/* Wavy top edge for liquid effect */}
                        <path
                            d={`
                                M 0,-10 
                                L 100,-10 
                                L 100,100 
                                Q 90,102 80,100 
                                Q 70,98 60,100 
                                Q 50,102 40,100 
                                Q 30,98 20,100 
                                Q 10,102 0,100 
                                Z
                            `}
                            fill={COLORS.driedBlood}
                        />

                        {/* Drips at the bottom */}
                        <ellipse cx="15" cy="105" rx="3" ry="6" fill={COLORS.driedBlood} />
                        <ellipse cx="45" cy="108" rx="2" ry="5" fill={COLORS.driedBlood} />
                        <ellipse cx="75" cy="106" rx="2.5" ry="5" fill={COLORS.driedBlood} />
                        <ellipse cx="90" cy="104" rx="2" ry="4" fill={COLORS.driedBlood} />
                    </motion.svg>

                    {/* Extra darkness overlay for drama */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ background: `${COLORS.driedBlood}` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: bloodPhase === 2 ? 0.5 : 0 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BloodOverlay;
