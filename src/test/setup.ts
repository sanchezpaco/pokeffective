import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};
vi.stubGlobal('localStorage', localStorageMock);

// Mock Pokemon API responses
const handlers = [
  rest.get('https://pokeapi.co/api/v2/pokemon', (req, res, ctx) => {
    return res(
      ctx.json({
        results: [
          { url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { url: 'https://pokeapi.co/api/v2/pokemon/4/' }
        ]
      })
    );
  }),
  rest.get('https://pokeapi.co/api/v2/pokemon/1/', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 1,
        name: 'bulbasaur',
        types: [
          { type: { name: 'grass' } },
          { type: { name: 'poison' } }
        ],
        sprites: {
          front_default: 'bulbasaur.png'
        }
      })
    );
  }),
  rest.get('https://pokeapi.co/api/v2/pokemon/4/', (req, res, ctx) => {
    return res(
      ctx.json({
        id: 4,
        name: 'charmander',
        types: [
          { type: { name: 'fire' } }
        ],
        sprites: {
          front_default: 'charmander.png'
        }
      })
    );
  })
];

const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test
afterEach(() => {
  server.resetHandlers();
  localStorageMock.clear();
});