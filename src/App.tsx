import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronDown } from 'lucide-react';
import { Pokeball } from './components/Pokeball';
import { PokemonSelector } from './components/PokemonSelector';
import { TypeSelector } from './components/TypeSelector';
import { usePokemon } from './hooks/usePokemon';
import { Pokemon, typeAdvantages } from './types';

// Define Pokéball colors for initial gradient
const POKEBALL_COLORS = {
  "Poké Ball": { from: "rgb(239, 68, 68)", to: "rgb(254, 226, 226)" }, // red-500 to red-100
  "Great Ball": { from: "rgb(59, 130, 246)", to: "rgb(219, 234, 254)" }, // blue-500 to blue-100
  "Ultra Ball": { from: "rgb(250, 204, 21)", to: "rgb(254, 249, 195)" }, // yellow-400 to yellow-100
  "Master Ball": { from: "rgb(147, 51, 234)", to: "rgb(243, 232, 255)" }, // purple-600 to purple-100
};

const App: React.FC = () => {
  const [showPokeball, setShowPokeball] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const { pokemon, loading, error, progress } = usePokemon();

  // Select a random Pokéball type for consistent gradient
  const selectedBall = useMemo(() => {
    const types = Object.keys(POKEBALL_COLORS);
    return types[Math.floor(Math.random() * types.length)];
  }, []);

  useEffect(() => {
    console.log(loading)
    console.log(pokemon.length)
    if (!loading && pokemon.length > 0) {
      const timer = setTimeout(() => {
        setContentReady(true);
        setTimeout(() => {
          setShowPokeball(false);
          setTimeout(() => {
            setShowContent(true);
          }, 500);
        }, 1500);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [loading, pokemon.length]);

  const getEffectivenessText = (effectiveness: number) => {
    if (effectiveness >= 4) return "Super effective! (4x)";
    if (effectiveness === 2) return "Super effective! (2x)";
    if (effectiveness === 1) return "Normal effectiveness";
    if (effectiveness === 0.5) return "Not very effective... (0.5x)";
    if (effectiveness === 0.25) return "Not very effective... (0.25x)";
    if (effectiveness === 0) return "No effect...";
    return `${effectiveness}x effectiveness`;
  };

  const getEffectivenessColor = (effectiveness: number) => {
    if (effectiveness >= 2) return "bg-green-100/90 text-green-800";
    if (effectiveness === 1) return "bg-gray-100/90 text-gray-800";
    if (effectiveness === 0) return "bg-red-100/90 text-red-800";
    return "bg-orange-100/90 text-orange-800";
  };

  if (error) {
    return (
      <div className="min-h-screen gradient-container flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showPokeball && (
          <Pokeball 
            isLoading={!contentReady} 
            selectedBallType={selectedBall}
            progress={progress}
          />
        )}
      </AnimatePresence>
      
      <div 
        className="min-h-screen flex flex-col gradient-container"
        style={{
          '--gradient-left': selectedType ? `var(--${selectedType.toLowerCase()})` : POKEBALL_COLORS[selectedBall].from,
          '--gradient-right': selectedPokemon ? `var(--${selectedPokemon.types[0].toLowerCase()})` : POKEBALL_COLORS[selectedBall].to,
        } as any}
      >
        <div className="gradient-overlay" />
        
        <AnimatePresence>
          {showContent && (
            <motion.div 
              className="flex flex-col min-h-screen w-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <motion.div 
                className="flex flex-col items-center justify-center py-6 px-4 relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div 
                  className="flex items-center gap-2 mb-2"
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                  <h1 className="text-3xl font-bold text-white">Pokeffective</h1>
                  <Sparkles className="w-5 h-5 text-yellow-300" />
                </motion.div>
                <p className="text-white/80 text-sm">{pokemon.length} Pokémon available</p>
              </motion.div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {/* Pokemon Selection Area */}
                <motion.div 
                  className="flex-1 flex flex-col items-center px-4 pt-6 pb-32 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <PokemonSelector
                    label="Select your target"
                    pokemon={pokemon}
                    selectedPokemon={selectedPokemon}
                    onChange={setSelectedPokemon}
                    position="center"
                  />
                </motion.div>

                {/* Effectiveness Display */}
                <AnimatePresence>
                  {selectedType && selectedPokemon && !showTypeSelector && (
                    <motion.div
                      className="fixed bottom-[25vh] left-0 right-0 px-4 pointer-events-none z-10"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                      transition={{ type: "spring", damping: 20 }}
                    >
                      <motion.div 
                        className={`text-center py-3 px-6 rounded-2xl shadow-lg backdrop-blur-md mx-auto max-w-sm ${
                          getEffectivenessColor(calculateEffectiveness(selectedType, selectedPokemon.types))
                        }`}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <p className="text-lg font-semibold">
                          {getEffectivenessText(calculateEffectiveness(selectedType, selectedPokemon.types))}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Bottom Sheet for Type Selection */}
                <motion.div
                  className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-lg"
                  initial={{ y: "100%" }}
                  animate={{ y: showTypeSelector ? "0%" : "60%" }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  {/* Pull Handle */}
                  <div 
                    className="flex flex-col items-center py-2 cursor-pointer"
                    onClick={() => setShowTypeSelector(!showTypeSelector)}
                  >
                    <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-2" />
                    <motion.div
                      animate={{ rotate: showTypeSelector ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    </motion.div>
                  </div>

                  {/* Preview of selected type */}
                  <div className="px-4 pb-4 text-center">
                    <h2 className="text-lg font-medium text-gray-600">
                      {selectedType ? `Attack Type: ${selectedType}` : 'Choose attack type'}
                    </h2>
                  </div>

                  {/* Type Selection Content */}
                  <div className="px-4 pb-8 max-h-[60vh] overflow-y-auto">
                    <TypeSelector
                      label="Choose attack type"
                      value={selectedType}
                      onChange={(type) => {
                        setSelectedType(type);
                        setShowTypeSelector(false);
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

// Helper function to calculate effectiveness
const calculateEffectiveness = (attackType: string, defenderTypes: string[]): number => {
  let effectiveness = 1;
  defenderTypes.forEach(defendType => {
    if (typeAdvantages[attackType].superEffective.includes(defendType)) {
      effectiveness *= 2;
    }
    if (typeAdvantages[attackType].notVeryEffective.includes(defendType)) {
      effectiveness *= 0.5;
    }
    if (typeAdvantages[attackType].noEffect.includes(defendType)) {
      effectiveness *= 0;
    }
  });
  return effectiveness;
};

export default App;