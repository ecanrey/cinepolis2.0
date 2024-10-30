/*// routers/ticket.routes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

router.post('/api/tickets', ticketController.createTicket);

module.exports = router;*/

// routers/ticket.routes.js
const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticket.controller');

// Ruta para crear un nuevo ticket
router.post('/', ticketController.createTicket);

module.exports = router;
