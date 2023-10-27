const router = require('express').Router();
const { addMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { addMovieValidation, deleteMovieValidation } = require('../utils/validation');

router.get('/', getMovies);

router.post('/', addMovieValidation, addMovie);

router.delete('/:movieId', deleteMovieValidation, deleteMovie);

module.exports = router;
