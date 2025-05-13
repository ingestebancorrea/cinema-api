const reserveTicket = (ticketUseCaseInstance) => async (req, res) => {
    try {
        const { functionId, buyer } = req.body;

        const ticket = await ticketUseCaseInstance.reserve({ functionId, buyer });

        res.status(201).json(ticket);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
};

module.exports = { reserveTicket };