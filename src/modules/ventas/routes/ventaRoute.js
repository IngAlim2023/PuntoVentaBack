import express from "express";
import { controller } from "../controller/ventaController.js";

const router = express.Router();

router.post('/crearVenta', controller.createVentaC);
router.get('/verVentas', controller.getSaleC);
router.get('/verVentaId/:id', controller.getSaleByIdC);
router.get('/verVenta/:id', controller.getSaleByIdOnlyC);
router.delete('/eliminarVenta/:id', controller.deleteSaleC);

export default router;