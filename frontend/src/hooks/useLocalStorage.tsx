import { useState } from "react";

const useLocalStorage = (key: string, initialValue: string = "") => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? item : initialValue;
    } catch (err) {
      return initialValue;
    }
  });

  const setValue = (value: any) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
