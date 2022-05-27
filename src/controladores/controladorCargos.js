const {validationResult} = require('express-validator');
const modeloCargo = require('../modelos/modeloCargo');

exports.Listar = async(req, res) => {
    try {
        const lista = await modeloCargo.findAll();
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
        const {nombre, descripcion} = req.body;
        try {            
            await modeloCargo.create({
                nombre: nombre,
                descripcion: descripcion
            });
            msj.mensaje = 'Cargo guardado correctamente';
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
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
        const {nombre, descripcion} = req.body;
        try { 
            var buscarCargo = await modeloCargo.findOne({
                where: {
                    id: id
                }
            });       
            if(!buscarCargo){
                msj.mensaje = 'No se ha encontrado un cargo con el ID ' + id;
            }
            else{
                buscarCargo.nombre = nombre;
                buscarCargo.descripcion = descripcion;
                await buscarCargo.save();

                
                msj.mensaje = 'Cargo actualizado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al guardar los datos';
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
            var buscarCargo = await modeloCargo.findOne({
                where: {
                    id: id
                }
            });       
            if(!buscarCargo){
                msj.mensaje = 'No se ha encontrado un cargo con el ID ' + id;
            }
            else{
                await buscarCargo.destroy({
                    where: {
                        id: id
                    }
                });
                msj.mensaje = 'Cargo eliminado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al borrar el cargo';
        }
    }
    res.json(msj.mensaje);
}