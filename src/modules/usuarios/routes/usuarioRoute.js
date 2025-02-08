import { controller } from "../controller/usuarioController.js";
import express from  "express";
import { getSesion } from "../../../middlewares/middlewarePrueba.js";

const router = express.Router();

router.post('/crearEmpleado', controller.createEmployeeC);
router.post('/crearCliente', controller.createCustomerC)
//Prueba para rutas protegidas y usuario de la sesion:
router.get('/verEmpleados', getSesion, controller.getEmployeesC);
router.get('/verClientes', getSesion, controller.getCustomersC);
router.get('/verCargos', controller.getCargosC);
router.get('/verDocumentos', controller.getDocumentosC);
router.post('/Login', controller.userLoginC);
router.post('/Logout', controller.userLogoutC);
router.get('/verifyToken', controller.verififyTokenC);
router.get('/empleadoId/:id', controller.getEmployerByIDC);


export default router;