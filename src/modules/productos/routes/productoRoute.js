import { controller } from "../controller/productoController.js";
import express from "express";
import { upload } from "../../../middlewares/multerConfig.js";

const router = express.Router()

router.get('/productos', controller.getProductsC);
router.post('/crearProducto', upload.single("foto"), controller.createProductC);

export default router;