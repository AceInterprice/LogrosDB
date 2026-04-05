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