import { pool } from "../../../config/database.js";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcrypt";

const Usuario = {
  findAll: async function () {
    const sql = `SELECT * from usuarios`;
    return await pool.query(sql);
  },
  createEmployee: async function (usuarioData) {
    const sql = `INSERT INTO usuarios(idusuario, nombre, apellido, email, direccion, numero_documento, telefono, fecha_nacimiento,tipoDocumento_idtipoDocumento, password) VALUES(?,?,?,?,?,?,?,?,?,?)`;

    const id = uuidv4();
    const hashedPassword = await hash(usuarioData.password, 10);
    await pool.query(sql, [
      id,
      usuarioData.nombre,
      usuarioData.apellido,
      usuarioData.email,
      usuarioData.direccion,
      usuarioData.numero_documento,
      usuarioData.telefono,
      usuarioData.fecha_nacimiento,
      usuarioData.tipoDocumento_idtipoDocumento,
      hashedPassword
    ]);

    const idEmployed = uuidv4();

    const sqlEmployed = `INSERT INTO empleados(idEmpleado, fecha_contratacion, usuarios_idusuario, cargo_idcargo) VALUES(?,?,?,?)`;
    return await pool.query(sqlEmployed, [
      idEmployed,
      usuarioData.fecha_contratacion,
      id,
      usuarioData.cargo_idcargo,
    ]);
  },
  findUserByEmail: async function (email) {
    const sql = `SELECT * FROM usuarios WHERE email = ?`;
    const [row] = await pool.query(sql, [email]);
    return row[0];
  },
  findEmployerById: async function (id) {
    const sql = `SELECT * FROM empleados WHERE usuarios_idusuario = ?`;
    const [row] = await pool.query(sql, [id]);
    return row[0];
  },
  finAllEmployees: async function () {
    const sql = `SELECT
      empleados.idEmpleado,
      empleados.fecha_contratacion,
      empleados.cargo_idcargo,
      empleados.usuarios_idusuario,
      usuarios.nombre,
      usuarios.apellido,
      usuarios.email,
      usuarios.direccion,
      usuarios.numero_documento,
      usuarios.telefono,
      usuarios.fecha_nacimiento
    FROM empleados
    INNER JOIN usuarios 
      ON empleados.usuarios_idusuario = usuarios.idusuario
    `;
    const [rows] = await pool.query(sql);
    return rows;
  },
  createCustomer: async function (customerData) {
    const sql = `INSERT INTO usuarios(idusuario, nombre, apellido, email, direccion, numero_documento, telefono, fecha_nacimiento,tipoDocumento_idtipoDocumento, password) VALUES(?,?,?,?,?,?,?,?,?,?)`;

    const id = uuidv4();
    const pWHash = await hash(customerData.password, 10);

    await pool.query(sql, [
      id,
      customerData.nombre,
      customerData.apellido,
      customerData.email,
      customerData.direccion,
      customerData.numero_documento,
      customerData.telefono,
      customerData.fecha_nacimiento,
      customerData.tipoDocumento_idtipoDocumento,
      pWHash
    ]);

    const idCustomer = uuidv4();
    const fechaRegistro = new Date().toISOString().split("T")[0];

    const sqlEmployed = `INSERT INTO cliente(idcliente, fecha_registro, usuarios_idusuario) VALUES(?,?,?)`;
    return await pool.query(sqlEmployed, [
      idCustomer,
      fechaRegistro,
      id,
    ]);
  },
  findAllCustomers: async function () {
    const sql = `SELECT
      cliente.idcliente,
      cliente.fecha_registro,
      cliente.usuarios_idusuario,
      usuarios.nombre,
      usuarios.apellido,
      usuarios.email,
      usuarios.direccion,
      usuarios.numero_documento,
      usuarios.telefono,
      usuarios.fecha_nacimiento
    FROM cliente
    INNER JOIN usuarios 
      ON cliente.usuarios_idusuario = usuarios.idusuario
    `;
    const [rows] = await pool.query(sql);
    return rows;
  }
};
async function cargos() {
  const sql = `SELECT * FROM cargos`;
  return await pool.query(sql);
}

async function tipoDocumento() {
  const sql = `SELECT * FROM tipodocumento`;
  return await pool.query(sql);
}

export { Usuario, cargos, tipoDocumento };
