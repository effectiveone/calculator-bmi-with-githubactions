import React, { memo } from 'react';
import { BMICategory } from '../../types';

interface BMIResultProps {
  bmi: number;
  category: BMICategory;
}

/**
 * BMI Result component
 * Displays BMI value, category, and information about BMI ranges
 */
const BMIResult: React.FC<BMIResultProps> = ({ bmi, category }) => {
  return (
    <div
      className='result-container'
      role='region'
      aria-live='polite'
      data-testid='bmi-result'
    >
      <h2>Your Result</h2>
      <div
        className={`bmi-result ${category.toLowerCase().replace(' ', '-')}`}
        data-testid='bmi-category-indicator'
      >
        <div className='bmi-value' data-testid='bmi-value'>
          {bmi}
        </div>
        <div className='bmi-category' data-testid='bmi-category'>
          {category}
        </div>
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
  );
};

export default memo(BMIResult);
