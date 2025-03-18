import { useState, useCallback } from 'react';
import { BMICategory, BMIResult } from '../types';
import { calculateBMI, validateBMIInput } from '../utils/bmiCalculator';

interface UseBMICalculatorReturn {
  weight: string;
  height: string;
  bmi: number | null;
  category: BMICategory | null;
  error: string | null;
  handleWeightChange: (value: string) => void;
  handleHeightChange: (value: string) => void;
  calculateBMIValue: () => void;
  resetForm: () => void;
}

/**
 * Custom hook for BMI calculator functionality
 * @returns An object with state and methods for the BMI calculator
 */
export const useBMICalculator = (): UseBMICalculatorReturn => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmiResult, setBMIResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleWeightChange = useCallback((value: string) => {
    setWeight(value);
  }, []);

  const handleHeightChange = useCallback((value: string) => {
    setHeight(value);
  }, []);

  const calculateBMIValue = useCallback(() => {
    setError(null);

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    // Empty inputs or NaN values
    if (
      isNaN(weightValue) ||
      isNaN(heightValue) ||
      weight === '' ||
      height === ''
    ) {
      setBMIResult(null);
      setError('Please enter valid weight and height values');
      return;
    }

    // Negative values
    if (weightValue < 0) {
      setBMIResult(null);
      setError('Weight must be greater than 0');
      return;
    }

    if (heightValue < 0) {
      setBMIResult(null);
      setError('Height must be greater than 0');
      return;
    }

    // Zero values
    if (weightValue === 0) {
      setBMIResult(null);
      setError('Weight must be greater than 0');
      return;
    }

    if (heightValue === 0) {
      setBMIResult(null);
      setError('Height must be greater than 0');
      return;
    }

    const validation = validateBMIInput(weightValue, heightValue);

    if (validation.isValid) {
      const result = calculateBMI(weightValue, heightValue);
      setBMIResult(result);
    } else {
      setBMIResult(null);
      setError(validation.errorMessage);
    }
  }, [weight, height]);

  const resetForm = useCallback(() => {
    setWeight('');
    setHeight('');
    setBMIResult(null);
    setError(null);
  }, []);

  return {
    weight,
    height,
    bmi: bmiResult?.value ?? null,
    category: bmiResult?.category ?? null,
    error,
    handleWeightChange,
    handleHeightChange,
    calculateBMIValue,
    resetForm,
  };
};
