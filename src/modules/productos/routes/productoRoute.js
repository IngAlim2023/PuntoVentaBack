import { controller } from "../controller/productoController.js";
import express from "express";
import { upload } from "../../../middlewares/multerConfig.js";
import { deletePhoto } from "../../../middlewares/deletePhoto.js";
import { getSesion } from "../../../middlewares/middlewareSesion.js";


const router = express.Router()

router.get('/productos', controller.getProductsC);
router.post('/crearProducto', getSesion, upload.single("foto"), controller.createProductC);
router.delete('/eliminarProducto/:id', getSesion, deletePhoto, controller.deleteProductC);
router.get('/verProducto/:id', getSesion, controller.getProductsByIdC);
router.put('/editarProducto/:id', getSesion, upload.single("foto"), deletePhoto, controller.updateProductC);

export default router;