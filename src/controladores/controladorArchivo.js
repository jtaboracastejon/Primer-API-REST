const fs = require('fs'); //File System
const path = require('path'); //Path
const Empleado = require('../modelos/modeloEmpleado'); //Empleado

exports.Recibir = async (req, res) => {
    console.log(req.file);
    res.send('Archivo guardado')
}