# Contributing to Pokeffective

First off, thank you for considering contributing to Pokeffective! It's people like you that make Pokeffective such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## Development Setup

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Run linting
npm run lint
```

### Docker Development

We provide Docker configurations for consistent development environments. Use the following Make commands:

```bash
# Build development Docker image
make build-dev

# Run development environment
make run-dev

# Run tests in Docker
make test

# Run tests in watch mode
make test-watch

# Stop all containers
make stop

# Clean up containers and images
make clean
```

Available Make targets:
- `build`: Build production Docker image
- `build-dev`: Build development Docker image
- `test`: Run tests once in Docker
- `test-watch`: Run tests in watch mode in Docker
- `run`: Run production container
- `run-dev`: Run development container
- `stop`: Stop running containers
- `clean`: Remove containers and images

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* Use a clear and descriptive title
* Describe the exact steps which reproduce the problem
* Provide specific examples to demonstrate the steps
* Describe the behavior you observed after following the steps
* Explain which behavior you expected to see instead and why
* Include screenshots if possible

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* Use a clear and descriptive title
* Provide a step-by-step description of the suggested enhancement
* Provide specific examples to demonstrate the steps
* Describe the current behavior and explain which behavior you expected to see instead
* Explain why this enhancement would be useful

### Pull Requests

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Run tests and linting: `npm run test && npm run lint`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature-name`
7. Submit a pull request

## Project Structure Guidelines

### Components
* One component per file
* Use functional components with hooks
* Keep components focused and reusable
* Use proper prop types
* Include component documentation

### Hooks
* Keep hooks generic and reusable
* Document hook parameters and return values
* Include usage examples in comments

### Types
* Define interfaces for all data structures
* Use proper naming conventions
* Export types from a central location

## Coding Style

* Use TypeScript
* Follow the existing code style
* Use meaningful variable and function names
* Add comments for complex logic
* Keep functions small and focused
* Use proper TypeScript types

## Git Commit Guidelines

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

## CI/CD Pipeline

Our GitHub Actions workflow automatically runs on pull requests and pushes to main:

1. Runs all tests
2. Performs linting checks
3. Builds the project
4. Generates test coverage reports
5. Uploads build artifacts and coverage reports

Make sure your changes pass all CI checks before requesting a review.

## Questions?

Feel free to open an issue with your question or contact the maintainers directly.

Thank you for contributing! 🎮✨