# 🚴 Wheelbuilder

A professional bicycle wheel spoke length calculator built with Svelte, TypeScript, and Vite.

## Features

- **Accurate Calculations**: Uses the standard bicycle wheel spoke length formula
- **Input Validation**: Comprehensive validation with helpful error messages
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Common Wheel Sizes**: Quick selection buttons for popular wheel sizes
- **Real-time Updates**: Calculations update automatically as you change inputs
- **Professional UI**: Clean, technical design suitable for bike mechanics

## Supported Specifications

- **Rim Effective Diameter**: 200-1000mm
- **Spoke Count**: 16, 20, 24, 28, 32, 36, 40, 48 (divisible by 4)
- **Cross Pattern**: 0-cross (radial) to 4-cross
- **Hub Flange Diameter**: 20-200mm

## Development

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Run tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage

# Build for production
pnpm run build
```

### Testing

The project includes comprehensive unit and integration tests:

```bash
# Run all tests
pnpm run test

# Run tests in watch mode
pnpm run test --watch

# Run tests with UI
pnpm run test:ui

# Generate coverage report
pnpm run test:coverage
```

## Docker Deployment

### Quick Start

```bash
# Build and run with Docker Compose
docker-compose up --build

# Access the application at http://localhost:3000
```

### Development with Docker

```bash
# Run development environment
docker-compose --profile dev up

# Access development server at http://localhost:5173
```

### Production Build

```bash
# Build production image
docker build -t wheelbuilder .

# Run production container
docker run -p 3000:80 wheelbuilder
```

## Architecture

### Calculation Formula

The spoke length is calculated using the standard bicycle wheel formula:

```
L = √[(r - h×cos(θ))² + (h×sin(θ))²]
```

Where:
- `L` = spoke length (mm)
- `r` = rim radius (effective diameter ÷ 2)
- `h` = hub flange radius (flange diameter ÷ 2)
- `θ` = cross angle in radians = (cross pattern × 360°) ÷ spoke count

### Project Structure

```
src/
├── lib/
│   ├── spokeCalculator.ts    # Core calculation logic
│   ├── WheelBuilder.svelte   # Main component
│   └── __tests__/            # Test files
├── App.svelte                # Root component
└── main.ts                   # Application entry point
```

## API Reference

### `calculateSpokeLength(specs: WheelSpecs): CalculationResult`

Calculates the required spoke length for given wheel specifications.

**Parameters:**
- `specs.rimEffectiveDiameter` - Rim effective diameter in mm
- `specs.spokeCount` - Number of spokes (must be divisible by 4)
- `specs.crossPattern` - Cross pattern (0-4)
- `specs.hubFlangeDiameter` - Hub flange diameter in mm

**Returns:**
- `spokeLength` - Calculated spoke length in mm (rounded to 1 decimal)
- `isValid` - Whether the calculation is valid
- `errors` - Array of validation error messages

### `validateWheelSpecs(specs: WheelSpecs): string[]`

Validates wheel specifications and returns any errors.

### `getCommonWheelSizes(): Array<{name: string, diameter: number}>`

Returns an array of common wheel sizes for quick selection.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Acknowledgments

- Formula based on standard bicycle wheel building calculations
- Built with modern web technologies for optimal performance
- Designed for professional bike mechanics and enthusiasts