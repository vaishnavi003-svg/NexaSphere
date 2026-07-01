import { useState, useEffect, useRef } from 'react';
import { useDebounce } from './useDebounce';

export function useSearch<T>(
  searchFn: (query: string, signal: AbortSignal) => Promise<T[]>,
  delay: number = 300
) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedQuery = useDebounce(query, delay);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    searchFn(debouncedQuery, controller.signal)
      .then((data) => {
        setResults(data);
        setIsSearching(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Search failed');
          setIsSearching(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [debouncedQuery, searchFn]);

  return {
    query,
    setQuery,
    results,
    isSearching,
    error,
    clearSearch: () => {
      setQuery('');
      setResults([]);
      setIsSearching(false);
    },
  };
}