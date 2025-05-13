const TicketModel = require('../models/ticket.model');
const TicketRepository = require('../../domain/repositories/ticket.repository');

class TicketRepositoryImpl extends TicketRepository {
    async create(ticketEntity) {
        return await TicketModel.create(ticketEntity);
    }
}

module.exports = TicketRepositoryImpl;