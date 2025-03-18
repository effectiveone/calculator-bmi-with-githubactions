import React, { memo, ChangeEvent } from 'react';
import { useBMICalculator } from '../../hooks/useBMICalculator';
import BMIForm from './BMIForm';
import BMIResult from './BMIResult';
import ErrorMessage from './ErrorMessage';

/**
 * Main BMI Calculator component
 * Combines all sub-components and manages state through the custom hook
 */
const BMICalculator: React.FC = () => {
  const {
    weight,
    height,
    bmi,
    category,
    error,
    handleWeightChange,
    handleHeightChange,
    calculateBMIValue,
    resetForm,
  } = useBMICalculator();

  const onWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleWeightChange(e.target.value);
  };

  const onHeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleHeightChange(e.target.value);
  };

  return (
    <div className='bmi-calculator' data-testid='bmi-calculator'>
      <h1>BMI Calculator</h1>

      <BMIForm
        weight={weight}
        height={height}
        onWeightChange={onWeightChange}
        onHeightChange={onHeightChange}
        onCalculate={calculateBMIValue}
        onReset={resetForm}
      />

      {error && <ErrorMessage message={error} />}

      {bmi !== null && category && <BMIResult bmi={bmi} category={category} />}
    </div>
  );
};

export default memo(BMICalculator);
