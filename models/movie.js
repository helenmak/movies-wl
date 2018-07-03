const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = {

  title: {
    type: String
  },
  year: {
    type: Number
  },
  format: {
    type: String
  },
  stars: {
    type: [String]
  },
  createTime: {
    type: Date,
    default: Date.now
  },
  modifyTime: {
    type: Date,
    default: Date.now
  }

};

const Movie = new Schema(movieSchema);

Movie.statics.addMovies = function (movies) {
  return Promise.all(
    movies.map(({title, year, format, stars}) => {
      return new this({
        title,
        year,
        format,
        stars
      }).save()
    })
  )
}

Movie.statics.findMovies = function ({title, stars, page}) {
  // let query = {
  //   title,
  //   stars
  // }

  let query = {};
  if (title) query.title = { $regex: title, $options: 'i' };
  if (stars) query.stars = { $elemMatch: { $regex: stars, $options: 'i' } };

  const itemsOnPage = 10;
  const itemsOffset = (page - 1) * itemsOnPage;

  return Promise.all([
    Movie.find(query, { title: 1 }).sort({ title: 'asc' }).skip(itemsOffset).limit(itemsOnPage),
    Movie.find(query).count(),
  ]).then(result => ({
    data: result[0],
    currentPage: +page,
    totalPages: Math.ceil(result[1] / itemsOnPage),
  }));

  // return this.find(query).exec();
}

Movie.statics.deleteMovie = function (id) {
  return Movie.findByIdAndRemove(id);
}

Movie.statics.fetchMovieDetails = function (id) {
  return Movie.findById(id);
}

module.exports = mongoose.model('Movie', Movie);