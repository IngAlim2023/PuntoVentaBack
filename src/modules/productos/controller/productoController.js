import { createProduct, getProducts, deleteProduct } from "../services/productoService.js";
import { Producto } from "../models/productoModel.js";
import ResponseStructure from "../../../helpers/ResponseStructure.js";

export const controller = {};

controller.createProductC = async (req, res, next) => {
  try {
    const productoData = req.body;
    const productoExists = await Producto.findProductByCodBarras(productoData);

    // Adjuntar el nombre del archivo si se subió
    if (req.file) {
      productoData.foto = req.file.filename;
    } else {
      return res
        .status(400)
        .json(ResponseStructure.error("La imagen es obligatoria.", 400));
    }

    if (productoExists) {
      return res
        .status(400)
        .json(
          ResponseStructure.error("El producto ya existe en el sistema.", 400)
        );
    }

    const newProduct = await createProduct(productoData);
    return res
      .status(201)
      .json(
        ResponseStructure.success(newProduct, "Producto creado con éxito.")
      );
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};

controller.getProductsC = async (req, res, next) => {
  try {
    const productos = await getProducts();
    return res.status(200).json(ResponseStructure.success(productos, 200));
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};
controller.deleteProductC = async (req, res, next) => {
  try {
    const id = req.params.id;
    const productoObject = {
      idPrd: id
    }
    const findProduct = await Producto.findProductById(productoObject);
    if (!findProduct) {
      return res.status(404).json(ResponseStructure.error("Producto no encontrado.", 404));
    }
    const producto = await deleteProduct(id);
    return res
      .status(200)
      .json(
        ResponseStructure.success(producto, "Producto eliminado con éxito.")
      );
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};
