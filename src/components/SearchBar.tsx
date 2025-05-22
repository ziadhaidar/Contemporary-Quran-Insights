import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

interface SearchBarProps {
  mobile?: boolean;
}

export function SearchBar({ mobile = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigate = useNavigate();

  // Mock suggestions - in a real app, this would come from a search API
  const mockSuggestions = [
    'Surah Al-Baqarah',
    'Verse 2:255 (Ayatul Kursi)',
    'Justice in Quran',
    'Prophet Muhammad',
    'Ramadan',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    
    // Simple mock suggestion filtering
    if (value.length > 1) {
      const filtered = mockSuggestions.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setQuery('');
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className={cn(
      "relative",
      mobile ? "w-full" : "hidden md:block w-64 lg:w-80"
    )}>
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search Qur'ān..."
          value={query}
          onChange={handleInputChange}
          className="w-full py-2 pl-10 pr-4 rounded-md bg-neutral-100 focus:bg-white border border-neutral-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-colors placeholder:text-neutral-400 text-sm"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
      </form>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-neutral-200 overflow-hidden">
          <ul>
            {suggestions.map((suggestion, index) => (
              <li 
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 text-sm hover:bg-primary-50 cursor-pointer text-neutral-700 hover:text-primary-700 transition-colors"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}