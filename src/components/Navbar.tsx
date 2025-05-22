import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, Home, Search as SearchIcon, Grid3X3, Menu, X } from 'lucide-react';
import { SearchBar } from './SearchBar';
import { cn } from '../utils/cn';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and site title */}
          <Link to="/" className="flex items-center gap-2">
            <Book className="h-6 w-6 text-primary-600" />
            <span className="font-bold text-lg text-neutral-900">
              Qur'ān Companion
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/')
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <div className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </div>
            </Link>
            <Link
              to="/reader"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/reader')
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Reader</span>
              </div>
            </Link>
            <Link
              to="/topics"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/topics')
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <div className="flex items-center gap-2">
                <Grid3X3 className="h-4 w-4" />
                <span>Topics</span>
              </div>
            </Link>
            <Link
              to="/search"
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive('/search')
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <div className="flex items-center gap-2">
                <SearchIcon className="h-4 w-4" />
                <span>Search</span>
              </div>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isMenuOpen ? (
              <X className="block h-6 w-6" />
            ) : (
              <Menu className="block h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1 animate-fade-in">
            <Link
              to="/"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive('/')
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </div>
            </Link>
            <Link
              to="/reader"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive('/reader')
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                <span>Reader</span>
              </div>
            </Link>
            <Link
              to="/topics"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive('/topics')
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <Grid3X3 className="h-5 w-5" />
                <span>Topics</span>
              </div>
            </Link>
            <Link
              to="/search"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium",
                isActive('/search')
                  ? "bg-primary-50 text-primary-700"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center gap-2">
                <SearchIcon className="h-5 w-5" />
                <span>Search</span>
              </div>
            </Link>
            <div className="px-3 py-2">
              <SearchBar mobile />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}