import { pool } from "../../../config/database.js";
import { v4 as uuidv4 } from "uuid";

export const Venta = {
  findAll: async function () {
    const sql = `SELECT 
            ventas.idVenta,
            ventas.total,
            ventas.created,
            ventas.updated,
            ventas.Empleados_idEmpleado,
            ventas.cliente_idcliente,
            detalleventa.idDetalleVenta,
            detalleventa.cantidad,
            detalleventa.subtotal,
            detalleventa.Productos_idPrd,
            detalleventa.created AS detalleCreated,
            detalleventa.updated AS detalleUpdated
        FROM ventas
        INNER JOIN detalleventa 
            ON ventas.idVenta = detalleventa.Ventas_idVenta`;
    const [rows] = await pool.query(sql);
    return rows; // Devolver todas las filas
  },
  create: async function (ventaData) {
    const idVenta = uuidv4();

    // Insertar en la tabla `ventas`
    const ventaSql = "INSERT INTO ventas (idVenta, total, Empleados_idEmpleado, cliente_idcliente) VALUES (?,?,?,?)";
    await pool.query(ventaSql, [idVenta, ventaData.total, ventaData.Empleados_idEmpleado, ventaData.cliente_idcliente]);

    const detalleVenta =
      "INSERT INTO detalleventa (cantidad, subtotal, Productos_idPrd, Ventas_idVenta) VALUES(?,?,?,?)";

    for (const producto of ventaData.productos) {
      await pool.query(detalleVenta, [
        producto.cantidad,
        producto.subtotal,
        producto.Productos_idPrd,
        idVenta,
      ]);
    }
    return { idVenta, message: "Venta registrada con éxito" };
  },
  findById: async function (id) {
    const sql = `SELECT 
            ventas.idVenta,
            ventas.total,
            ventas.created,
            ventas.updated,
            ventas.Empleados_idEmpleado,
            ventas.cliente_idcliente,
            detalleventa.idDetalleVenta,
            detalleventa.cantidad,
            detalleventa.subtotal,
            detalleventa.Productos_idPrd,
            detalleventa.created AS detalleCreated,
            detalleventa.updated AS detalleUpdated
        FROM ventas
        INNER JOIN detalleventa 
            ON ventas.idVenta = detalleventa.Ventas_idVenta
        WHERE ventas.idVenta = ?`;

    const [rows] = await pool.query(sql, [id]);
    return rows;
   },
   findByIdOnly: async function (id) {
    const sql = `SELECT * FROM ventas WHERE idVenta = ?`;
    const [rows] = await pool.query(sql, [id]);
    return rows;
   },
   delete: async function (id) {
    // Eliminar primero los detalles de la venta
    const deleteDetallesSql = "DELETE FROM detalleventa WHERE Ventas_idVenta = ?";
    await pool.query(deleteDetallesSql, [id]);
    
    // Luego eliminar la venta
    const deleteVentaSql = "DELETE FROM ventas WHERE idVenta = ?";
    await pool.query(deleteVentaSql, [id]);

    return { id, message: "Venta y detalles eliminados con éxito" };
   }
};
