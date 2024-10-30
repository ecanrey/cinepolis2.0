const env = require('./env.js'); // Importa las variables de entorno
const Sequelize = require('sequelize');

// Crear instancia de Sequelize con los parámetros de conexión
const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Acepta certificados no verificados (útil para Render)
        }
    },
    pool: {
        max: env.pool.max,      // Número máximo de conexiones en el pool
        min: env.pool.min,      // Número mínimo de conexiones en el pool
        acquire: env.pool.acquire, // Tiempo máximo de adquisición de conexión en ms
        idle: env.pool.idle     // Tiempo máximo de inactividad antes de liberar una conexión
    }
});

const db = {}; // Objeto para almacenar las conexiones y modelos

db.Sequelize = Sequelize;
db.sequelize = sequelize;

try {
    // Verificar la conexión a la base de datos
    sequelize.authenticate()
        .then(() => {
            console.log('Conexión a la base de datos establecida correctamente.');
        })
        .catch(error => {
            console.error('No se pudo conectar a la base de datos:', error);
        });
} catch (error) {
    console.error('Error al inicializar la conexión:', error);
}

// Importa el modelo de usuario y añade al objeto db
db.User = require('../models/user.model.js')(sequelize, Sequelize);
db.Ticket = require('../models/ticket.model.js')(sequelize, Sequelize);

module.exports = db;
