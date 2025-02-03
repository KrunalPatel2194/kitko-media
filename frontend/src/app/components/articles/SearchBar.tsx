// src/components/articles/SearchBar.tsx
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchBarProps {
  value?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
}

interface SearchBarRef {
  resetSearch: () => void;
}

export const SearchBar = forwardRef<SearchBarRef, SearchBarProps>(
  ({ value = '', onSearch, onClear }, ref) => {
    const [localValue, setLocalValue] = useState(value);

    useDebounce(localValue, onSearch, 2000);

    useImperativeHandle(ref, () => ({
      resetSearch: () => {
        setLocalValue('');
        onClear?.();
      }
    }));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value);
    };

    const handleClear = () => {
      setLocalValue('');
      onClear?.();
    };

    return (
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={localValue}
          onChange={handleChange}
          placeholder="Search articles..."
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm 
          bg-white placeholder-gray-500 focus:outline-none focus:ring-1 
          focus:ring-[#AE8766] focus:border-[#AE8766]"
        />
        {localValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            ✕
          </button>
        )}
      </div>
    );
  }
);
SearchBar.displayName = 'SearchBar';