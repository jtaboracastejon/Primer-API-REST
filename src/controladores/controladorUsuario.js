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
        const {login,id_empleado, contrasena,AccesoTotal,habilitado,pin,fallidos,estado,correo} = req.body;
        try {
            var uniqueLogin = await modeloUsuario.findOne({
                where: {
                    LoginUsuario: login
                }
            });
            var uniqueMail = await modeloUsuario.findOne({
                where: {
                    correo: correo
                }
            })
            var uniqueEmpleado = await modeloUsuario.findOne({
                where: {
                    empleado: id_empleado
                }
            })
            if(uniqueLogin){
                msj.mensaje = 'ERROR: El login ya existe';
            }else if(uniqueEmpleado){
                msj.mensaje = 'ERROR: El id Empleado ya esta asignado a otro usuario';
            }else if(uniqueMail){
                msj.mensaje = 'ERROR: El correo ya existe';
            }else{
                await modeloUsuario.create({
                    LoginUsuario: login,
                    empleado: id_empleado,
                    contrasena: contrasena,
                    AccesoTotal: AccesoTotal,
                    Habilitado: habilitado,
                    pin: pin,
                    fallidos: fallidos,
                    correo: correo,
                    estado:estado
                })
                msj.mensaje = 'Usuario guardado correctamente';
            }

            
        } catch (error) {
            msj.mensaje = error;
        }
    }
    res.json(msj.mensaje);
}

exports.Editar = async (req, res) => {
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
        const {id} = req.query;
        const {login,id_empleado, contrasena,AccesoTotal,habilitado,pin,fallidos,estado,correo} = req.body;
        try {
            var buscarUsuario = await modeloUsuario.findOne({
                where: {
                    id: id
                }
            });
            
            var uniqueLogin = await modeloUsuario.findOne({
                where: {
                    LoginUsuario: login
                }
            });
            var uniqueMail = await modeloUsuario.findOne({
                where: {
                    correo: correo
                }
            })
            var uniqueEmpleado = await modeloUsuario.findOne({
                where: {
                    empleado: id_empleado
                }
            })
            
            if(!buscarUsuario){
                msj.mensaje = 'No se ha encontrado un usuario con el ID ' + id;
            }else if(uniqueLogin && buscarUsuario.LoginUsuario != login){
                msj.mensaje = 'ERROR: El login ya existe'; 
            }else if(uniqueMail && buscarUsuario.correo != correo){
                msj.mensaje = 'ERROR: El correo ya existe';
            }else if(uniqueEmpleado && buscarUsuario.empleado != id_empleado){
                msj.mensaje = 'ERROR: El id Empleado ya esta asignado a otro usuario';

            }else{
                buscarUsuario.LoginUsuario = login;
                buscarUsuario.empleado = id_empleado;
                buscarUsuario.contrasena = contrasena;
                buscarUsuario.AccesoTotal = AccesoTotal;
                buscarUsuario.Habilitado = habilitado;
                buscarUsuario.pin = pin;
                buscarUsuario.fallidos = fallidos;
                buscarUsuario.correo = correo;
                buscarUsuario.estado = estado;
                await buscarUsuario.save();

                
                msj.mensaje = 'Usuario actualizado correctamente';
            }
        } catch (error) {
            msj.mensaje = error;
        }
    }
    res.json(msj.mensaje);
}

exports.Eliminar = async (req, res) => {
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
        const {id} = req.query;
        try { 
            var buscarUsuario = await modeloUsuario.findOne({
                where: {
                    id: id
                }
            });       
            if(!buscarUsuario){
                msj.mensaje = 'No se ha encontrado un usuario con el ID ' + id;
            }
            else{
                await buscarUsuario.destroy({
                    where: {
                        id: id
                    }
                });
                msj.mensaje = 'Usuario eliminado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al borrar el usuario';
        }
    }
    res.json(msj.mensaje);
}