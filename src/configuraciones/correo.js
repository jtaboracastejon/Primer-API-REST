const nodemailer = require('nodemailer');
exports.RecuperarContrasena = async (data) => {
    const configurarCorreo ={
        from: 'jr_taborac@unicah.edu', //Quien envia
        to: data.correo, //A quien se le envia
        subject:'Recuperar Contraseña', //Asunto
        text: 'pin temporal: '+ data.pin, //Texto
    };
    const transporte = nodemailer.createTransport({//Configruacion del servidor de correo
        host: 'smtp.gmail.com',//Servidor del correo
        port: 465,//Puerto del correo
        secure: true,//Si usa conexion ssl
        auth: {//Credenciales para autenticacion
            user: 'jr_taborac@unicah.edu',//Correo electronico
            pass: 'javiercastejon'//Contraseña
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