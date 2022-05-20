exports.Inicio = (req, res) => {
    const listaModulos=[
        {modulo:"empleados",ruta:"/api/empleados"},
        {modulo:"clientes",ruta:"/api/clientes"},
    ]

    const msj = {
        api:"API-SIGRES",
        descripcion:"INterfas de programacion para el sistema de gestion de restaurantes",
        propietario : "Caste",
        desarollador : "Javier Castejon",
        colaboradores:"",
        listaModulos,
    };
    res.json(msj);
}
exports.Otra = (req, res) => {
    res.send('otra ruta');
}