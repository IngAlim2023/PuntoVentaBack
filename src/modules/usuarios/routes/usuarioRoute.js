import { controller } from "../controller/usuarioController.js";
import express from  "express";

const router = express.Router();

router.post('/crearEmpleado', controller.createEmployeeC);
router.post('/crearCliente', controller.createCustomerC)
router.get('/verEmpleados', controller.getEmployeesC);
router.get('/verClientes', controller.getCustomersC);
router.get('/verCargos', controller.getCargosC);
router.get('/verDocumentos', controller.getDocumentosC);
router.post('/Login', controller.userLoginC);
router.post('/Logout', controller.userLogoutC);
router.get('/verifyToken', controller.verififyTokenC);
router.get('/empleadoId/:id', controller.getEmployerByIDC);


export default router;