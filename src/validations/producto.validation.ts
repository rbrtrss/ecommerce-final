import { NextFunction, Request, Response } from 'express';
import joi from 'joi';
import j2s from 'joi-to-swagger';
import { validationHandler } from './handler.validation';

const agregaProductoSchema = joi.object({
  nombre: joi.string().max(50).required(),
  descripcion: joi.string().max(500).required(),
  categoria: joi.string().max(50).required(),
  precio: joi.number().greater(0).integer().required(),
  stock: joi.number().greater(0).integer().required(),
  fotos: joi.array().required(),
});

export const swAgregaProductoSchema = j2s(agregaProductoSchema).swagger;

const modificaProductoSchema = joi.object({
  nombre: joi.string().max(50),
  descripcion: joi.string().max(500),
  categoria: joi.string().max(50),
  precio: joi.number().greater(0).integer(),
  stock: joi.number().greater(0).integer(),
  fotos: joi.array(),
});

export const swModificaProductoSchema = j2s(modificaProductoSchema).swagger;

export class productoValidation {
  static async agregaProductoValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await validationHandler(agregaProductoSchema, req, res, next);
  }

  static async modificaProductoValidation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    await validationHandler(modificaProductoSchema, req, res, next);
  }
}
