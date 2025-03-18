// BMI Category types
export type BMICategory =
  | 'Underweight'
  | 'Normal weight'
  | 'Overweight'
  | 'Obesity';

// BMI thresholds according to WHO standards
export const BMI_THRESHOLDS = {
  UNDERWEIGHT: 18.5,
  NORMAL: 25.0,
  OVERWEIGHT: 30.0,
};

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

// BMI Result interface
export interface BMIResult {
  value: number;
  category: BMICategory;
}
