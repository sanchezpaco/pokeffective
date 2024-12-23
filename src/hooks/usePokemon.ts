import { useState, useEffect } from 'react';
import axios from 'axios';
import { Pokemon } from '../types';

const CACHE_KEY = 'pokeffective-data';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const INITIAL_BATCH_SIZE = 20; // Smaller initial batch for faster first render
const SUBSEQUENT_BATCH_SIZE = 100;

interface CacheData {
  timestamp: number;
  pokemon: Pokemon[];
  lastProcessedIndex: number;
}

interface PokemonApiResponse {
  id: number;
  name: string;
  types: Array<{ type: { name: string } }>;
  sprites: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
}

export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const processPokemonData = (data: PokemonApiResponse): Pokemon => ({
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      types: data.types.map(t => t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)),
      sprite: data.sprites.front_default || 
              data.sprites.other?.['official-artwork']?.front_default ||
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'
    });

    const fetchPokemonBatch = async (urls: string[], batchSize: number, startIndex: number) => {
      const batch = urls.slice(startIndex, startIndex + batchSize);
      const batchPromises = batch.map(url => 
        axios.get<PokemonApiResponse>(url)
          .then(response => processPokemonData(response.data))
      );
      
      const results = await Promise.all(batchPromises);
      return results.sort((a, b) => a.id - b.id);
    };

    const fetchPokemon = async () => {
      try {
        // Check cache first
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          const { timestamp, pokemon: cachedPokemon } = JSON.parse(cachedData) as CacheData;
          
          if (Date.now() - timestamp < CACHE_DURATION && cachedPokemon.length > 0) {
            setPokemon(cachedPokemon);
            setLoading(false);
            setProgress(100);

            console.log(cachedPokemon)
            return;
          }
        }

        // Fetch initial data
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1500');
        const urls = response.data.results.map((p: { url: string }) => p.url);
        const totalPokemon = urls.length;

        // Load initial batch quickly
        const initialBatch = await fetchPokemonBatch(urls, INITIAL_BATCH_SIZE, 0);
        setPokemon(initialBatch);
        setProgress((INITIAL_BATCH_SIZE / totalPokemon) * 100);

        // Load remaining Pokemon in larger batches
        setLoading(false); // Allow interaction while loading remaining data
        
        for (let i = INITIAL_BATCH_SIZE; i < urls.length; i += SUBSEQUENT_BATCH_SIZE) {
          const newBatch = await fetchPokemonBatch(urls, SUBSEQUENT_BATCH_SIZE, i);
          setPokemon(prev => [...prev, ...newBatch].sort((a, b) => a.id - b.id));
          setProgress((Math.min(i + SUBSEQUENT_BATCH_SIZE, totalPokemon) / totalPokemon) * 100);
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          pokemon: pokemon
        }));

      } catch (err) {
        setError('Failed to fetch Pokémon data. Please try again later.');
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  return { pokemon, loading, error, progress };
};