const {validationResult} = require('express-validator');
const modeloUsuario = require('../modelos/modeloUsuario');

exports.Listar = async(req, res) => {
    try {
        const lista = await modeloUsuario.findAll();
        console.log(lista);
        res.json(lista);
    } catch (error) {
        console.error(error);
        res.json(error);
    }
}

exports.Guardar = async (req, res) => {
    const validaciones = validationResult(req);
    console.log(validaciones.errors);
    const msj = {
        mensaje: ''
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(error => {
            msj.mensaje += error.msg + '. ';
        });
    }else{
        const {login,id_empleado, contrasena,AccesoTotal,correo} = req.body;
        try {
            await modeloUsuario.create({
                LoginUsuario: login,
                empleado: id_empleado,
                contrasena: contrasena,
                AccesoTotal: AccesoTotal,
                correo: correo,
            })
            msj.mensaje = 'Empleado guardado correctamente';
        } catch (error) {
            msj.mensaje = error;
        }
    }
    res.json(msj.mensaje);
}