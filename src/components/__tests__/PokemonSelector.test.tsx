import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '../../test/utils';
import { PokemonSelector } from '../PokemonSelector';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, onClick }: any) => (
      <div className={className} onClick={onClick}>{children}</div>
    ),
    button: ({ children, onClick, className }: any) => (
      <button onClick={onClick} className={className}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

const mockPokemon = [
  {
    id: 1,
    name: 'Bulbasaur',
    types: ['Grass', 'Poison'],
    sprite: 'bulbasaur.png'
  },
  {
    id: 4,
    name: 'Charmander',
    types: ['Fire'],
    sprite: 'charmander.png'
  }
];

describe('PokemonSelector', () => {
  it('renders empty state correctly', () => {
    const { getByText } = render(
      <PokemonSelector
        label="Select Pokemon"
        pokemon={[]}
        selectedPokemon={null}
        onChange={() => {}}
        position="center"
      />
    );
    
    expect(getByText('Choose Your Partner')).toBeInTheDocument();
  });

  it('shows pokemon list when clicked', () => {
    const { getByText } = render(
      <PokemonSelector
        label="Select Pokemon"
        pokemon={mockPokemon}
        selectedPokemon={null}
        onChange={() => {}}
        position="center"
      />
    );
    
    fireEvent.click(getByText('Choose Your Partner'));
    expect(getByText('Bulbasaur')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('filters pokemon by search term', () => {
    render(
      <PokemonSelector
        label="Select Pokemon"
        pokemon={mockPokemon}
        selectedPokemon={null}
        onChange={() => {}}
        position="center"
      />
    );
    
    fireEvent.click(screen.getByText('Choose Your Partner'));
    
    const searchInput = screen.getByPlaceholderText('Search by name or number...');
    fireEvent.change(searchInput, { target: { value: 'char' } });
    
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument();
  });

  it('calls onChange when pokemon is selected', () => {
    const handleChange = vi.fn();
    render(
      <PokemonSelector
        label="Select Pokemon"
        pokemon={mockPokemon}
        selectedPokemon={null}
        onChange={handleChange}
        position="center"
      />
    );
    
    fireEvent.click(screen.getByText('Choose Your Partner'));
    fireEvent.click(screen.getByText('Bulbasaur'));
    
    expect(handleChange).toHaveBeenCalledWith(mockPokemon[0]);
  });
});