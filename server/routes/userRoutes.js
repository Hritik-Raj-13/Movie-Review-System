const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
router.post('/register', (req, res) => {
  res.json({ message: 'Register user' });
});

// @route   POST api/users/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', (req, res) => {
  res.json({ message: 'Login user' });
});

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, (req, res) => {
  res.json({ message: 'Get user profile' });
});

// @route   PUT api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, (req, res) => {
  res.json({ message: 'Update user profile' });
});

// @route   GET api/users/watchlist
// @desc    Get user watchlist
// @access  Private
router.get('/watchlist', auth, (req, res) => {
  res.json({ message: 'Get user watchlist' });
});

// @route   POST api/users/watchlist/:movieId
// @desc    Add movie to watchlist
// @access  Private
router.post('/watchlist/:movieId', auth, (req, res) => {
  res.json({ message: `Add movie ${req.params.movieId} to watchlist` });
});

// @route   DELETE api/users/watchlist/:movieId
// @desc    Remove movie from watchlist
// @access  Private
router.delete('/watchlist/:movieId', auth, (req, res) => {
  res.json({ message: `Remove movie ${req.params.movieId} from watchlist` });
});

module.exports = router;