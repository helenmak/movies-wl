const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/movies'); //ToDo: add config

const db = mongoose.connection;

db.on('error', function (err) {
    console.error('MoviesDB connection error:', err.message);
});

db.once('open', function () {
    console.info('Connected to MoviesDB!');
});

const Movie = require('./movie')
exports.Movie = Movie;
