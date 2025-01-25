import { KeyboardEvent, useRef } from 'react';

export function useFormNavigation<T extends HTMLElement = HTMLElement>() {
  const refs = useRef<(T | null)[]>([]);

  const registerRef = (index: number) => (el: T | null) => {
    refs.current[index] = el;
  };

  const handleEnterKey = (index: number) => (e: KeyboardEvent<T>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      // Skip to next non-null ref
      let nextIndex = index + 1;
      while (nextIndex < refs.current.length && !refs.current[nextIndex]) {
        nextIndex += 1;
      }

      const nextElement = refs.current[nextIndex];
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  return { registerRef, handleEnterKey };
}
