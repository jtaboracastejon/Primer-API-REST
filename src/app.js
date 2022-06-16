const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
//Ojo antes de iniciar el server
const app = express();
app.set('port',3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/img/',express.static(path.join(__dirname,'public/img')))

/* app.get('/', (req, res)=>{
    res.send('Hello World');
}); 
*Lo pasamos al directorio de rutas*/ 
/* app.use('/api',(req, res)=>{
    const msj ={
        autor: 'Javier',
        version: '1.0.0'
    }
    res.send(msj);
});  */

app.use('/api/cargos',require('./rutas/rutasCargos'));
app.use('/api/empleados',require('./rutas/rutasEmpleados'));
app.use('/api/usuarios',require('./rutas/rutasUsuarios'));

app.use('/api/archivos',require('./rutas/rutasArchivos'));
app.use('/api/autenticacion',require('./rutas/rutasAutenticacion'));

app.listen(app.get('port'),()=>{
    console.log("servidor iniciado en el puerto " + app.get('port'));
});