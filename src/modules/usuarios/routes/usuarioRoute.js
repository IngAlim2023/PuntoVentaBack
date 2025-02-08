import { controller } from "../controller/usuarioController.js";
import express from  "express";
import { getSesion } from "../../../middlewares/middlewareSesion.js";

const router = express.Router();

router.post('/crearEmpleado', getSesion, controller.createEmployeeC);
router.post('/crearCliente', getSesion, controller.createCustomerC)
//Prueba para rutas protegidas y usuario de la sesion:
router.get('/verEmpleados', getSesion, controller.getEmployeesC);
router.get('/verClientes', getSesion, controller.getCustomersC);
router.get('/verCargos', getSesion, controller.getCargosC);
router.get('/verDocumentos', getSesion, controller.getDocumentosC);
router.post('/Login', controller.userLoginC);
router.post('/Logout', controller.userLogoutC);
router.get('/verifyToken', controller.verififyTokenC);
router.get('/empleadoId/:id', controller.getEmployerByIDC);


export default router;