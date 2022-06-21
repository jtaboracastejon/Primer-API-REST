const {validationResult} = require('express-validator');
const MSJ = require('../componentes/mensajes')
const Usuario = require('../modelos/modeloUsuario');
const EnviarCorreo = require('../configuraciones/correo');
const gpc = require('generate-pincode')

const {Op} = require('sequelize');

function validar(req){
    const validaciones = validationResult(req);
    var errores = [];
    var error = {
        mensaje: '',
        parametro: '',
    }
    var msj = {
        estado: 'correcto',
        mensaje: '',
        datos: '',
        errores: '',
    };
    if (validaciones.errors.length > 0) {
        validaciones.errors.forEach(element => {
            error.mensaje = element.msg
            error.parametro = element.param
            errores.push(error)
        });
        msj.estado = 'precaucion';
        msj.mensaje = 'La Peticion no se ejecuto';
        msj.errores = errores;
    }
    return msj;
}

exports.RecuperarContrasena = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        try {
            const {correo} = req.body;
            const buscarUsuario = await Usuario.findOne({
                where: {
                    correo: correo,
                }
            })
            if(!buscarUsuario){         

                msj.estado = 'error';
                msj.mensaje = 'No se encontro un usuario con ese correo';
                msj.errores = {
                    mensaje: 'No se encontro un usuario con ese correo',
                    parametro: 'correo',
                };
                MSJ(res,500,msj)

            }else{
                const pin = gpc(4);
                buscarUsuario.pin = pin;
                await buscarUsuario.save();
                const data = {
                    correo: correo,
                    pin: pin,
                }
                EnviarCorreo.RecuperarContrasena(data);
                msj.estado = 'correcto';
                msj.mensaje = 'La peticion fue ejecutada correctamente';
                msj.errores = '';
                MSJ(res,200,msj);
                console.log(pin)
            }
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            MSJ(res,500,error)
        }
    }
} 

exports.IniciarSesion = async (req, res) => {
    const msj = validar(req);
    if(msj.errores.length > 0){
        MSJ(res,200,msj);
    }else{
        try {
            const {usuario} = req.body;
            const buscarUsuario = await Usuario.findOne({
                where: {
                    [Op.or]:[
                        {correo: usuario},
                        {LoginUsuario: usuario}
                    ],
                    [Op.and]: {
                        Habilitado: true,
                        estado: 'AC'
                    }
                }
            })
            if(!buscarUsuario){         

                msj.estado = 'error';
                msj.mensaje = 'No se encontro un usuario con ese correo';
                msj.errores = {
                    mensaje: 'No se encontro un usuario con ese correo',
                    parametro: 'correo',
                };
                MSJ(res,500,msj)

            }else{
                const pin = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
                buscarUsuario.pin = pin;
                await buscarUsuario.save();
                const data = {
                    correo: correo,
                    pin: pin,
                }
                EnviarCorreo.RecuperarContrasena(data);
                msj.estado = 'correcto';
                msj.mensaje = 'La peticion fue ejecutada correctamente';
                msj.errores = '';
                MSJ(res,200,msj);
                console.log(pin)
            }
        } catch (error) {
            msj.estado = 'error';
            msj.mensaje = 'La Peticion no se ejecuto';
            msj.errores = error;
            MSJ(res,500,error)
        }
    }
}