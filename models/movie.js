const { head, last, multiply, subtract } = require('ramda')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

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

}

const Movie = new Schema(movieSchema)

Movie.statics.addMovies = function ({movies}) {
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

  let query = {}
  if (title) query.title = { $regex: title, $options: 'i' }
  if (stars) query.stars = { $elemMatch: { $regex: stars, $options: 'i' } }

  const itemsOnPage = 10
  const itemsOffset = multiply(subtract(page, 1), itemsOnPage)

  return Promise.all([
    this.find(query).sort({ title: 'asc' }).skip(itemsOffset).limit(itemsOnPage),
    this.find(query).count(),
  ]).then(result => ({
    results: head(result),
    currentPage: Number(page),
    totalResults: last(result)
  }))
}

Movie.statics.deleteMovie = function (id) {
  return this.findByIdAndRemove(id)
}

Movie.statics.fetchMovieDetails = function (id) {
  return this.findById(id)
}

module.exports = mongoose.model('Movie', Movie)