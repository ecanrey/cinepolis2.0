// server.js
require('dotenv').config(); // Cargar variables de entorno
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db.config'); // Conexión con la base de datos
const userController = require('./controllers/user.controller'); // Importa el controlador
const ticketRoutes = require('./routers/ticket.routes'); // Importa las rutas de tickets
const Stripe = require('stripe');

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Usa la clave secreta desde .env
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Habilitar body-parser para recibir JSON
app.use(express.json());

// Rutas de usuarios
app.post('/register', userController.registerUser);
app.post('/authenticate', userController.authenticateUser);

// Ruta para el intent de pago
app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, // Stripe espera el monto en centavos
            currency: 'usd', // Cambia a tu moneda preferida
        });

        res.send({ clientSecret: paymentIntent.client_secret }); // Devuelve el client_secret
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Rutas de tickets
app.use(ticketRoutes); // Usar las rutas de tickets

// Sincroniza la base de datos y levanta el servidor
db.sequelize.sync()
    .then(() => {
        console.log("La base de datos está sincronizada.");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al sincronizar la base de datos:", error);
    });
