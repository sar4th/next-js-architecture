import { useEffect, useState } from "react";

/**
 * A custom hook for managing state with localStorage in a React component.
 *
 * @param key The key for the localStorage item
 * @param initialValue The initial value for the state
 * @returns A tuple containing the stored value and a function to update the stored value
 */
const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  // Initialize state with a function to handle initialization based on localStorage or initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Retrieve from localStorage
      const item = window.localStorage.getItem(key);
      // If localStorage has a value for the key, parse and return it, otherwise return the initialValue
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // If there's an error during retrieval, log it and return the initialValue
      console.error("Error retrieving from localStorage:", error);
      return initialValue;
    }
  });

  // Effect to handle changes in localStorage for the specified key
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      // Check if the changed key matches the key we're interested in
      if (event.key === key) {
        try {
          // Parse the new value from the event and update the state
          const newValue = JSON.parse(event.newValue!) as T;
          setStoredValue(newValue);
        } catch (error) {
          // Log an error if parsing fails
          console.error("Error parsing updated value from localStorage:", error);
        }
      }
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Clean up by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  // Function to update the stored value in localStorage and state
  const setValue = (value: T) => {
    try {
      // Update state with the new value
      setStoredValue(value);
      // Save the new value to localStorage
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Log an error if saving fails
      console.error("Error saving to localStorage:", error);
    }
  };

  // Return the stored value and the setValue function as tuple
  return [storedValue, setValue];
};

export default useLocalStorage;
