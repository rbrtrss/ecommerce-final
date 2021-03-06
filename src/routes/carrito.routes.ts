import { Router } from 'express';
import { carritoController } from '../controllers/carrito.controller';
import { productoController } from '../controllers/producto.controller';
import { carritoValidation } from '../validations/carrito.validations';

export const routerCarrito = Router();

// Muestra todos los carritos
routerCarrito.get('/', carritoController.listAllCarrito);

// Agrego item al carrito, con las salvaguardas que este el body declarado y el producto exista
routerCarrito.post(
  '/add',
  carritoValidation.agregaACarritoValidation,
  productoController.paraSiNoExisteElProducto,
  productoController.productoACarrito,
  carritoController.agregaProductoACarrito
);

// Elimino cierta cantidad de productos en el carrito
routerCarrito.post(
  '/delete',
  carritoValidation.agregaACarritoValidation,
  productoController.paraSiNoExisteElProducto,
  carritoController.estaProductoEnCarrito,
  carritoController.quedaSuficiente,
  productoController.restockPorId,
  carritoController.eliminaSiEstaEnCero
  // productoController.productoACarrito,
  // carritoController.eliminaProductoEnCarrito
);

// Si el carrito tiene items y se suministro la direccion crea una orden y guardala en su coleccion
routerCarrito.post(
  '/submit',
  carritoController.paraSiEstaVacio,
  carritoValidation.checkoutValidation,
  carritoController.preparaOrden
);
