const FunctionModel = require('../models/function.model');
const FunctionRepository = require('../../domain/repositories/function.repository');

class FunctionRepositoryImpl extends FunctionRepository {
    async findByRoomDateAndTime(room, date, time) {
        return await FunctionModel.findOne({ where: { room, date, time } });
    }

    async create(functionEntity) {
        return await FunctionModel.create(functionEntity);
    }

    async findById(id) {
        return await FunctionModel.findByPk(id);
    }

    async update(id, updatedData) {
        const func = await FunctionModel.findByPk(id);
        if (!func) {
            throw new Error('Function not found');
        }

        return await func.update(updatedData);
    }

    async transaction(callback) {
        return await FunctionModel.sequelize.transaction(callback);
    }
}

module.exports = FunctionRepositoryImpl;