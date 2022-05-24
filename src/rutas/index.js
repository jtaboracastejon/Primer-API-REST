const {Router}=require('express');
const controladorInicio = require('../controladores/controladorinicio');
const rutas = Router();
rutas.get('/', controladorInicio.Inicio);
rutas.post('/',controladorInicio.EjemploPost);
rutas.put('/',controladorInicio.EjemploPut);

module.exports = rutas;