const {DataTypes}=require('sequelize')
const db = require('../configuraciones/db')
const Cargo = require('../modelos/modeloCargo')

const Empleado = db.define(
    'Empleado',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        identidad: {
            type: DataTypes.STRING(15),
            allowNull: false
        },
        nombre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        apellido: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        cargo_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },        
        fechaingreso: {
            type: DataTypes.DATE,
            allowNull: true
        },        
        salario: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },     
        imagen: {
            type: DataTypes.STRING(250),
            allowNull: false
        }
    },
    {
        tableName:'empleados',
        timestamps: false
    }
);
Cargo.hasMany(Empleado,{
    foreignKey: 'cargo_id',
    otherKey: 'id'
});
Empleado.belongsTo(Cargo,{
    foreignKey: 'cargo_id',
    otherKey: 'id'
});
module.exports = Empleado;