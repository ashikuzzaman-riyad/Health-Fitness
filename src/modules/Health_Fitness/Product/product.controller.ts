import { Request, Response } from "express";
import * as ProductService from "./product.service";
import { sendSuccess, sendError } from "../../../utils/error";
import { CreateProductInput }  from  "./product.types";

// create product
export async function createProduct(
  req: Request<{}, {}, CreateProductInput>,
  res: Response
) {
  try {
    const product = await ProductService.createProduct(req.body);
    sendSuccess(res, product);
  } catch (error) {
    console.error(error);
    sendError(res, "Something went wrong while fetching products", error);
  }
}

// get all products with optional search query
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await ProductService.getProducts({
      name: req.query.name as string | undefined,
      slug: req.query.slug as string | undefined,
      sortBy: req.query.sortBy as string | undefined,
      sortOrder: req.query.sortOrder as "asc" | "desc" | undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    });

    sendSuccess(res, products);
  } catch (error) {
    console.error(error);
    sendError(res, "Something went wrong while fetching products", error);
  }
};


export const getProductsBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const product = await ProductService.getProductsBySlug(slug);
    sendSuccess(res, product);
  } catch (error) {
    sendError(res, "Failed to fetch product", error);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.updateProduct(id, req.body);
    sendSuccess(res, product, "Product updated");
  } catch (error) {
    sendError(res, "Failed to update product", error);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await ProductService.deleteProduct(id);
    sendSuccess(res, product, "Product deleted");
  } catch (error) {
    sendError(res, "Failed to delete product", error);
  }
};
