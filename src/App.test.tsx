import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('BMI Calculator', () => {
  test('renders inputs and buttons', () => {
    render(<App />);

    expect(screen.getByLabelText(/weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/height/i)).toBeInTheDocument();
    expect(screen.getByText(/calculate bmi/i)).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });

  test('inputs update correctly after entering values', () => {
    render(<App />);

    const weightInput = screen.getByLabelText(/weight/i) as HTMLInputElement;
    const heightInput = screen.getByLabelText(/height/i) as HTMLInputElement;

    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });

    expect(weightInput.value).toBe('70');
    expect(heightInput.value).toBe('175');
  });

  test('calculates BMI correctly', () => {
    render(<App />);

    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText('22.86')).toBeInTheDocument(); // 70 / (1.75 * 1.75) = 22.86
    expect(screen.getByText('Normal weight')).toBeInTheDocument();
  });

  test('does not calculate BMI for empty values', () => {
    render(<App />);

    const calculateButton = screen.getByText(/calculate bmi/i);
    fireEvent.click(calculateButton);

    expect(screen.queryByText(/your result/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/please enter valid weight and height values/i),
    ).toBeInTheDocument();
  });

  test('handles invalid data (height = 0)', () => {
    render(<App />);

    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '0' } });
    fireEvent.click(calculateButton);

    expect(screen.queryByText(/your result/i)).not.toBeInTheDocument();
    expect(
      screen.getByText(/height must be greater than 0/i),
    ).toBeInTheDocument();
  });

  test('resets form correctly', () => {
    render(<App />);

    const weightInput = screen.getByLabelText(/weight/i) as HTMLInputElement;
    const heightInput = screen.getByLabelText(/height/i) as HTMLInputElement;
    const calculateButton = screen.getByText(/calculate bmi/i);
    const resetButton = screen.getByText(/reset/i);

    // Fill in values and calculate
    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    // Verify calculation happened
    expect(screen.getByText('22.86')).toBeInTheDocument();

    // Reset form
    fireEvent.click(resetButton);

    // Verify form is reset
    expect(weightInput.value).toBe('');
    expect(heightInput.value).toBe('');
    expect(screen.queryByText('22.86')).not.toBeInTheDocument();
  });

  test('shows error for unrealistic weight value', () => {
    render(<App />);

    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '600' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    expect(screen.getByText(/weight seems too high/i)).toBeInTheDocument();
  });
});

describe('BMI Categories', () => {
  test('BMI < 18.5 - Underweight', () => {
    render(<App />);

    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '50' } }); // Weight 50 kg
    fireEvent.change(heightInput, { target: { value: '175' } }); // Height 175 cm
    fireEvent.click(calculateButton);

    expect(screen.getByText('Underweight')).toBeInTheDocument();
  });

  test('BMI 18.5 - 24.9 - Normal weight', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/weight/i), {
      target: { value: '70' },
    });
    fireEvent.change(screen.getByLabelText(/height/i), {
      target: { value: '175' },
    });
    fireEvent.click(screen.getByText(/calculate bmi/i));

    expect(screen.getByText('Normal weight')).toBeInTheDocument();
  });

  test('BMI 25 - 29.9 - Overweight', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/weight/i), {
      target: { value: '85' },
    });
    fireEvent.change(screen.getByLabelText(/height/i), {
      target: { value: '175' },
    });
    fireEvent.click(screen.getByText(/calculate bmi/i));

    expect(screen.getByText('Overweight')).toBeInTheDocument();
  });

  test('BMI 30+ - Obesity', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/weight/i), {
      target: { value: '100' },
    });
    fireEvent.change(screen.getByLabelText(/height/i), {
      target: { value: '175' },
    });
    fireEvent.click(screen.getByText(/calculate bmi/i));

    expect(screen.getByText('Obesity')).toBeInTheDocument();
  });
});
