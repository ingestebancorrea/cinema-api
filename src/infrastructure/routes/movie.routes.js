const express = require('express');
const { ingestMovies } = require('../controllers/movie.controller');

const router = express.Router();
router.post('/ingest', ingestMovies);

module.exports = router;