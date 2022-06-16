const {Router}=require('express');
const {body, query} = require('express-validator');

const controladorAutenticacion = require('../controladores/controladorAutenticacion');
const rutas = Router();

rutas.post('/recuperar', 
body ('correo')
.notEmpty().withMessage('Debe enviar el correo electronico')
.isEmail().withMessage('El correo electronico debe ser valido'),
controladorAutenticacion.RecuperarContrasena);

module.exports = rutas;