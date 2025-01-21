import { useState } from 'react';

// Illumination validation
const validateIllumination = (value: string) => {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue) || numberValue < 0 || numberValue > 100) {
    return 'You must enter a number between 0 and 100';
  }
  return '';
};

// Validation hook
export function useValidation() {
  const [formError, setFormError] = useState<{ [key: string]: boolean }>({});
  const [helperText, setHelperText] = useState<{ [key: string]: string }>({});

  // Exposed validation func
  const validateField = (name: string, value: string) => {
    let error = false;
    let helperText = '';

    // Illumination validation case (the only one!)
    if (name === 'illumination') {
      helperText = validateIllumination(value);
      error = helperText !== '';
    }

    // Error and helper text state update
    setFormError((prevState) => ({
      ...prevState,
      [name]: error,
    }));
    setHelperText((prevState) => ({
      ...prevState,
      [name]: helperText,
    }));
  };

  const isError = Object.values(formError).some(Boolean);

  return {
    /** Indicates if there is at least one error in the form */
    isError,
    /** Field error map */
    formError,
    /** Helper text for fields with an error */
    helperText,
    /** Validation function: validateField(name: string, value: string) */
    validateField,
  };
}
