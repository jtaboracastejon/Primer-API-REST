const nodemailer = require('nodemailer');
exports.RecuperarContrasena = async (data) => {
    const configurarCorreo ={
        from: process.env.APP_CORREO, //Quien envia
        to: data.correo, //A quien se le envia
        subject:'Recuperar Contraseña', //Asunto
        text: 'pin temporal: '+ data.pin, //Texto
    };
    const transporte = nodemailer.createTransport({//Configruacion del servidor de correo
        host: process.env.CORREO_HOST,//Servidor del correo
        port: process.env.CORREO_PORT,//Puerto del correo
        secure: true,//Si usa conexion ssl
        auth: {//Credenciales para autenticacion
            user: process.env.APP_CORREO,//Correo electronico
            pass: process.env.APP_PASS//Contraseña
        }
        
    });
    await transporte.verify(async function (error, success) {/*Verifica si el servidor de correo esta disponible*/
        if (error) {
            console.log(error);
            return false;
        }else{
            console.log('El servidor puede enviar correos');
        }
    })
    return await transporte.sendMail(configurarCorreo);//Envia el correo

}
