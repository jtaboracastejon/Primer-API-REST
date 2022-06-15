const fs = require('fs'); //File System
const path = require('path'); //Path
const Empleado = require('../modelos/modeloEmpleado'); //Empleado
const msj = require('../componentes/mensajes'); //

exports.Recibir = async (req, res) => {
    const {filename} = req.file;
    const {id} = req.body;
    try {
        var buscarEmpleado = await modeloEmpleado.findOne({
            where: {
                id: id
            }
        })
        if(!buscarEmpleado){
            const buscarImagen = fs.existsSync(path.join(__dirname,'../public/img/empleados/'+filename));
            if(buscarImagen){
                
            } 
        }
    } catch (error) {
        
    }

    console.log(req.file);
    res.send('Archivo guardado')
}