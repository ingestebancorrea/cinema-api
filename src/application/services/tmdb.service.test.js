const axios = require('axios');
const { fetchMoviesFromTMDB } = require('./tmdb.service');

jest.mock('axios');

describe('fetchMoviesFromTMDB Service', () => {
    it('should fetch movies from TMDB API', async () => {
        axios.get.mockResolvedValue({
            data: {
                results: [
                    { title: 'Movie 1', overview: 'Description 1' },
                    { title: 'Movie 2', overview: 'Description 2' },
                ],
            },
        });

        const movies = await fetchMoviesFromTMDB();
        expect(movies.length).toBe(2);
        expect(movies[0].title).toBe('Movie 1');
    });

    it('should throw an error if the API fails', async () => {
        axios.get.mockRejectedValue(new Error('API error'));

        await expect(fetchMoviesFromTMDB()).rejects.toThrow('API error');
    });
});