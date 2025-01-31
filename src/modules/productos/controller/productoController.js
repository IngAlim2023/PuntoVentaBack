import {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../services/productoService.js";
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
controller.getProductsByIdC = async (req, res, next) => {
  const id = req.params.id;
  const productoObject = {
    idPrd: id,
  };
  try {
    const productos = await getProductById(productoObject);
    return res.status(200).json(ResponseStructure.success(productos, 200));
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
  const id = req.params.id;
  const productoObject = {
    idPrd: id,
  };
  const findProduct = await Producto.findProductById(productoObject);
  if (!findProduct) {
    return res
      .status(404)
      .json(ResponseStructure.error("Producto no encontrado.", 404));
  }
  try {
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
controller.updateProductC = async (req, res, next) => {
  const id = req.params.id;
  const productoData = req.body;
  const productoExists = await Producto.findProductByCodBarras(productoData);

  //validacion que el producto existe:
  const productoObject = {
    idPrd: id,
  };
  const findProduct = await Producto.findProductById(productoObject);
  if (!findProduct) {
    return res
      .status(404)
      .json(ResponseStructure.error("Producto no encontrado.", 404));
  }
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
        ResponseStructure.error("El codigo de barras ya esta siendo utilizado.", 400)
      );
  }
  try {
    const producto = await updateProduct(id, productoData);
    return res
      .status(201)
      .json(
        ResponseStructure.success(producto, "Producto actualizado con éxito.")
      );
  } catch (e) {
    return res.status(500).json(ResponseStructure.error(e.message, 500));
  }
};
