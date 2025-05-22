import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Search as SearchIcon, Filter, X } from 'lucide-react';
import { mockSearchResults } from '../data/mockSearchData';
import { useNavigate } from 'react-router-dom';
import { cn } from '../utils/cn';

export function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const topic = searchParams.get('topic') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const navigate = useNavigate();
  
  // Handle the search 
  useEffect(() => {
    if (query || topic) {
      setIsLoading(true);
      // Simulate API request
      setTimeout(() => {
        // Filter results based on query or topic
        let filteredResults = [...mockSearchResults];
        
        if (topic) {
          filteredResults = filteredResults.filter(result => 
            result.topics.some((t: any) => t.id === topic)
          );
        }
        
        if (query) {
          filteredResults = filteredResults.filter(result => 
            result.text.toLowerCase().includes(query.toLowerCase()) ||
            result.translation.toLowerCase().includes(query.toLowerCase()) ||
            result.surahName.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        setResults(filteredResults);
        setIsLoading(false);
      }, 500);
    }
  }, [query, topic]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleResultClick = (surahId: string, ayahId: string) => {
    navigate(`/reader/${surahId}/${ayahId}`);
  };

  const toggleFilter = (filter: string) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Home', path: '/' },
          { label: 'Search', path: '/search' },
          ...(query ? [{ label: `Results for "${query}"`, path: `/search?q=${query}` }] : []),
          ...(topic ? [{ label: `Topic results`, path: `/search?topic=${topic}` }] : []),
        ]}
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSearch} className="flex w-full mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search the Qur'ān..."
              className="w-full py-3 pl-12 pr-4 rounded-l-lg border border-neutral-200 focus:border-primary-300 focus:ring-2 focus:ring-primary-100 transition-colors"
            />
            <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-neutral-400" />
          </div>
          <button 
            type="submit" 
            className="btn btn-primary rounded-l-none px-6"
          >
            Search
          </button>
        </form>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-neutral-600" />
              <h3 className="font-medium text-neutral-800">Filters</h3>
            </div>
            
            {activeFilters.length > 0 && (
              <button 
                onClick={clearFilters}
                className="text-sm text-primary-600 hover:text-primary-800 flex items-center gap-1"
              >
                Clear all <X className="h-3 w-3" />
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['Surah', 'Ayah', 'Translation', 'Tafsir', 'Topic'].map((filter) => (
              <button
                key={filter}
                onClick={() => toggleFilter(filter)}
                className={cn(
                  "px-3 py-1 rounded-full text-sm transition-colors",
                  activeFilters.includes(filter)
                    ? "bg-primary-600 text-white"
                    : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                )}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-primary-900">
              {isLoading ? 'Searching...' : `Results (${results.length})`}
            </h2>
          </div>

          {isLoading ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-neutral-100 p-4 rounded-lg h-24"></div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {results.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-neutral-500">No results found. Try adjusting your search.</p>
                </div>
              ) : (
                results.map((result) => (
                  <div 
                    key={`${result.surahId}-${result.ayahId}`}
                    onClick={() => handleResultClick(result.surahId, result.ayahId)}
                    className="insight-card hover:shadow-md cursor-pointer transition-all duration-200 animate-fade-in"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-primary-800">
                        Surah {result.surahName} ({result.surahId}), Ayah {result.ayahId}
                      </span>
                      <div className="flex gap-1">
                        {result.topics.slice(0, 2).map((topic: any) => (
                          <span key={topic.id} className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                            {topic.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="arabic-text text-right mb-2" dir="rtl">
                      {result.text}
                    </div>
                    
                    <p className="text-neutral-700 text-sm">
                      "{result.translation}"
                    </p>
                    
                    {result.highlight && (
                      <div className="mt-2 text-sm">
                        <span className="font-medium">Found in:</span> {result.highlight}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}