var express = require('express');
var router = express.Router();
const movieDb = require('../models');

// router.get('/search/movie', function(req, res, next) {
//   res.render('index', { title: 'Movies' });
// });

router.get('/search', (req, res) => {
  movieDb.findMovies(req.query).then(movies => res.send(movies));
});

router.get('/movies/:id', (req, res) => {
  movieDb.fetchMovieDetails(req.params.id).then(movieDetails => res.send(movieDetails));
});

router.post('/movies', (req, res) => {
  movieDb.addMovies(req.body).then(createdMovie => res.send(createdMovie));
});

router.delete('/movies/:id', (req, res) => {
  movieDb.deleteMovie(req.params.id).then(deletedMovie => res.send(deletedMovie));
});

module.exports = router;
