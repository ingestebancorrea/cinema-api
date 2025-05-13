const TicketUseCase = require('../../application/use-cases/ticket.usecase');
const TicketRepositoryImpl = require('../repositories/ticket.repository.impl');
const FunctionRepositoryImpl = require('../repositories/function.repository.impl');

const ticketRepository = new TicketRepositoryImpl();
const functionRepository = new FunctionRepositoryImpl();
const ticketUseCase = new TicketUseCase(ticketRepository, functionRepository);

const reserveTicket = async (req, res) => {
    try {
        const { functionId, buyer } = req.body;

        const ticket = await ticketUseCase.reserve({ functionId, buyer });

        res.status(201).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { reserveTicket };