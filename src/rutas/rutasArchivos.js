const {Router}=require('express');
const path = require('path');
const multer = require('multer');


const controladorArchivo = require('../controladores/controladorArchivo');

const storageEmpleados = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../public/img/empleados'));
    },
    filename: function(req,file,cb){
        const nombreArchivo = Date.now()+'-'+Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + nombreArchivo + file.mimetype.replace('/','.'));
    }
    
})
console.log('storage')
const uploadEmpleado = multer({storage: storageEmpleados});


const rutas = Router();
rutas.post('/empleados/img', uploadEmpleado.single('img'), controladorArchivo.Recibir);

module.exports = rutas;