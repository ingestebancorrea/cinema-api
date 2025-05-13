class TicketUseCase {
    constructor(ticketRepository, functionRepository) {
        this.ticketRepository = ticketRepository;
        this.functionRepository = functionRepository;
    }

    async reserve({ functionId, buyer }) {
        // Inicia una transacción para evitar condiciones de carrera
        return await this.functionRepository.transaction(async (transaction) => {
            const func = await this.functionRepository.findById(functionId, { transaction });
            if (!func) {
                throw new Error('Function not found');
            }

            if (func.availableCapacity <= 0) {
                throw new Error('No available seats for this function');
            }

            // Crear la reserva
            const ticket = await this.ticketRepository.create({
                functionId,
                buyer,
                status: 'reserved',
            }, { transaction });


            func.availableCapacity -= 1;
            await this.functionRepository.update(func.id, { availableCapacity: func.availableCapacity }, { transaction });

            return ticket;
        });
    }
}

module.exports = TicketUseCase;