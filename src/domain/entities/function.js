class Function {
    constructor({ movieId, room, date, time, totalCapacity, availableCapacity }) {
        this.movieId = movieId;
        this.room = room;
        this.date = date;
        this.time = time;
        this.totalCapacity = totalCapacity;
        this.availableCapacity = availableCapacity || totalCapacity;
    }

    static validateFunction(existingFunction) {
        if (existingFunction) {
            throw new Error('A function already exists in this room at the specified date and time');
        }
    }
}

module.exports = Function;