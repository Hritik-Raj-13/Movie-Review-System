import { Movie, Review } from '../types/movie';

const API_BASE_URL = 'http://localhost:3000/api';

// Mock data for development
const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    year: 2024,
    rating: 8.8,
    duration: 166,
    director: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Oscar Isaac'],
    poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    featured: true,
    trending: true,
  },
  {
    id: '2',
    title: 'Oppenheimer',
    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    genre: ['Biography', 'Drama', 'History'],
    year: 2023,
    rating: 8.4,
    duration: 180,
    director: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    poster: 'https://images.pexels.com/photos/8294547/pexels-photo-8294547.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    featured: true,
  },
  {
    id: '3',
    title: 'The Batman',
    description: 'Batman ventures into Gotham City\'s underworld when a sadistic killer leaves behind a trail of cryptic clues.',
    genre: ['Action', 'Crime', 'Drama'],
    year: 2022,
    rating: 7.8,
    duration: 176,
    director: 'Matt Reeves',
    cast: ['Robert Pattinson', 'Zoë Kravitz', 'Jeffrey Wright', 'Colin Farrell'],
    poster: 'https://images.pexels.com/photos/8721342/pexels-photo-8721342.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
    trending: true,
  },
  {
    id: '4',
    title: 'Everything Everywhere All at Once',
    description: 'A Chinese-American woman gets swept up in an insane adventure in which she alone can save existence.',
    genre: ['Action', 'Adventure', 'Comedy'],
    year: 2022,
    rating: 7.8,
    duration: 139,
    director: 'Daniels',
    cast: ['Michelle Yeoh', 'Stephanie Hsu', 'Ke Huy Quan', 'Jamie Lee Curtis'],
    poster: 'https://images.pexels.com/photos/8112186/pexels-photo-8112186.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Avatar: The Way of Water',
    description: 'Jake Sully and Ney\'tiri have formed a family and are doing everything to stay together.',
    genre: ['Action', 'Adventure', 'Family'],
    year: 2022,
    rating: 7.6,
    duration: 192,
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver', 'Stephen Lang'],
    poster: 'https://images.pexels.com/photos/8036647/pexels-photo-8036647.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
  },
  {
    id: '6',
    title: 'Top Gun: Maverick',
    description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.',
    genre: ['Action', 'Drama'],
    year: 2022,
    rating: 8.3,
    duration: 130,
    director: 'Joseph Kosinski',
    cast: ['Tom Cruise', 'Miles Teller', 'Jennifer Connelly', 'Jon Hamm'],
    poster: 'https://images.pexels.com/photos/8867482/pexels-photo-8867482.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop',
  },
];

const mockReviews: Review[] = [
  {
    id: '1',
    movieId: '1',
    userId: 'user1',
    userName: 'Alex Johnson',
    rating: 5,
    comment: 'Absolutely stunning visuals and an epic continuation of the Dune saga. Villeneuve delivers once again!',
    createdAt: '2024-03-15T10:30:00Z',
  },
  {
    id: '2',
    movieId: '1',
    userId: 'user2',
    userName: 'Sarah Chen',
    rating: 4,
    comment: 'Great cinematography and performances. The world-building is incredible.',
    createdAt: '2024-03-14T15:45:00Z',
  },
];

export const movieAPI = {
  async getMovies(filters?: Partial<{ search: string; genre: string; year: string; minRating: number }>): Promise<Movie[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredMovies = [...mockMovies];
    
    if (filters?.search) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        movie.description.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    
    if (filters?.genre) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.genre.includes(filters.genre)
      );
    }
    
    if (filters?.year) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.year.toString() === filters.year
      );
    }
    
    if (filters?.minRating) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.rating >= filters.minRating
      );
    }
    
    return filteredMovies;
  },

  async getMovie(id: string): Promise<Movie | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockMovies.find(movie => movie.id === id) || null;
  },

  async getFeaturedMovies(): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockMovies.filter(movie => movie.featured);
  },

  async getTrendingMovies(): Promise<Movie[]> {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockMovies.filter(movie => movie.trending);
  },

  async getReviews(movieId: string): Promise<Review[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockReviews.filter(review => review.movieId === movieId);
  },

  async addReview(review: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };
    mockReviews.push(newReview);
    return newReview;
  },
};