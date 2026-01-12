import { Request, Response } from "express";
import * as ProductService from "./product.service";

export const createProduct = async (req: Request, res: Response) => {
  const product = await ProductService.createProduct(req.body);
  res.json(product);
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    const products = await ProductService.getProducts(name as string | undefined);

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Something went wrong", error });
  }
};




// export const getProductsId = async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const product = await ProductService.getProductsId(id);
//   res.json(product);
// };

export const getProductsBySlug = async (req: Request, res: Response) => {
  const { slug} = req.params;
  const product = await ProductService.getProductsBySlug(slug);
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
