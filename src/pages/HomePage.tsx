import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Award } from 'lucide-react';
import MovieGrid from '../components/Movie/MovieGrid';
import { Movie } from '../types/movie';
import { movieAPI } from '../services/api';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import ErrorMessage from '../components/UI/ErrorMessage';

const HomePage: React.FC = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [featured, trending] = await Promise.all([
          movieAPI.getFeaturedMovies(),
          movieAPI.getTrendingMovies(),
        ]);
        
        setFeaturedMovies(featured);
        setTrendingMovies(trending);
      } catch (err) {
        setError('Failed to load movies');
        console.error('Error fetching home page data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} className="min-h-screen" />;
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Amazing
              <span className="text-amber-400 block">Movies</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Your ultimate destination for movie reviews, ratings, and recommendations.
              Find your next favorite film today.
            </p>
            <Link
              to="/movies"
              className="inline-flex items-center space-x-2 bg-amber-400 text-slate-900 font-semibold px-8 py-3 rounded-lg hover:bg-amber-500 transition-colors"
            >
              <span>Explore Movies</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Movies */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">Featured Movies</h2>
            </div>
            <Link
              to="/movies"
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <MovieGrid movies={featuredMovies} variant="featured" />
        </div>
      </section>

      {/* Trending Movies */}
      <section className="py-16 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-6 w-6 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">Trending Now</h2>
            </div>
            <Link
              to="/movies"
              className="text-amber-400 hover:text-amber-300 font-medium flex items-center space-x-1"
            >
              <span>View All</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <MovieGrid movies={trendingMovies} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;