exports.Inicio = (req, res) => {
    const listaModulos=[
        {modulo:"empleados",ruta:"/api/empleados"},
        {modulo:"clientes",ruta:"/api/clientes"},
    ]

    const msj = {
        api:"API-SIGRES",
        descripcion:"Interfaz de programacion para el sistema de gestion de restaurantes",
        propietario : "Caste",
        desarollador : "Javier Castejon",
        colaboradores:"",
        listaModulos,
    };
    res.json(msj);
}


exports.EjemploPost = (req, res) => {
    // const {usuario, contrasena} = req.body;
    const usuario2 = req.body.usuario;
    const contrasena2 = req.body.contrasena;
    console.log(usuario2);
    console.log(contrasena2);

    const msj = {
        mensaje: 'Ninguno'
    };

    if(!usuario2 || !contrasena2){
        msj.mensaje='Debe enviar los datos completos';
    }else{
        msj.mensaje='Peticion procesada correctamente';
    }

    res.json(msj.mensaje);
}
exports.EjemploPut = (req, res) => {
    console.log(req)
    const {id}=req.query;
    // const {usuario, contrasena} = req.body;
    const usuario2 = req.body.usuario;
    const contrasena2 = req.body.contrasena;
    console.log(id);
    console.log(usuario2);
    console.log(contrasena2);

    const msj = {
        mensaje: 'Ninguno'
    };

    if(!usuario2 || !contrasena2){
        msj.mensaje='Debe enviar los datos completos';
    }else{
        msj.mensaje='Peticion procesada correctamente';
    }

    res.json(msj.mensaje);
}
