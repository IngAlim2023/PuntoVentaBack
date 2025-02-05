import { createVenta, getSale, getSaleById, getSaleByIdOnly, deleteSale } from "../services/ventaService.js";
import ResponseStructure from "../../../helpers/ResponseStructure.js";

export const controller = {};

controller.createVentaC = async (req, res, next) => {
    try {
        const ventaData = req.body;
        const newVenta = await createVenta(ventaData);
        return res.status(201).json(ResponseStructure.success(newVenta, "Venta creada con exito."));
    } catch (e) {
        return res.status(500).json(ResponseStructure.error(e.message, 500));
    }
};

controller.getSaleC = async (req, res, next) => {
    try{
        const ventas = await getSale();
        return res.status(200).json(ResponseStructure.success(ventas, 200));
    } catch(e){
        return res.status(500).json(ResponseStructure.error(e.message, 500));
    }
};

controller.getSaleByIdC = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const venta = await getSaleById(id);
        return res.status(200).json(ResponseStructure.success(venta, 200));
    }catch (e){
        return res.status(500).json(ResponseStructure.error(e.message, 500));
    }
};

controller.getSaleByIdOnlyC = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const venta = await getSaleByIdOnly(id);
        return res.status(200).json(ResponseStructure.success(venta, 200));
    }catch (e){
        return res.status(500).json(ResponseStructure.error(e.message, 500));
    }
};
controller.deleteSaleC = async (req, res, next) =>{
    try{
        const id = req.params.id;
        const venta = await deleteSale(id);
        return res.status(200).json(ResponseStructure.success(venta, 200));

    } catch (e){
        return res.status(500).json(ResponseStructure.error(e.message, 500));
    }
}