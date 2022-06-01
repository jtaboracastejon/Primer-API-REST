const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('port',3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

/* app.get('/', (req, res)=>{
    res.send('Hello World');
}); 
*Lo pasamos al directorio de rutas*/ 
app.use('/api',require('./rutas'));
app.use('/api/cargos',require('./rutas/rutasCargos'));
app.use('/api/empleados',require('./rutas/rutasEmpleados'));
app.use('/api/usuarios',require('./rutas/rutasUsuarios'));

app.listen(app.get('port'),()=>{
    console.log("servidor iniciado en el puerto " + app.get('port'));
});