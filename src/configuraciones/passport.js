const passport = require('passport')
const Usuario = require('../modelos/modeloUsuario')
const estrategiaJWT = require('passport-jwt').Strategy
const extraerJWT = require('passport-jwt').ExtractJwt
const JWT = require('jsonwebtoken');
const moment = require('moment')
const expiracion = moment.duration(50, 'm').asSeconds()
const claveToken = 'MiClaveSegura'


exports.getToken = (data)=>{
    return JWT.sign(data, claveToken,{expiresIn: expiracion})
}
const opciones ={
    jwtFromRequest: extraerJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: claveToken
}
passport.use(new estrategiaJWT(opciones, async (payload, done)=>{
    return await Usuario.findOne({
        where: {
            id: payload.id,
            Habilitado: true,
            estado: 'AC'
        } 
    })
    .then((data)=>{
        return done(null, data.id)
    })
    .catch((err)=>{
        console.log(err)
        return done(null, false)
    })
}))

exports.ValidarAutenticacion = passport.authenticate('jwt', {session: false, failureRedirect:'/api/autenticacion/error'})