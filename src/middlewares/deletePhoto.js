import path from "path";
import fs from "fs";
import { pool } from "../config/database.js";

export const deletePhoto = async (req, res, next) => {
  const id = req.params.id;
  const uploadDir = "./src/uploads";
  const [producto] = await pool.query(
    "SELECT foto FROM productos WHERE idPrd = ?",
    [id]
  );

  const imgPath = path.join(uploadDir, producto[0].foto);
  if (fs.existsSync(imgPath)) {
    fs.unlinkSync(imgPath);
  };
  next();
};
