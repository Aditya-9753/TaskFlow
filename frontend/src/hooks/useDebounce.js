import { useState, useEffect } from 'react';

/**
 * Custom hook to debounce updates of a state value
 * @param {any} value - The input value to debounce
 * @param {number} delay - The debounce delay in milliseconds
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout on value or delay changes
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
// Use default export
