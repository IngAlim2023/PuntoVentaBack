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
appBackend.use(morgan("dev"));
appBackend.use(express.json());

appBackend.use("/api/v1/productos", productoRoute);
appBackend.use("/api/v1/ventas", ventaRoute);
appBackend.use("/api/v1/usuarios", usuarioRoute);
// Sirve la carpeta de imágenes
appBackend.use("/uploads", express.static(uploadsPath));

appBackend.set("port", process.env.PORT || port);
