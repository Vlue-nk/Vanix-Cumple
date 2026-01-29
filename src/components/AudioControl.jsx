import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, COLORS } from '../store/useStore';

/**
 * AudioControl - Premium mute button with visual feedback
 * Position: Fixed bottom-right, z-50
 */
const AudioControl = () => {
    const { isMuted, toggleMute, currentZone } = useStore();
    const [showTooltip, setShowTooltip] = useState(false);

    // Get zone-specific accent color
    const getAccentColor = () => {
        switch (currentZone) {
            case 'hero': return COLORS.burntOrange;
            case 'gaze': return COLORS.steelBlue;
            case 'halloween': case 'multiverse': return COLORS.driedBlood;
            case 'canvas': return '#8B7355';
            case 'party': return '#ff1493';
            case 'climax': return '#ffffff';
            default: return '#ffffff';
        }
    };

    const barVariants = {
        playing: (i) => ({
            height: [10, 28, 14, 32, 10],
            transition: {
                repeat: Infinity,
                duration: 0.6 + i * 0.1,
                ease: "easeInOut"
            }
        }),
        muted: {
            height: 6
        }
    };

    return (
        <motion.button
            onClick={toggleMute}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="fixed bottom-6 right-6 z-50 flex items-end gap-[3px] p-4 backdrop-blur-md rounded-full border border-white/10 transition-all duration-300 cursor-pointer group"
            style={{
                background: `rgba(0,0,0,0.5)`,
                boxShadow: `0 0 20px ${getAccentColor()}20`
            }}
            whileHover={{
                scale: 1.05,
                boxShadow: `0 0 30px ${getAccentColor()}40`
            }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? "Unmute" : "Mute"}
        >
            {/* Equalizer Bars */}
            <div className="flex items-end gap-[2px] h-8">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="w-[3px] rounded-full"
                        style={{ backgroundColor: getAccentColor() }}
                        custom={i}
                        variants={barVariants}
                        animate={isMuted ? "muted" : "playing"}
                        initial="muted"
                    />
                ))}
            </div>

            {/* Mute X Indicator */}
            <AnimatePresence>
                {isMuted && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <div
                            className="w-8 h-[2px] rotate-45 absolute"
                            style={{ backgroundColor: COLORS.driedBlood }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.span
                        className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-black/90 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap border border-white/10"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                    >
                        {isMuted ? "🔇 Activar audio" : "🔊 Silenciar"}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default AudioControl;
