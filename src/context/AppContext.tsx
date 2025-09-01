import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Movie, Review, User, MovieFilters } from '../types/movie';

interface AppState {
  movies: Movie[];
  currentMovie: Movie | null;
  user: User | null;
  reviews: Review[];
  watchlist: string[];
  filters: MovieFilters;
  loading: boolean;
  error: string | null;
}

type AppAction = 
  | { type: 'SET_MOVIES'; payload: Movie[] }
  | { type: 'SET_CURRENT_MOVIE'; payload: Movie | null }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_REVIEWS'; payload: Review[] }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'ADD_TO_WATCHLIST'; payload: string }
  | { type: 'REMOVE_FROM_WATCHLIST'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<MovieFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialState: AppState = {
  movies: [],
  currentMovie: null,
  user: null,
  reviews: [],
  watchlist: [],
  filters: {
    search: '',
    genre: '',
    year: '',
    minRating: 0,
  },
  loading: false,
  error: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_MOVIES':
      return { ...state, movies: action.payload };
    case 'SET_CURRENT_MOVIE':
      return { ...state, currentMovie: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };
    case 'ADD_TO_WATCHLIST':
      return { 
        ...state, 
        watchlist: [...state.watchlist, action.payload],
        user: state.user ? {
          ...state.user,
          watchlist: [...state.user.watchlist, action.payload]
        } : null
      };
    case 'REMOVE_FROM_WATCHLIST':
      return { 
        ...state, 
        watchlist: state.watchlist.filter(id => id !== action.payload),
        user: state.user ? {
          ...state.user,
          watchlist: state.user.watchlist.filter(id => id !== action.payload)
        } : null
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};