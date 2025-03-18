import React, { memo, ChangeEvent } from 'react';

interface BMIFormProps {
  weight: string;
  height: string;
  onWeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onHeightChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCalculate: () => void;
  onReset: () => void;
}

/**
 * BMI Calculator Form component
 * Responsible for input fields and action buttons
 */
const BMIForm: React.FC<BMIFormProps> = ({
  weight,
  height,
  onWeightChange,
  onHeightChange,
  onCalculate,
  onReset,
}) => {
  return (
    <>
      <div className='input-group'>
        <label htmlFor='weight'>Weight (kg)</label>
        <input
          id='weight'
          type='number'
          placeholder='Your weight (kg)'
          value={weight}
          onChange={onWeightChange}
          min='1'
          step='0.1'
          aria-label='Weight in kilograms'
          className='input-field'
          data-testid='weight-input'
        />
      </div>

      <div className='input-group'>
        <label htmlFor='height'>Height (cm)</label>
        <input
          id='height'
          type='number'
          placeholder='Height (cm)'
          value={height}
          onChange={onHeightChange}
          min='1'
          step='0.1'
          aria-label='Height in centimeters'
          className='input-field'
          data-testid='height-input'
        />
      </div>

      <div className='button-group'>
        <button
          onClick={onCalculate}
          className='calculate-button'
          aria-label='Calculate BMI'
          data-testid='calculate-button'
        >
          Calculate BMI
        </button>

        <button
          onClick={onReset}
          className='reset-button'
          aria-label='Reset form'
          data-testid='reset-button'
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default memo(BMIForm);
