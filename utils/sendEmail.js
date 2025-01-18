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
        host: options.host,
        port: options.port,
        auth: {
            user: options.user,
            pass: options.pass
        }
    });

    const mailOptions = {
        from: 'gaby0406@gmail.com',
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