const { reserveTicket } = require('./ticket.controller');

jest.mock('../../application/use-cases/ticket.usecase');

describe('Ticket Controller - reserveTicket', () => {
    let ticketUseCaseMock;
    let req, res;

    beforeEach(() => {
        ticketUseCaseMock = {
            reserve: jest.fn(),
        };

        req = {
            body: {
                functionId: 1,
                buyer: 'John Doe',
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    it('should reserve a ticket and return 201 status with the ticket data', async () => {
        const mockTicket = { id: 1, functionId: 1, buyer: 'John Doe', status: 'reserved' };
        ticketUseCaseMock.reserve.mockResolvedValue(mockTicket);

        const handler = reserveTicket(ticketUseCaseMock);
        await handler(req, res);

        expect(ticketUseCaseMock.reserve).toHaveBeenCalledWith({
            functionId: req.body.functionId,
            buyer: req.body.buyer,
        });

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockTicket);
    });

    it('should return 400 status and error message if an error occurs', async () => {
        ticketUseCaseMock.reserve.mockRejectedValue(new Error('No available seats for this function'));

        const handler = reserveTicket(ticketUseCaseMock);
        await handler(req, res);

        expect(ticketUseCaseMock.reserve).toHaveBeenCalledWith({
            functionId: req.body.functionId,
            buyer: req.body.buyer,
        });

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ error: 'No available seats for this function' });
    });
});