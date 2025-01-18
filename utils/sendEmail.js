const nodemailer = require('nodemailer');
const options = {
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
}
const sendEmail = (to, subject, message) => {
    console.log(to, subject, message);
    const transporter = nodemailer.createTransport({
        host: options.host, // El host SMTP de tu proveedor
        port: options.port, // El puerto SMTP (generalmente 587 o 465)
        secure: false, // true para 465, false para otros puertos
        auth: {
            user: options.user, // Tu usuario
            pass: options.pass // Tu contraseña
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: options.user,
        to: [to, 'programacion2ais@dispostable.com'],
        subject: subject,
        html: message
    };

    try{
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error al enviar el correo:', error);
                throw new Error(error);
            }
        });
    }catch(e){
        console.log(e);
        return e;
    }
}

module.exports = sendEmail;