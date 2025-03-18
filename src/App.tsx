import React, { useState, useCallback, ChangeEvent } from 'react';
import './App.css';

// Define BMI category types
type BMICategory = 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity';

// BMI thresholds according to WHO standards
const BMI_THRESHOLDS = {
  UNDERWEIGHT: 18.5,
  NORMAL: 25.0,
  OVERWEIGHT: 30.0,
};

function App() {
  const [bmi, setBMI] = useState<number | null>(null);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [category, setCategory] = useState<BMICategory | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function determining BMI category
  const getBMICategory = useCallback((bmi: number): BMICategory => {
    if (bmi < BMI_THRESHOLDS.UNDERWEIGHT) return 'Underweight';
    if (bmi < BMI_THRESHOLDS.NORMAL) return 'Normal weight';
    if (bmi < BMI_THRESHOLDS.OVERWEIGHT) return 'Overweight';
    return 'Obesity';
  }, []);

  // Function to validate input data
  const validateInput = useCallback(
    (
      weight: number,
      height: number,
    ): { isValid: boolean; errorMessage: string | null } => {
      if (weight <= 0 && height <= 0) {
        return {
          isValid: false,
          errorMessage: 'Please enter valid weight and height values',
        };
      }
      if (weight <= 0) {
        return {
          isValid: false,
          errorMessage: 'Weight must be greater than 0',
        };
      }
      if (height <= 0) {
        return {
          isValid: false,
          errorMessage: 'Height must be greater than 0',
        };
      }
      if (weight > 500) {
        return {
          isValid: false,
          errorMessage: 'Weight seems too high, please check your input',
        };
      }
      if (height > 300) {
        return {
          isValid: false,
          errorMessage: 'Height seems too high, please check your input',
        };
      }
      return { isValid: true, errorMessage: null };
    },
    [],
  );

  // BMI calculation
  const calculateBMI = useCallback(() => {
    setError(null);

    const weightValue = parseFloat(weight);
    const heightValue = parseFloat(height);

    // Check if values are NaN or empty strings
    if (
      isNaN(weightValue) ||
      isNaN(heightValue) ||
      weight === '' ||
      height === ''
    ) {
      setBMI(null);
      setCategory(null);
      setError('Please enter valid weight and height values');
      return;
    }

    const validation = validateInput(weightValue, heightValue);

    if (validation.isValid) {
      const heightInMeters = heightValue / 100;
      const bmiValue = weightValue / (heightInMeters * heightInMeters);
      const roundedBMI = parseFloat(bmiValue.toFixed(2));

      setBMI(roundedBMI);
      setCategory(getBMICategory(roundedBMI));
    } else {
      setBMI(null);
      setCategory(null);
      setError(validation.errorMessage);
    }
  }, [weight, height, getBMICategory, validateInput]);

  // Weight change handler
  const handleWeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  }, []);

  // Height change handler
  const handleHeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  }, []);

  // Reset form handler
  const handleReset = useCallback(() => {
    setWeight('');
    setHeight('');
    setBMI(null);
    setCategory(null);
    setError(null);
  }, []);

  return (
    <div className='App'>
      <div className='bmi-calculator'>
        <h1>BMI Calculator</h1>

        <div className='input-group'>
          <label htmlFor='weight'>Weight (kg)</label>
          <input
            id='weight'
            type='number'
            placeholder='Your weight (kg)'
            value={weight}
            onChange={handleWeightChange}
            min='1'
            step='0.1'
            aria-label='Weight in kilograms'
            className='input-field'
          />
        </div>

        <div className='input-group'>
          <label htmlFor='height'>Height (cm)</label>
          <input
            id='height'
            type='number'
            placeholder='Height (cm)'
            value={height}
            onChange={handleHeightChange}
            min='1'
            step='0.1'
            aria-label='Height in centimeters'
            className='input-field'
          />
        </div>

        <div className='button-group'>
          <button
            onClick={calculateBMI}
            className='calculate-button'
            aria-label='Calculate BMI'
          >
            Calculate BMI
          </button>

          <button
            onClick={handleReset}
            className='reset-button'
            aria-label='Reset form'
          >
            Reset
          </button>
        </div>

        {error && (
          <div className='error-message' role='alert'>
            {error}
          </div>
        )}

        {bmi !== null && category && (
          <div className='result-container' role='region' aria-live='polite'>
            <h2>Your Result</h2>
            <div
              className={`bmi-result ${category
                .toLowerCase()
                .replace(' ', '-')}`}
            >
              <div className='bmi-value'>{bmi}</div>
              <div className='bmi-category'>{category}</div>
            </div>
            <div className='bmi-info'>
              <p>
                <strong>BMI Categories:</strong>
              </p>
              <ul>
                <li className={category === 'Underweight' ? 'active' : ''}>
                  Underweight: &lt; 18.5
                </li>
                <li className={category === 'Normal weight' ? 'active' : ''}>
                  Normal weight: 18.5 - 24.9
                </li>
                <li className={category === 'Overweight' ? 'active' : ''}>
                  Overweight: 25 - 29.9
                </li>
                <li className={category === 'Obesity' ? 'active' : ''}>
                  Obesity: ≥ 30
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
