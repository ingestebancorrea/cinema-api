const { ingestMovies } = require('../../src/infrastructure/controllers/movie.controller');
const MovieModel = require('../../infrastructure/models/movie.model');
const CategoryModel = require('../../infrastructure/models/category.model');
const fetchMoviesFromTMDB = require('../../application/services/tmdb.service');

jest.mock('../../infrastructure/models/movie.model');
jest.mock('../../infrastructure/models/category.model');
jest.mock('../../application/services/tmdb.service');

describe('ingestMovies Controller', () => {
    it('should fetch movies from TMDB and store them in the database', async () => {
        fetchMoviesFromTMDB.mockResolvedValue([
            { title: 'Movie 1', overview: 'Description 1', category: 'Action' },
            { title: 'Movie 2', overview: 'Description 2', category: 'Drama' },
        ]);

        CategoryModel.findOrCreate.mockResolvedValue([{ id: 1 }]);
        MovieModel.create.mockResolvedValue();

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ingestMovies(req, res);

        expect(fetchMoviesFromTMDB).toHaveBeenCalled();

        expect(CategoryModel.findOrCreate).toHaveBeenCalledTimes(2);
        expect(MovieModel.create).toHaveBeenCalledTimes(2);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ message: 'Movies ingested successfully.' });
    });

    it('should handle errors and return status 500', async () => {
        fetchMoviesFromTMDB.mockRejectedValue(new Error('API error'));

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await ingestMovies(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'API error' });
    });
});