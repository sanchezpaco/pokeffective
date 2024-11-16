import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { usePokemon } from '../usePokemon';

describe('usePokemon', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('starts in loading state', () => {
    const { result } = renderHook(() => usePokemon());
    expect(result.current.loading).toBe(true);
    expect(result.current.pokemon).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('loads pokemon successfully', async () => {
    const { result } = renderHook(() => usePokemon());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.pokemon).toHaveLength(2);
    expect(result.current.error).toBeNull();
  });

  it('uses cached data when available', () => {
    const cachedData = {
      timestamp: Date.now(),
      pokemon: [{ id: 1, name: 'Test', types: ['Normal'], sprite: 'test.png' }],
      lastProcessedIndex: 1
    };

    localStorage.setItem('pokeffective-data', JSON.stringify(cachedData));

    const { result } = renderHook(() => usePokemon());
    expect(result.current.pokemon).toEqual(cachedData.pokemon);
    expect(result.current.loading).toBe(false);
  });

  it('handles errors gracefully', async () => {
    // Mock a failed API call
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('API Error'));

    const { result } = renderHook(() => usePokemon());

    await waitFor(() => {
      expect(result.current.error).toBe('Failed to fetch Pokémon data. Please try again later.');
    });

    expect(result.current.loading).toBe(false);
  });
});