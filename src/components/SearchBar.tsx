import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  return (
    <div className="relative w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for products..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-3 pl-12 bg-white/80 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>
    </div>
  );
};

export default SearchBar;