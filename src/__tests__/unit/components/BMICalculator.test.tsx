import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BMICalculator from '../../../components/BMICalculator';

// Mock the custom hook
jest.mock('../../../hooks/useBMICalculator', () => ({
  useBMICalculator: () => ({
    weight: '',
    height: '',
    bmi: null,
    category: null,
    error: null,
    handleWeightChange: jest.fn(),
    handleHeightChange: jest.fn(),
    calculateBMIValue: jest.fn(),
    resetForm: jest.fn(),
  }),
}));

describe('BMICalculator Component', () => {
  it('renders the calculator with correct title', () => {
    render(<BMICalculator />);

    expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
    expect(screen.getByTestId('bmi-calculator')).toBeInTheDocument();
  });

  it('renders BMIForm component', () => {
    render(<BMICalculator />);

    expect(screen.getByTestId('weight-input')).toBeInTheDocument();
    expect(screen.getByTestId('height-input')).toBeInTheDocument();
    expect(screen.getByTestId('calculate-button')).toBeInTheDocument();
    expect(screen.getByTestId('reset-button')).toBeInTheDocument();
  });

  it('does not render BMIResult when bmi is null', () => {
    render(<BMICalculator />);

    expect(screen.queryByTestId('bmi-result')).not.toBeInTheDocument();
  });

  it('does not render ErrorMessage when error is null', () => {
    render(<BMICalculator />);

    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
});

// Testing with mocked values
describe('BMICalculator Component with data', () => {
  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
  });

  it('renders BMIResult when bmi is available', () => {
    // Override the mock for this specific test
    jest
      .spyOn(require('../../../hooks/useBMICalculator'), 'useBMICalculator')
      .mockReturnValue({
        weight: '70',
        height: '175',
        bmi: 22.86,
        category: 'Normal weight',
        error: null,
        handleWeightChange: jest.fn(),
        handleHeightChange: jest.fn(),
        calculateBMIValue: jest.fn(),
        resetForm: jest.fn(),
      });

    render(<BMICalculator />);

    expect(screen.getByTestId('bmi-result')).toBeInTheDocument();
    expect(screen.getByTestId('bmi-value')).toHaveTextContent('22.86');
    expect(screen.getByTestId('bmi-category')).toHaveTextContent(
      'Normal weight',
    );
  });

  it('renders ErrorMessage when error is available', () => {
    // Override the mock for this specific test
    jest
      .spyOn(require('../../../hooks/useBMICalculator'), 'useBMICalculator')
      .mockReturnValue({
        weight: '',
        height: '',
        bmi: null,
        category: null,
        error: 'Please enter valid weight and height values',
        handleWeightChange: jest.fn(),
        handleHeightChange: jest.fn(),
        calculateBMIValue: jest.fn(),
        resetForm: jest.fn(),
      });

    render(<BMICalculator />);

    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(
      screen.getByText('Please enter valid weight and height values'),
    ).toBeInTheDocument();
  });

  it('calls calculateBMIValue when calculate button is clicked', () => {
    const calculateBMIValueMock = jest.fn();

    // Override the mock for this specific test
    jest
      .spyOn(require('../../../hooks/useBMICalculator'), 'useBMICalculator')
      .mockReturnValue({
        weight: '70',
        height: '175',
        bmi: null,
        category: null,
        error: null,
        handleWeightChange: jest.fn(),
        handleHeightChange: jest.fn(),
        calculateBMIValue: calculateBMIValueMock,
        resetForm: jest.fn(),
      });

    render(<BMICalculator />);

    fireEvent.click(screen.getByTestId('calculate-button'));

    expect(calculateBMIValueMock).toHaveBeenCalledTimes(1);
  });

  it('calls resetForm when reset button is clicked', () => {
    const resetFormMock = jest.fn();

    // Override the mock for this specific test
    jest
      .spyOn(require('../../../hooks/useBMICalculator'), 'useBMICalculator')
      .mockReturnValue({
        weight: '70',
        height: '175',
        bmi: null,
        category: null,
        error: null,
        handleWeightChange: jest.fn(),
        handleHeightChange: jest.fn(),
        calculateBMIValue: jest.fn(),
        resetForm: resetFormMock,
      });

    render(<BMICalculator />);

    fireEvent.click(screen.getByTestId('reset-button'));

    expect(resetFormMock).toHaveBeenCalledTimes(1);
  });
});
