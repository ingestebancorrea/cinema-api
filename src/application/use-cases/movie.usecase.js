const { fetchMoviesFromTMDB } = require('../services/tmdb.service');

class MovieUseCase {
    constructor(movieRepository, categoryRepository) {
        this.movieRepository = movieRepository;
        this.categoryRepository = categoryRepository;
    }

    async ingestMovies() {
        const movies = await fetchMoviesFromTMDB();

        for (const movie of movies) {
            const category = await this.categoryRepository.findOrCreate(movie.category || 'Uncategorized');
            
            await this.movieRepository.create({
                titulo: movie.title,
                descripcion: movie.overview,
                duracion: movie.runtime || 120,
                categoria_id: category.id,
            });
        }
    }
}

module.exports = MovieUseCase;