import { motion } from "framer-motion"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

const Loading = () => {

    const { nextUrl } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate('/' + nextUrl)
            }, 8000)
        }
    }, [])

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="flex flex-col items-center space-y-8">
                {/* Spinner container with floating dots */}
                <div className="relative w-[120px] h-[120px] flex justify-center items-center">
                    {/* Subtle background pulse */}
                    <motion.div
                        className="absolute w-[120px] h-[120px] rounded-full bg-purple-500/10"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.3, 0.1],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />

                    {/* All rings centered using flexbox */}
                    <div className="relative w-[80px] h-[80px] flex justify-center items-center">
                        {/* Outer ring */}
                        <motion.div
                            className="absolute w-[80px] h-[80px] rounded-full border-4 border-purple-300/20"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />

                        {/* Middle ring */}
                        <motion.div
                            className="absolute w-[64px] h-[64px] rounded-full border-4 border-purple-400/40 border-t-purple-500"
                            animate={{ rotate: -360 }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />

                        {/* Inner ring */}
                        <motion.div
                            className="absolute w-[48px] h-[48px] rounded-full border-4 border-purple-500/60 border-r-purple-600"
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        />

                        {/* Center dot */}
                        <motion.div
                            className="w-[32px] h-[32px] rounded-full bg-purple-600"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.7, 1, 0.7],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "easeInOut",
                            }}
                        />
                    </div>

                    {/* Floating dots around the spinner */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-purple-500 rounded-full"
                            style={{
                                left: "50%",
                                top: "50%",
                                transformOrigin: "-1px -60px",
                            }}
                            animate={{
                                rotate: 360,
                                scale: [0.5, 1, 0.5],
                                opacity: [0.3, 1, 0.3],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.5,
                                ease: "easeInOut",
                            }}
                            initial={{
                                rotate: i * 60,
                            }}
                        />
                    ))}
                </div>

                {/* Loading text with typewriter effect */}
                <motion.div
                    className="text-center space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <motion.h2
                        className="text-2xl font-bold text-white"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    >
                        Loading
                    </motion.h2>

                    {/* Animated dots */}
                    <div className="flex justify-center space-x-1">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 bg-purple-500 rounded-full"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Progress bar */}
                <motion.div
                    className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-full"
                        animate={{
                            x: ["-100%", "100%"],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut",
                        }}
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default Loading
