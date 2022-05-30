const {Router}=require('express');
const {body, query} = require('express-validator');


const controladorEmpleado = require('../controladores/controladorEmpleado');
const rutas = Router();
rutas.get('/listar', controladorEmpleado.Listar);

rutas.post('/guardar',
body ('identidad')
.notEmpty().withMessage('Debe enviar la identidad del empleado')
.isLength({min:8}).withMessage('La identidad del empleado debe tener al menos 8 caracteres'),
body ('nombre')
.notEmpty().withMessage('Debe enviar el nombre del empleado')
.isLength({min:3}).withMessage('El nombre del empleado debe tener al menos 3 caracteres'),
body ('apellido')
.notEmpty().withMessage('Debe enviar el apellido del empleado')
.isLength({min:3}).withMessage('El apellido del empleado debe tener al menos 3 caracteres'),
body ('cargo_id')
.notEmpty().withMessage('Debe enviar el cargo del empleado')
.isInt().withMessage('El cargo del empleado debe ser un numero entero'),
body ('salario')
.notEmpty().withMessage('Debe enviar el salario del empleado')
.isNumeric().withMessage('El salario del empleado debe ser un numero entero'),

controladorEmpleado.Guardar);

rutas.put('/editar',
query('id')
.notEmpty().withMessage('El ID del empleado no puede estar vacio')
.isInt().withMessage('El ID del empleado debe ser un numero entero'),

body ('identidad')
.notEmpty().withMessage('Debe enviar la identidad del empleado')
.isLength({min:8}).withMessage('La identidad del empleado debe tener al menos 8 caracteres'),
body ('nombre')
.notEmpty().withMessage('Debe enviar el nombre del empleado')
.isLength({min:3}).withMessage('El nombre del empleado debe tener al menos 3 caracteres'),
body ('apellido')
.notEmpty().withMessage('Debe enviar el apellido del empleado')
.isLength({min:3}).withMessage('El apellido del empleado debe tener al menos 3 caracteres'),
body ('cargo_id')
.notEmpty().withMessage('Debe enviar el cargo del empleado')
.isInt().withMessage('El cargo del empleado debe ser un numero entero'),
body ('salario')
.notEmpty().withMessage('Debe enviar el salario del empleado')
.isNumeric().withMessage('El salario del empleado debe ser un numero entero'),

controladorEmpleado.Editar);

//*Delete
rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('El ID del empleado no puede estar vacio')
.isInt().withMessage('El ID del empleado debe ser un numero entero'),
controladorEmpleado.Eliminar);

module.exports = rutas;