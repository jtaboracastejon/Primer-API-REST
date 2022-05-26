const sequelize = require('sequelize');
const db = new sequelize(
    /* Documentacion
        Base de Datos
        nombre de usuario
        contraseña */

    'movil1',
    'programovil2',
    'javiercastejon',
    {
        host: 'localhost',
        dialect: 'mysql', //Indicamos el gestor de base de datos al que se va a conectar
        port: 3306,
    }
);
module.exports = db;