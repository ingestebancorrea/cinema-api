const express = require('express');
const { reserveTicket } = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/reserve', reserveTicket);

module.exports = router;