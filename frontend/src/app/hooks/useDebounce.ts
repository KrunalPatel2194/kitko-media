import React from "react";

export function useDebounce<T extends (...args: any[]) => any>(
    callback: T,
    delay: number
  ) {
    const timeoutRef = React.useRef<NodeJS.Timeout>();
  
    return React.useCallback(
      (...args: Parameters<T>) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
  
        timeoutRef.current = setTimeout(() => {
          callback(...args);
        }, delay);
      },
      [callback, delay]
    );
  }