import {
  calculateBMIValue,
  getBMICategory,
  validateBMIInput,
  calculateBMI,
} from '../../../utils/bmiCalculator';
import { BMI_THRESHOLDS } from '../../../types';

describe('BMI Calculator Utility Functions', () => {
  describe('calculateBMIValue', () => {
    it('should calculate BMI value correctly', () => {
      expect(calculateBMIValue(70, 175)).toBe(22.86);
      expect(calculateBMIValue(85, 180)).toBe(26.23);
      expect(calculateBMIValue(50, 160)).toBe(19.53);
    });

    it('should handle decimal values correctly', () => {
      expect(calculateBMIValue(70.5, 175.5)).toBe(22.91);
    });

    it('should round to 2 decimal places', () => {
      // 65 / (1.72 * 1.72) = 21.971
      expect(calculateBMIValue(65, 172)).toBe(21.97);
    });

    it('should handle edge cases', () => {
      // Testing with very small values
      expect(calculateBMIValue(10, 100)).toBe(10);

      // Testing with large values
      expect(calculateBMIValue(200, 200)).toBe(50);
    });
  });

  describe('getBMICategory', () => {
    it('should categorize Underweight correctly', () => {
      expect(getBMICategory(16)).toBe('Underweight');
      expect(getBMICategory(18.4)).toBe('Underweight');
      expect(getBMICategory(BMI_THRESHOLDS.UNDERWEIGHT - 0.1)).toBe(
        'Underweight',
      );
    });

    it('should categorize Normal weight correctly', () => {
      expect(getBMICategory(18.5)).toBe('Normal weight');
      expect(getBMICategory(22)).toBe('Normal weight');
      expect(getBMICategory(24.9)).toBe('Normal weight');
      expect(getBMICategory(BMI_THRESHOLDS.NORMAL - 0.1)).toBe('Normal weight');
    });

    it('should categorize Overweight correctly', () => {
      expect(getBMICategory(25)).toBe('Overweight');
      expect(getBMICategory(27.5)).toBe('Overweight');
      expect(getBMICategory(29.9)).toBe('Overweight');
      expect(getBMICategory(BMI_THRESHOLDS.OVERWEIGHT - 0.1)).toBe(
        'Overweight',
      );
    });

    it('should categorize Obesity correctly', () => {
      expect(getBMICategory(30)).toBe('Obesity');
      expect(getBMICategory(35)).toBe('Obesity');
      expect(getBMICategory(40)).toBe('Obesity');
    });

    it('should handle boundary values correctly', () => {
      // Exact threshold values
      expect(getBMICategory(BMI_THRESHOLDS.UNDERWEIGHT)).toBe('Normal weight');
      expect(getBMICategory(BMI_THRESHOLDS.NORMAL)).toBe('Overweight');
      expect(getBMICategory(BMI_THRESHOLDS.OVERWEIGHT)).toBe('Obesity');
    });
  });

  describe('validateBMIInput', () => {
    it('should validate correct input values', () => {
      expect(validateBMIInput(70, 175)).toEqual({
        isValid: true,
        errorMessage: null,
      });
      expect(validateBMIInput(50, 150)).toEqual({
        isValid: true,
        errorMessage: null,
      });
      expect(validateBMIInput(100, 200)).toEqual({
        isValid: true,
        errorMessage: null,
      });
    });

    it('should invalidate zero or negative weight', () => {
      expect(validateBMIInput(0, 175)).toEqual({
        isValid: false,
        errorMessage: 'Please enter valid weight and height values',
      });
      expect(validateBMIInput(-10, 175)).toEqual({
        isValid: false,
        errorMessage: 'Weight must be greater than 0',
      });
    });

    it('should invalidate zero or negative height', () => {
      expect(validateBMIInput(70, 0)).toEqual({
        isValid: false,
        errorMessage: 'Please enter valid weight and height values',
      });
      expect(validateBMIInput(70, -10)).toEqual({
        isValid: false,
        errorMessage: 'Height must be greater than 0',
      });
    });

    it('should invalidate unrealistically high weight', () => {
      expect(validateBMIInput(501, 175)).toEqual({
        isValid: false,
        errorMessage: 'Weight seems too high, please check your input',
      });
    });

    it('should invalidate unrealistically high height', () => {
      expect(validateBMIInput(70, 301)).toEqual({
        isValid: false,
        errorMessage: 'Height seems too high, please check your input',
      });
    });

    it('should handle NaN values correctly', () => {
      expect(validateBMIInput(NaN, 175)).toEqual({
        isValid: false,
        errorMessage: 'Please enter valid weight and height values',
      });
      expect(validateBMIInput(70, NaN)).toEqual({
        isValid: false,
        errorMessage: 'Please enter valid weight and height values',
      });
    });
  });

  describe('calculateBMI', () => {
    it('should return correct BMI value and category', () => {
      expect(calculateBMI(70, 175)).toEqual({
        value: 22.86,
        category: 'Normal weight',
      });

      expect(calculateBMI(50, 175)).toEqual({
        value: 16.33,
        category: 'Underweight',
      });

      expect(calculateBMI(85, 175)).toEqual({
        value: 27.76,
        category: 'Overweight',
      });

      expect(calculateBMI(100, 175)).toEqual({
        value: 32.65,
        category: 'Obesity',
      });
    });
  });
});
