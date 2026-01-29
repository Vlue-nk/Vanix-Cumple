import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Lazy Reveal Component
 * Animates children with staggered reveal effect
 * - Opacity 0 → 1
 * - Y movement (50px → 0)
 * - Optional blur exit
 */

// Base variants for reveal animation
const revealVariants = {
    hidden: {
        opacity: 0,
        y: 50,
        filter: 'blur(4px)'
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1], // expo out
        }
    },
    exit: {
        opacity: 0,
        y: -30,
        scale: 0.95,
        filter: 'blur(10px)',
        transition: {
            duration: 0.5,
            ease: 'easeIn'
        }
    }
};

// Container with staggered children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1,
        }
    },
    exit: {
        opacity: 0,
        transition: {
            staggerChildren: 0.05,
            staggerDirection: -1,
        }
    }
};

// Single reveal item
export const RevealItem = ({
    children,
    delay = 0,
    direction = 'up', // up, down, left, right
    className = '',
    once = true,
}) => {
    const [ref, inView] = useInView({
        triggerOnce: once,
        threshold: 0.1,
    });

    const directionMap = {
        up: { y: 50, x: 0 },
        down: { y: -50, x: 0 },
        left: { y: 0, x: 50 },
        right: { y: 0, x: -50 },
    };

    const offset = directionMap[direction];

    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{
                opacity: 0,
                x: offset.x,
                y: offset.y,
                filter: 'blur(4px)'
            }}
            animate={inView ? {
                opacity: 1,
                x: 0,
                y: 0,
                filter: 'blur(0px)'
            } : {}}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

// Staggered container
export const RevealContainer = ({
    children,
    className = '',
    once = true,
}) => {
    const [ref, inView] = useInView({
        triggerOnce: once,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            className={className}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            {children}
        </motion.div>
    );
};

// Child component for RevealContainer
export const RevealChild = ({
    children,
    className = '',
}) => {
    return (
        <motion.div
            className={className}
            variants={revealVariants}
        >
            {children}
        </motion.div>
    );
};

// Title reveal with split text effect
export const RevealTitle = ({
    text,
    className = '',
    as: Tag = 'h1',
    delay = 0,
}) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <Tag ref={ref} className={`overflow-hidden ${className}`}>
            <motion.span
                className="inline-block"
                initial={{ y: '100%', opacity: 0 }}
                animate={inView ? { y: '0%', opacity: 1 } : {}}
                transition={{
                    duration: 0.8,
                    delay,
                    ease: [0.22, 1, 0.36, 1],
                }}
            >
                {text}
            </motion.span>
        </Tag>
    );
};

// Image/Video reveal with mask
export const RevealMedia = ({
    children,
    className = '',
    delay = 0,
}) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            className={`overflow-hidden ${className}`}
            initial={{
                opacity: 0,
                scale: 1.1,
                filter: 'blur(8px)'
            }}
            animate={inView ? {
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)'
            } : {}}
            transition={{
                duration: 1,
                delay,
                ease: [0.22, 1, 0.36, 1],
            }}
        >
            {children}
        </motion.div>
    );
};

export default {
    RevealItem,
    RevealContainer,
    RevealChild,
    RevealTitle,
    RevealMedia,
};
