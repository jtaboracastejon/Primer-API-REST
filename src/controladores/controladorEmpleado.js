const {validationResult} = require('express-validator');
const Cargo = require('../modelos/modeloCargo');
const modeloEmpleado = require('../modelos/modeloEmpleado');
const {Op} = require('sequelize');
exports.Listar = async(req, res) => {
    try {
        const lista = await modeloEmpleado.findAll(
            {
                attributes:['nombre','apellido'],
                include: {
                    model:Cargo,
                    attributes:['nombre']
                },
                where: {
                    nombre:{[Op.like]:'R%'}
                    /* [Op.and]:[

                        {salario: {[Op.gte]: 4000}},
                        {salario: {[Op.lte]: 10000}}
                    ] */
                    
                }
            }
        );
        console.log(JSON.stringify(lista,null,2));
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
        const {identidad,nombre,apellido,cargo_id,fechaingreso,salario,imagen} = req.body;
        try {
            await modeloEmpleado.create({
                identidad: identidad,
                nombre: nombre,
                apellido: apellido,
                cargo_id: cargo_id,
                fechaingreso: fechaingreso,
                salario: salario,
                imagen: imagen
            })
            msj.mensaje = 'Empleado guardado correctamente';
        } catch (error) {
            msj.mensaje = 'Error al guardar el empleado';
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
        const {identidad,nombre,apellido,cargo_id,fechaingreso,salario,imagen} = req.body;
        
        try {
            var buscarEmpleado = await modeloEmpleado.findOne({
                where: {
                    id: id
                }
            });       
            if(!buscarEmpleado){
                msj.mensaje = 'No se ha encontrado un empleado con el ID ' + id;
            }
            else{
                buscarEmpleado.identidad = identidad;
                buscarEmpleado.nombre = nombre;
                buscarEmpleado.apellido = apellido;
                buscarEmpleado.cargo_id = cargo_id;
                buscarEmpleado.fechaingreso = fechaingreso;
                buscarEmpleado.salario = salario;
                buscarEmpleado.imagen = imagen;
                await buscarEmpleado.save();

                
                msj.mensaje = 'Empleado actualizado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al editar el empleado';
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
            var buscarEmpleado = await modeloEmpleado.findOne({
                where: {
                    id: id
                }
            });       
            if(!buscarEmpleado){
                msj.mensaje = 'No se ha encontrado un empleado con el ID ' + id;
            }
            else{
                await buscarEmpleado.destroy({
                    where: {
                        id: id
                    }
                });
                msj.mensaje = 'Empleado eliminado correctamente';
            }
        } catch (error) {
            msj.mensaje = 'Error al borrar el empleado';
        }
    }
    res.json(msj.mensaje);
}
