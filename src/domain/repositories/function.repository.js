const TicketModel = require('../../infrastructure/models/ticket.model');
const TicketRepository = require('../../domain/repositories/ticket.repository');

class TicketRepositoryImpl extends TicketRepository {
    async create(ticketEntity) {
        return await TicketModel.create(ticketEntity);
    }

    async findById(id) {
        return await TicketModel.findByPk(id);
    }

    async findByFunctionId(functionId) {
        return await TicketModel.findAll({ where: { functionId } });
    }

    async update(id, updatedData) {
        const ticket = await TicketModel.findByPk(id);
        if (!ticket) {
            throw new Error('Ticket not found');
        }

        return await ticket.update(updatedData);
    }

    async transaction(callback) {
        throw new Error('Method not implemented');
    }

}

module.exports = TicketRepositoryImpl;