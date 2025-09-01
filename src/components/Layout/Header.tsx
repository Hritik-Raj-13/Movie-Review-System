import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, Search, User, Heart } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-slate-900 shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-amber-400 hover:text-amber-300 transition-colors">
            <Film className="h-8 w-8" />
            <span className="text-xl font-bold">CineReview</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-slate-800 text-amber-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Home
            </Link>
            <Link
              to="/movies"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/movies') 
                  ? 'bg-slate-800 text-amber-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Movies
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/profile') 
                  ? 'bg-slate-800 text-amber-400' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              Profile
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link
              to="/movies"
              className="text-slate-300 hover:text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              to="/profile"
              className="text-slate-300 hover:text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              to="/profile"
              className="text-slate-300 hover:text-white p-2 rounded-md hover:bg-slate-800 transition-colors"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;