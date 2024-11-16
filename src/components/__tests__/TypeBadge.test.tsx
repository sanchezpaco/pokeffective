import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '../../test/utils';
import { TypeBadge } from '../TypeBadge';

describe('TypeBadge', () => {
  it('renders with correct type name', () => {
    const { getByText } = render(<TypeBadge type="Fire" />);
    expect(getByText('Fire')).toBeInTheDocument();
  });

  it('applies correct color classes', () => {
    const { container } = render(<TypeBadge type="Water" />);
    expect(container.firstChild).toHaveClass('bg-blue-200');
    expect(container.firstChild).toHaveClass('text-blue-800');
  });

  it('accepts additional className prop', () => {
    const { container } = render(<TypeBadge type="Grass" className="test-class" />);
    expect(container.firstChild).toHaveClass('test-class');
  });
});