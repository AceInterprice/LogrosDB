// import nodemailer from "nodemailer";
/*
// queda al pendiente terminar esta funcion y pruebas de envio del correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendResetEmail(email, token) {

  const resetLink = `http://localhost:3000/reset-password?token=${token}`; // por cambiar a la url de produccion

  await transporter.sendMail({
    from: `"Soporte" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Recuperar contraseña",
    html: `
      <h2>Recuperación de contraseña</h2>
      <p>Haz clic en el siguiente enlace:</p>
      <a href="${resetLink}">Restablecer contraseña</a>
      <p>Este enlace expira en 1 hora.</p>
    `
  });
}
  */
 //Con Resend
 import { Resend } from 'resend';

// Usamos la llave que guardamos en el .env
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendResetEmail(email, code) {
  try {
    await resend.emails.send({
      from: 'Soporte <onboarding@resend.dev>',
      to: [email],
      subject: 'Tu código de recuperación',
      html: `
        <div style="font-family: sans-serif; text-align: center; border: 1px solid #eee; padding: 20px;">
          <h2>Código de Verificación</h2>
          <p>Tu código para restablecer la contraseña es:</p>
          <h1 style="letter-spacing: 5px; color: #000; font-size: 40px;">${code}</h1>
          <p>Este código expira en 15 minutos.</p>
        </div>
      `,
    });
  } catch (error) {
    throw new Error("Error al enviar el email");
  }
}