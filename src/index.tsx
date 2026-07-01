import { useSearch } from '../../hooks/useSearch';
import { SearchBar } from '../../components/common/SearchBar';

// Search function
const searchEvents = async (query: string, signal: AbortSignal) => {
  const response = await fetch(`/api/events/search?q=${query}`, { signal });
  if (!response.ok) throw new Error('Search failed');
  return response.json();
};

// In your component
const {
  query,
  setQuery,
  results,
  isSearching,
  error,
  clearSearch,
} = useSearch(searchEvents, 300);

// JSX
<SearchBar
  value={query}
  onChange={setQuery}
  isSearching={isSearching}
  placeholder="Search events..."
/>