import config from "../DB/ConfigDB.js";
import {pool} from "../DB/ConexionDB.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
//import { sendResetEmail } from "../Utils/mailer.Util.js";

const JWT_TOKEN = config.jwtSecret;

export async function register({names, first_last_name, second_last_name, email, password, role}) {
  
  console.log({names, first_last_name, second_last_name, email, password, role});

  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (!email || !emailRegex.test(email)) {
    throw new Error("Formato de email inválido");   
  }

  if (!password || password.length < 6) {
    throw new Error("La contraseña debe tener mínimo 6 caracteres");
  }

  const [Existe] = await pool.query(
    "SELECT id FROM users WHERE email = ? LIMIT 1", 
    [email]);

  if (Existe.length > 0){
    throw new Error("El email ya esta registrado");
  }

  const hashPassword = await bcrypt.hash(password, 10); 

  try{
    const [result] = await pool.query(
        "INSERT INTO users (names, first_last_name, second_last_name, email, password) VALUES(?,?,?,?,?)",
        [names, first_last_name, second_last_name, email, hashPassword, role]
    )

    return {
        id: result.insertId, 
        names,
        first_last_name, 
        second_last_name, 
        email, 
        role: role || "USER"
    }

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("El email ya existe");
    }
    throw error;
  }
}

export async function login({email, password}) {

    if(!email){
        throw new Error("Ingrese su email")
    }

    if(!password){
        throw new Error("Ingrese su contraseña")
    }

   let query = `
    SELECT id, names, first_last_name, second_last_name, email, password, role 
    FROM users 
    WHERE email = ? 
    LIMIT 1
  `;
    const [row] = await pool.query(query, [email]);

    if (row.length === 0){
        throw new Error("Sin credenciales validas")
    }

    const user = row[0];

    const passwordMatch = await bcrypt.compare(password, user.password); 

    if(!passwordMatch){
        throw new Error("Credenciales invalidas")
    }

    const token = jwt.sign(
        {
            id: user.id, 
            email: user.email, 
            role: user.role
        }, 
        JWT_TOKEN, 
        {expiresIn: "1h"}

    ); 

    return{
        token, 
        user: {
            id: user.id, 
            names: user.names, 
            first_last_name: user.first_last_name, 
            second_last_name: user.second_last_name, 
            email: user.email, 
            role: user.role
        }
    } 
}

//pendiente a revicion
/*
export async function forgotPassword(email){
    if(!email){
      throw new Error("Se necesita un email para restablecer la contraseña");
    }

    const [rows] = await pool.query(
      `
      SELECT id FROM users WHERE email = ? LIMIT 1
      `,
      email
    ); 

    if(rows.length === 0){
      throw new Error("Si el correo existe, se enviaran instrucciones");
    }

    const token = crypto.randomBytes(32).toString("hex"); 
    const expires = new Date(Date.now() + 60 * 60 * 1000); 

    await pool.query(
    `UPDATE users 
     SET reset_token = ?, reset_token_expires = ?
     WHERE email = ?`,
    [token, expires, email]
    );

    await sendResetEmail(email, token);

  return {
    message: "Si el correo existe, se enviaron instrucciones",
    token
  };

}
*/
