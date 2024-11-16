# Pokeffective

![Pokeffective](https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png)

A modern, responsive Pokémon type effectiveness calculator built with React and TypeScript. Instantly calculate type advantages and weaknesses for all Pokémon.

## Features

- 🎯 **Type Effectiveness Calculator**: Calculate damage multipliers for any attack type against any Pokémon
- 🔄 **Real-time Updates**: Instant feedback as you select different types and Pokémon
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- ⚡ **Performance Optimized**: 
  - Local caching of Pokémon data
  - Progressive loading of Pokémon sprites
  - Optimized bundle size with code splitting
- 🎨 **Beautiful UI/UX**:
  - Smooth animations and transitions
  - Type-themed color gradients
  - Intuitive interface
- 🔍 **Smart Search**: Quick Pokémon search by name or number
- 📦 **PWA Support**: Install as a standalone app on mobile devices
- 🌐 **Offline Support**: Works without internet after initial load

## Quick Start

### Local Development

```bash
npm install
npm run dev
```

### Docker Development

```bash
# Build and run development environment
make build-dev
make run-dev

# Run tests in Docker
make test

# Run tests with UI in Docker
make test-watch
```

### Production Deployment

```bash
# Build and run production container
make build
make run
```

## Development

### Prerequisites

- Node.js 20+
- npm 7+
- Docker (optional)
- Make (optional)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
npm run lint         # Run linting
```

### Make Commands

```bash
make build           # Build production Docker image
make build-dev       # Build development Docker image
make test           # Run tests in Docker
make test-watch     # Run tests with UI in Docker
make run            # Run production container
make run-dev        # Run development container
make stop           # Stop running containers
make clean          # Remove containers and images
```

### Docker Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up

# Production
docker-compose up
```

## Project Structure

```
pokeffective/
├── src/
│   ├── components/     # React components
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript type definitions
│   ├── App.tsx        # Main application component
│   └── main.tsx       # Application entry point
├── public/            # Static assets
└── dist/             # Production build output
```

## Performance Optimizations

- Image optimization with lazy loading
- Component code splitting
- Service worker for offline support
- Local data caching
- Debounced search
- Optimized animations

## Tech Stack

- React 18
- TypeScript
- Vite
- Framer Motion
- Tailwind CSS
- PokéAPI
- Docker
- Nginx (Production)

## Browser Support

- Chrome/Edge 80+
- Firefox 75+
- Safari 13.1+
- iOS Safari 13.4+
- Chrome for Android 80+

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- [PokéAPI](https://pokeapi.co/) for Pokémon data
- [PokeAPI/sprites](https://github.com/PokeAPI/sprites) for Pokémon sprites

## CI/CD Pipeline

The project uses GitHub Actions for continuous integration:

- Automated testing on pull requests
- Linting checks
- Build verification
- Coverage reports
- Artifact uploads

## Support

For support, please open an issue in the GitHub repository.