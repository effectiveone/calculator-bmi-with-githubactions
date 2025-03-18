# Advanced BMI Calculator with Comprehensive Testing Suite

[![React BMI Calculator - Test & Build Pipeline](https://github.com/yourusername/bmi-calculator/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/yourusername/bmi-calculator/actions/workflows/test-and-build.yml)
[![codecov](https://codecov.io/gh/yourusername/bmi-calculator/branch/main/graph/badge.svg)](https://codecov.io/gh/yourusername/bmi-calculator)
[![Netlify Status](https://api.netlify.com/api/v1/badges/your-netlify-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

This repository demonstrates professional-grade unit testing implementation in a React TypeScript application, using a BMI (Body Mass Index) calculator as an example. The project showcases advanced practices for ensuring code quality, preventing regressions, and implementing robust CI/CD pipelines.

## 🔍 Project Architecture

The application follows a modular, clean architecture approach:

```
src/
├── components/         # React components with clear separation of concerns
│   └── BMICalculator/  # Component-specific folder structure
├── hooks/              # Custom React hooks for reusable stateful logic
├── types/              # TypeScript type definitions and interfaces
├── utils/              # Pure utility functions and business logic
└── __tests__/          # Comprehensive test suite
    ├── unit/           # Unit tests for individual functions and components
    └── integration/    # Integration tests for component interactions
```

The BMI Calculator:

- Processes user input for weight (kg) and height (cm)
- Performs calculations using the BMI formula: weight / (height in meters)²
- Categorizes results according to WHO standards:
  - Underweight: < 18.5
  - Normal weight: 18.5 - 24.9
  - Overweight: 25 - 29.9
  - Obesity: ≥ 30

## 🧪 Advanced Testing Strategy

This project implements a multi-level testing approach:

### Unit Testing

- **Pure Functions**: Tests for utility functions that perform calculations and validations
- **Custom Hooks**: Tests for React hooks using the React Testing Library's hook testing utilities
- **Component Testing**: Tests for individual React components with mocked dependencies
- **Edge Cases**: Comprehensive testing of boundary conditions and error states

### Integration Testing

- **Component Interaction**: Tests that verify components work together correctly
- **User Flows**: Tests that simulate complete user journeys
- **Form Validation**: Tests for proper validation and error handling across components

### Test Coverage

The project maintains high test coverage across all modules:

- Utility functions: 100% coverage
- React components: 90%+ coverage
- Custom hooks: 95%+ coverage

## 🚀 Enterprise-Grade CI/CD Pipeline

The project implements a sophisticated GitHub Actions workflow with:

1. **Parallel Test Execution**: Unit and integration tests run concurrently
2. **Dependency Caching**: Optimized build speed with smart caching
3. **Multi-Stage Deployment**:
   - Automatic preview deployments for pull requests
   - Production deployment for main branch changes
4. **Quality Gates**:
   - Linting checks before running tests
   - All tests must pass before deployment
5. **Notifications**: Build status notifications to Slack
6. **Artifacts**: Preservation of build artifacts and test reports

## 📋 Development Best Practices

### Code Organization

- **Single Responsibility Principle**: Each component and function has a clear, focused purpose
- **Custom Hooks**: Separation of UI and logic with custom hooks
- **Pure Functions**: Business logic implemented as pure functions for testability
- **TypeScript**: Strong typing throughout the codebase

### Performance Optimization

- **Memoization**: Strategic use of React's `memo`, `useCallback`, and `useMemo`
- **Bundling Optimization**: Configured for optimal production bundle size
- **Lazy Loading**: Components loaded only when needed

## 🛠️ Technical Stack

- **React 19**: Latest React features with functional components and hooks
- **TypeScript**: Static typing for enhanced code quality and developer experience
- **Testing Framework**:
  - Jest for test running and assertions
  - React Testing Library for component testing
  - Testing Library Hooks for custom hook testing
- **CI/CD**: GitHub Actions with Netlify deployment
- **Code Quality**: ESLint with TypeScript configuration

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/bmi-calculator.git
   cd bmi-calculator
   ```

2. Install dependencies

   ```bash
   npm ci
   ```

3. Run tests

   ```bash
   # Run all tests
   npm test

   # Run unit tests only
   npm test -- --testPathPattern='/__tests__/unit/'

   # Run integration tests only
   npm test -- --testPathPattern='/__tests__/integration/'

   # Generate coverage report
   npm run test:coverage
   ```

4. Start development server

   ```bash
   npm start
   ```

5. Lint code

   ```bash
   npm run lint

   # Auto-fix linting issues
   npm run lint:fix
   ```

## 🧩 Key Architectural Decisions

1. **Modular Code Structure**: The application is organized into small, focused modules that are easy to test and maintain.

2. **Custom Hook Pattern**: The `useBMICalculator` hook encapsulates all calculator logic, making it reusable and testable in isolation from UI components.

3. **Pure Business Logic**: Core calculations are implemented as pure functions in the `utils` directory, ensuring they can be tested independently.

4. **Test-Driven Development**: Tests were written before or alongside implementation, ensuring comprehensive test coverage.

5. **Comprehensive Validation**: Input validation is thorough, with helpful error messages for users.

## 📝 License

MIT
