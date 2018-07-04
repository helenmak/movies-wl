var express = require('express');
var router = express.Router();
const movieDb = require('../models').Movie;

router.get('/search', (req, res) => {
  movieDb.findMovies(req.query).then(movies => res.send(movies));
});

router.get('/movies/:id', (req, res) => {
  movieDb.fetchMovieDetails(req.params.id).then(movieDetails => res.send(movieDetails));
});

router.post('/movies', (req, res) => {
  console.log('route movie body: ', req.body)
  movieDb.addMovies(req.body).then(createdMovie => res.send(createdMovie));
});

router.delete('/movies/:id', (req, res) => {
  movieDb.deleteMovie(req.params.id).then(deletedMovie => res.send(deletedMovie));
});

module.exports = router;
