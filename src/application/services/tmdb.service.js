const axios = require('axios');

const fetchMoviesFromTMDB = async () => {
    const response = await axios.get(`${process.env.TMDB_API_URL}/movie/popular`, {
        params: {
            api_key: process.env.TMDB_API_KEY,
            language: 'en-US',
            page: 1,
        },
    });

    return response.data.results;
};

module.exports = { fetchMoviesFromTMDB };