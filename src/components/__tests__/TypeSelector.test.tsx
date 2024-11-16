import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '../../test/utils';
import { TypeSelector } from '../TypeSelector';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, onClick, className }: any) => (
      <button onClick={onClick} className={className}>{children}</button>
    ),
  },
}));

describe('TypeSelector', () => {
  it('renders all type options', () => {
    const { getByText } = render(
      <TypeSelector label="Test" value="" onChange={() => {}} />
    );
    
    expect(getByText('Fire')).toBeInTheDocument();
    expect(getByText('Water')).toBeInTheDocument();
    expect(getByText('Grass')).toBeInTheDocument();
  });

  it('calls onChange when type is selected', () => {
    const handleChange = vi.fn();
    const { getByText } = render(
      <TypeSelector label="Test" value="" onChange={handleChange} />
    );
    
    fireEvent.click(getByText('Fire'));
    expect(handleChange).toHaveBeenCalledWith('Fire');
  });

  it('highlights selected type', () => {
    const { getByText } = render(
      <TypeSelector label="Test" value="Water" onChange={() => {}} />
    );
    
    const waterButton = getByText('Water').closest('button');
    expect(waterButton).toHaveClass('ring-2');
  });
});