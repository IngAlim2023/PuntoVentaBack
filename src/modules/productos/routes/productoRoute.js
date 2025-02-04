import { controller } from "../controller/productoController.js";
import express from "express";
import { upload } from "../../../middlewares/multerConfig.js";
import { deletePhoto } from "../../../middlewares/deletePhoto.js";

const router = express.Router()

router.get('/productos', controller.getProductsC);
router.post('/crearProducto', upload.single("foto"), controller.createProductC);
router.delete('/eliminarProducto/:id', deletePhoto, controller.deleteProductC);
router.get('/verProducto/:id', controller.getProductsByIdC);
router.put('/editarProducto/:id', upload.single("foto"), deletePhoto, controller.updateProductC);

export default router;