const {Router}=require('express');
const {body, query} = require('express-validator');

const controladorCargos = require('../controladores/controladorCargos');
const rutas = Router();



rutas.get('/listar', controladorCargos.Listar);



rutas.post('/guardar',
body ('nombre')
.notEmpty().withMessage('Debe enviar el nombre del cargo')
.isLength({min:3}).withMessage('El nombre del cargo debe tener al menos 3 caracteres'),
controladorCargos.Guardar);


rutas.put('/editar',
query('id')
.notEmpty().withMessage('El ID del cargo no puede estar vacio')
.isInt().withMessage('El ID del cargo debe ser un numero entero'),

body ('nombre')
.notEmpty().withMessage('Debe enviar el nombre del cargo')
.isLength({min:3}).withMessage('El nombre del cargo debe tener al menos 3 caracteres'),
controladorCargos.Editar);

//*Delete
rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('El ID del cargo no puede estar vacio')
.isInt().withMessage('El ID del cargo debe ser un numero entero'),
controladorCargos.Eliminar);

module.exports = rutas;