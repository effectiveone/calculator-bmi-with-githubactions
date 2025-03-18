import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

describe('BMI Calculator Integration Tests', () => {
  beforeEach(() => {
    render(<App />);
  });

  it('displays the BMI Calculator successfully', () => {
    expect(screen.getByText('BMI Calculator')).toBeInTheDocument();
    expect(screen.getByLabelText(/weight/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/height/i)).toBeInTheDocument();
    expect(screen.getByText(/calculate bmi/i)).toBeInTheDocument();
  });

  it('calculates normal weight BMI correctly', async () => {
    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('22.86')).toBeInTheDocument();
      expect(screen.getByText('Normal weight')).toBeInTheDocument();

      // Check that the correct category is highlighted
      const normalWeightItem = screen
        .getByText('Normal weight: 18.5 - 24.9')
        .closest('li');
      expect(normalWeightItem).toHaveClass('active');
    });
  });

  it('calculates underweight BMI correctly', async () => {
    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '50' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('16.33')).toBeInTheDocument();
      expect(screen.getByText('Underweight')).toBeInTheDocument();

      // Check that the correct category is highlighted
      const underweightItem = screen
        .getByText(/underweight: < 18.5/i)
        .closest('li');
      expect(underweightItem).toHaveClass('active');
    });
  });

  it('calculates overweight BMI correctly', async () => {
    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '85' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('27.76')).toBeInTheDocument();
      expect(screen.getByText('Overweight')).toBeInTheDocument();

      // Check that the correct category is highlighted
      const overweightItem = screen
        .getByText('Overweight: 25 - 29.9')
        .closest('li');
      expect(overweightItem).toHaveClass('active');
    });
  });

  it('calculates obesity BMI correctly', async () => {
    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '100' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('32.65')).toBeInTheDocument();
      expect(screen.getByText('Obesity')).toBeInTheDocument();

      // Check that the correct category is highlighted
      const obesityItem = screen.getByText(/obesity: ≥ 30/i).closest('li');
      expect(obesityItem).toHaveClass('active');
    });
  });

  it('shows validation error for empty inputs', async () => {
    const calculateButton = screen.getByText(/calculate bmi/i);
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(
        screen.getByText(/please enter valid weight and height values/i),
      ).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid weight', async () => {
    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    fireEvent.change(weightInput, { target: { value: '0' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(
        screen.getByText(/weight must be greater than 0/i),
      ).toBeInTheDocument();
    });
  });

  it('resets the form correctly', async () => {
    const weightInput = screen.getByLabelText(/weight/i) as HTMLInputElement;
    const heightInput = screen.getByLabelText(/height/i) as HTMLInputElement;
    const calculateButton = screen.getByText(/calculate bmi/i);
    const resetButton = screen.getByText(/reset/i);

    // Fill in the form and calculate
    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    // Verify calculation result is shown
    await waitFor(() => {
      expect(screen.getByText('22.86')).toBeInTheDocument();
    });

    // Reset the form
    fireEvent.click(resetButton);

    // Verify form is reset
    await waitFor(() => {
      expect(weightInput.value).toBe('');
      expect(heightInput.value).toBe('');
      expect(screen.queryByText('22.86')).not.toBeInTheDocument();
    });
  });

  it('updates BMI when inputs change and calculate is clicked again', async () => {
    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const calculateButton = screen.getByText(/calculate bmi/i);

    // First calculation
    fireEvent.change(weightInput, { target: { value: '70' } });
    fireEvent.change(heightInput, { target: { value: '175' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('22.86')).toBeInTheDocument();
    });

    // Change inputs and calculate again
    fireEvent.change(weightInput, { target: { value: '85' } });
    fireEvent.click(calculateButton);

    await waitFor(() => {
      expect(screen.getByText('27.76')).toBeInTheDocument();
      expect(screen.getByText('Overweight')).toBeInTheDocument();
    });
  });
});
