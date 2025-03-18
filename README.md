# BMI Calculator with Unit Testing Tutorial

[![React BMI Calculator - Test & Build](https://github.com/yourusername/bmi-calculator/actions/workflows/test-and-build.yml/badge.svg)](https://github.com/yourusername/bmi-calculator/actions/workflows/test-and-build.yml)

This repository serves as a tutorial on how to implement effective unit testing in React applications. We use a BMI (Body Mass Index) calculator as our example application to demonstrate how proper testing can ensure application quality and prevent unexpected code changes.

## 🔍 Project Overview

The BMI Calculator is a simple React application that:

- Takes user's weight (in kg) and height (in cm) as input
- Calculates the BMI using the formula: weight / (height in meters)²
- Categorizes the result according to international standards:
  - Underweight: < 18.5
  - Normal weight: 18.5 - 24.9
  - Overweight: 25 - 29.9
  - Obesity: ≥ 30

## 🧪 Testing Approach

This project demonstrates:

1. **Comprehensive Unit Testing**: Testing both the UI elements and the business logic.
2. **Test-Driven Development (TDD)**: Tests were written before implementing features.
3. **CI/CD Integration**: Tests automatically run on GitHub Actions on every code push and pull request.

### Key Testing Concepts Demonstrated

- Component rendering testing
- User interaction simulation
- State management testing
- Input validation
- Business logic verification
- Edge case handling

## 🚀 How CI/CD Enforces Code Quality

The GitHub Actions workflow (`test-and-build.yml`) ensures:

1. All tests pass before the build process begins
2. Failed tests will block the build, preventing the deployment of broken code
3. Pull requests cannot be merged if tests fail

This demonstrates how automated testing can protect your application from regressions and enforce code quality standards across your team.

## 📋 Testing Guidelines

The project follows these testing best practices:

1. **Isolation**: Each test covers a specific piece of functionality
2. **Readability**: Tests are clearly named and structured
3. **Maintainability**: Tests are independent and don't rely on specific implementation details
4. **Coverage**: All critical application paths are tested

## 🛠️ Technical Stack

- React 19 with TypeScript
- Jest for test running
- React Testing Library for component testing
- GitHub Actions for CI/CD

## 🏁 Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the tests:
   ```
   npm test
   ```
4. Start the application:
   ```
   npm start
   ```

## 🧩 Project Structure

- `src/App.tsx` - Main application component
- `src/App.test.tsx` - Comprehensive tests for the application
- `src/App.css` - Styling for the application
- `.github/workflow/test-and-build.yml` - CI/CD configuration

## 💡 Key Learning Points

1. How to structure effective unit tests for React applications
2. How to use testing to drive development and improve code quality
3. How CI/CD can enforce testing and prevent broken code from being deployed
4. The importance of test coverage in critical application paths

## 📝 License

MIT
