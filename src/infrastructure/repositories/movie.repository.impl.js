const MovieModel = require('../models/movie.model');
const MovieRepository = require('../../domain/repositories/movie.repository');

class MovieRepositoryImpl extends MovieRepository {
    async create(movieEntity) {
        return await MovieModel.create(movieEntity);
    }

    async findById(id) {
        return await MovieModel.findByPk(id);
    }
}

module.exports = MovieRepositoryImpl;