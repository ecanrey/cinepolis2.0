const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Ruta para registrar un nuevo usuario (POST)
router.post('/register', userController.registerUser);

// Ruta para autenticar un usuario (POST)
router.post('/authenticate', userController.authenticateUser);

module.exports = router;