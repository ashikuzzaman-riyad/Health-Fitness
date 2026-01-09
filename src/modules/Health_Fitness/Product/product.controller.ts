import { Request, Response } from "express";
import * as ProductService from "./product.service";

export const createProduct = async (req: Request, res: Response) => {
  const product = await ProductService.createProduct(req.body);
  res.json(product);
};

export const getProducts = async (_req: Request, res: Response) => {
  const products = await ProductService.getProducts();
  res.json(products);
};

export const getProductsId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.getProductsId(id);
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.updateProduct(id, req.body);
  res.json({ success: true, product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.deleteProduct(id);
  res.json({ success: true, message: "product deleted", product });
};
