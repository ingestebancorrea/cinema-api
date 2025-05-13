const express = require('express');
const { reserveTicket } = require('../controllers/ticket.controller');
const TicketUseCase = require('../../application/use-cases/ticket.usecase');
const TicketRepositoryImpl = require('../repositories/ticket.repository.impl');
const FunctionRepositoryImpl = require('../repositories/function.repository.impl');

const router = express.Router();

const ticketRepository = new TicketRepositoryImpl();
const functionRepository = new FunctionRepositoryImpl();
const ticketUseCase = new TicketUseCase(ticketRepository, functionRepository);

router.post('/reserve', reserveTicket(ticketUseCase));

module.exports = router;