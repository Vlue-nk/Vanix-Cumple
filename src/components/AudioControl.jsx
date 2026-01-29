import { motion } from 'framer-motion';
import { useStore } from '../store/useStore';

const AudioControl = () => {
    const { isMuted, toggleMute } = useStore();

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
            className="fixed bottom-6 right-6 z-50 flex items-end gap-[3px] p-4 bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-colors cursor-pointer group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? "Unmute" : "Mute"}
        >
            {/* Equalizer Bars */}
            <div className="flex items-end gap-[2px] h-8">
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                        key={i}
                        className="w-[3px] bg-white rounded-full"
                        custom={i}
                        variants={barVariants}
                        animate={isMuted ? "muted" : "playing"}
                        initial="muted"
                    />
                ))}
            </div>

            {/* Mute Indicator */}
            {isMuted && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <div className="w-8 h-[2px] bg-red-500 rotate-45 absolute" />
                </motion.div>
            )}

            {/* Tooltip */}
            <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {isMuted ? "Activar sonido" : "Silenciar"}
            </span>
        </motion.button>
    );
};

export default AudioControl;
