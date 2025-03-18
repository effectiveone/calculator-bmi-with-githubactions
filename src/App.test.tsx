import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('Kalkulator BMI', () => {
  test('renderuje inputy i przycisk', () => {
    render(<App />);

    expect(screen.getByPlaceholderText('Twoja waga (kg)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wzrost (cm)')).toBeInTheDocument();
    expect(screen.getByText('Oblicz BMI')).toBeInTheDocument();
  });

  test('po wpisaniu wartości inputy aktualizują się', () => {
    render(<App />);

    const weightInput = screen.getByPlaceholderText(
      'Twoja waga (kg)',
    ) as HTMLInputElement;
    const heightInput = screen.getByPlaceholderText(
      'Wzrost (cm)',
    ) as HTMLInputElement;

    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });

    expect(weightInput.value).toBe('70');
    expect(heightInput.value).toBe('175');
  });

  test('poprawnie oblicza BMI', () => {
    render(<App />);

    const weightInput = screen.getByPlaceholderText('Twoja waga (kg)');
    const heightInput = screen.getByPlaceholderText('Wzrost (cm)');
    const button = screen.getByText('Oblicz BMI');

    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(button);

    expect(screen.getByText(/Twoje BMI: 22.86/i)).toBeInTheDocument(); // 70 / (1.75 * 1.75) = 22.86
  });

  test('nie liczy BMI dla pustych wartości', () => {
    render(<App />);

    const button = screen.getByText('Oblicz BMI');
    fireEvent.click(button);

    expect(screen.queryByText(/Twoje BMI:/)).not.toBeInTheDocument();
  });

  test('obsługuje błędne dane (wzrost = 0)', () => {
    render(<App />);

    const weightInput = screen.getByPlaceholderText('Twoja waga (kg)');
    const heightInput = screen.getByPlaceholderText('Wzrost (cm)');
    const button = screen.getByText('Oblicz BMI');

    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '0' } });
    fireEvent.click(button);

    expect(screen.queryByText(/Twoje BMI:/)).not.toBeInTheDocument();
  });
});

describe('Kategoryzacja BMI', () => {
  test('BMI < 18.5 - Niedowaga', () => {
    render(<App />);

    const weightInput = screen.getByPlaceholderText('Twoja waga (kg)');
    const heightInput = screen.getByPlaceholderText('Wzrost (cm)');
    const button = screen.getByText('Oblicz BMI');

    fireEvent.change(weightInput, { target: { value: '50' } }); // Waga 50 kg
    fireEvent.change(heightInput, { target: { value: '175' } }); // Wzrost 175 cm
    fireEvent.click(button);

    expect(screen.getByText(/Niedowaga/i)).toBeInTheDocument();
  });

  test('BMI 18.5 - 24.9 - Prawidłowa waga', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Twoja waga (kg)'), {
      target: { value: '70' },
    });
    fireEvent.change(screen.getByPlaceholderText('Wzrost (cm)'), {
      target: { value: '175' },
    });
    fireEvent.click(screen.getByText('Oblicz BMI'));

    expect(screen.getByText(/Prawidłowa waga/i)).toBeInTheDocument();
  });

  test('BMI 25 - 29.9 - Nadwaga', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Twoja waga (kg)'), {
      target: { value: '85' },
    });
    fireEvent.change(screen.getByPlaceholderText('Wzrost (cm)'), {
      target: { value: '175' },
    });
    fireEvent.click(screen.getByText('Oblicz BMI'));

    expect(screen.getByText(/Nadwaga/i)).toBeInTheDocument();
  });

  test('BMI 30+ - Otyłość', () => {
    render(<App />);

    fireEvent.change(screen.getByPlaceholderText('Twoja waga (kg)'), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByPlaceholderText('Wzrost (cm)'), {
      target: { value: '175' },
    });
    fireEvent.click(screen.getByText('Oblicz BMI'));

    expect(screen.getByText(/Otyłość/i)).toBeInTheDocument();
  });
});
