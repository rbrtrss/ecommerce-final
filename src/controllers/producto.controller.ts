import { Request, Response, NextFunction } from 'express';
import { IProducto } from '../models/producto.model';
import { productoService } from '../services/producto.service';

export class productoController {
  // Middlewares
  static async paraSiNoExisteElProducto(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const id = req.body.producto_id;
    const existe = await productoService.listaUnProductoPorId(id);
    if (!existe) {
      return res
        .status(400)
        .json({ msg: `El producto ${id} no se encuentra registrado` });
    }
    next();
  }

  static async productoACarrito(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const producto_id = req.body.producto_id;
    console.log(producto_id);
    const cantidad = req.body.cantidad;
    const aCarrito = await productoService.preparaProductoParaCarrito(
      producto_id,
      cantidad
    );
    console.log(aCarrito);
    if (!aCarrito) {
      return res.status(400).json({
        msg: `No hay suficientes existencias del producto ${producto_id}`,
      });
    }
    res.locals.aCarrito = aCarrito;
    next();
  }

  // Para los endpoints
  static async listAllProductos(req: Request, res: Response) {
    const todos = await productoService.listaProductosTodos();
    res.status(200).json({ productos: todos });
  }

  static async listaUnProducto(req: Request, res: Response) {
    const id = req.params.id;
    const uno = await productoService.listaUnProductoPorId(id);
    res.status(200).json({ usuario: uno });
  }

  static async creaProducto(req: Request, res: Response) {
    const payload = req.body;
    if (!payload) {
      return res
        .status(400)
        .json({ msg: `No se suministró informacion de entrada` });
    }
    const nuevo = await productoService.creaProducto(payload);
    res.status(201).json({ nuevo: nuevo });
  }

  // Asegurarse que no exista ese producto en ninguna orden no entregada ni en ningun carrito
  static async deleteProducto(req: Request, res: Response) {
    const id = req.params.id;
    const eliminado = await productoService.borraProductoPorId(id);
    res.status(200).json({
      msg: eliminado,
    });
  }

  static async updateProducto(req: Request, res: Response) {
    const id: string = req.params.id;
    const payload: IProducto = req.body;
    await productoService.actualizaProductoPorId(id, payload);
    res.status(200).json({ msg: `Actualizado el producto ${id}` });
  }
}