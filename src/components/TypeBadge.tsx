import React from 'react';

export const TYPE_COLORS: { [key: string]: string } = {
  Normal: 'bg-gray-200 text-gray-800',
  Fire: 'bg-red-200 text-red-800',
  Water: 'bg-blue-200 text-blue-800',
  Electric: 'bg-yellow-200 text-yellow-800',
  Grass: 'bg-green-200 text-green-800',
  Ice: 'bg-cyan-200 text-cyan-800',
  Fighting: 'bg-orange-200 text-orange-800',
  Poison: 'bg-purple-200 text-purple-800',
  Ground: 'bg-amber-200 text-amber-800',
  Flying: 'bg-indigo-200 text-indigo-800',
  Psychic: 'bg-pink-200 text-pink-800',
  Bug: 'bg-lime-200 text-lime-800',
  Rock: 'bg-stone-200 text-stone-800',
  Ghost: 'bg-violet-200 text-violet-800',
  Dragon: 'bg-teal-200 text-teal-800',
  Dark: 'bg-neutral-200 text-neutral-800',
  Steel: 'bg-zinc-200 text-zinc-800',
  Fairy: 'bg-rose-200 text-rose-800',
};

export const TYPE_COLORS_GRADIENT: { [key: string]: { from: string, to: string } } = {
  Normal: { from: 'from-gray-400', to: 'to-gray-600' },
  Fire: { from: 'from-red-400', to: 'to-orange-600' },
  Water: { from: 'from-blue-400', to: 'to-cyan-600' },
  Electric: { from: 'from-yellow-300', to: 'to-amber-500' },
  Grass: { from: 'from-green-400', to: 'to-emerald-600' },
  Ice: { from: 'from-cyan-300', to: 'to-blue-500' },
  Fighting: { from: 'from-orange-400', to: 'to-red-600' },
  Poison: { from: 'from-purple-400', to: 'to-fuchsia-600' },
  Ground: { from: 'from-amber-400', to: 'to-yellow-600' },
  Flying: { from: 'from-indigo-400', to: 'to-violet-600' },
  Psychic: { from: 'from-pink-400', to: 'to-rose-600' },
  Bug: { from: 'from-lime-400', to: 'to-green-600' },
  Rock: { from: 'from-stone-400', to: 'to-gray-600' },
  Ghost: { from: 'from-violet-400', to: 'to-purple-600' },
  Dragon: { from: 'from-teal-400', to: 'to-cyan-600' },
  Dark: { from: 'from-neutral-400', to: 'to-stone-600' },
  Steel: { from: 'from-zinc-400', to: 'to-gray-600' },
  Fairy: { from: 'from-rose-400', to: 'to-pink-600' },
};

interface TypeBadgeProps {
  type: string;
  className?: string;
}

export const TypeBadge: React.FC<TypeBadgeProps> = ({ type, className = '' }) => (
  <span className={`px-2 py-1 rounded-full text-sm ${TYPE_COLORS[type]} ${className}`}>
    {type}
  </span>
);