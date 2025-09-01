const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');

// @route   GET api/movies
// @desc    Get all movies
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Get all movies' });
});

// @route   GET api/movies/:id
// @desc    Get movie by ID
// @access  Public
router.get('/:id', (req, res) => {
  res.json({ message: `Get movie with id: ${req.params.id}` });
});

// @route   POST api/movies
// @desc    Create a movie
// @access  Private (Admin)
router.post('/', auth, (req, res) => {
  res.json({ message: 'Create a new movie' });
});

// @route   PUT api/movies/:id
// @desc    Update a movie
// @access  Private (Admin)
router.put('/:id', auth, (req, res) => {
  res.json({ message: `Update movie with id: ${req.params.id}` });
});

// @route   DELETE api/movies/:id
// @desc    Delete a movie
// @access  Private (Admin)
router.delete('/:id', auth, (req, res) => {
  res.json({ message: `Delete movie with id: ${req.params.id}` });
});

// @route   POST api/movies/:id/reviews
// @desc    Add a review to a movie
// @access  Private
router.post('/:id/reviews', auth, (req, res) => {
  res.json({ message: `Add review to movie with id: ${req.params.id}` });
});

module.exports = router;