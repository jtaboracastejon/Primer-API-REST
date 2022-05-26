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