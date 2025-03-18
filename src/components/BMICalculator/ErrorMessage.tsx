import React, { memo } from 'react';

interface ErrorMessageProps {
  message: string;
}

/**
 * Error Message component
 * Displays validation error messages
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className='error-message' role='alert' data-testid='error-message'>
      {message}
    </div>
  );
};

export default memo(ErrorMessage);
