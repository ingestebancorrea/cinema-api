const express = require('express');
const { createFunction,getFunctionAvailability } = require('../controllers/function.controller');

const router = express.Router();

router.post('/', createFunction);
router.get('/:id/availability', getFunctionAvailability);

module.exports = router;