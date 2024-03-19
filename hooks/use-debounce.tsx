import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // timeout for the debounce function to minimize db queries for the search functionalities
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay || 500 )

    // cancelling the timeout after the timer funcion is done using clearTimeout.
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
