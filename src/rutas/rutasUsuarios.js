const {Router}=require('express');
const {body, query} = require('express-validator');


const controladorUsuario = require('../controladores/controladorUsuario');
const rutas = Router();
rutas.get('/listar', controladorUsuario.Listar);

rutas.post('/guardar',
body('login')
.notEmpty().withMessage('Debe enviar el login del usuario')
.isLength({min:3}).withMessage('El login del usuario debe tener al menos 3 caracteres'),
body('contrasena')
.notEmpty().withMessage('Debe enviar la contrasena del usuario')
.isLength({min:6}).withMessage('La contrasena del usuario debe tener al menos 6 caracteres'),
body('id_empleado')
.notEmpty().withMessage('Debe enviar el id del empleado')
.isInt().withMessage('El id del empleado debe ser un numero entero'),
body('correo')
.notEmpty().withMessage('Debe enviar el correo del usuario')
.isEmail().withMessage('El correo del usuario debe ser un correo valido'),
controladorUsuario.Guardar)

rutas.put('/editar',

query('id')
.notEmpty().withMessage('El ID del usuario no puede estar vacio')
.isInt().withMessage('El ID del usuario debe ser un numero entero'),

body('login')
.notEmpty().withMessage('Debe enviar el login del usuario')
.isLength({min:3}).withMessage('El login del usuario debe tener al menos 3 caracteres'),
body('contrasena')
.notEmpty().withMessage('Debe enviar la contrasena del usuario')
.isLength({min:6}).withMessage('La contrasena del usuario debe tener al menos 6 caracteres'),
body('id_empleado')
.notEmpty().withMessage('Debe enviar el id del empleado')
.isInt().withMessage('El id del empleado debe ser un numero entero'),
body('correo')
.notEmpty().withMessage('Debe enviar el correo del usuario')
.isEmail().withMessage('El correo del usuario debe ser un correo valido'),
controladorUsuario.Editar)

//*Delete
rutas.delete('/eliminar',
query('id')
.notEmpty().withMessage('El ID del usuario no puede estar vacio')
.isInt().withMessage('El ID del usuario debe ser un numero entero'),
controladorUsuario.Eliminar);


module.exports = rutas;