import React from 'react';
import { Pokemon, typeAdvantages } from '../types';
import { Swords } from 'lucide-react';

interface BattleResultProps {
  pokemon1: Pokemon;
  pokemon2: Pokemon;
}

export const BattleResult: React.FC<BattleResultProps> = ({ pokemon1, pokemon2 }) => {
  const calculateEffectiveness = (attackerTypes: string[], defenderTypes: string[]) => {
    let effectiveness = 1;
    
    attackerTypes.forEach(attackType => {
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
    });
    
    return effectiveness;
  };

  const effectiveness1to2 = calculateEffectiveness(pokemon1.types, pokemon2.types);
  const effectiveness2to1 = calculateEffectiveness(pokemon2.types, pokemon2.types);

  const getAdvantageText = () => {
    if (effectiveness1to2 > effectiveness2to1) {
      return `${pokemon1.name} has the advantage!`;
    } else if (effectiveness2to1 > effectiveness1to2) {
      return `${pokemon2.name} has the advantage!`;
    }
    return "It's an even match!";
  };

  const getEffectivenessText = (effectiveness: number) => {
    if (effectiveness >= 4) return "Super effective! (4x)";
    if (effectiveness === 2) return "Super effective! (2x)";
    if (effectiveness === 1) return "Normal effectiveness";
    if (effectiveness === 0.5) return "Not very effective... (0.5x)";
    if (effectiveness === 0.25) return "Not very effective... (0.25x)";
    if (effectiveness === 0) return "No effect...";
    return `${effectiveness}x effectiveness`;
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Swords className="w-6 h-6 text-pink-500" />
        <h2 className="text-2xl font-bold text-gray-800">Battle Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={pokemon1.sprite} alt={pokemon1.name} className="w-24 h-24 pixelated" />
            <div>
              <h3 className="font-semibold text-lg">{pokemon1.name}</h3>
              <div className="flex gap-2">
                {pokemon1.types.map(type => (
                  <span key={type} className="px-2 py-1 rounded-full text-sm bg-pink-100 text-pink-800">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Attacking {pokemon2.name}: {getEffectivenessText(effectiveness1to2)}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <img src={pokemon2.sprite} alt={pokemon2.name} className="w-24 h-24 pixelated" />
            <div>
              <h3 className="font-semibold text-lg">{pokemon2.name}</h3>
              <div className="flex gap-2">
                {pokemon2.types.map(type => (
                  <span key={type} className="px-2 py-1 rounded-full text-sm bg-pink-100 text-pink-800">
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Attacking {pokemon1.name}: {getEffectivenessText(effectiveness2to1)}
          </p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-semibold text-pink-600">{getAdvantageText()}</p>
      </div>
    </div>
  );
};