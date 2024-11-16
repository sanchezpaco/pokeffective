import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface PokeballProps {
  isLoading: boolean;
  selectedBallType?: string;
  progress?: number;
}

interface PokeBallType {
  name: string;
  topColor: string;
  centerColor: string;
  glowColor: string;
}

const POKEBALL_TYPES: PokeBallType[] = [
  {
    name: "Poké Ball",
    topColor: "bg-red-500",
    centerColor: "bg-white",
    glowColor: "rgba(239, 68, 68, 0.8)", // red-500
  },
  {
    name: "Great Ball",
    topColor: "bg-blue-500",
    centerColor: "bg-red-400",
    glowColor: "rgba(59, 130, 246, 0.8)", // blue-500
  },
  {
    name: "Ultra Ball",
    topColor: "bg-yellow-400",
    centerColor: "bg-neutral-800",
    glowColor: "rgba(250, 204, 21, 0.8)", // yellow-400
  },
  {
    name: "Master Ball",
    topColor: "bg-purple-600",
    centerColor: "bg-pink-400",
    glowColor: "rgba(147, 51, 234, 0.8)", // purple-600
  }
];

export const Pokeball: React.FC<PokeballProps> = ({ isLoading, selectedBallType, progress = 0 }) => {
  // Select a random Pokéball type on component mount or use provided type
  const selectedBall = useMemo(() => {
    if (selectedBallType) {
      return POKEBALL_TYPES.find(ball => ball.name === selectedBallType) || POKEBALL_TYPES[0];
    }
    return POKEBALL_TYPES[Math.floor(Math.random() * POKEBALL_TYPES.length)];
  }, [selectedBallType]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative w-full h-full">
        {/* Bottom half */}
        <motion.div 
          className="absolute bottom-0 w-full h-1/2 bg-white z-10"
          animate={!isLoading ? { y: '100%' } : {}}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="absolute top-0 left-0 right-0 h-4 bg-black"></div>
        </motion.div>

        {/* Top half */}
        <motion.div 
          className={`absolute top-0 w-full h-1/2 ${selectedBall.topColor} z-20`}
          animate={!isLoading ? { y: '-100%' } : {}}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        >
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-black"></div>
          
          {/* Center circles attached to top half */}
          <motion.div 
            className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-30"
            initial={false}
          >
            <div className="relative">
              <motion.div 
                className="w-32 h-32 bg-white rounded-full border-[12px] border-black"
                animate={isLoading ? {
                  scale: [1, 1.05, 1],
                } : {}}
                transition={{
                  repeat: Infinity,
                  duration: 2
                }}
              >
                {/* Inner circle with glow effect */}
                <motion.div 
                  className={`w-16 h-16 ${selectedBall.centerColor} rounded-full border-[8px] border-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
                  animate={isLoading ? {
                    boxShadow: [
                      `0 0 20px ${selectedBall.glowColor}`,
                      `0 0 40px ${selectedBall.glowColor}`,
                      `0 0 20px ${selectedBall.glowColor}`
                    ]
                  } : {}}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {/* Glowing core */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white"
                    animate={isLoading ? {
                      opacity: [0.4, 1, 0.4],
                      scale: [0.8, 1.1, 0.8]
                    } : {}}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading Progress */}
        {isLoading && progress > 0 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64 text-center">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <motion.p 
              className="text-white/80 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Loading Pokémon data...
            </motion.p>
          </div>
        )}

        {/* Decorative sparkles */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};