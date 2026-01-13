import { Request, Response } from "express";
import * as CategoryService from "./category.service";
import { sendSuccess, sendError } from "../../../utils/error";

/// Create category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await CategoryService.createCategory(req.body);
    sendSuccess(res, category, "Category created successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to create category", error.message || error);
  }
};

// Get all categories
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await CategoryService.getCategories();
    sendSuccess(res, categories, "Categories fetched successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to fetch categories", error.message || error);
  }
};

// Get subcategories by slug
export const getCategoryWithChildren = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const category = await CategoryService.getCategoryWithChildrenBySlug(slug);
    sendSuccess(res, category, "Category with children fetched successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to fetch category with children", error.message || error);
  }
};

// Get products by category slug
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const products = await CategoryService.getProductsByAnyCategorySlug(slug);
    sendSuccess(res, products, "Products fetched successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to fetch products", error.message || error);
  }
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.updateCategory(id, req.body);
    sendSuccess(res, category, "Category updated successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to update category", error.message || error);
  }
};

// Delete category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await CategoryService.deleteCategory(id);
    sendSuccess(res, category, "Category deleted successfully");
  } catch (error: any) {
    console.error(error);
    sendError(res, "Failed to delete category", error.message || error);
  }
};
