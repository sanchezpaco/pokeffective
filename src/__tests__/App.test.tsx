import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../test/utils';
import App from '../App';

// Mock the Pokemon hook
vi.mock('../hooks/usePokemon', () => ({
  usePokemon: () => ({
    pokemon: [],
    loading: false,
    error: null,
    progress: 100
  })
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
    button: ({ children, className }: any) => <button className={className}>{children}</button>,
    img: ({ src, alt, className }: any) => <img src={src} alt={alt} className={className} />,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText('Pokeffective')).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    render(<App />);
    expect(screen.getByText('Loading Pokémon data...')).toBeInTheDocument();
  });

  it('handles error state', () => {
    vi.mocked(usePokemon).mockReturnValue({
      pokemon: [],
      loading: false,
      error: 'Failed to load',
      progress: 0
    });

    render(<App />);
    expect(screen.getByText('Failed to load')).toBeInTheDocument();
  });
});