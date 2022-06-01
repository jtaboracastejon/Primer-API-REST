const {DataTypes}=require('sequelize')
const db = require('../configuraciones/db')
const bcrypt = require('bcrypt')

const Usuario = db.define(
    'Usuario',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        LoginUsuario: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        empleado: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        contrasena: {
            type: DataTypes.STRING(250),
            allowNull: false
        },
        AccesoTotal:{
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        Habilitado:{
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        pin:{
            type: DataTypes.STRING(4),
            allowNull: true
        },
        fallidos:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        correo:{
            type: DataTypes.STRING(250),
            allowNull: false
        },
        estado: {
            type: DataTypes.ENUM('BL','AC','IN'),
            allowNull: true
        }
    },
    {
        tableName:'usuarios',
        timestamps: false,
        hooks:{
            beforeCreate:(usuario)=>{
                const hash = bcrypt.hashSync(usuario.contrasena,10);
                usuario.contrasena = hash;
                
            },
            beforeUpdate:(usuario)=>{
                const hash = bcrypt.hashSync(usuario.contrasena,10);
                usuario.contrasena = hash;
            }
        }
    }
);

Usuario.prototype.verficarContrasena = (con,com)=>{
    return bcrypt.compareSync(con,com);
};
module.exports = Usuario;