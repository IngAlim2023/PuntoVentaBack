import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import productoRoute from "../modules/productos/routes/productoRoute.js";
import ventaRoute from "../modules/ventas/routes/ventaRoute.js";
import usuarioRoute from "../modules/usuarios/routes/usuarioRoute.js";

//prueba validacion usuario:
import jwt from "jsonwebtoken";

dotenv.config({ path: "./src/.env" });
export const appBackend = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.join(__dirname, "../uploads");

const corsOptions = {
  origin: ["http://localhost:5173", process.env.URL_API],
  credentials: true,
};

const port = 3000;

appBackend.disable("x-powered-by");
appBackend.use(cookieParser());
appBackend.use(cors(corsOptions));
appBackend.use(morgan("combined"));
appBackend.use(express.json());

//Bloqueoe de ips:
appBackend.use((req, res, next)=>{
  const bloqIp =['43.134.40.201', '43.134.124.54', '43.134.116.36']
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if(bloqIp.includes(clientIp)){
    return res.status(403).send('Acceso denegado.');
  }
  next();
})

//Atrapar ips con el middleware prueba:
appBackend.use((req, res, next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`Request from IP: ${clientIp}`);
  next();
});

//Prueba para validacion de usuario y rutas protegidas:
appBackend.use((req, res, next)=>{
  const {token} = req.cookies;
  let data = null;
  req.session = {user:null};
  try{
    data = jwt.verify(token, process.env.JWT_PRIVATE);
    req.session.user = data;
  }catch{}
  next();
})

appBackend.use("/api/v1/productos", productoRoute);
appBackend.use("/api/v1/ventas", ventaRoute);
appBackend.use("/api/v1/usuarios", usuarioRoute);
// Sirve la carpeta de imágenes
appBackend.use("/uploads", express.static(uploadsPath));

appBackend.set("port", process.env.PORT || port);
