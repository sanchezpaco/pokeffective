import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render } from '../../test/utils';
import { Pokeball } from '../Pokeball';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
}));

describe('Pokeball', () => {
  it('renders in loading state', () => {
    const { container } = render(<Pokeball isLoading={true} progress={50} />);
    expect(container.querySelector('.bg-black')).toBeInTheDocument();
    expect(container.textContent).toContain('Loading Pokémon data...');
  });

  it('shows progress bar when loading', () => {
    const { container } = render(<Pokeball isLoading={true} progress={75} />);
    const progressBar = container.querySelector('.bg-white');
    expect(progressBar).toBeInTheDocument();
  });

  it('uses provided ball type', () => {
    const { container } = render(
      <Pokeball isLoading={true} selectedBallType="Great Ball" progress={0} />
    );
    expect(container.querySelector('.bg-blue-500')).toBeInTheDocument();
  });
});