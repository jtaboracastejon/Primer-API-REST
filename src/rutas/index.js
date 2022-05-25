const {Router}=require('express');
const {body, query} = require('express-validator');

const controladorInicio = require('../controladores/controladorinicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);


rutas.post('/',
body ('usuario')
.notEmpty().withMessage('Debe enviar el usuario')
.isLength({min:3}).withMessage('El usuario debe tener al menos 3 caracteres')
,
body ('contrasena')
.notEmpty().withMessage('Debe enviar la contraseña')
.isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres')
,

controladorInicio.EjemploPost);


rutas.put('/',
query('id')
.notEmpty().withMessage('El ID del Usuario no puede estar vacio')
.isInt().withMessage('El ID del Usuario debe ser un numero entero'),

body ('usuario')
.notEmpty().withMessage('Debe enviar el usuario')
.isLength({min:3}).withMessage('El usuario debe tener al menos 3 caracteres')
,
body ('contrasena')
.notEmpty().withMessage('Debe enviar la contraseña')
.isLength({min:6}).withMessage('La contraseña debe tener al menos 6 caracteres')
,
controladorInicio.EjemploPut);

//* Delete
rutas.delete('/',
query('id')
.notEmpty().withMessage('El ID del Usuario no puede estar vacio')
.isInt().withMessage('El ID del Usuario debe ser un numero entero'),
controladorInicio.EjemploDelete);

module.exports = rutas;