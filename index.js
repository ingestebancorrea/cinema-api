const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const movieRouter = require('./src/infrastructure/routes/movie.routes');
const functionRouter = require('./src/infrastructure/routes/function.routes');
const ticketRouter = require('./src/infrastructure/routes/ticket.routes');
const sequelize = require('./src/infrastructure/database/sequelize');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/movies', movieRouter);
app.use('/api/functions', functionRouter);
app.use('/api/tickets', ticketRouter);

// Database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
})();

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});