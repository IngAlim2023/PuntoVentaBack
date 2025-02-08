import express from "express";
import { controller } from "../controller/ventaController.js";
import { getSesion } from "../../../middlewares/middlewareSesion.js";

const router = express.Router();

router.post('/crearVenta', getSesion, controller.createVentaC);
router.get('/verVentas', getSesion, controller.getSaleC);
router.get('/verVentaId/:id', getSesion, controller.getSaleByIdC);
router.get('/verVenta/:id', getSesion, controller.getSaleByIdOnlyC);
router.delete('/eliminarVenta/:id', getSesion, controller.deleteSaleC);

export default router;