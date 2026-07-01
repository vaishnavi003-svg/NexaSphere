import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  isSearching?: boolean;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search...',
  isSearching = false,
  className = '',
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
      <div className="search-input-wrapper">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="search-input"
          aria-label="Search"
        />
        {isSearching && (
          <span className="search-spinner" aria-label="Searching...">
            ⏳
          </span>
        )}
        <button type="submit" className="search-button">
          🔍
        </button>
      </div>
    </form>
  );
}