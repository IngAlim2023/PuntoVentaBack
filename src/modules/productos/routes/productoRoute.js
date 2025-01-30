import { controller } from "../controller/productoController.js";
import express from "express";
import { upload } from "../../../middlewares/multerConfig.js";

const router = express.Router()

router.get('/productos', controller.getProductsC);
router.post('/crearProducto', upload.single("foto"), controller.createProductC);
router.delete('/eliminarProducto/:id', controller.deleteProductC);
router.get('/verProducto/:id', controller.getProductsByIdC);

export default router;