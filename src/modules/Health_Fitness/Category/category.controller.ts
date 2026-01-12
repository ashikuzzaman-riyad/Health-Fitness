import { Request, Response } from "express";
import * as CategoryService from "./category.service";

export const createCategory = async (req: Request, res: Response) => {
  const category = await CategoryService.createCategory(req.body);
  res.json(category);
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await CategoryService.getCategories();
  res.json(categories);
};

export const getCategoriesBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const category = await CategoryService.getCategoryBySlug(slug);
  res.json(category);
};

export const getSubCategoriesBySlug = async (req: Request, res: Response) => {
  const {slug} = req.params;
  const subcategories = await CategoryService.getSubCategoriesBySlug(slug);
  res.json(subcategories)
}

// GET /:slug/products
export const getProducts = async (req, res) => {
  const { slug } = req.params;

  const products = await CategoryService.getProductsByAnyCategorySlug(slug);

  res.json({
    success: true,
    data: products
  });
};


export const getCategoriesUpdated = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.updateCategory(id, req.body);
  res.json({ success: true, category });
};

export const getCategoriesDeleted = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await CategoryService.deleteCategory(id);
  res.json({ success: true, message: "category deleted", category });
};
