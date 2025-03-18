import React from 'react';
import BMICalculator from './components/BMICalculator';
import './App.css';

/**
 * Main Application Component
 */
const App: React.FC = () => {
  return (
    <div className='App' data-testid='app'>
      <BMICalculator />
    </div>
  );
};

export default App;
