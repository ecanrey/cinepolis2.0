const db = require('../config/db.config'); // Asegúrate de importar el db
const Ticket = db.Ticket;

exports.createTicket = async (req, res) => {
    try {
        const { nombre_pelicula, numero_ticket, asientos_seleccionados, fecha_compra, hora_compra } = req.body;

        // Validar que no falten campos
        if (!nombre_pelicula || !numero_ticket || !asientos_seleccionados || !fecha_compra || !hora_compra) {
            return res.status(400).json({ message: "Todos los campos son obligatorios." });
        }

        // Crear el nuevo ticket en la base de datos
        const ticket = await Ticket.create({
            nombre_pelicula,
            numero_ticket,
            asientos_seleccionados,
            fecha_compra,
            hora_compra,
        });

        res.status(201).json({
            message: "Ticket creado exitosamente",
            ticket, // Puedes devolver el ticket creado
        });
    } catch (error) {
        console.error("Error al crear el ticket:", error);
        res.status(500).json({ message: "Error al crear el ticket", error: error.message || error });
    }
};
