import React from 'react';
import { Pokemon, typeAdvantages } from '../types';
import { Zap } from 'lucide-react';
import { TypeBadge } from './TypeBadge';

interface EffectivenessResultProps {
  attackType: string;
  pokemon: Pokemon;
}

export const EffectivenessResult: React.FC<EffectivenessResultProps> = ({ attackType, pokemon }) => {
  const calculateEffectiveness = () => {
    let effectiveness = 1;
    
    pokemon.types.forEach(defendType => {
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

  const effectiveness = calculateEffectiveness();

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
    if (effectiveness >= 2) return "text-green-600";
    if (effectiveness === 1) return "text-gray-800";
    if (effectiveness === 0) return "text-red-600";
    return "text-orange-600";
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-6">
        <Zap className="w-6 h-6 text-pink-500" />
        <h2 className="text-2xl font-bold text-gray-800">Type Analysis</h2>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="text-center">
          <div className="text-lg font-semibold mb-2">Attack Type</div>
          <TypeBadge type={attackType} />
        </div>

        <div className="text-4xl text-pink-500">→</div>

        <div className="flex items-center gap-4">
          <img src={pokemon.sprite} alt={pokemon.name} className="w-24 h-24 pixelated" />
          <div>
            <h3 className="font-semibold text-lg">{pokemon.name}</h3>
            <div className="flex gap-2">
              {pokemon.types.map(type => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className={`text-2xl font-bold ${getEffectivenessColor(effectiveness)}`}>
          {getEffectivenessText(effectiveness)}
        </p>
      </div>
    </div>
  );
};