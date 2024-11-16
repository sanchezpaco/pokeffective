import React from 'react';
import { motion } from 'framer-motion';
import { typeAdvantages } from '../types';
import { TYPE_COLORS, TYPE_COLORS_GRADIENT } from './TypeBadge';

interface TypeSelectorProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const TypeSelector: React.FC<TypeSelectorProps> = ({ label, value, onChange }) => {
  const types = Object.keys(typeAdvantages);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {types.map((type) => {
          const isSelected = value === type;
          const gradientColors = TYPE_COLORS_GRADIENT[type];
          
          return (
            <motion.button
              key={type}
              onClick={() => onChange(type)}
              className={`
                relative overflow-hidden rounded-xl p-4 text-left
                ${isSelected ? 'ring-2 ring-pink-500 ring-offset-2' : ''}
              `}
              whileTap={{ scale: 0.98 }}
              style={{
                background: isSelected 
                  ? `linear-gradient(135deg, var(--${type.toLowerCase()}) 0%, var(--${type.toLowerCase()}-light, var(--${type.toLowerCase()})) 100%)`
                  : undefined
              }}
            >
              {!isSelected && (
                <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradientColors.from} ${gradientColors.to}`} />
              )}
              <div className={`
                relative z-10 font-medium text-lg
                ${isSelected ? 'text-white' : TYPE_COLORS[type].split(' ')[1]}
              `}>
                {type}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};