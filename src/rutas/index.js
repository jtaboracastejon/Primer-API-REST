const {Router}=require('express');
const controladorInicio = require('../controladores/controladorinicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);
rutas.get('/otra', controladorInicio.Otra);
module.exports = rutas;