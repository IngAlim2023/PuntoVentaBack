import { Producto } from "../models/productoModel.js";

async function createProduct(productoData) {
  const fieldsProduct = [
    "codBarras",
    "descripcion",
    "foto",
    "precio_venta",
    "stock",
    "ubicacion",
  ];

  for (const field of fieldsProduct) {
    if (!productoData[field]) {
      throw new Error(`El campo ${field} es obligatorio`);
    }
  }
  try {
    const newProduct = await Producto.create(productoData);
    return newProduct;
  } catch (e) {
    console.error("Error al crear el producto", e.message);
    throw new Error("No se pudo crear el producto. Intente de nuevo");
  }
}
async function getProductById(id) {
  try {
    return await Producto.findProductById(id);
  } catch (e) {
    console.error("Error al buscar el producto", e.message);
    throw new Error("No se pudo obtener el producto. Intente de nuevo");
  }
}
async function getProducts() {
  try {
    return await Producto.findAll();
  } catch (e) {
    console.error("Error al buscar los productos", e.message);
    throw new Error("No se pudo obtener los productos. Intente de nuevo");
  }
}

async function deleteProduct(id) {
  try {
    return await Producto.delete(id);
  } catch (e) {
    console.error("Error al eliminar el producto", e.message);
    throw new Error("No se pudo eliminar el producto. Intente de nuevo");
  }
}

async function updateProduct(id, productoData) {
  const fieldsProduct = [
    "codBarras",
    "descripcion",
    "foto",
    "precio_venta",
    "stock",
    "ubicacion",
  ];
  for (const field of fieldsProduct) {
    if (!productoData[field]) {
      throw new Error(`El campo ${field} es obligatorio`);
    }
  }
  try {
    return await Producto.update(id, productoData);
  } catch (e) {
    console.error("Error al actualizar el producto", e.message);
    throw new Error("No se pudo actualizar el producto. Intente de nuevo");
  }
}

export { createProduct, getProducts, deleteProduct, getProductById, updateProduct };
