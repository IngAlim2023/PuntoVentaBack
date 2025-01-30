import { Venta } from "../models/ventaModel.js";

async function createVenta(ventaData, empleado) {
  const fieldsSale = ["total", "Empleados_idEmpleado", "cliente_idcliente"];

  const fieldsProduct = ["cantidad", "subtotal", "Productos_idPrd"];

  for (const field of fieldsSale) {
    if (!ventaData[field]) {
      throw new Error(`Falta el campo ${field} en la venta`);
    }
  }
  // Validar que hay productos y que cada producto tiene los campos necesarios
  if (!Array.isArray(ventaData.productos) || ventaData.productos.length === 0) {
    throw new Error("No se han proporcionado productos para la venta");
  }

  ventaData.productos.forEach((producto, index) => {
    for (const field of fieldsProduct) {
      if (!producto[field]) {
        throw new Error(`Falta el campo ${field} en el producto ${index + 1}`);
      }
    }
  });
  try {
    const newVenta = await Venta.create(ventaData, empleado);
    return newVenta;
  } catch (e) {
    console.error("Error al crear al crear la venta", e.message);
    throw new Error("No se pudo crear la venta. Intente de nuevo");
  }
}

async function getSale() {
  try {
    return await Venta.findAll();
  } catch (e) {
    console.error("Error al obtener las ventas", e.message);
    throw new Error("No se pudo obtener las ventas. Intente de nuevo");
  }
}

async function getSaleById(id) {
  try {
    return await Venta.findById(id);
  } catch (e) {
    console.error("Error al encontrar el producto", e.message);
    throw new Error("No se pudo encontrar la venta. Intente de nuevo");
  }
}

async function getSaleByIdOnly(id) {
  try {
    return await Venta.findByIdOnly(id);
  } catch (e) {
    console.error("Error al encontrar el producto", e.message);
    throw new Error("No se pudo encontrar la venta. Intente de nuevo");
  }
}

async function deleteSale(id) {
  try {
    return await Venta.delete(id);
  } catch (e) {
    console.error("Error al eliminar la venta", e.message);
    throw new Error("No se pudo eliminar la venta. Intente de nuevo");
  }
}

export { createVenta, getSale, getSaleById, getSaleByIdOnly, deleteSale };
