import { useState } from "react";

const useLocalStorage = (key, initalValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // get from local storage by key
      const item = window.localStorage.getItem(key);
      // parse stored json or if non return initailValue
      return item ? JSON.parse(item) : initalValue;
    } catch (error) {
      // if error also return initial value
      console.log(error);
      return initalValue;
    }
  });

  // return a wrap version of useState's setter function that persist the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same api as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStorage;
