"use client";

import { useEffect, useState } from "react";

export function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    try {
      const storedValue = window.localStorage.getItem(key);

      return storedValue === null ? initialValue : (JSON.parse(storedValue) as T);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage failures so the UI keeps working in restricted environments.
    }
  }, [key, value]);

  return [value, setValue] as const;
}
