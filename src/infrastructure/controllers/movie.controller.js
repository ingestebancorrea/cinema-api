const MovieUseCase = require('../../application/use-cases/movie.usecase');
const MovieRepositoryImpl = require('../repositories/movie.repository.impl');
const CategoryRepositoryImpl = require('../repositories/category.repository.impl');

const movieRepository = new MovieRepositoryImpl();
const categoryRepository = new CategoryRepositoryImpl();
const movieUseCase = new MovieUseCase(movieRepository, categoryRepository);

const ingestMovies = async (req, res) => {
    try {
        await movieUseCase.ingestMovies();
        res.status(201).json({ message: 'Movies ingested successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = { ingestMovies };