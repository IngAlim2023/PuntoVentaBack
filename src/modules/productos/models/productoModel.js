import { pool } from "../../../config/database.js";
import path from "path";
import fs from "fs";

export const Producto = {
  findAll: async function () {
    return await pool.query("SELECT * FROM productos");
  },
  create: async function (productoData) {
    const sql =
      "INSERT INTO productos (codBarras, descripcion, foto, precio_venta, stock, ubicacion) VALUES (?,?,?,?,?,?)";
    return await pool.query(sql, [
      productoData.codBarras,
      productoData.descripcion,
      productoData.foto,
      productoData.precio_venta,
      productoData.stock,
      productoData.ubicacion,
    ]);
  },
  findProductById: async function (productoData) {
    const sql = "SELECT * FROM productos WHERE idPrd = ?";
    const [rows] = await pool.query(sql, [productoData.idPrd]);
    return rows[0];
  },
  findProductByCodBarras: async function (productoData) {
    const sql = "SELECT * FROM productos WHERE codBarras = ?";
    const [rows] = await pool.query(sql, [productoData.codBarras]);
    return rows[0];
  },
  delete: async function (id) {
    const uploadDir = "./src/uploads";
    const [producto] = await pool.query(
      "SELECT foto FROM productos WHERE idPrd = ?",
      [id]
    );

    const imgPath = path.join(uploadDir, producto[0].foto);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }

    const sql = "DELETE FROM productos WHERE idPrd = ?";
    return await pool.query(sql, [id]);
  },
  update: async function (id, productoData) {
    const uploadDir = "./src/uploads";
    const [producto] = await pool.query(
      "SELECT foto FROM productos WHERE idPrd = ?",
      [id]
    );

    const imgPath = path.join(uploadDir, producto[0].foto);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
    const sql = "UPDATE productos SET codBarras = ?, descripcion= ?, foto = ?, precio_venta = ?, stock = ?, ubicacion = ? WHERE idPrd = ?";
  }
};
