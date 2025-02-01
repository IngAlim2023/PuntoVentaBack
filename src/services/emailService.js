import nodemailer from "nodemailer";
import { pool } from "../config/database.js";


export const sendMailNode = async (req, res, next) => {
    const sql = "SELECT * FROM productos WHERE stock < 4"
    const [result] = await pool.query(sql)
    console.log(result[0]);
    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //       user: process.env.CORREO_APP,
    //       pass: process.env.PASSWORD_APP,
    //     },
    //   });
      
    //   const mailOptions = {
    //     from: process.env.CORREO_APP,
    //     to: "enrique.porras@udea.edu.co",
    //     subject: "Prueba de correo electronico",
    //     text: "Hola, estoy haciendo pruebas con nodemailer, Gracias :P",
    //   };
      
    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       return console.log(error);
    //     }
    //     console.log("Correo enviado: " + info.response);
    //   });

      next();
      
}

