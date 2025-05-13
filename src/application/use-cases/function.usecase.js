const Function = require('../../domain/entities/function');

class FunctionUseCase {
    constructor(functionRepository, movieRepository) {
        this.functionRepository = functionRepository;
        this.movieRepository = movieRepository;
    }

    async create({ movieId, room, date, time, totalCapacity }) {
        const movie = await this.movieRepository.findById(movieId);
        if (!movie) {
            throw new Error('Movie not found');
        }

        const existingFunction = await this.functionRepository.findByRoomDateAndTime(room, date, time);
        if (existingFunction) {
            throw new Error('A function already exists in this room at the specified date and time');
        }

        const functionEntity = new Function({ movieId, room, date, time, totalCapacity });
        return await this.functionRepository.create(functionEntity);
    }

    async getAvailability(functionId) {
        const func = await this.functionRepository.findById(functionId);
        if (!func) {
            throw new Error('Function not found');
        }

        return {
            functionId: func.id,
            room: func.room,
            date: func.date,
            time: func.time,
            totalCapacity: func.totalCapacity,
            availableCapacity: func.availableCapacity,
        };
    }
}

module.exports = FunctionUseCase;