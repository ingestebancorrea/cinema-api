const FunctionRepositoryImpl = require('../repositories/function.repository.impl');
const MovieRepositoryImpl = require('../repositories/movie.repository.impl');
const FunctionUseCase = require('../../application/use-cases/function.usecase');

const functionRepository = new FunctionRepositoryImpl();
const movieRepository = new MovieRepositoryImpl();
const functionUseCase = new FunctionUseCase(functionRepository, movieRepository);

const createFunction = async (req, res) => {
    try {
        const { movieId, room, date, time, totalCapacity } = req.body;

        const newFunction = await functionUseCase.create({ movieId, room, date, time, totalCapacity });

        res.status(201).json(newFunction);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

const getFunctionAvailability = async (req, res) => {
    try {
        const { id } = req.params;

        const availability = await functionUseCase.getAvailability(id);

        res.status(200).json(availability);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};


module.exports = { createFunction, getFunctionAvailability };