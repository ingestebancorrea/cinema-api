const TicketUseCase = require('./ticket.usecase');

describe('TicketUseCase', () => {
    let ticketUseCase;
    let ticketRepositoryMock;
    let functionRepositoryMock;

    beforeEach(() => {
        ticketRepositoryMock = {
            create: jest.fn(),
        };

        functionRepositoryMock = {
            findById: jest.fn(),
            update: jest.fn(),
            transaction: jest.fn((callback) => callback({})),
        };

        ticketUseCase = new TicketUseCase(ticketRepositoryMock, functionRepositoryMock);
    });

    it('should reserve a ticket successfully', async () => {
        const functionId = 1;
        const buyer = 'test@example.com';
        const func = { id: functionId, availableCapacity: 10 };

        functionRepositoryMock.findById.mockResolvedValue(func);
        ticketRepositoryMock.create.mockResolvedValue({ id: 1, functionId, buyer, status: 'reserved' });

        const result = await ticketUseCase.reserve({ functionId, buyer });

        expect(functionRepositoryMock.findById).toHaveBeenCalledWith(functionId, { transaction: {} });
        expect(ticketRepositoryMock.create).toHaveBeenCalledWith(
            { functionId, buyer, status: 'reserved' },
            { transaction: {} }
        );
        expect(functionRepositoryMock.update).toHaveBeenCalledWith(
            func.id,
            { availableCapacity: 9 },
            { transaction: {} }
        );
        expect(result).toEqual({ id: 1, functionId, buyer, status: 'reserved' });
    });

    it('should throw an error if the function is not found', async () => {
        const functionId = 1;
        const buyer = 'test@example.com';

        functionRepositoryMock.findById.mockResolvedValue(null);

        await expect(ticketUseCase.reserve({ functionId, buyer })).rejects.toThrow('Function not found');

        expect(functionRepositoryMock.findById).toHaveBeenCalledWith(functionId, { transaction: {} });
        expect(ticketRepositoryMock.create).not.toHaveBeenCalled();
        expect(functionRepositoryMock.update).not.toHaveBeenCalled();
    });

    it('should throw an error if there are no available seats', async () => {
        const functionId = 1;
        const buyer = 'test@example.com';
        const func = { id: functionId, availableCapacity: 0 };

        functionRepositoryMock.findById.mockResolvedValue(func);

        await expect(ticketUseCase.reserve({ functionId, buyer })).rejects.toThrow('No available seats for this function');

        expect(functionRepositoryMock.findById).toHaveBeenCalledWith(functionId, { transaction: {} });
        expect(ticketRepositoryMock.create).not.toHaveBeenCalled();
        expect(functionRepositoryMock.update).not.toHaveBeenCalled();
    });
});