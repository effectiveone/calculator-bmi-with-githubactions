import React, { useState, useCallback, ChangeEvent } from 'react';
import logo from './logo.svg';
import './App.css';

// Definiowanie typów
type BMICategory = 'Niedowaga' | 'Prawidłowa waga' | 'Nadwaga' | 'Otyłość';

function App() {
  const [BMI, setBMI] = useState<number | null>(null);
  const [weight, setWeight] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [category, setCategory] = useState<string | null>(null);

  // Funkcja określająca kategorię BMI
  const getBMICategory = useCallback((bmi: number): BMICategory => {
    if (bmi < 18.5) return 'Niedowaga';
    if (bmi < 25) return 'Prawidłowa waga';
    if (bmi < 30) return 'Nadwaga';
    return 'Otyłość';
  }, []);

  // Funkcja do walidacji danych wejściowych
  const isValidInput = useCallback(
    (weight: number, height: number): boolean => {
      return weight > 0 && height > 0;
    },
    [],
  );

  // Obliczanie BMI
  const calculateBMI = useCallback(() => {
    if (isValidInput(weight, height)) {
      const heightInMeters = height / 100;
      const bmiValue = weight / (heightInMeters * heightInMeters);
      const roundedBMI = parseFloat(bmiValue.toFixed(2));

      setBMI(roundedBMI);
      setCategory(getBMICategory(roundedBMI));
    } else {
      setBMI(null);
      setCategory(null);
    }
  }, [weight, height, getBMICategory, isValidInput]);

  // Obsługa zmiany wagi
  const handleWeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWeight(Number(e.target.value));
  }, []);

  // Obsługa zmiany wzrostu
  const handleHeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setHeight(Number(e.target.value));
  }, []);

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>Kalkulator BMI</p>

        <input
          type='number'
          placeholder='Twoja waga (kg)'
          value={weight || ''}
          onChange={handleWeightChange}
          min='1'
          step='0.1'
        />

        <input
          type='number'
          placeholder='Wzrost (cm)'
          value={height || ''}
          onChange={handleHeightChange}
          min='1'
          step='0.1'
        />

        <button onClick={calculateBMI}>Oblicz BMI</button>

        {BMI !== null && (
          <p>
            Twoje BMI: {BMI} - {category}
          </p>
        )}
      </header>
    </div>
  );
}

export default App;
