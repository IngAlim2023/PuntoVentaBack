import path from "path";
import fs from "fs/promises";  // Importamos fs/promises
import { pool } from "../config/database.js";

export const deletePhoto = async (req, res, next) => {
  try {
    const id = req.params.id;
    const uploadDir = "./src/uploads";
    
    const [producto] = await pool.query(
      "SELECT foto FROM productos WHERE idPrd = ?",
      [id]
    );

    if (producto.length === 0 || !producto[0].foto) {
      return res.status(404).json({ message: "Foto no encontrada" });
    }

    const imgPath = path.join(uploadDir, producto[0].foto);

    try {
      await fs.unlink(imgPath);  // Eliminamos la imagen de forma asíncrona
    } catch (err) {
      if (err.code !== "ENOENT") {  // Ignoramos si la imagen no existe
        console.error("Error al eliminar la foto:", err);
        return res.status(500).json({ message: "Error al eliminar la foto" });
      }
    }

    next();
  } catch (error) {
    console.error("Error en deletePhoto:", error);
    res.status(500).json({ message: "Error en la eliminación de la foto" });
  }
};
