# CineReview - Movie Review Platform

A modern, responsive movie review platform built with React, TypeScript, and Tailwind CSS. Discover movies, read reviews, manage your watchlist, and share your thoughts about your favorite films.

## 🎬 Features

### Core Functionality
- **Movie Discovery**: Browse featured and trending movies with beautiful card layouts
- **Advanced Search & Filtering**: Find movies by title, genre, year, and minimum rating
- **Detailed Movie Pages**: View comprehensive movie information including cast, director, duration, and user reviews
- **User Reviews**: Submit and read movie reviews with 5-star rating system
- **Personal Watchlist**: Save movies to watch later with easy add/remove functionality
- **User Profiles**: Track your review history and manage your watchlist

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing
- **Dark Cinema Theme**: Professional dark UI with gold accents for optimal movie browsing
- **Smooth Animations**: Hover effects, transitions, and micro-interactions throughout
- **Loading States**: Elegant loading spinners and error handling
- **Intuitive Navigation**: Clean header with active state indicators

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Extract the downloaded ZIP file** to your desired location
2. **Navigate to the project directory**:
   ```bash
   cd movie-review-platform
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser** and visit `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full IntelliSense
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful, customizable icons

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **PostCSS** - CSS processing with Autoprefixer
- **TypeScript ESLint** - TypeScript-specific linting rules

### State Management
- **React Context API** - Global state management for user data, watchlist, and app state
- **useReducer Hook** - Predictable state updates with action-based patterns



## 🎯 API Endpoints (Mock Implementation)

The application currently uses mock data but is structured to easily integrate with a real backend API:

### Movies
- `GET /api/movies` - Retrieve all movies with optional filtering
  - Query parameters: `search`, `genre`, `year`, `minRating`
- `GET /api/movies/:id` - Get specific movie details
- `GET /api/movies/featured` - Get featured movies
- `GET /api/movies/trending` - Get trending movies

### Reviews
- `GET /api/movies/:id/reviews` - Get reviews for a specific movie
- `POST /api/reviews` - Submit a new review

### User (Future Implementation)
- `GET /api/user/profile` - Get user profile
- `GET /api/user/watchlist` - Get user's watchlist
- `POST /api/user/watchlist` - Add movie to watchlist
- `DELETE /api/user/watchlist/:movieId` - Remove from watchlist

## UI
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ea13c09d-3de2-4daa-be4c-6d00dc314869" />

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/3bbca84b-27d4-4abc-87d7-6d25f6ca15d8" />

## 🎨 Design System

### Color Palette
- **Primary**: Amber (#F59E0B) - Used for accents, buttons, and highlights
- **Background**: Slate 950 (#020617) - Main background
- **Cards**: Slate 800 (#1E293B) - Component backgrounds
- **Text**: White/Slate variants for hierarchy
- **Success**: Green variants
- **Error**: Red variants

### Typography
- **Headings**: Bold weights with proper hierarchy
- **Body**: Regular weight with 150% line height
- **UI Elements**: Medium weight for buttons and labels

### Spacing
- **8px Grid System**: All spacing follows 8px increments
- **Responsive Breakpoints**: Mobile-first approach with sm, md, lg, xl breakpoints

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory for environment-specific configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=CineReview
```

### Tailwind Configuration
The project uses a custom Tailwind configuration optimized for the movie platform aesthetic.

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

All components adapt gracefully across screen sizes with optimized layouts and touch-friendly interactions.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use GitHub Actions for automated deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Movie poster images from [Pexels](https://www.pexels.com)
- Icons from [Lucide React](https://lucide.dev)
- Built with [Vite](https://vitejs.dev) and [React](https://reactjs.org)
