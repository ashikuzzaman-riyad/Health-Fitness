import { Request, Response } from "express";
import * as CategoryService from "./category.service";

// create category
export const createCategory = async (req: Request, res: Response) => {
  const category = await CategoryService.createCategory(req.body);
  res.json(category);
};

// get all categories
export const getCategories = async (_req: Request, res: Response) => {
  const categories = await CategoryService.getCategories();
  res.json(categories);
};



// get subcategories by slug
export const getCategoryWithChildren = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const category = await CategoryService.getCategoryWithChildrenBySlug(slug);
  res.json(category);
};

// GET /:slug/products
export const getProducts = async (req:Request, res:Response) => {
  const { slug } = req.params;

  const products = await CategoryService.getProductsByAnyCategorySlug(slug);

  res.json({
    success: true,
    data: products
  });
};

// update category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.updateCategory(id, req.body);
  res.json({ success: true, category });
};
// delete category

export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.deleteCategory(id);
  res.json({ success: true, message: "category deleted", category });
};
