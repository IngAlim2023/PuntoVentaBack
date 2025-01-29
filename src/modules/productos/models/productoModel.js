import { pool } from "../../../config/database.js";

export const Producto = {
    findAll: async function () {
        return await pool.query("SELECT * FROM productos");
    },
    create: async function (productoData) {
        const sql = "INSERT INTO productos (codBarras, descripcion, foto, precio_venta, stock, ubicacion) VALUES (?,?,?,?,?,?)";
        return await pool.query(sql, [
            productoData.codBarras,
            productoData.descripcion,
            productoData.foto,
            productoData.precio_venta,
            productoData.stock,
            productoData.ubicacion
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
    }
}