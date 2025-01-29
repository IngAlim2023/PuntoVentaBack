import ResponseStructure from "../../../helpers/ResponseStructure.js";
import {
  createEmployee,
  createCustomer,
  getCargos,
  getDocumentos,
  getEmployees,
  getCustomers,
  userLogin,
  userLogout,
  verifyToken,
  findEmployer
} from "../services/usuarioService.js";

export const controller = {};

controller.createEmployeeC = async (req, res, next) => {
  try {
    const usuarioData = req.body;
    const newEmployee = await createEmployee(usuarioData);
    return res
      .status(201)
      .json(
        ResponseStructure.success(
          newEmployee,
          "Empleado creado satisfactoriamente."
        )
      );
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};
controller.createCustomerC = async (req, res, next) => {
  try {
    const usuarioData = req.body;
    const newEmployee = await createCustomer(usuarioData);
    return res
      .status(201)
      .json(
        ResponseStructure.success(
          newEmployee,
          "Empleado creado satisfactoriamente."
        )
      );
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};

controller.getEmployeesC = async (req, res, next) => {
  try {
    const employes = await getEmployees();
    return res
      .status(200)
      .json(ResponseStructure.success(employes, "Cargos obtenidos"));
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};

controller.getCustomersC = async (req, res, next) => {
  try {
    const customers = await getCustomers();
    return res
      .status(200)
      .json(ResponseStructure.success(customers, "Cargos obtenidos"));
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};

controller.getCargosC = async (req, res, next) => {
  try {
    const cargos = await getCargos();
    return res
      .status(200)
      .json(ResponseStructure.success(cargos, "Cargos obtenidos"));
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};

controller.getDocumentosC = async (req, res, next) => {
  try {
    const documentos = await getDocumentos();
    return res
      .status(200)
      .json(ResponseStructure.success(documentos, "Documentos obtenidos"));
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};

controller.userLoginC = async (req, res, next) => {
  try {
    await userLogin(req, res);
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};
controller.userLogoutC = async (req, res) => {
  try {
    await userLogout(req, res);
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};
controller.verififyTokenC = async (req, res) => {
  try {
    await verifyToken(req, res);
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};
controller.getEmployerByIDC = async (req, res) => {
  try {
    const { id } = req.params;
    const employer = await findEmployer(id);
    return res
      .status(200)
      .json(ResponseStructure.success(employer, "Empleado obtenido"));
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};
