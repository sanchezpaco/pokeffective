import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pokemon } from '../types';
import { TypeBadge } from './TypeBadge';
import { Search, X, ChevronLeft } from 'lucide-react';

interface PokemonSelectorProps {
  label: string;
  pokemon: Pokemon[];
  selectedPokemon: Pokemon | null;
  onChange: (pokemon: Pokemon) => void;
  position: 'left' | 'right' | 'center';
}

const INITIAL_LOAD = 30;
const LOAD_MORE_COUNT = 30;

export const PokemonSelector: React.FC<PokemonSelectorProps> = ({
  label,
  pokemon,
  selectedPokemon,
  onChange,
  position
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [displayedCount, setDisplayedCount] = useState(INITIAL_LOAD);
  const [selectedPokemonTransition, setSelectedPokemonTransition] = useState<Pokemon | null>(null);
  const searchTimeoutRef = useRef<number>();
  const loadingMoreRef = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(window.innerWidth < 768);

  const searchPokemon = useCallback((term: string, pokemonList: Pokemon[]) => {
    const searchLower = term.toLowerCase();
    return pokemonList.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.id.toString().includes(term)
    );
  }, []);

  const loadMorePokemon = useCallback(() => {
    if (searchTerm || loadingMoreRef.current) return;
    loadingMoreRef.current = true;
    
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + LOAD_MORE_COUNT, pokemon.length));
      loadingMoreRef.current = false;
    }, 100);
  }, [searchTerm, pokemon.length]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMorePokemon();
    }
  }, [loadMorePokemon]);

  const handlePokemonSelect = (pokemon: Pokemon) => {
    setSelectedPokemonTransition(pokemon);
    setTimeout(() => {
      onChange(pokemon);
      setShowDropdown(false);
      setTimeout(() => {
        setSelectedPokemonTransition(null);
      }, 300);
    }, 100);
  };

  useEffect(() => {
    if (!showDropdown) {
      setSearchTerm('');
      setFilteredPokemon([]);
      setDisplayedCount(INITIAL_LOAD);
      loadingMoreRef.current = false;
      return;
    }

    if (!searchTerm) {
      setFilteredPokemon(pokemon.slice(0, displayedCount));
    }
  }, [showDropdown, pokemon, displayedCount, searchTerm]);

  useEffect(() => {
    if (!showDropdown) return;

    if (searchTerm) {
      setIsSearching(true);
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = window.setTimeout(() => {
        const filtered = searchPokemon(searchTerm, pokemon);
        setFilteredPokemon(filtered);
        setIsSearching(false);
      }, 300);
    }

    return () => {
      if (searchTimeoutRef.current) {
        window.clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchTerm, pokemon, showDropdown, searchPokemon]);

  useEffect(() => {
    const updateModalHeight = () => {
      if (modalRef.current) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      }
    };

    if (showDropdown) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = '0';
      document.body.style.left = '0';
      
      updateModalHeight();
      window.addEventListener('resize', updateModalHeight);
      window.addEventListener('orientationchange', updateModalHeight);
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
      
      window.removeEventListener('resize', updateModalHeight);
      window.removeEventListener('orientationchange', updateModalHeight);
    };
  }, [showDropdown]);

  const handleSearchFocus = () => {
    if (isMobileRef.current) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.paddingBottom = '40vh';
        setTimeout(() => {
          searchInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

  const handleSearchBlur = () => {
    if (isMobileRef.current) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.paddingBottom = '0';
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {selectedPokemon ? (
          <motion.div 
            key="selected"
            className="relative cursor-pointer"
            onClick={() => setShowDropdown(true)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex flex-col items-center">
              <motion.img 
                src={selectedPokemon.sprite} 
                alt={selectedPokemon.name}
                className="w-40 h-40 pixelated"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-white drop-shadow-lg mb-1">
                  {selectedPokemon.name}
                </div>
                <div className="text-white text-lg drop-shadow-md mb-3">
                  #{selectedPokemon.id.toString().padStart(3, '0')}
                </div>
                <div className="flex gap-2 justify-center">
                  {selectedPokemon.types.map(type => (
                    <TypeBadge key={type} type={type} className="text-base px-3 py-1.5" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="empty"
            className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-8 text-center cursor-pointer
                       hover:bg-white/30 transition-colors duration-300 overflow-hidden group"
            onClick={() => setShowDropdown(true)}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Decorative Pokéballs */}
            <div className="absolute inset-0 overflow-hidden opacity-10">
              <motion.div
                className="absolute -right-4 -top-4 w-20 h-20 bg-red-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -left-4 -bottom-4 w-16 h-16 bg-red-500 rounded-full"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Main Pokéball */}
            <div className="relative mb-6">
              <motion.div
                className="w-24 h-24 mx-auto relative"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 bg-red-500 rounded-full" />
                <div className="absolute top-[45%] w-full h-[10%] bg-black" />
                <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-white rounded-full border-4 border-black
                               group-hover:scale-125 transition-transform duration-300" />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <p className="text-white text-2xl font-bold mb-3 drop-shadow-lg">
                Choose Your Partner
              </p>
              <p className="text-white text-lg drop-shadow-md">
                Select a Pokémon to begin
              </p>
            </motion.div>

            {/* Sparkles */}
            <motion.div
              className="absolute inset-0"
              animate={{ scale: [1, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-300 rounded-full" />
              <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-yellow-300 rounded-full" />
              <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-yellow-300 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showDropdown && (
          <motion.div 
            ref={modalRef}
            className="fixed inset-0 bg-white z-50 flex flex-col"
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              height: '100vh',
              height: 'calc(var(--vh, 1vh) * 100)'
            }}
          >
            <div className="flex flex-col h-[100vh] h-[calc(var(--vh,1vh)*100)]">
              <div className="flex items-center gap-3 p-4 border-b bg-white">
                <motion.button 
                  onClick={() => setShowDropdown(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="w-6 h-6 text-gray-500" />
                </motion.button>
                <h3 className="text-2xl font-bold flex-1">Choose Your Partner</h3>
              </div>
              
              <div className="sticky top-0 z-10 bg-white px-4 py-3 border-b shadow-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    ref={searchInputRef}
                    type="search"
                    placeholder="Search by name or number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    className="w-full pl-12 pr-4 py-4 text-lg border rounded-lg focus:ring-2 focus:ring-pink-200 focus:border-pink-300"
                    autoFocus
                  />
                </div>
              </div>
              
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto px-2 pb-4 bg-gray-50"
                onScroll={handleScroll}
              >
                {isSearching ? (
                  <div className="flex items-center justify-center py-8">
                    <motion.div 
                      className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
                    {filteredPokemon.map((p) => (
                      <motion.div
                        key={p.id}
                        onClick={() => handlePokemonSelect(p)}
                        className="flex flex-col items-center p-4 rounded-xl bg-white hover:bg-pink-50 cursor-pointer transition-colors duration-200 shadow-sm"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <img src={p.sprite} alt={p.name} className="w-24 h-24 pixelated" />
                        <span className="font-semibold text-lg mt-2">{p.name}</span>
                        <span className="text-base text-gray-600">#{p.id.toString().padStart(3, '0')}</span>
                        <div className="flex gap-1.5 mt-2">
                          {p.types.map(type => (
                            <TypeBadge key={type} type={type} className="text-sm px-2.5 py-1" />
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {!isSearching && filteredPokemon.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 text-lg">No Pokémon found</p>
                    <p className="text-gray-500">Try a different search term</p>
                  </div>
                )}

                {!isSearching && !searchTerm && displayedCount < pokemon.length && (
                  <div className="flex justify-center py-4">
                    <motion.div 
                      className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};