// models/ticket.model.js
module.exports = (sequelize, DataTypes) => {
    const Ticket = sequelize.define('Ticket', {
        nombre_pelicula: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        numero_ticket: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        asientos_seleccionados: {
            type: DataTypes.STRING, // Se puede almacenar como una cadena, ej: "0-0, 0-1"
            allowNull: false,
        },
        fecha_compra: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        hora_compra: {
            type: DataTypes.TIME,
            allowNull: false,
        },
    }, {
        // Opciones del modelo
        timestamps: true, // Esto habilita los campos createdAt y updatedAt
    });

    return Ticket;
};
