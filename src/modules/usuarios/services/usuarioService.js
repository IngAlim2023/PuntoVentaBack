import { Usuario, cargos, tipoDocumento } from "../models/usuarioModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function createEmployee(usuarioData) {
  const findEmployee = await Usuario.findUserByEmail(usuarioData.email);
  if (findEmployee) {
    throw new Error("Ya existe un empleado con ese correo");
  }
  const fieldsUsuario = [
    "nombre",
    "apellido",
    "email",
    "direccion",
    "numero_documento",
    "telefono",
    "fecha_nacimiento",
    "tipoDocumento_idtipoDocumento",
    "cargo_idcargo",
    "fecha_contratacion",
    "password",
  ];

  for (const i of fieldsUsuario) {
    if (!usuarioData[i]) {
      throw new Error(`El campo ${i} es requerido`);
    }
  }
  try {
    const newEmployee = await Usuario.createEmployee(usuarioData);
    return newEmployee;
  } catch (e) {
    console.error("Error al crear al crear el Empleado", e.message);
    throw new Error("No se pudo crear el empleado. Intente de nuevo");
  }
}
async function createCustomer(usuarioData) {
  const findEmployee = await Usuario.findUserByEmail(usuarioData.email);
  if (findEmployee) {
    throw new Error("Ya existe un usuario con ese correo");
  }
  const fieldsUsuario = [
    "nombre",
    "apellido",
    "email",
    "direccion",
    "numero_documento",
    "telefono",
    "fecha_nacimiento",
    "tipoDocumento_idtipoDocumento",
    "password",
  ];

  for (const i of fieldsUsuario) {
    if (!usuarioData[i]) {
      throw new Error(`El campo ${i} es requerido`);
    }
  }
  try {
    const newEmployee = await Usuario.createCustomer(usuarioData);
    return newEmployee;
  } catch (e) {
    console.error("Error al crear al crear el usuario", e.message);
    throw new Error("No se pudo crear el usuario. Intente de nuevo");
  }
}
async function getEmployees() {
  try {
    const employees = await Usuario.finAllEmployees();
    return employees;
  } catch (e) {
    console.error("Error al obtener los empleados", e.message);
    throw new Error("Error al obtener los empleados");
  }
}
async function getCustomers() {
  try {
    const customers = await Usuario.findAllCustomers();
    return customers;
  } catch (e) {
    console.error("Error al obtener los empleados", e.message);
    throw new Error("Error al obtener los empleados");
  }
}
async function getCargos() {
  try {
    return await cargos();
  } catch (e) {
    console.error("Error al obtener los cargos", e.message);
    throw new Error("Error al obtener los cargos");
  }
}
async function getDocumentos() {
  try {
    return await tipoDocumento();
  } catch (e) {
    console.error("Error al obtener los documentos", e.message);
    throw new Error("Error al obtener los documentos");
  }
}
async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son requeridos" });
  }
  try {
    const user = await Usuario.findUserByEmail(email);
    const validPW = await bcrypt.compare(password, user.password);
    if (!user) {
      return res.status(404).json({ error: "Credenciales invalidas" });
    }
    if (!validPW) {
      return res.status(401).json({ error: "Datos incorrectos" });
    } else {
      const token = await createToken(user);
      res.cookie("token", token, {
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 60 * 1000,
      });
      res.json({
        success: "Inicio de sesión correcto.",
        userid: user.idusuario,
      });
    }
  } catch (e) {
    console.error("Error:", e);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
async function createToken(user) {
  const { idusuario, nombre, email } = user;
  const payload = {
    idusuario: idusuario,
    nombre,
    email,
  };
  const secret = process.env.JWT_PRIVATE;
  if (!secret) {
    throw new Error("No se puede generar el token");
  }
  const options = { expiresIn: "30m" };
  const token = jwt.sign(payload, secret, options);
  return token;
}
async function userLogout(req, res) {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
}
async function verifyToken(req, res) {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "Sin Autorización." });
  jwt.verify(token, process.env.JWT_PRIVATE, async (err, usuario) => {
    if (err) return res.status(403).json({ message: "Token invalido" });
    const userValid = await Usuario.findUserByEmail(usuario.email);
    if (!userValid) {
      return res.status(404).json({ message: "No Autorizado" });
    }
    return res.json({ userId: userValid.idusuario });
  });
}

async function findEmployer(id) {
  try {
    const employe = await Usuario.findEmployerById(id);
    return employe;
  } catch (e) {
    console.error("Error al obtener el empleado", e.message);
    throw new Error("Error al obtener el empleado");
  }
}
export {
  createEmployee,
  createCustomer,
  getEmployees,
  getCustomers,
  getCargos,
  getDocumentos,
  userLogin,
  userLogout,
  verifyToken,
  findEmployer

};
